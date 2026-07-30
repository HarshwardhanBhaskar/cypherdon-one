// ============================================================
// Cypherdon One — Konsole API Client
// Secure server-side integration with Konsole AI Security Harness
// ============================================================

const KONSOLE_BASE_URL = "https://api.konsole.one/v1";

interface KonsoleRequestOptions {
  model: string;
  messages: Array<{
    role: "user" | "assistant" | "system";
    content: string;
  }>;
  securityProfile?: "strict" | "moderate" | "permissive";
  piiDetection?: boolean;
  piiMasking?: boolean;
  avDetection?: boolean;
  avBlocking?: boolean;
  maxTokens?: number;
  temperature?: number;
  stream?: boolean;
}

interface KonsoleResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export async function callKonsole(
  apiKey: string,
  options: KonsoleRequestOptions
): Promise<{ response: KonsoleResponse; latencyMs: number }> {
  const startTime = Date.now();

  const body: Record<string, unknown> = {
    model: options.model,
    messages: options.messages,
    stream: options.stream ?? false,
    security_profile: options.securityProfile ?? "strict",
    pii_detection: options.piiDetection ?? true,
    pii_masking: options.piiMasking ?? true,
    av_detection: options.avDetection ?? true,
    av_blocking: options.avBlocking ?? true,
  };

  if (options.maxTokens) body.max_tokens = options.maxTokens;
  if (options.temperature !== undefined) body.temperature = options.temperature;

  const res = await fetch(`${KONSOLE_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(
      `Konsole API error (${res.status}): ${errorText}`
    );
  }

  const data: KonsoleResponse = await res.json();
  const latencyMs = Date.now() - startTime;

  return { response: data, latencyMs };
}

// --- Available Models ---

export const AVAILABLE_MODELS = [
  {
    id: "gemini-2.5-flash",
    name: "Gemini 2.5 Flash",
    provider: "Google",
    costPer1kTokens: 0.075,
    speedRating: "fast" as const,
    qualityRating: "high" as const,
    safetyRating: 95,
    icon: "⚡",
    color: "#4285F4",
  },
  {
    id: "gemini-2.5-pro",
    name: "Gemini 2.5 Pro",
    provider: "Google",
    costPer1kTokens: 0.25,
    speedRating: "medium" as const,
    qualityRating: "premium" as const,
    safetyRating: 98,
    icon: "💎",
    color: "#34A853",
  },
  {
    id: "gemini-3.5-flash",
    name: "Gemini 3.5 Flash",
    provider: "Google",
    costPer1kTokens: 0.10,
    speedRating: "fast" as const,
    qualityRating: "high" as const,
    safetyRating: 96,
    icon: "🚀",
    color: "#FBBC04",
  },
  {
    id: "deepseek-v4-flash",
    name: "DeepSeek V4 Flash",
    provider: "DeepSeek",
    costPer1kTokens: 0.02,
    speedRating: "fast" as const,
    qualityRating: "standard" as const,
    safetyRating: 85,
    icon: "🌊",
    color: "#00D4AA",
  },
  {
    id: "deepseek-v4-pro",
    name: "DeepSeek V4 Pro",
    provider: "DeepSeek",
    costPer1kTokens: 0.15,
    speedRating: "medium" as const,
    qualityRating: "high" as const,
    safetyRating: 90,
    icon: "🔱",
    color: "#00B894",
  },
  {
    id: "qwen3-max",
    name: "Qwen 3 Max",
    provider: "Alibaba",
    costPer1kTokens: 0.18,
    speedRating: "medium" as const,
    qualityRating: "premium" as const,
    safetyRating: 92,
    icon: "🐉",
    color: "#FF6B6B",
  },
  {
    id: "qwen3.5-flash",
    name: "Qwen 3.5 Flash",
    provider: "Alibaba",
    costPer1kTokens: 0.05,
    speedRating: "fast" as const,
    qualityRating: "standard" as const,
    safetyRating: 88,
    icon: "⚡",
    color: "#EE5A24",
  },
  {
    id: "Auto",
    name: "Auto (Smart Router)",
    provider: "Konsole",
    costPer1kTokens: 0.10,
    speedRating: "fast" as const,
    qualityRating: "high" as const,
    safetyRating: 95,
    icon: "🤖",
    color: "#A29BFE",
  },
];
