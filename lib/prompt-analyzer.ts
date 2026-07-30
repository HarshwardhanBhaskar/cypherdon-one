// ============================================================
// Cypherdon One — Prompt Analyzer
// Detects prompt injection, jailbreak, and adversarial attacks
// ============================================================

import { ThreatFinding, ThreatType } from "./types";

interface ThreatPattern {
  type: ThreatType;
  patterns: RegExp[];
  severity: "medium" | "high" | "critical";
  score: number;
  description: string;
}

const THREAT_PATTERNS: ThreatPattern[] = [
  {
    type: "prompt_injection",
    patterns: [
      /ignore\s+(?:all\s+)?(?:previous|prior|above|earlier)\s+(?:instructions?|prompts?|rules?|directives?)/i,
      /disregard\s+(?:all\s+)?(?:previous|prior|above|earlier)\s+(?:instructions?|prompts?|rules?)/i,
      /forget\s+(?:all\s+)?(?:previous|prior|above|your)\s+(?:instructions?|prompts?|rules?|training)/i,
      /override\s+(?:your|all|the)\s+(?:instructions?|prompts?|rules?|guidelines?|restrictions?)/i,
      /do\s+not\s+follow\s+(?:your|any|the)\s+(?:instructions?|rules?|guidelines?)/i,
      /new\s+instructions?\s*:/i,
      /\bDAN\b.*\bjailbreak\b/i,
      /from\s+now\s+on\s+(?:you\s+(?:are|will)|ignore)/i,
    ],
    severity: "critical",
    score: 40,
    description: "Attempt to override system instructions via prompt injection",
  },
  {
    type: "jailbreak",
    patterns: [
      /\bDAN\b/,
      /do\s+anything\s+now/i,
      /\bjailbreak(?:ed)?\b/i,
      /pretend\s+(?:you\s+)?(?:are|to\s+be)\s+(?:a\s+)?(?:evil|malicious|uncensored|unrestricted)/i,
      /act\s+as\s+(?:a\s+)?(?:evil|malicious|uncensored|unrestricted)/i,
      /you\s+(?:are|have)\s+(?:no\s+)?(?:restrictions?|limitations?|rules?|guidelines?|ethics?)/i,
      /(?:remove|disable|turn\s+off)\s+(?:your\s+)?(?:safety|content|ethical)\s+(?:filters?|guidelines?|restrictions?)/i,
      /developer\s+mode\s+(?:enabled|activated|on)/i,
      /enter\s+(?:developer|debug|admin|root|god)\s+mode/i,
    ],
    severity: "critical",
    score: 20,
    description: "Attempt to bypass AI safety restrictions",
  },
  {
    type: "system_prompt_extraction",
    patterns: [
      /(?:reveal|show|display|print|output|tell\s+me|what\s+is)\s+(?:your\s+)?(?:system\s+)?prompt/i,
      /(?:what|show|reveal|display)\s+(?:are\s+)?(?:your\s+)?(?:initial|system|hidden|secret)\s+(?:instructions?|prompt|rules?)/i,
      /repeat\s+(?:your\s+)?(?:system\s+)?(?:prompt|instructions?)\s+(?:back|verbatim|exactly)/i,
      /(?:copy|paste|echo)\s+(?:your\s+)?(?:system\s+)?(?:prompt|instructions?)/i,
      /beginning\s+of\s+(?:your|the)\s+(?:conversation|prompt|system)/i,
    ],
    severity: "high",
    score: 30,
    description: "Attempt to extract hidden system prompts",
  },
  {
    type: "role_override",
    patterns: [
      /you\s+are\s+now\s+(?:a\s+)?(?!going|able|ready)/i,
      /act\s+as\s+(?:if\s+)?(?:you\s+(?:are|were)\s+)?/i,
      /(?:assume|take\s+on)\s+the\s+role\s+of/i,
      /(?:switch|change)\s+(?:to|into)\s+(?:a\s+)?(?:different\s+)?(?:role|persona|character|mode)/i,
      /your\s+new\s+(?:role|persona|identity|name)\s+is/i,
    ],
    severity: "high",
    score: 15,
    description: "Attempt to change the AI's assigned role",
  },
  {
    type: "sql_injection",
    patterns: [
      /(?:'\s*(?:OR|AND)\s+['"]?\d+['"]?\s*=\s*['"]?\d+)/i,
      /(?:;\s*DROP\s+TABLE)/i,
      /(?:UNION\s+(?:ALL\s+)?SELECT)/i,
      /(?:;\s*DELETE\s+FROM)/i,
      /(?:'\s*;\s*--)/i,
      /(?:1\s*=\s*1\s*--)/i,
      /(?:admin'\s*--)/i,
    ],
    severity: "high",
    score: 20,
    description: "SQL injection pattern detected in prompt",
  },
  {
    type: "hidden_instruction",
    patterns: [
      /\[INST\]/i,
      /<<SYS>>/i,
      /<\|im_start\|>/i,
      /\[SYSTEM\]/i,
      /###\s*(?:System|Instruction|Human|Assistant)\s*:/i,
      /\u200B|\u200C|\u200D|\uFEFF/,  // Zero-width characters
    ],
    severity: "high",
    score: 25,
    description: "Hidden instructions or special tokens detected",
  },
];

// --- Detection Function ---

export function detectThreats(text: string): ThreatFinding[] {
  const findings: ThreatFinding[] = [];

  for (const threat of THREAT_PATTERNS) {
    for (const pattern of threat.patterns) {
      const regex = new RegExp(pattern.source, pattern.flags);
      const match = regex.exec(text);

      if (match) {
        // Calculate confidence based on pattern specificity
        const confidence = calculateConfidence(text, match[0], threat.type);

        // Avoid duplicate findings for the same threat type
        if (!findings.some((f) => f.type === threat.type)) {
          findings.push({
            type: threat.type,
            pattern: match[0],
            confidence,
            severity: threat.severity,
            score: threat.score,
            description: threat.description,
          });
        }
        break;
      }
    }
  }

  return findings;
}

function calculateConfidence(
  fullText: string,
  matchedPattern: string,
  threatType: ThreatType
): number {
  let confidence = 70; // Base confidence

  // Longer matches = higher confidence
  if (matchedPattern.length > 30) confidence += 10;
  if (matchedPattern.length > 50) confidence += 10;

  // Multiple threat indicators = higher confidence
  const threatCount = THREAT_PATTERNS.filter((t) =>
    t.patterns.some((p) => new RegExp(p.source, p.flags).test(fullText))
  ).length;
  if (threatCount > 1) confidence += 10;
  if (threatCount > 2) confidence += 5;

  // Specific high-confidence patterns
  if (threatType === "prompt_injection" && /ignore.*previous.*instructions/i.test(fullText)) {
    confidence = 98;
  }
  if (threatType === "jailbreak" && /\bDAN\b/.test(fullText)) {
    confidence = 95;
  }

  return Math.min(100, confidence);
}

// --- Quick Check (for real-time typing feedback) ---

export function quickThreatCheck(text: string): {
  hasThreats: boolean;
  threatLevel: "none" | "low" | "medium" | "high" | "critical";
} {
  if (!text || text.length < 10) return { hasThreats: false, threatLevel: "none" };

  const threats = detectThreats(text);
  if (threats.length === 0) return { hasThreats: false, threatLevel: "none" };

  const maxSeverity = threats.reduce((max, t) => {
    const severityOrder = { medium: 1, high: 2, critical: 3 };
    return severityOrder[t.severity] > severityOrder[max] ? t.severity : max;
  }, "medium" as "medium" | "high" | "critical");

  return {
    hasThreats: true,
    threatLevel: maxSeverity,
  };
}
