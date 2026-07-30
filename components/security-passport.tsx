"use client";

// ============================================================
// Cypherdon One — Security Passport Component
// Certificate-style card showing full inspection results
// ============================================================

import { SecurityPassport } from "@/lib/types";
import TrustScoreDisplay from "./trust-score";

interface PassportProps {
  passport: SecurityPassport;
  compact?: boolean;
}

export default function SecurityPassportCard({ passport, compact = false }: PassportProps) {
  const riskColor = {
    low: "#10B981",
    medium: "#F59E0B",
    high: "#F97316",
    critical: "#EF4444",
  }[passport.promptRisk.level];

  const statusColor = {
    compliant: "#10B981",
    warning: "#F59E0B",
    violation: "#EF4444",
  }[passport.policyStatus];

  const statusIcon = {
    compliant: "✅",
    warning: "⚠️",
    violation: "❌",
  }[passport.policyStatus];

  return (
    <div className="passport-card">
      {/* Header */}
      <div className="passport-header">
        <div className="passport-badge">
          <span className="passport-shield">🛡️</span>
          <div>
            <div className="passport-title">AI Security Passport</div>
            <div className="passport-id">{passport.id}</div>
          </div>
        </div>
        <div className="passport-status" style={{ borderColor: statusColor, color: statusColor }}>
          {statusIcon} {passport.policyStatus.toUpperCase()}
        </div>
      </div>

      {/* Divider */}
      <div className="passport-divider" />

      {/* Quick Stats Row */}
      <div className="passport-stats">
        <div className="stat-item">
          <span className="stat-icon" style={{ color: riskColor }}>⚡</span>
          <div>
            <div className="stat-label">Risk Level</div>
            <div className="stat-value" style={{ color: riskColor }}>
              {passport.promptRisk.level.toUpperCase()} ({passport.promptRisk.overallScore}/100)
            </div>
          </div>
        </div>
        <div className="stat-item">
          <span className="stat-icon">🤖</span>
          <div>
            <div className="stat-label">Model</div>
            <div className="stat-value">{passport.modelUsed}</div>
          </div>
        </div>
        <div className="stat-item">
          <span className="stat-icon">💰</span>
          <div>
            <div className="stat-label">Cost</div>
            <div className="stat-value">₹{passport.cost.toFixed(4)}</div>
          </div>
        </div>
        <div className="stat-item">
          <span className="stat-icon">⏱️</span>
          <div>
            <div className="stat-label">Latency</div>
            <div className="stat-value">{passport.latency}ms</div>
          </div>
        </div>
      </div>

      {!compact && (
        <>
          {/* Trust Score Section */}
          <div className="passport-divider" />
          <div className="passport-section">
            <TrustScoreDisplay score={passport.trustScore} size="sm" />
          </div>

          {/* Findings */}
          {(passport.piiFound.length > 0 || passport.secretsFound.length > 0 || passport.threatsFound.length > 0) && (
            <>
              <div className="passport-divider" />
              <div className="passport-section">
                <div className="section-title">🔍 Findings</div>
                <div className="findings-grid">
                  {passport.piiFound.length > 0 && (
                    <div className="finding-group">
                      <div className="finding-label">👤 PII Detected ({passport.piiFound.length})</div>
                      {passport.piiFound.map((pii, i) => (
                        <div key={i} className="finding-item">
                          <span className="finding-type">{pii.type.replace(/_/g, " ")}</span>
                          <span className="finding-masked">{pii.maskedValue}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {passport.secretsFound.length > 0 && (
                    <div className="finding-group">
                      <div className="finding-label">🔑 Secrets Detected ({passport.secretsFound.length})</div>
                      {passport.secretsFound.map((secret, i) => (
                        <div key={i} className="finding-item finding-critical">
                          <span className="finding-type">{secret.type.replace(/_/g, " ")}</span>
                          <span className="finding-masked">{secret.maskedValue}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {passport.threatsFound.length > 0 && (
                    <div className="finding-group">
                      <div className="finding-label">🚨 Threats Detected ({passport.threatsFound.length})</div>
                      {passport.threatsFound.map((threat, i) => (
                        <div key={i} className="finding-item finding-threat">
                          <span className="finding-type">{threat.type.replace(/_/g, " ")}</span>
                          <span className="finding-confidence">
                            {threat.confidence}% confidence
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Policy Violations */}
          {passport.policyViolations.length > 0 && (
            <>
              <div className="passport-divider" />
              <div className="passport-section">
                <div className="section-title">📜 Policy Violations</div>
                {passport.policyViolations.map((v, i) => (
                  <div key={i} className="violation-item">⚠️ {v}</div>
                ))}
              </div>
            </>
          )}

          {/* Timestamp */}
          <div className="passport-divider" />
          <div className="passport-footer">
            <span>🕐 {new Date(passport.timestamp).toLocaleString()}</span>
            <span>Hash: {passport.originalPromptHash}</span>
          </div>
        </>
      )}

      <style jsx>{`
        .passport-card {
          background: linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.95));
          border: 1px solid rgba(99, 102, 241, 0.3);
          border-radius: 16px;
          padding: 20px;
          backdrop-filter: blur(20px);
          box-shadow: 0 0 30px rgba(99, 102, 241, 0.1), inset 0 1px 0 rgba(255,255,255,0.05);
          position: relative;
          overflow: hidden;
        }
        .passport-card::before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(99, 102, 241, 0.08), transparent);
          pointer-events: none;
        }
        .passport-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        .passport-badge {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .passport-shield {
          font-size: 28px;
        }
        .passport-title {
          font-size: 16px;
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.5px;
        }
        .passport-id {
          font-size: 11px;
          color: rgba(255,255,255,0.4);
          font-family: 'Courier New', monospace;
          margin-top: 2px;
        }
        .passport-status {
          font-size: 11px;
          font-weight: 700;
          padding: 4px 12px;
          border: 1px solid;
          border-radius: 20px;
          letter-spacing: 1px;
        }
        .passport-divider {
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(99, 102, 241, 0.3), transparent);
          margin: 14px 0;
        }
        .passport-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }
        .stat-item {
          display: flex;
          align-items: flex-start;
          gap: 8px;
        }
        .stat-icon {
          font-size: 18px;
          margin-top: 2px;
        }
        .stat-label {
          font-size: 10px;
          color: rgba(255,255,255,0.45);
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 600;
        }
        .stat-value {
          font-size: 13px;
          color: #fff;
          font-weight: 600;
          margin-top: 2px;
        }
        .passport-section {
          padding: 4px 0;
        }
        .section-title {
          font-size: 13px;
          font-weight: 700;
          color: rgba(255,255,255,0.8);
          margin-bottom: 10px;
        }
        .findings-grid {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .finding-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .finding-label {
          font-size: 12px;
          font-weight: 600;
          color: rgba(255,255,255,0.6);
        }
        .finding-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 6px 10px;
          background: rgba(255,255,255,0.04);
          border-radius: 8px;
          border-left: 3px solid #F59E0B;
        }
        .finding-critical {
          border-left-color: #EF4444;
        }
        .finding-threat {
          border-left-color: #EF4444;
          background: rgba(239, 68, 68, 0.08);
        }
        .finding-type {
          font-size: 12px;
          color: rgba(255,255,255,0.7);
          text-transform: capitalize;
          font-weight: 500;
        }
        .finding-masked {
          font-size: 11px;
          color: rgba(255,255,255,0.4);
          font-family: 'Courier New', monospace;
        }
        .finding-confidence {
          font-size: 11px;
          color: #EF4444;
          font-weight: 600;
        }
        .violation-item {
          font-size: 12px;
          color: rgba(255,255,255,0.7);
          padding: 6px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .passport-footer {
          display: flex;
          justify-content: space-between;
          font-size: 10px;
          color: rgba(255,255,255,0.3);
          font-family: 'Courier New', monospace;
        }

        @media (max-width: 640px) {
          .passport-stats {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </div>
  );
}
