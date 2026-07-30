"use client";

import EnterpriseSidebar from "@/components/sidebar";
import EnterpriseHeader from "@/components/header";
import { Plus, CheckCircle2, MoreHorizontal, ShieldCheck, Filter } from "lucide-react";

const policyList = [
  { id: 1, name: "Data Protection Policy", type: "PII", coverage: "98%", violations: 12, status: "Active" },
  { id: 2, name: "Secrets Protection Policy", type: "Secrets", coverage: "100%", violations: 8, status: "Active" },
  { id: 3, name: "Acceptable Use Policy", type: "Content", coverage: "95%", violations: 21, status: "Active" },
  { id: 4, name: "Financial Data Policy", type: "Financial", coverage: "97%", violations: 5, status: "Active" },
  { id: 5, name: "Model Usage Policy", type: "AI Models", coverage: "100%", violations: 0, status: "Active" },
];

export default function PoliciesPage() {
  return (
    <div className="policies-layout">
      <EnterpriseSidebar />
      <EnterpriseHeader title="Policies" showFilters={false} />

      <main className="main-content-area">
        {/* Top Controls Bar */}
        <div className="table-top-controls">
          <div className="search-filter-row">
            <input type="text" placeholder="Search policies..." className="table-search-input" />
            <button className="btn-filter-icon">
              <Filter size={14} />
              <span>Filters</span>
            </button>
          </div>

          <button className="btn-create-policy">
            <Plus size={14} />
            <span>New Policy</span>
          </button>
        </div>

        {/* Enterprise Table (Matching Reference Screen 6) */}
        <div className="table-card">
          <table className="enterprise-table">
            <thead>
              <tr>
                <th>Policy Name</th>
                <th>Type</th>
                <th>Coverage</th>
                <th>Violations (7D)</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {policyList.map((policy) => (
                <tr key={policy.id}>
                  <td className="policy-name-cell">{policy.name}</td>
                  <td><span className="type-badge">{policy.type}</span></td>
                  <td className="font-semibold">{policy.coverage}</td>
                  <td>
                    <span className={policy.violations > 10 ? "text-red-600 font-bold" : "text-slate-700"}>
                      {policy.violations}
                    </span>
                  </td>
                  <td>
                    <span className="status-active-badge">
                      <CheckCircle2 size={12} /> {policy.status}
                    </span>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <button className="btn-icon-more">
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <style jsx>{`
        .policies-layout {
          min-height: 100vh;
          background: #F8FAFC;
        }

        .table-top-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        .search-filter-row {
          display: flex;
          gap: 8px;
        }
        .table-search-input {
          width: 260px;
          padding: 8px 12px;
          border: 1px solid #E2E8F0;
          border-radius: 6px;
          font-size: 13px;
          outline: none;
        }
        .btn-filter-icon {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 6px;
          padding: 8px 12px;
          font-size: 12px;
          color: #475569;
          font-weight: 500;
          cursor: pointer;
        }
        .btn-create-policy {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #4F46E5;
          color: #FFFFFF;
          border: none;
          border-radius: 6px;
          padding: 8px 14px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
        }

        .table-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 10px;
          overflow: hidden;
        }

        .policy-name-cell {
          font-weight: 600;
          color: #0F172A;
        }
        .type-badge {
          background: #F1F5F9;
          color: #475569;
          font-size: 11px;
          font-weight: 600;
          padding: 2px 8px;
          border-radius: 4px;
        }
        .status-active-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          color: #16A34A;
          font-size: 12px;
          font-weight: 600;
          background: #F0FDF4;
          padding: 2px 8px;
          border-radius: 12px;
        }
        .btn-icon-more {
          background: none;
          border: none;
          color: #94A3B8;
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
        }
        .btn-icon-more:hover {
          background: #F1F5F9;
          color: #0F172A;
        }
      `}</style>
    </div>
  );
}
