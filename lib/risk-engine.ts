// ============================================================
// Cypherdon One — Risk Engine
// Calculates risk scores and trust scores for every prompt
// ============================================================

import {
  ScanResult,
  RiskAssessment,
  RiskBreakdown,
  TrustScore,
} from "./types";

// --- Risk Score Calculation ---

export function calculateRisk(scanResult: ScanResult): RiskAssessment {
  const breakdown: RiskBreakdown = {
    promptInjection: 0,
    jailbreak: 0,
    secrets: 0,
    pii: 0,
    sqlInjection: 0,
  };

  // Threat scores
  for (const threat of scanResult.threatFindings) {
    switch (threat.type) {
      case "prompt_injection":
      case "system_prompt_extraction":
      case "hidden_instruction":
        breakdown.promptInjection += threat.score;
        break;
      case "jailbreak":
      case "role_override":
        breakdown.jailbreak += threat.score;
        break;
      case "sql_injection":
        breakdown.sqlInjection += threat.score;
        break;
    }
  }

  // Secret scores
  for (const secret of scanResult.secretFindings) {
    breakdown.secrets += secret.score;
  }

  // PII scores
  for (const pii of scanResult.piiFindings) {
    breakdown.pii += pii.score;
  }

  const totalScore = Math.min(
    100,
    breakdown.promptInjection +
      breakdown.jailbreak +
      breakdown.secrets +
      breakdown.pii +
      breakdown.sqlInjection
  );

  const level = getRiskLevel(totalScore);
  const recommendation = getRecommendation(totalScore, scanResult);

  return {
    overallScore: totalScore,
    level,
    breakdown,
    recommendation,
  };
}

function getRiskLevel(score: number): "low" | "medium" | "high" | "critical" {
  if (score <= 10) return "low";
  if (score <= 30) return "medium";
  if (score <= 60) return "high";
  return "critical";
}

function getRecommendation(
  score: number,
  scanResult: ScanResult
): "allow" | "warn" | "mask" | "block" {
  // Critical threats = block
  if (
    scanResult.threatFindings.some((t) => t.severity === "critical") ||
    scanResult.secretFindings.some((s) => s.severity === "critical")
  ) {
    return "block";
  }

  // Secrets found = block or mask
  if (scanResult.secretFindings.length > 0) {
    return "mask";
  }

  // PII found = mask
  if (scanResult.piiFindings.length > 0) {
    return "mask";
  }

  // High risk = warn
  if (score > 30) {
    return "warn";
  }

  return "allow";
}

// --- Trust Score Calculation ---

export function calculateTrustScore(
  scanResult: ScanResult,
  riskAssessment: RiskAssessment
): TrustScore {
  // Security: Inverse of threat risk (no threats = 100%)
  const securityScore = Math.max(
    0,
    100 - riskAssessment.breakdown.promptInjection - riskAssessment.breakdown.jailbreak - riskAssessment.breakdown.sqlInjection
  );

  // Privacy: Inverse of PII risk (no PII = 100%)
  const privacyScore = Math.max(0, 100 - riskAssessment.breakdown.pii * 3);

  // Compliance: Based on overall policy adherence
  const complianceScore = calculateComplianceScore(scanResult, riskAssessment);

  // Confidence: Based on scan completeness and model reliability
  const confidenceScore = calculateConfidenceScore(scanResult);

  // Overall: Weighted average
  const overall = Math.round(
    securityScore * 0.3 +
      privacyScore * 0.25 +
      complianceScore * 0.25 +
      confidenceScore * 0.2
  );

  return {
    overall,
    security: Math.round(securityScore),
    privacy: Math.round(privacyScore),
    compliance: Math.round(complianceScore),
    confidence: Math.round(confidenceScore),
  };
}

function calculateComplianceScore(
  scanResult: ScanResult,
  riskAssessment: RiskAssessment
): number {
  let score = 100;

  // Deduct for secrets (compliance violation)
  score -= scanResult.secretFindings.length * 20;

  // Deduct for high-severity PII
  score -= scanResult.piiFindings.filter((p) => p.severity === "critical").length * 15;
  score -= scanResult.piiFindings.filter((p) => p.severity === "high").length * 10;

  // Deduct for threats
  score -= riskAssessment.breakdown.promptInjection > 0 ? 20 : 0;

  return Math.max(0, score);
}

function calculateConfidenceScore(scanResult: ScanResult): number {
  let score = 95; // Base confidence in our scanning

  // More findings = lower confidence (more uncertain content)
  score -= scanResult.totalPII * 2;
  score -= scanResult.totalSecrets * 5;
  score -= scanResult.totalThreats * 3;

  // Fast scans = higher confidence
  if (scanResult.scanDurationMs < 50) score += 3;

  return Math.max(50, Math.min(100, score));
}

// --- Model Cost Estimation ---

export function estimateCost(model: string, promptLength: number): number {
  const costMap: Record<string, number> = {
    "gemini-2.5-flash": 0.0001,
    "gemini-2.5-flash-lite": 0.00005,
    "gemini-2.5-pro": 0.0005,
    "gemini-3-flash-preview": 0.00012,
    "gemini-3.1-flash-lite": 0.00004,
    "gemini-3.1-pro-preview": 0.0006,
    "gemini-3.5-flash": 0.00015,
    "qwen3-max": 0.0003,
    "qwen3.5-flash": 0.00008,
    "qwen3.5-plus": 0.00015,
    "deepseek-v4-flash": 0.00003,
    "deepseek-v4-pro": 0.0004,
    "Auto": 0.00015,
  };

  const costPerChar = costMap[model] || 0.0001;
  return Math.round(costPerChar * promptLength * 100) / 100;
}

// --- Recommend Model ---

export function recommendModel(
  riskLevel: string,
  promptLength: number
): { model: string; reason: string } {
  if (riskLevel === "critical" || riskLevel === "high") {
    return {
      model: "gemini-2.5-pro",
      reason: "High-security request routed to premium model with enhanced safety",
    };
  }

  if (promptLength > 5000) {
    return {
      model: "gemini-3.5-flash",
      reason: "Long prompt routed to fast model for optimal performance",
    };
  }

  if (promptLength < 200) {
    return {
      model: "deepseek-v4-flash",
      reason: "Simple query routed to cost-efficient model (saves ₹0.02 per query)",
    };
  }

  return {
    model: "gemini-2.5-flash",
    reason: "Balanced cost-performance routing for standard queries",
  };
}
