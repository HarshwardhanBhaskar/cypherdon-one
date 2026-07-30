// ============================================================
// Cypherdon One — Enterprise AI Governance Platform
// Type Definitions
// ============================================================

// --- Scanner Types ---

export type PIIType =
  | "email"
  | "phone"
  | "aadhaar"
  | "pan"
  | "passport"
  | "credit_card"
  | "employee_id"
  | "ssn";

export type SecretType =
  | "openai_key"
  | "aws_key"
  | "jwt_token"
  | "password"
  | "github_token"
  | "ssh_key"
  | "generic_api_key"
  | "azure_key"
  | "gcp_key";

export type ThreatType =
  | "prompt_injection"
  | "jailbreak"
  | "system_prompt_extraction"
  | "role_override"
  | "sql_injection"
  | "hidden_instruction";

export interface PIIFinding {
  type: PIIType;
  value: string;
  maskedValue: string;
  position: { start: number; end: number };
  severity: "low" | "medium" | "high" | "critical";
  score: number;
}

export interface SecretFinding {
  type: SecretType;
  value: string;
  maskedValue: string;
  position: { start: number; end: number };
  severity: "high" | "critical";
  score: number;
}

export interface ThreatFinding {
  type: ThreatType;
  pattern: string;
  confidence: number;
  severity: "medium" | "high" | "critical";
  score: number;
  description: string;
}

export interface ScanResult {
  piiFindings: PIIFinding[];
  secretFindings: SecretFinding[];
  threatFindings: ThreatFinding[];
  totalPII: number;
  totalSecrets: number;
  totalThreats: number;
  sanitizedPrompt: string;
  originalPrompt: string;
  scanDurationMs: number;
}

// --- Risk Engine Types ---

export interface RiskBreakdown {
  promptInjection: number;
  jailbreak: number;
  secrets: number;
  pii: number;
  sqlInjection: number;
}

export interface RiskAssessment {
  overallScore: number; // 0-100
  level: "low" | "medium" | "high" | "critical";
  breakdown: RiskBreakdown;
  recommendation: "allow" | "warn" | "mask" | "block";
}

// --- Trust Score Types ---

export interface TrustScore {
  overall: number; // 0-100
  security: number;
  privacy: number;
  compliance: number;
  confidence: number;
}

// --- Security Passport Types ---

export interface SecurityPassport {
  id: string;
  timestamp: string;
  promptRisk: RiskAssessment;
  piiFound: PIIFinding[];
  secretsFound: SecretFinding[];
  threatsFound: ThreatFinding[];
  policyStatus: "compliant" | "violation" | "warning";
  policyViolations: string[];
  modelUsed: string;
  cost: number;
  latency: number;
  trustScore: TrustScore;
  complianceStatus: "passed" | "failed" | "review";
  sanitizedPrompt: string;
  originalPromptHash: string;
}

// --- Chat Types ---

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
  passport?: SecurityPassport;
  scanResult?: ScanResult;
  model?: string;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
  modelUsed: string;
}

// --- Model Router Types ---

export interface AIModel {
  id: string;
  name: string;
  provider: string;
  costPer1kTokens: number;
  speedRating: "fast" | "medium" | "slow";
  qualityRating: "standard" | "high" | "premium";
  safetyRating: number;
  icon: string;
  color: string;
}

// --- Dashboard Types ---

export interface DashboardMetrics {
  totalRequests: number;
  blockedRequests: number;
  piiDetected: number;
  secretsBlocked: number;
  moneySaved: number;
  averageRisk: number;
  averageCost: number;
  totalCost: number;
}

export interface DailyMetric {
  date: string;
  requests: number;
  blocked: number;
  risk: number;
  cost: number;
}

export interface ModelUsageData {
  model: string;
  count: number;
  cost: number;
  color: string;
}

// --- Policy Types ---

export interface PolicyRule {
  id: string;
  name: string;
  description: string;
  type: "block" | "warn" | "mask";
  patterns: string[];
  enabled: boolean;
  createdAt: string;
  violations: number;
}

// --- Audit Types ---

export interface AuditEntry {
  id: string;
  timestamp: string;
  action: string;
  status: "allowed" | "blocked" | "masked" | "warning";
  riskScore: number;
  model: string;
  userId: string;
  passportId: string;
  details: string;
}

// --- API Response Types ---

export interface ChatAPIResponse {
  message: ChatMessage;
  passport: SecurityPassport;
  scanResult: ScanResult;
}

export interface AnalyzeAPIResponse {
  scanResult: ScanResult;
  riskAssessment: RiskAssessment;
  trustScore: TrustScore;
}
