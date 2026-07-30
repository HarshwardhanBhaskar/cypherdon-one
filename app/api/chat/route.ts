// ============================================================
// Cypherdon One — Chat API Route
// POST /api/chat
// Scans prompt → Calculates risk → Routes through Konsole → Returns response + passport
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { fullScan } from "@/lib/scanner";
import { calculateRisk, calculateTrustScore, estimateCost } from "@/lib/risk-engine";
import { callKonsole } from "@/lib/konsole";
import { store } from "@/lib/store";
import { SecurityPassport, ChatAPIResponse } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, model = "gemini-2.5-flash", sessionId } = body;

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.KONSOLE_API_KEY || "dd70410faaa91ab497c369c60eaef68a09cc83fd6ad439276b8557a53a545bfb";

    // Step 1: Full security scan
    const scanResult = fullScan(prompt);

    // Step 2: Calculate risk
    const riskAssessment = calculateRisk(scanResult);

    // Step 3: Calculate trust score
    const trustScore = calculateTrustScore(scanResult, riskAssessment);

    // Step 4: Determine if we should proceed
    const shouldBlock = riskAssessment.recommendation === "block";
    const shouldMask = riskAssessment.recommendation === "mask";

    let aiResponse = "";
    let latencyMs = 0;
    let usedModel = model;

    if (shouldBlock) {
      // Don't send to AI — generate a block response
      aiResponse = generateBlockResponse(scanResult, riskAssessment);
      latencyMs = scanResult.scanDurationMs;
    } else {
      // Step 5: Send to Konsole (with sanitized prompt if masking)
      const promptToSend = shouldMask ? scanResult.sanitizedPrompt : prompt;

      try {
        const konsoleResult = await callKonsole(apiKey, {
          model: usedModel,
          messages: [
            {
              role: "system",
              content: "You are a helpful assistant. You are being accessed through the Cypherdon One Enterprise AI Governance Platform. Always provide accurate and professional responses.",
            },
            {
              role: "user",
              content: promptToSend,
            },
          ],
          securityProfile: "strict",
          piiDetection: true,
          piiMasking: true,
          avDetection: true,
          avBlocking: true,
          maxTokens: 2048,
          temperature: 0.7,
        });

        aiResponse = konsoleResult.response?.choices?.[0]?.message?.content || "No response generated.";
        latencyMs = konsoleResult.latencyMs;
        usedModel = konsoleResult.response?.model || model;
      } catch (apiError) {
        console.error("Konsole API error:", apiError);
        aiResponse = `⚠️ AI model temporarily unavailable. Your prompt was scanned and a Security Passport was generated.\n\nError: ${apiError instanceof Error ? apiError.message : "Unknown error"}`;
        latencyMs = scanResult.scanDurationMs;
      }
    }

    // Step 6: Generate Security Passport
    const passport: SecurityPassport = {
      id: `CYPH-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
      timestamp: new Date().toISOString(),
      promptRisk: riskAssessment,
      piiFound: scanResult.piiFindings,
      secretsFound: scanResult.secretFindings,
      threatsFound: scanResult.threatFindings,
      policyStatus: shouldBlock ? "violation" : scanResult.piiFindings.length > 0 ? "warning" : "compliant",
      policyViolations: generatePolicyViolations(scanResult),
      modelUsed: usedModel,
      cost: estimateCost(usedModel, prompt.length),
      latency: latencyMs,
      trustScore,
      complianceStatus: shouldBlock ? "failed" : riskAssessment.overallScore > 30 ? "review" : "passed",
      sanitizedPrompt: scanResult.sanitizedPrompt,
      originalPromptHash: hashString(prompt),
    };

    // Step 7: Store passport and audit entry
    store.addPassport(passport);
    store.addAuditEntry({
      id: `audit-${Date.now()}`,
      timestamp: new Date().toISOString(),
      action: shouldBlock ? "Request blocked" : shouldMask ? "PII masked and forwarded" : "Request forwarded",
      status: shouldBlock ? "blocked" : shouldMask ? "masked" : "allowed",
      riskScore: riskAssessment.overallScore,
      model: usedModel,
      userId: "user-001",
      passportId: passport.id,
      details: `Risk: ${riskAssessment.level} | PII: ${scanResult.totalPII} | Secrets: ${scanResult.totalSecrets} | Threats: ${scanResult.totalThreats}`,
    });

    // Step 8: Build response
    const response: ChatAPIResponse = {
      message: {
        id: `msg-${Date.now()}`,
        role: "assistant",
        content: aiResponse,
        timestamp: new Date().toISOString(),
        passport,
        scanResult,
        model: usedModel,
      },
      passport,
      scanResult,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// --- Helpers ---

function generateBlockResponse(scanResult: ReturnType<typeof fullScan>, riskAssessment: ReturnType<typeof calculateRisk>): string {
  const issues: string[] = [];

  if (scanResult.threatFindings.length > 0) {
    issues.push(`🚨 **Threat Detected**: ${scanResult.threatFindings.map(t => t.description).join(", ")}`);
  }
  if (scanResult.secretFindings.length > 0) {
    issues.push(`🔑 **Secrets Found**: ${scanResult.secretFindings.map(s => s.type.replace(/_/g, " ")).join(", ")}`);
  }
  if (scanResult.piiFindings.length > 0) {
    issues.push(`👤 **PII Detected**: ${scanResult.piiFindings.map(p => p.type.replace(/_/g, " ")).join(", ")}`);
  }

  return `⛔ **Request Blocked by Cypherdon One**\n\nYour prompt was analyzed and flagged with a **${riskAssessment.level.toUpperCase()}** risk level (score: ${riskAssessment.overallScore}/100).\n\n${issues.join("\n\n")}\n\n---\n\n**Recommendation**: Remove sensitive data from your prompt and try again. A Security Passport has been generated for this interaction.`;
}

function generatePolicyViolations(scanResult: ReturnType<typeof fullScan>): string[] {
  const violations: string[] = [];

  if (scanResult.secretFindings.length > 0) {
    violations.push("API Key Protection policy violated - secrets detected in prompt");
  }
  if (scanResult.piiFindings.some(p => p.type === "aadhaar" || p.type === "pan")) {
    violations.push("PII Masking policy triggered - government IDs detected");
  }
  if (scanResult.threatFindings.some(t => t.type === "prompt_injection")) {
    violations.push("Prompt injection attack detected - request blocked");
  }
  if (scanResult.threatFindings.some(t => t.type === "jailbreak")) {
    violations.push("Jailbreak attempt detected - request blocked");
  }

  return violations;
}

function hashString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16).padStart(8, "0");
}
