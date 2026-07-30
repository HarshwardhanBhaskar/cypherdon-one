"use client";

import EnterpriseSidebar from "@/components/sidebar";
import EnterpriseHeader from "@/components/header";
import { TrendingUp, TrendingDown, Clock, ShieldCheck, ShieldAlert } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Tooltip, XAxis, YAxis } from "recharts";

const analyticsBarData = [
  { date: "Jul 01", safe: 500, risk: 40 },
  { date: "Jul 05", safe: 620, risk: 50 },
  { date: "Jul 08", safe: 580, risk: 30 },
  { date: "Jul 12", safe: 750, risk: 65 },
  { date: "Jul 15", safe: 680, risk: 45 },
  { date: "Jul 20", safe: 920, risk: 70 },
  { date: "Jul 25", safe: 880, risk: 60 },
  { date: "Jul 30", safe: 960, risk: 80 },
];

const threatDistData = [
  { name: "Prompt Injection", value: 32, color: "#4F46E5" },
  { name: "PII Leakage", value: 28, color: "#06B6D4" },
  { name: "Toxic Content", value: 20, color: "#EC4899" },
  { name: "Secrets Exposure", value: 12, color: "#F59E0B" },
  { name: "Other", value: 8, color: "#94A3B8" },
];

export default function AnalyticsPage() {
  return (
    <div className="analytics-layout">
      <EnterpriseSidebar />
      <EnterpriseHeader title="Analytics" showFilters={true} />

      <main className="main-content-area">
        {/* Stat Cards Row (Matching Reference Screen 7) */}
        <div className="analytics-stats-grid">
          <div className="stat-card">
            <span className="stat-label">Total Interactions</span>
            <div className="stat-row">
              <span className="stat-num">24,531</span>
              <span className="stat-badge positive"><TrendingUp size={12} /> 18.6%</span>
            </div>
          </div>

          <div className="stat-card">
            <span className="stat-label">Safe Interactions</span>
            <div className="stat-row">
              <span className="stat-num">22,689</span>
              <span className="pct-sub">92.5%</span>
            </div>
          </div>

          <div className="stat-card">
            <span className="stat-label">High Risk Interactions</span>
            <div className="stat-row">
              <span className="stat-num text-red-600">1,842</span>
              <span className="pct-sub text-red-500">7.5%</span>
            </div>
          </div>

          <div className="stat-card">
            <span className="stat-label">Avg. Response Time</span>
            <div className="stat-row">
              <span className="stat-num">421ms</span>
              <span className="stat-badge positive"><TrendingUp size={12} /> 8.2%</span>
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
                <BarChart data={analyticsBarData}>
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
                    <Pie data={threatDistData} innerRadius={45} outerRadius={70} dataKey="value">
                      {threatDistData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="donut-center-text">
                  <span className="center-num">1,842</span>
                  <span className="center-lbl">Total</span>
                </div>
              </div>

              <div className="threat-legend-list">
                {threatDistData.map((item) => (
                  <div key={item.name} className="legend-row">
                    <span className="dot" style={{ background: item.color }}></span>
                    <span className="name">{item.name}</span>
                    <span className="val">{item.value}%</span>
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
