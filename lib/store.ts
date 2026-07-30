// ============================================================
// Cypherdon One — In-Memory Store
// Simulated database for hackathon (localStorage persistence)
// ============================================================

import {
  SecurityPassport,
  ChatSession,
  AuditEntry,
  DashboardMetrics,
  DailyMetric,
  ModelUsageData,
  PolicyRule,
} from "./types";

// --- Simulated Data Store ---

class CypherdonStore {
  private passports: SecurityPassport[] = [];
  private sessions: ChatSession[] = [];
  private auditLog: AuditEntry[] = [];
  private policies: PolicyRule[] = [];
  private initialized = false;

  constructor() {
    this.initDefaults();
  }

  private initDefaults() {
    if (this.initialized) return;
    this.initialized = true;

    // Default policies
    this.policies = [
      {
        id: "pol-001",
        name: "No Source Code",
        description: "Block prompts containing source code or proprietary algorithms",
        type: "block",
        patterns: ["function\\s+\\w+\\s*\\(", "class\\s+\\w+", "import\\s+\\w+\\s+from"],
        enabled: true,
        createdAt: new Date().toISOString(),
        violations: 3,
      },
      {
        id: "pol-002",
        name: "No Financial Data",
        description: "Block sharing of financial reports, revenue data, or banking info",
        type: "block",
        patterns: ["revenue", "profit\\s+margin", "quarterly\\s+earnings", "bank\\s+account"],
        enabled: true,
        createdAt: new Date().toISOString(),
        violations: 1,
      },
      {
        id: "pol-003",
        name: "No HR Data",
        description: "Block sharing of employee records, salaries, or HR policies",
        type: "warn",
        patterns: ["salary", "employee\\s+record", "termination", "performance\\s+review"],
        enabled: true,
        createdAt: new Date().toISOString(),
        violations: 5,
      },
      {
        id: "pol-004",
        name: "API Key Protection",
        description: "Block any API keys, tokens, or secrets from being sent",
        type: "block",
        patterns: ["sk-", "AKIA", "api[_-]?key", "secret[_-]?key"],
        enabled: true,
        createdAt: new Date().toISOString(),
        violations: 8,
      },
      {
        id: "pol-005",
        name: "PII Masking",
        description: "Automatically mask personally identifiable information before sending",
        type: "mask",
        patterns: ["\\b\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}\\b", "\\b[A-Z]{5}\\d{4}[A-Z]\\b"],
        enabled: true,
        createdAt: new Date().toISOString(),
        violations: 12,
      },
    ];

    // Seed demo audit entries
    this.auditLog = generateDemoAuditEntries();
  }

  // --- Passport Methods ---
  addPassport(passport: SecurityPassport) {
    this.passports.unshift(passport);
  }

  getPassport(id: string): SecurityPassport | undefined {
    return this.passports.find((p) => p.id === id);
  }

  getAllPassports(): SecurityPassport[] {
    return this.passports;
  }

  // --- Session Methods ---
  addSession(session: ChatSession) {
    this.sessions.unshift(session);
  }

  getSession(id: string): ChatSession | undefined {
    return this.sessions.find((s) => s.id === id);
  }

  updateSession(id: string, updates: Partial<ChatSession>) {
    const index = this.sessions.findIndex((s) => s.id === id);
    if (index >= 0) {
      this.sessions[index] = { ...this.sessions[index], ...updates };
    }
  }

  getAllSessions(): ChatSession[] {
    return this.sessions;
  }

  // --- Audit Methods ---
  addAuditEntry(entry: AuditEntry) {
    this.auditLog.unshift(entry);
  }

  getAuditLog(): AuditEntry[] {
    return this.auditLog;
  }

  // --- Policy Methods ---
  getPolicies(): PolicyRule[] {
    return this.policies;
  }

  addPolicy(policy: PolicyRule) {
    this.policies.push(policy);
  }

  updatePolicy(id: string, updates: Partial<PolicyRule>) {
    const index = this.policies.findIndex((p) => p.id === id);
    if (index >= 0) {
      this.policies[index] = { ...this.policies[index], ...updates };
    }
  }

  deletePolicy(id: string) {
    this.policies = this.policies.filter((p) => p.id !== id);
  }

  // --- Dashboard Metrics ---
  getMetrics(): DashboardMetrics {
    const passports = this.passports;
    const audits = this.auditLog;

    return {
      totalRequests: audits.length + passports.length,
      blockedRequests: audits.filter((a) => a.status === "blocked").length + 12,
      piiDetected: passports.reduce((sum, p) => sum + p.piiFound.length, 0) + 47,
      secretsBlocked: passports.reduce((sum, p) => sum + p.secretsFound.length, 0) + 23,
      moneySaved: 1284.50,
      averageRisk: passports.length > 0
        ? Math.round(passports.reduce((sum, p) => sum + p.promptRisk.overallScore, 0) / passports.length)
        : 18,
      averageCost: 0.003,
      totalCost: passports.reduce((sum, p) => sum + p.cost, 0) + 42.80,
    };
  }

  getDailyMetrics(): DailyMetric[] {
    return generateDailyMetrics();
  }

  getModelUsage(): ModelUsageData[] {
    return [
      { model: "Gemini 2.5 Flash", count: 342, cost: 12.50, color: "#4285F4" },
      { model: "DeepSeek V4 Flash", count: 256, cost: 3.20, color: "#00D4AA" },
      { model: "Gemini 3.5 Flash", count: 189, cost: 8.90, color: "#FBBC04" },
      { model: "Qwen 3.5 Flash", count: 134, cost: 4.10, color: "#EE5A24" },
      { model: "Gemini 2.5 Pro", count: 78, cost: 14.30, color: "#34A853" },
      { model: "Auto", count: 201, cost: 9.80, color: "#A29BFE" },
    ];
  }
}

// --- Helper: Generate Demo Data ---

function generateDemoAuditEntries(): AuditEntry[] {
  const entries: AuditEntry[] = [];
  const actions = [
    "Chat prompt analyzed",
    "PII detected and masked",
    "Secret key blocked",
    "Prompt injection detected",
    "Clean prompt forwarded",
    "Policy violation blocked",
    "Jailbreak attempt blocked",
  ];
  const statuses: AuditEntry["status"][] = ["allowed", "blocked", "masked", "warning"];
  const models = ["gemini-2.5-flash", "deepseek-v4-flash", "qwen3.5-flash", "gemini-3.5-flash"];

  for (let i = 0; i < 25; i++) {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    entries.push({
      id: `audit-${String(i).padStart(3, "0")}`,
      timestamp: new Date(Date.now() - i * 3600000 * Math.random() * 24).toISOString(),
      action: actions[Math.floor(Math.random() * actions.length)],
      status,
      riskScore: Math.floor(Math.random() * 80) + (status === "blocked" ? 40 : 0),
      model: models[Math.floor(Math.random() * models.length)],
      userId: "user-001",
      passportId: `passport-${String(i).padStart(3, "0")}`,
      details: status === "blocked" ? "Request blocked due to policy violation" : "Request processed successfully",
    });
  }

  return entries.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

function generateDailyMetrics(): DailyMetric[] {
  const metrics: DailyMetric[] = [];
  for (let i = 29; i >= 0; i--) {
    const date = new Date(Date.now() - i * 86400000);
    metrics.push({
      date: date.toISOString().split("T")[0],
      requests: Math.floor(Math.random() * 80) + 20,
      blocked: Math.floor(Math.random() * 15) + 2,
      risk: Math.floor(Math.random() * 40) + 10,
      cost: Math.round((Math.random() * 3 + 0.5) * 100) / 100,
    });
  }
  return metrics;
}

// --- Singleton Export ---

// Use global for Next.js hot reload persistence
const globalForStore = globalThis as unknown as { cypherdonStore: CypherdonStore };
export const store = globalForStore.cypherdonStore ?? new CypherdonStore();
if (process.env.NODE_ENV !== "production") globalForStore.cypherdonStore = store;
