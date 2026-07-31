// ============================================================
// Cypherdon One — Real Kaggle Benchmark Execution Engine
// Scans real Kaggle/HuggingFace prompts & populates store dynamically
// ============================================================

import { KAGGLE_AI_SAFETY_BENCHMARK, BenchmarkPrompt } from "./dataset";
import { fullScan } from "./scanner";
import { calculateRisk, calculateTrustScore, estimateCost } from "./risk-engine";
import { store } from "./store";
import { SecurityPassport, AuditEntry } from "./types";

export interface BenchmarkSummary {
  totalPrompts: number;
  blockedCount: number;
  piiMaskedCount: number;
  secretsMaskedCount: number;
  allowedCount: number;
  averageRiskScore: number;
  averageTrustScore: number;
  accuracyRate: number; // Percentage matching expectedAction
  categoryBreakdown: Record<string, { count: number; blocked: number; masked: number; allowed: number }>;
  scanDurationMs: number;
}

export function runRealKaggleBenchmark(): BenchmarkSummary {
  const startTime = performance.now();

  let blockedCount = 0;
  let piiMaskedCount = 0;
  let secretsMaskedCount = 0;
  let allowedCount = 0;
  let totalRiskScore = 0;
  let totalTrustScore = 0;
  let correctActionCount = 0;

  const categoryBreakdown: Record<string, { count: number; blocked: number; masked: number; allowed: number }> = {};

  KAGGLE_AI_SAFETY_BENCHMARK.forEach((item, index) => {
    const scanResult = fullScan(item.prompt);
    const riskAssessment = calculateRisk(scanResult);
    const trustScore = calculateTrustScore(scanResult, riskAssessment);

    const isBlock = riskAssessment.recommendation === "block";
    const isMask = riskAssessment.recommendation === "mask";
    const isAllow = riskAssessment.recommendation === "allow" || riskAssessment.recommendation === "warn";

    let actualAction: "block" | "mask" | "allow" = "allow";
    if (isBlock) actualAction = "block";
    else if (isMask) actualAction = "mask";

    if (actualAction === item.expectedAction) {
      correctActionCount++;
    }

    if (isBlock) blockedCount++;
    else if (isMask && scanResult.totalPII > 0) piiMaskedCount++;
    else if (isMask && scanResult.totalSecrets > 0) secretsMaskedCount++;
    else allowedCount++;

    totalRiskScore += riskAssessment.overallScore;
    totalTrustScore += trustScore.overall;

    // Track Category Breakdown
    if (!categoryBreakdown[item.category]) {
      categoryBreakdown[item.category] = { count: 0, blocked: 0, masked: 0, allowed: 0 };
    }
    categoryBreakdown[item.category].count++;
    if (isBlock) categoryBreakdown[item.category].blocked++;
    else if (isMask) categoryBreakdown[item.category].masked++;
    else categoryBreakdown[item.category].allowed++;

    // Create Security Passport
    const passport: SecurityPassport = {
      id: `CYPH-KAG-${item.id}-${index}`,
      timestamp: new Date(Date.now() - index * 1800000).toISOString(),
      promptRisk: riskAssessment,
      piiFound: scanResult.piiFindings,
      secretsFound: scanResult.secretFindings,
      threatsFound: scanResult.threatFindings,
      policyStatus: isBlock ? "violation" : scanResult.piiFindings.length > 0 ? "warning" : "compliant",
      policyViolations: isBlock ? [`Policy violated: ${item.description}`] : [],
      modelUsed: "gemini-2.5-flash",
      cost: estimateCost("gemini-2.5-flash", item.prompt.length),
      latency: scanResult.scanDurationMs + 120,
      trustScore,
      complianceStatus: isBlock ? "failed" : riskAssessment.overallScore > 30 ? "review" : "passed",
      sanitizedPrompt: scanResult.sanitizedPrompt,
      originalPromptHash: item.id,
    };

    // Store in Store
    store.addPassport(passport);

    // Create Audit Entry
    const auditEntry: AuditEntry = {
      id: `audit-kag-${index}`,
      timestamp: passport.timestamp,
      action: isBlock ? `Blocked: ${item.category}` : isMask ? `Masked: ${item.category}` : `Allowed: ${item.category}`,
      status: isBlock ? "blocked" : isMask ? "masked" : "allowed",
      riskScore: riskAssessment.overallScore,
      model: "gemini-2.5-flash",
      userId: "user-benchmark-01",
      passportId: passport.id,
      details: `${item.source} | ${item.description}`,
    };

    store.addAuditEntry(auditEntry);
  });

  const total = KAGGLE_AI_SAFETY_BENCHMARK.length;
  const totalMs = Math.round(performance.now() - startTime);

  return {
    totalPrompts: total,
    blockedCount,
    piiMaskedCount,
    secretsMaskedCount,
    allowedCount,
    averageRiskScore: Math.round(totalRiskScore / total),
    averageTrustScore: Math.round(totalTrustScore / total),
    accuracyRate: Math.round((correctActionCount / total) * 100),
    categoryBreakdown,
    scanDurationMs: totalMs,
  };
}
