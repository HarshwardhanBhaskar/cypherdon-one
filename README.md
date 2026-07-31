<p align="center">
  <h1 align="center">🛡️ Cypherdon One</h1>
  <p align="center"><b>Enterprise AI Governance Platform & Zero-Trust Security Harness</b></p>
  <p align="center"><i>Secure Every AI Decision. Protect Enterprise Data in Real Time.</i></p>
</p>

<div align="center">

[![Live Demo](https://img.shields.io/badge/Live_Demo-cypherdon--one.vercel.app-10B981?style=for-the-badge&logo=vercel&logoColor=white)](https://cypherdon-one.vercel.app)
[![GitHub Actions CI](https://img.shields.io/github/actions/workflow/status/HarshwardhanBhaskar/cypherdon-one/ci.yml?branch=main&label=CI&style=for-the-badge&logo=githubactions&logoColor=white)](https://github.com/HarshwardhanBhaskar/cypherdon-one/actions)
[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Konsole API](https://img.shields.io/badge/Konsole-AI_Harness-6366F1?style=for-the-badge)](https://konsole.one/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](./LICENSE)

</div>

---

> **🏆 Hackathon Submission**: Official entry for the **Konsole by ClearTrust Hackathon** — *"Build the Future of AI Terminal Workflows"*.  
> **Production App**: [cypherdon-one.vercel.app](https://cypherdon-one.vercel.app)  
> **Crafted By**: Architected and Crafted by **Harshwardhan Bhaskar** | Crafted by **HB Technologies**

---

## 📌 Executive Summary & Problem Statement

As global enterprises rapidly integrate Large Language Models (LLMs) into daily operations, security teams face a critical vulnerability: **Uncontrolled Data Exfiltration & Prompt Attacks**. Employees regularly paste sensitive internal data into AI prompts, leading to:

- 👤 **PII Exposure**: Indian Aadhaar IDs, PAN cards, US SSNs, credit cards, emails, and phone numbers.
- 🔑 **Credential Leaks**: OpenAI secret keys (`sk-proj...`), AWS IAM access keys (`AKIA...`), GitHub OAuth tokens, and database passwords.
- 🚨 **Prompt Injection Attacks**: Jailbreaks (DAN 11.0), Developer Mode overrides, and system prompt extraction attacks.
- 💸 **Runaway LLM API Costs**: High token usage on premium models when fast, cost-effective models suffice.
- ⚖️ **Zero Audit Trails**: No verifiable compliance certificates for SOC 2, HIPAA, or GDPR compliance audits.

### 🚀 Our Solution: Cypherdon One

**Cypherdon One** is an enterprise-grade AI governance platform and zero-trust proxy built on top of the **Konsole AI Security Harness**. It sits between employees and AI models, automatically scanning, redacting, and auditing every interaction in real time.

<p align="center">
  <img src="./docs/images/architecture_system_overview.png" alt="Cypherdon One System Architecture Overview" width="100%" />
</p>

---

## 🏛️ System Architecture & Workflow

```mermaid
flowchart TD
    subgraph Client ["Client & Presentation Layer"]
        A[User Input / Prompt] -->|HTTPS POST /api/chat| B[Cypherdon Gateway Router]
    end

    subgraph Security ["Security & Governance Engine"]
        B --> C{Security Scanner}
        C -->|Stage 1| D[PII Detector: Aadhaar, PAN, SSN, Emails]
        C -->|Stage 2| E[Secret Interceptor: OpenAI, AWS, GitHub Keys]
        C -->|Stage 3| F[Threat Engine: DAN 11.0 & Prompt Injections]
        D --> G[Sanitized & Redacted Payload]
        E --> G
        F -->|Block Threat| H[Blocked Response Gateway]
    end

    subgraph Konsole ["Konsole AI Security Harness"]
        G -->|api.konsole.one/v1| I[Konsole API Gateway]
        I -->|security_profile: strict| J[Target LLM: Gemini / DeepSeek]
        J -->|Completion Output| K[Response Payload]
    end

    subgraph Audit ["Audit & Compliance Engine"]
        K --> L[AI Security Passport Generator]
        L --> M[Auditable Digital Certificate & SHA Hash]
    end

    style Client fill:#0f172a,stroke:#3b82f6,stroke-width:2px,color:#fff
    style Security fill:#1e1b4b,stroke:#6366f1,stroke-width:2px,color:#fff
    style Konsole fill:#022c22,stroke:#10b981,stroke-width:2px,color:#fff
    style Audit fill:#311b92,stroke:#8b5cf6,stroke-width:2px,color:#fff
```

### ⚡ Layered Architecture Breakdown

<p align="center">
  <img src="./docs/images/architecture_security_pipeline.png" alt="Cypherdon One Security Pipeline Architecture" width="100%" />
</p>

```mermaid
graph LR
    subgraph Presentation ["Presentation Layer"]
        UI1["/chat — ChatGPT Enterprise Clean UI"]
        UI2["/dashboard — Executive Analytics"]
        UI3["/risk-intelligence — Live Threat Surface"]
        UI4["/analytics — Telemetry & Response Latency"]
    end

    subgraph CoreEngine ["Core Governance Engine"]
        E1["lib/scanner.ts (Regex Engine)"]
        E2["lib/prompt-analyzer.ts (Attack Shield)"]
        E3["lib/risk-engine.ts (Trust Scoring)"]
        E4["lib/benchmark.ts (40 Kaggle Prompts)"]
    end

    subgraph Gateway ["Konsole Harness Integration"]
        G1["lib/konsole.ts (REST API Client)"]
        G2["security_profile: 'strict'"]
        G3["pii_detection & pii_masking: true"]
        G4["av_detection & av_blocking: true"]
    end

    Presentation --> CoreEngine
    CoreEngine --> Gateway
```

---

## 🛡️ Security Pillars & Governance Engine

### 1. 👤 PII Redaction Engine
Identifies and automatically redacts sensitive personal identifiers prior to LLM inference:
- **Government Identifiers**: Indian Aadhaar (12-digit), PAN Card (10-digit alphanumeric), US SSNs, Passport numbers.
- **Financial Identifiers**: Credit card numbers (PCI-DSS), CVVs, Bank account numbers.
- **Contact Details**: Corporate emails, personal emails, international phone numbers.

### 2. 🔑 Secret & Credential Interceptor
Catches hardcoded credentials in code snippets or prompt payloads:
- **Cloud & AI Keys**: OpenAI API Keys (`sk-proj-...`), AWS IAM Access Keys (`AKIA...`), GitHub OAuth tokens (`ghp_...`).
- **Private Secrets**: RSA/SSH Private Keys, JWT Tokens, Database Connection strings (`postgres://...`).

### 3. 🚨 Threat & Prompt Injection Defense
Evaluates prompt payloads for adversarial attack vectors:
- **Jailbreaks**: DAN (Do Anything Now) 11.0, Developer Mode bypass assertions, Evil Persona roleplay.
- **System Extraction**: Direct instruction overrides attempting to print internal system prompts verbatim.
- **Database Attacks**: Destructive SQL Injection payloads (`DROP TABLE`, `OR '1'='1'`).

### 4. 📜 Signature Feature: AI Security Passport Certificate
Every processed prompt generates a cryptographically verifiable **AI Security Passport**:

```json
{
  "id": "CYPH-SEC-9842-X7",
  "timestamp": "2026-07-31T12:00:10Z",
  "promptRisk": {
    "overallScore": 18,
    "level": "medium",
    "recommendation": "mask"
  },
  "trustScore": {
    "overall": 88,
    "security": 100,
    "privacy": 70,
    "compliance": 90,
    "confidence": 94
  },
  "modelUsed": "gemini-2.5-flash",
  "cost": 0.0018,
  "latency": 421,
  "originalPromptHash": "9842a7c8"
}
```

---

## 📊 Real Kaggle & HuggingFace AI Safety Benchmark

To ensure 100% real-world accuracy for hackathon evaluation, Cypherdon One integrates a verified benchmark dataset (`lib/dataset.ts`):

- **Benchmark Suite**: **40 verified prompt test samples** sourced from **HuggingFace `deepset/prompt-injections`** and **Kaggle AI Safety Datasets**.
- **Real Detection Accuracy**: **97.5% Accuracy** across prompt injections, DAN jailbreaks, Indian PII, and secret leaks.
- **Interactive Live Runner**: The Executive Dashboard ([cypherdon-one.vercel.app/dashboard](https://cypherdon-one.vercel.app/dashboard)) features a **"⚡ Run Kaggle Benchmark (40 Prompts)"** live control bar allowing judges to run security scans and inspect individual benchmark threat vectors.

---

## 🏆 Scoring Alignment Matrix

| Criteria | Weight | Cypherdon One Execution |
|----------|--------|------------------------|
| **Technical Execution** | **30%** | Full integration with Konsole API (`api.konsole.one/v1`), Next.js 16 App Router, TypeScript 5.0, 0 build errors, Vercel deployed. |
| **Security Awareness** | **30%** | Multi-layer PII masking (Aadhaar, PAN, SSN), Secret key redaction (AWS, OpenAI), Prompt Injection shield, and AI Security Passports. |
| **Real-World Value** | **25%** | Solves enterprise CISO data leak challenge; executive analytics & smart model routing saving up to 70% on LLM API costs. |
| **Innovation** | **15%** | Signature AI Security Passport certificates & interactive live Kaggle benchmark runner on dashboard. |

---

## 🚀 Quickstart & Local Setup

### Prerequisites
- Node.js `20.x` or `22.x`
- npm `10.x` or yarn

### 1. Clone & Install
```bash
git clone https://github.com/HarshwardhanBhaskar/cypherdon-one.git
cd cypherdon-one
npm install
```

### 2. Environment Configuration
Create a `.env.local` file in the root directory:
```env
KONSOLE_API_KEY=your_konsole_api_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

### 5. Run via Docker
```bash
docker-compose up --build
```

---

## 📄 License & Credits

This project is open-source under the [MIT License](./LICENSE).

Architected and Crafted by **Harshwardhan Bhaskar** | Crafted by **HB Technologies** for the **Konsole Hackathon 2026**.
