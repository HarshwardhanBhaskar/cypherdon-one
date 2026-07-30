// ============================================================
// Cypherdon One — Analyze API Route
// POST /api/analyze — Standalone prompt analysis without sending to AI
// GET /api/analyze — Get dashboard metrics
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { fullScan } from "@/lib/scanner";
import { calculateRisk, calculateTrustScore } from "@/lib/risk-engine";
import { store } from "@/lib/store";
import { AnalyzeAPIResponse } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt } = body;

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    // Run full scan
    const scanResult = fullScan(prompt);
    const riskAssessment = calculateRisk(scanResult);
    const trustScore = calculateTrustScore(scanResult, riskAssessment);

    const response: AnalyzeAPIResponse = {
      scanResult,
      riskAssessment,
      trustScore,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Analyze API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const metrics = store.getMetrics();
    const dailyMetrics = store.getDailyMetrics();
    const modelUsage = store.getModelUsage();
    const auditLog = store.getAuditLog();
    const policies = store.getPolicies();
    const passports = store.getAllPassports();

    return NextResponse.json({
      metrics,
      dailyMetrics,
      modelUsage,
      auditLog: auditLog.slice(0, 50),
      policies,
      recentPassports: passports.slice(0, 10),
    });
  } catch (error) {
    console.error("Metrics API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
