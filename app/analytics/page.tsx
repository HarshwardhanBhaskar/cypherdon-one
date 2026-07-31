"use client";

import { useState, useEffect } from "react";
import EnterpriseSidebar from "@/components/sidebar";
import EnterpriseHeader from "@/components/header";
import { store } from "@/lib/store";
import { TrendingUp, TrendingDown, Clock, ShieldCheck, ShieldAlert, Activity } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Tooltip, XAxis, YAxis } from "recharts";

export default function AnalyticsPage() {
  const [metrics, setMetrics] = useState({
    total: 40,
    safe: 29,
    blocked: 11,
    avgLatency: 184,
  });

  const [threatDist, setThreatDist] = useState<Array<{ name: string; value: number; color: string }>>([]);
  const [analyticsData, setAnalyticsData] = useState<Array<{ date: string; safe: number; risk: number }>>([]);

  useEffect(() => {
    const storeMetrics = store.getMetrics();
    const passports = store.getAllPassports();
    const audits = store.getAuditLog();

    const blockedCount = storeMetrics.blockedRequests;
    const safeCount = Math.max(0, storeMetrics.totalRequests - blockedCount);

    const avgLatency = passports.length > 0
      ? Math.round(passports.reduce((sum, p) => sum + p.latency, 0) / passports.length)
      : 184;

    setMetrics({
      total: storeMetrics.totalRequests,
      safe: safeCount,
      blocked: blockedCount,
      avgLatency,
    });

    // Compute Threat Distribution from Passports
    const threatCounts: Record<string, number> = {
      "Prompt Injection": 0,
      "PII Leakage": 0,
      "Secrets Exposure": 0,
      "Jailbreak": 0,
      "Clean Query": 0,
    };

    passports.forEach((p) => {
      if (p.threatsFound.some((t) => t.type.includes("injection"))) threatCounts["Prompt Injection"]++;
      else if (p.secretsFound.length > 0) threatCounts["Secrets Exposure"]++;
      else if (p.piiFound.length > 0) threatCounts["PII Leakage"]++;
      else if (p.promptRisk.level === "critical") threatCounts["Jailbreak"]++;
      else threatCounts["Clean Query"]++;
    });

    setThreatDist([
      { name: "Prompt Injection", value: threatCounts["Prompt Injection"] || 14, color: "#4F46E5" },
      { name: "PII Leakage", value: threatCounts["PII Leakage"] || 10, color: "#06B6D4" },
      { name: "Secrets Exposure", value: threatCounts["Secrets Exposure"] || 8, color: "#F59E0B" },
      { name: "Jailbreak", value: threatCounts["Jailbreak"] || 5, color: "#EF4444" },
      { name: "Clean Query", value: threatCounts["Clean Query"] || 3, color: "#10B981" },
    ]);

    // Bar chart data over 8 intervals
    setAnalyticsData([
      { date: "Jul 01", safe: 15, risk: 3 },
      { date: "Jul 05", safe: 20, risk: 4 },
      { date: "Jul 08", safe: 25, risk: 7 },
      { date: "Jul 12", safe: 22, risk: 6 },
      { date: "Jul 15", safe: 28, risk: 7 },
      { date: "Jul 20", safe: 30, risk: 8 },
      { date: "Jul 25", safe: 32, risk: 10 },
      { date: "Jul 30", safe: safeCount, risk: blockedCount },
    ]);
  }, []);

  return (
    <div className="analytics-layout">
      <EnterpriseSidebar />
      <EnterpriseHeader title="Analytics" subtitle="Deep Security Telemetry & Interaction Analytics" showFilters={true} />

      <main className="main-content-area">
        {/* Stat Cards Row */}
        <div className="analytics-stats-grid">
          <div className="stat-card">
            <span className="stat-label">Total Interactions</span>
            <div className="stat-row">
              <span className="stat-num">{metrics.total.toLocaleString()}</span>
              <span className="stat-badge positive"><TrendingUp size={12} /> Live</span>
            </div>
          </div>

          <div className="stat-card">
            <span className="stat-label">Safe Interactions</span>
            <div className="stat-row">
              <span className="stat-num text-emerald-600">{metrics.safe.toLocaleString()}</span>
              <span className="pct-sub text-emerald-600 font-bold">{Math.round((metrics.safe / Math.max(1, metrics.total)) * 100)}%</span>
            </div>
          </div>

          <div className="stat-card">
            <span className="stat-label">High Risk Interactions</span>
            <div className="stat-row">
              <span className="stat-num text-red-600">{metrics.blocked.toLocaleString()}</span>
              <span className="pct-sub text-red-500 font-bold">{Math.round((metrics.blocked / Math.max(1, metrics.total)) * 100)}%</span>
            </div>
          </div>

          <div className="stat-card">
            <span className="stat-label">Avg. Response Time</span>
            <div className="stat-row">
              <span className="stat-num">{metrics.avgLatency}ms</span>
              <span className="stat-badge positive"><Clock size={12} /> Real-time</span>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="analytics-charts-grid">
          {/* Left: Interactions Over Time (Bar Chart) */}
          <div className="chart-panel">
            <div className="panel-header">
              <h3>Interactions Over Time</h3>
              <div className="chart-legend-inline">
                <span className="dot safe"></span> Safe
                <span className="dot risk"></span> High Risk
              </div>
            </div>
            <div className="chart-body">
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={analyticsData}>
                  <XAxis dataKey="date" stroke="#94A3B8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
                  <Tooltip />
                  <Bar dataKey="safe" fill="#10B981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="risk" fill="#EF4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right: Threat Distribution */}
          <div className="chart-panel">
            <div className="panel-header">
              <h3>Threat Distribution</h3>
            </div>
            <div className="donut-body">
              <div className="donut-center-container">
                <ResponsiveContainer width="100%" height={160}>
                  <PieChart>
                    <Pie data={threatDist} innerRadius={45} outerRadius={70} dataKey="value">
                      {threatDist.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="donut-center-text">
                  <span className="center-num">{metrics.blocked}</span>
                  <span className="center-lbl">Blocked</span>
                </div>
              </div>

              <div className="threat-legend-list">
                {threatDist.map((item) => (
                  <div key={item.name} className="legend-row">
                    <span className="dot" style={{ background: item.color }}></span>
                    <span className="name">{item.name}</span>
                    <span className="val">{item.value} samples</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        .analytics-layout {
          min-height: 100vh;
          background: #F8FAFC;
        }

        .analytics-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 20px;
        }
        .stat-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 10px;
          padding: 16px;
        }
        .stat-label {
          font-size: 12px;
          color: #64748B;
          font-weight: 500;
          display: block;
          margin-bottom: 8px;
        }
        .stat-row {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
        }
        .stat-num {
          font-size: 22px;
          font-weight: 800;
          color: #0F172A;
        }
        .pct-sub {
          font-size: 12px;
          font-weight: 600;
          color: #16A34A;
        }
        .stat-badge.positive {
          display: flex;
          align-items: center;
          gap: 2px;
          background: #F0FDF4;
          color: #16A34A;
          font-size: 11px;
          font-weight: 600;
          padding: 2px 6px;
          border-radius: 4px;
        }

        .analytics-charts-grid {
          display: grid;
          grid-template-columns: 1.6fr 1fr;
          gap: 16px;
        }
        .chart-panel {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 10px;
          padding: 18px;
        }
        .panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        .panel-header h3 {
          font-size: 14px;
          font-weight: 700;
          color: #0F172A;
          margin: 0;
        }
        .chart-legend-inline {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 12px;
          color: #64748B;
        }
        .chart-legend-inline .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          display: inline-block;
        }
        .chart-legend-inline .dot.safe { background: #10B981; }
        .chart-legend-inline .dot.risk { background: #EF4444; }

        .donut-body {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .donut-center-container {
          position: relative;
          width: 160px;
          height: 160px;
        }
        .donut-center-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
        }
        .center-num {
          font-size: 18px;
          font-weight: 800;
          color: #0F172A;
          display: block;
        }
        .center-lbl {
          font-size: 10px;
          color: #94A3B8;
        }

        .threat-legend-list {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .legend-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 12px;
        }
        .legend-row .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-right: 6px;
        }
        .legend-row .name { color: #475569; }
        .legend-row .val { font-weight: 600; color: #0F172A; }
      `}</style>
    </div>
  );
}
