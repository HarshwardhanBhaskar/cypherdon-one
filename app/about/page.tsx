"use client";

import EnterpriseSidebar from "@/components/sidebar";
import EnterpriseHeader from "@/components/header";
import { Building2, Shield, Award, Cpu, Globe2, Sparkles, CheckCircle2 } from "lucide-react";

export default function AboutCompanyPage() {
  return (
    <div className="about-layout">
      <EnterpriseSidebar />
      <EnterpriseHeader title="About Cypherdon One" showFilters={false} />

      <main className="main-content-area">
        <div className="about-card">
          <div className="about-hero">
            <div className="hb-badge">
              <Building2 size={16} />
              <span>Developed by HB Technologies</span>
            </div>

            <h1 className="about-title">Architecting Next-Generation Enterprise AI Governance</h1>
            <p className="about-lead">
              Cypherdon One is built by <strong>HB Technologies</strong> (Lead Architect & Founder: Harsh Wardhan Bhaskar).
              We empower global enterprises to adopt Large Language Models safely without risking data leaks, PII exposure, or compliance penalties.
            </p>
          </div>

          <div className="features-grid">
            <div className="feat-card">
              <Shield size={20} className="text-indigo-600" />
              <h3>Konsole Security Harness</h3>
              <p>Built directly on the Konsole AI Security Harness, providing zero-knowledge encryption, regional routing, and instant threat blocking.</p>
            </div>

            <div className="feat-card">
              <Cpu size={20} className="text-indigo-600" />
              <h3>Multi-Model Intelligence</h3>
              <p>Seamlessly router between Gemini, DeepSeek, Qwen, and custom endpoints with automatic cost optimization and fallback logic.</p>
            </div>

            <div className="feat-card">
              <Award size={20} className="text-indigo-600" />
              <h3>Enterprise Passports</h3>
              <p>Every decision generates an auditable, verifiable digital certificate with risk scores and compliance metrics.</p>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        .about-layout {
          min-height: 100vh;
          background: #F8FAFC;
        }

        .about-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          padding: 32px;
        }

        .hb-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #EEF2FF;
          border: 1px solid #C7D2FE;
          color: #4F46E5;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .about-title {
          font-size: 28px;
          font-weight: 800;
          color: #0F172A;
          margin-bottom: 12px;
          letter-spacing: -0.5px;
        }

        .about-lead {
          font-size: 15px;
          color: #64748B;
          line-height: 1.6;
          max-width: 720px;
          margin-bottom: 32px;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          border-top: 1px solid #F1F5F9;
          padding-top: 24px;
        }
        .feat-card {
          background: #F8FAFC;
          border: 1px solid #F1F5F9;
          border-radius: 10px;
          padding: 20px;
        }
        .feat-card h3 {
          font-size: 15px;
          font-weight: 700;
          color: #0F172A;
          margin: 12px 0 6px;
        }
        .feat-card p {
          font-size: 13px;
          color: #64748B;
          margin: 0;
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
}
