// ============================================================
// Cypherdon One — PII Detection & Secret Scanner
// Detects sensitive data in prompts before they reach AI models
// ============================================================

import { PIIFinding, SecretFinding, PIIType, SecretType, ScanResult, ThreatFinding } from "./types";
import { detectThreats } from "./prompt-analyzer";

// --- PII Detection Patterns ---

interface PIIPattern {
  type: PIIType;
  regex: RegExp;
  severity: "low" | "medium" | "high" | "critical";
  score: number;
  maskFn: (match: string) => string;
}

const PII_PATTERNS: PIIPattern[] = [
  {
    type: "email",
    regex: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/gi,
    severity: "medium",
    score: 5,
    maskFn: (m) => m.replace(/(.{2})[^@]*(@.*)/, "$1****$2"),
  },
  {
    type: "phone",
    regex: /(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/g,
    severity: "medium",
    score: 5,
    maskFn: (m) => m.slice(0, 3) + "****" + m.slice(-2),
  },
  {
    type: "aadhaar",
    regex: /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/g,
    severity: "high",
    score: 15,
    maskFn: () => "XXXX XXXX XXXX",
  },
  {
    type: "pan",
    regex: /\b[A-Z]{5}\d{4}[A-Z]\b/g,
    severity: "high",
    score: 15,
    maskFn: (m) => m.slice(0, 2) + "****" + m.slice(-1),
  },
  {
    type: "passport",
    regex: /\b[A-Z]\d{7}\b/g,
    severity: "high",
    score: 15,
    maskFn: () => "[PASSPORT REDACTED]",
  },
  {
    type: "credit_card",
    regex: /\b(?:\d{4}[-\s]?){3}\d{4}\b/g,
    severity: "critical",
    score: 20,
    maskFn: (m) => "**** **** **** " + m.slice(-4),
  },
  {
    type: "ssn",
    regex: /\b\d{3}-\d{2}-\d{4}\b/g,
    severity: "critical",
    score: 20,
    maskFn: () => "***-**-****",
  },
  {
    type: "employee_id",
    regex: /\b(?:EMP|emp|Employee[_\s]?ID)[:\s#-]*\d{4,10}\b/gi,
    severity: "medium",
    score: 5,
    maskFn: () => "[EMPLOYEE ID REDACTED]",
  },
];

// --- Secret Detection Patterns ---

interface SecretPattern {
  type: SecretType;
  regex: RegExp;
  severity: "high" | "critical";
  score: number;
  maskFn: (match: string) => string;
}

const SECRET_PATTERNS: SecretPattern[] = [
  {
    type: "openai_key",
    regex: /\bsk-(?:proj-)?[A-Za-z0-9_-]{20,}\b/g,
    severity: "critical",
    score: 20,
    maskFn: (m) => m.slice(0, 5) + "..." + "[REDACTED]",
  },
  {
    type: "aws_key",
    regex: /\b(?:AKIA|ASIA)[A-Z0-9]{12,}\b/g,
    severity: "critical",
    score: 20,
    maskFn: () => "[AWS KEY REDACTED]",
  },
  {
    type: "aws_key",
    regex: /(?:aws_secret_access_key|AWS_SECRET_ACCESS_KEY)\s*[=:]\s*["']?([A-Za-z0-9/+=]{30,})["']?/g,
    severity: "critical",
    score: 20,
    maskFn: () => "[AWS SECRET REDACTED]",
  },
  {
    type: "jwt_token",
    regex: /\beyJ[A-Za-z0-9_-]{10,}\.eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b/g,
    severity: "high",
    score: 15,
    maskFn: () => "[JWT TOKEN REDACTED]",
  },
  {
    type: "github_token",
    regex: /\b(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{36,}\b/g,
    severity: "critical",
    score: 20,
    maskFn: (m) => m.slice(0, 4) + "...[REDACTED]",
  },
  {
    type: "ssh_key",
    regex: /-----BEGIN (?:RSA |EC |DSA |OPENSSH )?PRIVATE KEY-----[\s\S]*?-----END (?:RSA |EC |DSA |OPENSSH )?PRIVATE KEY-----/g,
    severity: "critical",
    score: 20,
    maskFn: () => "[SSH PRIVATE KEY REDACTED]",
  },
  {
    type: "password",
    regex: /(?:password|passwd|pwd|pass)\s*[=:]\s*["']?([^\s"']{4,})["']?/gi,
    severity: "high",
    score: 20,
    maskFn: () => "[PASSWORD REDACTED]",
  },
  {
    type: "generic_api_key",
    regex: /(?:api[_-]?key|apikey|api[_-]?secret|api[_-]?token)\s*[=:]\s*["']?([A-Za-z0-9_\-/.]{16,})["']?/gi,
    severity: "high",
    score: 15,
    maskFn: () => "[API KEY REDACTED]",
  },
  {
    type: "azure_key",
    regex: /\b[a-f0-9]{32}\b/g,
    severity: "high",
    score: 10,
    maskFn: () => "[AZURE KEY REDACTED]",
  },
];

// --- Scanner Functions ---

export function detectPII(text: string): PIIFinding[] {
  const findings: PIIFinding[] = [];

  for (const pattern of PII_PATTERNS) {
    const regex = new RegExp(pattern.regex.source, pattern.regex.flags);
    let match;

    while ((match = regex.exec(text)) !== null) {
      // Avoid false positives: skip if inside a code block or URL
      const context = text.slice(Math.max(0, match.index - 20), match.index);
      if (pattern.type === "aadhaar" && /\d{5,}/.test(context)) continue;

      findings.push({
        type: pattern.type,
        value: match[0],
        maskedValue: pattern.maskFn(match[0]),
        position: { start: match.index, end: match.index + match[0].length },
        severity: pattern.severity,
        score: pattern.score,
      });
    }
  }

  return findings;
}

export function detectSecrets(text: string): SecretFinding[] {
  const findings: SecretFinding[] = [];

  for (const pattern of SECRET_PATTERNS) {
    // Skip azure_key for short texts (too many false positives)
    if (pattern.type === "azure_key" && text.length < 100) continue;

    const regex = new RegExp(pattern.regex.source, pattern.regex.flags);
    let match;

    while ((match = regex.exec(text)) !== null) {
      findings.push({
        type: pattern.type,
        value: match[0],
        maskedValue: pattern.maskFn(match[0]),
        position: { start: match.index, end: match.index + match[0].length },
        severity: pattern.severity,
        score: pattern.score,
      });
    }
  }

  return findings;
}

export function sanitizePrompt(
  text: string,
  piiFindings: PIIFinding[],
  secretFindings: SecretFinding[]
): string {
  let sanitized = text;

  // Sort findings by position (reverse) so we replace from end to start
  const allFindings = [
    ...piiFindings.map((f) => ({ ...f, replacement: `[${f.type.toUpperCase()} REDACTED]` })),
    ...secretFindings.map((f) => ({ ...f, replacement: `[${f.type.toUpperCase()} REDACTED]` })),
  ].sort((a, b) => b.position.start - a.position.start);

  for (const finding of allFindings) {
    sanitized =
      sanitized.slice(0, finding.position.start) +
      finding.replacement +
      sanitized.slice(finding.position.end);
  }

  return sanitized;
}

// --- Full Scan ---

export function fullScan(text: string): ScanResult {
  const startTime = performance.now();

  const piiFindings = detectPII(text);
  const secretFindings = detectSecrets(text);
  const threatFindings: ThreatFinding[] = detectThreats(text);

  const sanitized = sanitizePrompt(text, piiFindings, secretFindings);

  return {
    piiFindings,
    secretFindings,
    threatFindings,
    totalPII: piiFindings.length,
    totalSecrets: secretFindings.length,
    totalThreats: threatFindings.length,
    sanitizedPrompt: sanitized,
    originalPrompt: text,
    scanDurationMs: Math.round(performance.now() - startTime),
  };
}
