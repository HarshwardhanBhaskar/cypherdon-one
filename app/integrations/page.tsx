"use client";

import EnterpriseSidebar from "@/components/sidebar";
import EnterpriseHeader from "@/components/header";
import { CheckCircle2, ArrowRight } from "lucide-react";

const integrationsList = [
  { id: "slack", name: "Slack", desc: "Alerts and notifications", status: "Connected", icon: "💬" },
  { id: "teams", name: "Microsoft Teams", desc: "Real-time collaboration", status: "Connected", icon: "👥" },
  { id: "jira", name: "Jira", desc: "Create tickets", status: "Connect", icon: "📋" },
  { id: "datadog", name: "Datadog", desc: "Metrics and logs", status: "Connect", icon: "📊" },
  { id: "splunk", name: "Splunk", desc: "Security events", status: "Connect", icon: "⚡" },
  { id: "okta", name: "Okta", desc: "SSO and user mgmt", status: "Connected", icon: "🔒" },
  { id: "aws", name: "AWS", desc: "Cloud security", status: "Connect", icon: "☁️" },
  { id: "azure", name: "Azure", desc: "Cloud security", status: "Connect", icon: "🔷" },
];

export default function IntegrationsPage() {
  return (
    <div className="integrations-layout">
      <EnterpriseSidebar />
      <EnterpriseHeader title="Integrations" showFilters={false} />

      <main className="main-content-area">
        <div className="section-subtitle-bar">
          Connect Cypherdon One with your enterprise stack.
        </div>

        {/* Connectors Grid (Matching Reference Screen 8) */}
        <div className="integrations-grid">
          {integrationsList.map((item) => (
            <div key={item.id} className="integration-card">
              <div className="card-top">
                <span className="integration-icon">{item.icon}</span>
                <div className="integration-info">
                  <h4 className="integration-name">{item.name}</h4>
                  <p className="integration-desc">{item.desc}</p>
                </div>
              </div>

              <div className="card-bottom">
                {item.status === "Connected" ? (
                  <span className="badge-connected">
                    <CheckCircle2 size={12} /> Connected
                  </span>
                ) : (
                  <button className="btn-connect">Connect</button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="view-all-row">
          <button className="btn-view-all">
            <span>View all integrations</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </main>

      <style jsx>{`
        .integrations-layout {
          min-height: 100vh;
          background: #F8FAFC;
        }
        .section-subtitle-bar {
          font-size: 13px;
          color: #64748B;
          margin-bottom: 20px;
        }

        .integrations-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 24px;
        }
        .integration-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 10px;
          padding: 18px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 130px;
        }
        .card-top {
          display: flex;
          gap: 12px;
        }
        .integration-icon {
          font-size: 24px;
        }
        .integration-name {
          font-size: 14px;
          font-weight: 700;
          color: #0F172A;
          margin: 0 0 4px;
        }
        .integration-desc {
          font-size: 11px;
          color: #64748B;
          margin: 0;
        }
        .card-bottom {
          display: flex;
          justify-content: flex-start;
        }
        .badge-connected {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          font-weight: 600;
          color: #16A34A;
          background: #F0FDF4;
          padding: 3px 8px;
          border-radius: 12px;
        }
        .btn-connect {
          background: #FFFFFF;
          border: 1px solid #CBD5E1;
          border-radius: 6px;
          padding: 4px 12px;
          font-size: 12px;
          font-weight: 600;
          color: #475569;
          cursor: pointer;
        }

        .view-all-row {
          display: flex;
          justify-content: center;
        }
        .btn-view-all {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 6px;
          padding: 8px 16px;
          font-size: 13px;
          font-weight: 600;
          color: #0F172A;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
