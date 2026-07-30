"use client";

import { useState } from "react";
import EnterpriseSidebar from "@/components/sidebar";
import EnterpriseHeader from "@/components/header";
import {
  Shield, AlertTriangle, Eye, Lock, DollarSign, Activity, TrendingUp, TrendingDown
} from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell, Tooltip, XAxis, YAxis
} from "recharts";

const dailyData = [
  { date: "Jul 01", count: 420 },
  { date: "Jul 05", count: 580 },
  { date: "Jul 08", count: 490 },
  { date: "Jul 12", count: 720 },
  { date: "Jul 15", count: 650 },
  { date: "Jul 20", count: 890 },
  { date: "Jul 22", count: 810 },
  { date: "Jul 30", count: 940 },
];

const riskCategoryData = [
  { name: "Prompt Injection", value: 32, color: "#4F46E5" },
  { name: "PII Leakage", value: 28, color: "#06B6D4" },
  { name: "Secrets Exposure", value: 20, color: "#F59E0B" },
  { name: "Toxic Content", value: 12, color: "#EC4899" },
  { name: "Other", value: 8, color: "#94A3B8" },
];

export default function DashboardOverviewPage() {
  return (
    <div className="dashboard-layout">
      <EnterpriseSidebar />
      <EnterpriseHeader title="Overview" showFilters={true} />

      <main className="main-content-area">
        {/* Top Health Score & Summary Row (Matching Reference Screen 2) */}
        <div className="overview-top-row">
          {/* Health Score Card */}
          <div className="health-score-card">
            <div className="card-header-sm">AI Health Score</div>
            <div className="gauge-wrapper">
              <div className="gauge-circle">
                <span className="gauge-number">97</span>
                <span className="gauge-label">Excellent</span>
              </div>
            </div>
            <div className="gauge-footer">
              <TrendingUp size={14} className="text-emerald-600" />
              <span>+ 12% vs last 30 days</span>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="metrics-cards-grid">
            <div className="stat-card">
              <span className="stat-title">Total Interactions</span>
              <div className="stat-value-row">
                <span className="stat-number">24,531</span>
                <span className="stat-badge positive"><TrendingUp size={12} /> 18.6%</span>
              </div>
            </div>

            <div className="stat-card">
              <span className="stat-title">Blocked</span>
              <div className="stat-value-row">
                <span className="stat-number">1,842</span>
                <span className="stat-badge negative"><TrendingDown size={12} /> 6.4%</span>
              </div>
            </div>

            <div className="stat-card">
              <span className="stat-title">PII Detected</span>
              <div className="stat-value-row">
                <span className="stat-number">2,734</span>
                <span className="stat-badge positive"><TrendingUp size={12} /> 9.3%</span>
              </div>
            </div>

            <div className="stat-card">
              <span className="stat-title">Secrets Detected</span>
              <div className="stat-value-row">
                <span className="stat-number">312</span>
                <span className="stat-badge negative"><TrendingDown size={12} /> 2.1%</span>
              </div>
            </div>

            <div className="stat-card">
              <span className="stat-title">Money Saved</span>
              <div className="stat-value-row">
                <span className="stat-number">₹1,28,450</span>
                <span className="stat-badge positive"><TrendingUp size={12} /> 22.4%</span>
              </div>
            </div>

            <div className="stat-card">
              <span className="stat-title">Avg. Risk Score</span>
              <div className="stat-value-row">
                <span className="stat-number">18<span className="stat-denom">/100</span></span>
                <span className="risk-level-tag">Low Risk</span>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="overview-charts-row">
          {/* Left: Interactions Over Time */}
          <div className="chart-panel">
            <div className="panel-header">
              <h3>Interactions Over Time</h3>
              <span className="timeframe-lbl">Last 30 Days</span>
            </div>
            <div className="chart-body">
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={dailyData}>
                  <defs>
                    <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" stroke="#94A3B8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
                  <Tooltip />
                  <Area type="monotone" dataKey="count" stroke="#4F46E5" strokeWidth={2} fill="url(#purpleGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right: Top Risk Categories */}
          <div className="chart-panel">
            <div className="panel-header">
              <h3>Top Risk Categories</h3>
            </div>
            <div className="pie-chart-body">
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={riskCategoryData} innerRadius={45} outerRadius={70} dataKey="value">
                    {riskCategoryData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              <div className="pie-legend">
                {riskCategoryData.map((item) => (
                  <div key={item.name} className="legend-item">
                    <div className="legend-left">
                      <span className="legend-dot" style={{ background: item.color }}></span>
                      <span className="legend-name">{item.name}</span>
                    </div>
                    <span className="legend-val">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        .dashboard-layout {
          min-height: 100vh;
          background: #F8FAFC;
        }

        /* Top Row */
        .overview-top-row {
          display: grid;
          grid-template-columns: 220px 1fr;
          gap: 16px;
          margin-bottom: 20px;
        }

        .health-score-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 10px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
        }
        .card-header-sm {
          font-size: 13px;
          font-weight: 600;
          color: #0F172A;
          align-self: flex-start;
        }
        .gauge-wrapper {
          margin: 12px 0;
        }
        .gauge-circle {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          border: 6px solid #16A34A;
          border-top-color: #DCFCE7;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .gauge-number {
          font-size: 26px;
          font-weight: 800;
          color: #0F172A;
          line-height: 1;
        }
        .gauge-label {
          font-size: 10px;
          font-weight: 600;
          color: #16A34A;
          margin-top: 2px;
        }
        .gauge-footer {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          color: #16A34A;
          font-weight: 600;
        }

        /* Metrics Cards Grid */
        .metrics-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        .stat-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 10px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .stat-title {
          font-size: 12px;
          color: #64748B;
          font-weight: 500;
          margin-bottom: 8px;
        }
        .stat-value-row {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
        }
        .stat-number {
          font-size: 22px;
          font-weight: 800;
          color: #0F172A;
          letter-spacing: -0.5px;
        }
        .stat-denom {
          font-size: 12px;
          color: #94A3B8;
          font-weight: 500;
        }
        .stat-badge {
          display: flex;
          align-items: center;
          gap: 2px;
          font-size: 11px;
          font-weight: 600;
          padding: 2px 6px;
          border-radius: 4px;
        }
        .stat-badge.positive {
          background: #F0FDF4;
          color: #16A34A;
        }
        .stat-badge.negative {
          background: #FEF2F2;
          color: #DC2626;
        }
        .risk-level-tag {
          font-size: 11px;
          font-weight: 600;
          background: #F0FDF4;
          color: #16A34A;
          padding: 2px 8px;
          border-radius: 4px;
        }

        /* Charts Row */
        .overview-charts-row {
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
        .timeframe-lbl {
          font-size: 11px;
          color: #94A3B8;
        }

        .pie-chart-body {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .pie-legend {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .legend-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 12px;
        }
        .legend-left {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .legend-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
        .legend-name {
          color: #475569;
        }
        .legend-val {
          font-weight: 600;
          color: #0F172A;
        }
      `}</style>
    </div>
  );
}
