"use client";

import EnterpriseSidebar from "@/components/sidebar";
import EnterpriseHeader from "@/components/header";
import {
  FileCheck, Download, CheckCircle2, ShieldCheck, Lock, Eye, AlertTriangle, UserCheck
} from "lucide-react";

export default function PassportDetailPage() {
  return (
    <div className="passport-layout">
      <EnterpriseSidebar />
      <EnterpriseHeader title="Security Passport" showFilters={false} />

      <main className="main-content-area">
        {/* Top Actions Bar */}
        <div className="passport-top-actions">
          <div className="passport-breadcrumbs">
            <span>Passports</span> / <span className="current">SP-2026-07-30-6F3A</span>
          </div>

          <button className="btn-download-pdf">
            <Download size={14} />
            <span>Download PDF</span>
          </button>
        </div>

        {/* Certificate & Summary Split (Matching Reference Screen 4) */}
        <div className="passport-card-container">
          {/* Left: Dark Digital Certificate Card */}
          <div className="certificate-card">
            <div className="cert-header">
              <div>
                <span className="cert-subtitle">PASSPORT ID</span>
                <h2 className="cert-id">SP-2026-07-30-6F3A</h2>
              </div>
              <span className="cert-verified-badge">
                <CheckCircle2 size={12} /> Verified
              </span>
            </div>

            <div className="cert-meta">
              <div className="meta-block">
                <span className="meta-label">GENERATED AT</span>
                <span className="meta-val">30 JUL 2026, 11:24 AM</span>
              </div>
              <div className="meta-block">
                <span className="meta-label">MODEL USED</span>
                <span className="meta-val highlight">Gemini 2.5 Flash</span>
              </div>
            </div>

            {/* Shield Graphic emblem */}
            <div className="cert-graphic-center">
              <div className="shield-emblem-outer">
                <ShieldCheck size={48} className="shield-emblem-icon" />
              </div>
            </div>

            {/* Signature Line */}
            <div className="cert-signature-section">
              <div className="sig-image">Harshwardhan B.</div>
              <div className="sig-title">Cypherdon One</div>
              <div className="sig-sub">AI Governance Platform</div>
            </div>
          </div>

          {/* Right: Security Summary Table */}
          <div className="summary-checklist-panel">
            <h3>Security Summary</h3>

            <div className="checklist-items">
              <div className="checklist-row">
                <div className="row-label">
                  <Eye size={15} className="text-emerald-500" />
                  <span>PII Detection</span>
                </div>
                <span className="row-status green">No PII Detected &gt;</span>
              </div>

              <div className="checklist-row">
                <div className="row-label">
                  <Lock size={15} className="text-emerald-500" />
                  <span>Secrets Detection</span>
                </div>
                <span className="row-status green">No Secrets Found &gt;</span>
              </div>

              <div className="checklist-row">
                <div className="row-label">
                  <ShieldCheck size={15} className="text-emerald-500" />
                  <span>Prompt Injection</span>
                </div>
                <span className="row-status green">Not Detected &gt;</span>
              </div>

              <div className="checklist-row">
                <div className="row-label">
                  <CheckCircle2 size={15} className="text-emerald-500" />
                  <span>Toxicity</span>
                </div>
                <span className="row-status green">Clean &gt;</span>
              </div>

              <div className="checklist-row">
                <div className="row-label">
                  <FileCheck size={15} className="text-emerald-500" />
                  <span>Policy Check</span>
                </div>
                <span className="row-status green">Compliant &gt;</span>
              </div>

              <div className="checklist-row">
                <div className="row-label">
                  <AlertTriangle size={15} className="text-emerald-500" />
                  <span>Risk Score</span>
                </div>
                <div className="risk-score-badge">
                  <span className="score">18/100</span>
                  <span className="level">Low</span>
                </div>
              </div>
            </div>

            <div className="compliance-footer-note">
              <CheckCircle2 size={14} className="text-emerald-600" />
              <span>This interaction is safe and compliant with organization policies.</span>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        .passport-layout {
          min-height: 100vh;
          background: #F8FAFC;
        }

        .passport-top-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .passport-breadcrumbs {
          font-size: 13px;
          color: #64748B;
        }
        .passport-breadcrumbs .current {
          color: #0F172A;
          font-weight: 600;
        }
        .btn-download-pdf {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 6px;
          padding: 8px 14px;
          font-size: 12px;
          font-weight: 600;
          color: #0F172A;
          cursor: pointer;
        }

        /* Split Card Container */
        .passport-card-container {
          display: grid;
          grid-template-columns: 360px 1fr;
          gap: 20px;
        }

        /* Left Dark Certificate Card */
        .certificate-card {
          background: #0B1020;
          border-radius: 14px;
          padding: 24px;
          color: #FFFFFF;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 480px;
          box-shadow: 0 10px 30px rgba(11, 16, 32, 0.2);
          position: relative;
          overflow: hidden;
        }
        .cert-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        .cert-subtitle {
          font-size: 9px;
          letter-spacing: 1px;
          color: #94A3B8;
          font-weight: 700;
        }
        .cert-id {
          font-size: 16px;
          font-weight: 800;
          margin: 2px 0 0;
          letter-spacing: -0.3px;
          font-family: var(--font-mono);
        }
        .cert-verified-badge {
          display: flex;
          align-items: center;
          gap: 4px;
          background: rgba(22, 163, 74, 0.2);
          border: 1px solid rgba(22, 163, 74, 0.4);
          color: #4ADE80;
          font-size: 11px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 20px;
        }

        .cert-meta {
          display: flex;
          gap: 24px;
          margin-top: 16px;
        }
        .meta-block {
          display: flex;
          flex-direction: column;
        }
        .meta-label {
          font-size: 9px;
          color: #64748B;
          letter-spacing: 0.5px;
          font-weight: 600;
        }
        .meta-val {
          font-size: 12px;
          font-weight: 600;
          margin-top: 2px;
        }
        .meta-val.highlight {
          color: #818CF8;
        }

        .cert-graphic-center {
          display: flex;
          justify-content: center;
          margin: 20px 0;
        }
        .shield-emblem-outer {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(79, 70, 229, 0.3) 0%, transparent 70%);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(129, 140, 248, 0.3);
        }

        .cert-signature-section {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 12px;
        }
        .sig-image {
          font-family: 'Brush Script MT', cursive, sans-serif;
          font-size: 20px;
          color: #C7D2FE;
        }
        .sig-title {
          font-size: 11px;
          font-weight: 700;
          color: #FFFFFF;
        }
        .sig-sub {
          font-size: 10px;
          color: #64748B;
        }

        /* Right Summary Panel */
        .summary-checklist-panel {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 14px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .summary-checklist-panel h3 {
          font-size: 16px;
          font-weight: 700;
          color: #0F172A;
          margin: 0 0 16px;
        }

        .checklist-items {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .checklist-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          background: #F8FAFC;
          border: 1px solid #F1F5F9;
          border-radius: 8px;
        }
        .row-label {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          font-weight: 600;
          color: #0F172A;
        }
        .row-status.green {
          font-size: 12px;
          font-weight: 600;
          color: #16A34A;
        }

        .risk-score-badge {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .risk-score-badge .score {
          font-weight: 700;
          font-size: 13px;
          color: #16A34A;
        }
        .risk-score-badge .level {
          font-size: 10px;
          background: #DCFCE7;
          color: #15803D;
          font-weight: 600;
          padding: 2px 6px;
          border-radius: 4px;
        }

        .compliance-footer-note {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: #166534;
          background: #F0FDF4;
          border: 1px solid #DCFCE7;
          padding: 12px;
          border-radius: 8px;
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
}
