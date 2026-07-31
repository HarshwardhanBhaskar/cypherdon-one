"use client";

import { useState, useEffect } from "react";
import EnterpriseSidebar from "@/components/sidebar";
import EnterpriseHeader from "@/components/header";
import { store } from "@/lib/store";
import {
  Globe2, AlertTriangle, ShieldAlert, ArrowUpRight, Flame, MapPin
} from "lucide-react";

export default function RiskIntelligencePage() {
  const [topRisks, setTopRisks] = useState<Array<{ id: number; title: string; category: string; score: number; time: string }>>([]);
  const [latestCritical, setLatestCritical] = useState<string>("OpenAI Key sk-proj-**** intercepted in prompt scan");

  useEffect(() => {
    const audits = store.getAuditLog();
    const passports = store.getAllPassports();

    // Map audits to top risk feed
    const mapped = audits.slice(0, 6).map((item, idx) => ({
      id: idx + 1,
      title: item.action,
      category: item.action.includes("PII")
        ? "PII Leakage"
        : item.action.includes("Secret")
        ? "Secrets Exposure"
        : item.action.includes("Injection")
        ? "Prompt Injection"
        : "Policy Violation",
      score: item.riskScore,
      time: `${idx * 12 + 5}m ago`,
    }));

    setTopRisks(mapped);

    // Get latest critical event
    const criticalPassport = passports.find((p) => p.promptRisk.level === "critical" || p.secretsFound.length > 0);
    if (criticalPassport && criticalPassport.secretsFound.length > 0) {
      setLatestCritical(`Credential ${criticalPassport.secretsFound[0].maskedValue} intercepted in prompt scan`);
    }
  }, []);

  return (
    <div className="risk-layout">
      <EnterpriseSidebar />
      <EnterpriseHeader title="Risk Intelligence" subtitle="Global AI Threat Surface & Behavioral Intelligence" showFilters={true} />

      <main className="main-content-area">
        {/* Map & Risks Split Grid */}
        <div className="risk-grid-container">
          {/* Left: Global Heatmap Container */}
          <div className="heatmap-card">
            <div className="card-header">
              <h3>Risk Heatmap</h3>
              <div className="legend-pills">
                <span className="pill-low">Low</span>
                <span className="gradient-bar"></span>
                <span className="pill-high">High</span>
              </div>
            </div>

            {/* Stylized World Map SVG Vector */}
            <div className="map-vector-wrapper">
              <svg viewBox="0 0 800 400" className="world-svg">
                <path fill="#E2E8F0" d="M150,120 Q200,80 250,130 Q300,100 350,150 Q320,220 250,230 Q180,240 150,120 Z" />
                <path fill="#CBD5E1" d="M450,100 Q550,60 650,110 Q700,180 620,240 Q500,260 450,100 Z" />
                <path fill="#E2E8F0" d="M250,280 Q300,260 320,340 Q280,380 240,320 Z" />

                {/* Heatmap Nodes */}
                <circle cx="230" cy="160" r="28" fill="#4F46E5" opacity="0.35" />
                <circle cx="230" cy="160" r="10" fill="#4F46E5" />

                <circle cx="580" cy="150" r="35" fill="#4F46E5" opacity="0.45" />
                <circle cx="580" cy="150" r="14" fill="#4F46E5" />

                <circle cx="640" cy="190" r="20" fill="#818CF8" opacity="0.4" />
                <circle cx="640" cy="190" r="8" fill="#818CF8" />
              </svg>
            </div>
          </div>

          {/* Right: Top Risk Interactions Feed */}
          <div className="top-risks-card">
            <div className="card-header">
              <h3>Top Risk Interactions (Live Audit Stream)</h3>
            </div>

            <div className="risks-feed">
              {topRisks.map((item) => (
                <div key={item.id} className="risk-feed-item">
                  <div className="item-rank">{item.id}</div>
                  <div className="item-info">
                    <div className="item-title">{item.title}</div>
                    <div className="item-sub">
                      <span>{item.category}</span>
                      <span className="dot">•</span>
                      <span>Risk Score {item.score}</span>
                    </div>
                  </div>
                  <span className="item-time">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Banner: Recent Critical Events */}
        <div className="critical-events-banner">
          <div className="event-left">
            <span className="event-label">Recent Critical Threat Interception</span>
            <div className="event-content">
              <AlertTriangle size={14} className="text-red-500" />
              <span>{latestCritical}</span>
            </div>
          </div>
          <div className="event-right">
            <span className="high-risk-badge">High-Risk</span>
            <span className="event-time">Real-time</span>
          </div>
        </div>
      </main>

      <style jsx>{`
        .risk-layout {
          min-height: 100vh;
          background: #F8FAFC;
        }

        .risk-grid-container {
          display: grid;
          grid-template-columns: 1.6fr 1fr;
          gap: 16px;
          margin-bottom: 16px;
        }

        .heatmap-card, .top-risks-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 10px;
          padding: 18px;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        .card-header h3 {
          font-size: 14px;
          font-weight: 700;
          color: #0F172A;
          margin: 0;
        }

        .legend-pills {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          color: #94A3B8;
        }
        .gradient-bar {
          width: 60px;
          height: 6px;
          border-radius: 3px;
          background: linear-gradient(to right, #EEF2FF, #4F46E5);
        }

        .map-vector-wrapper {
          height: 320px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .world-svg {
          width: 100%;
          height: 100%;
        }

        /* Feed */
        .risks-feed {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .risk-feed-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          background: #F8FAFC;
          border: 1px solid #F1F5F9;
          border-radius: 8px;
        }
        .item-rank {
          width: 22px;
          height: 22px;
          background: #DC2626;
          color: #FFFFFF;
          border-radius: 50%;
          font-weight: 700;
          font-size: 11px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .item-info {
          flex: 1;
        }
        .item-title {
          font-size: 13px;
          font-weight: 600;
          color: #0F172A;
        }
        .item-sub {
          font-size: 11px;
          color: #64748B;
          display: flex;
          align-items: center;
          gap: 4px;
          margin-top: 2px;
        }
        .item-time {
          font-size: 11px;
          color: #94A3B8;
        }

        /* Banner */
        .critical-events-banner {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 10px;
          padding: 14px 18px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .event-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .event-label {
          font-size: 12px;
          font-weight: 700;
          color: #0F172A;
        }
        .event-content {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: #DC2626;
          font-weight: 500;
        }
        .event-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .high-risk-badge {
          background: #FEF2F2;
          color: #DC2626;
          font-size: 11px;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 4px;
        }
        .event-time {
          font-size: 11px;
          color: #94A3B8;
        }
      `}</style>
    </div>
  );
}
