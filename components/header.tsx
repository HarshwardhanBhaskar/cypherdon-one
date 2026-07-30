"use client";

import { Search, SlidersHorizontal, Bell, HelpCircle } from "lucide-react";

interface HeaderProps {
  title: string;
  subtitle?: string;
  showFilters?: boolean;
}

export default function EnterpriseHeader({ title, subtitle, showFilters = true }: HeaderProps) {
  return (
    <header className="enterprise-header">
      <div className="header-title-section">
        <h1 className="page-title">{title}</h1>
        {subtitle && <span className="page-subtitle">{subtitle}</span>}
      </div>

      <div className="header-actions">
        {/* Live Status Indicator */}
        <div className="live-status">
          <span className="live-dot"></span>
          <span className="live-text">Live</span>
        </div>

        {/* Date / Filter Button */}
        {showFilters && (
          <div className="filter-pill">
            <span className="date-range">Jul 01 – Jul 30, 2026</span>
            <button className="filter-btn">
              <SlidersHorizontal size={13} />
              <span>Filter</span>
            </button>
          </div>
        )}

        <button className="icon-btn" title="Notifications">
          <Bell size={15} />
        </button>
        <button className="icon-btn" title="Help & Docs">
          <HelpCircle size={15} />
        </button>
      </div>

      <style jsx>{`
        .enterprise-header {
          height: 60px;
          background: #FFFFFF;
          border-bottom: 1px solid #E2E8F0;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 40;
          margin-left: 220px;
        }
        .header-title-section {
          display: flex;
          align-items: baseline;
          gap: 12px;
        }
        .page-title {
          font-size: 18px;
          font-weight: 700;
          color: #0F172A;
          margin: 0;
          letter-spacing: -0.3px;
        }
        .page-subtitle {
          font-size: 12px;
          color: #64748B;
        }
        .header-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .live-status {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          background: #F0FDF4;
          border: 1px solid #DCFCE7;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
          color: #16A34A;
        }
        .live-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #16A34A;
          box-shadow: 0 0 6px #16A34A;
        }
        .filter-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 6px;
          padding: 4px 8px;
          font-size: 12px;
          color: #475569;
        }
        .date-range {
          font-weight: 500;
          padding-right: 4px;
          border-right: 1px solid #CBD5E1;
        }
        .filter-btn {
          display: flex;
          align-items: center;
          gap: 4px;
          background: none;
          border: none;
          color: #475569;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
        }
        .icon-btn {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          border: 1px solid #E2E8F0;
          background: #FFFFFF;
          color: #64748B;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .icon-btn:hover {
          background: #F8FAFC;
          color: #0F172A;
        }
      `}</style>
    </header>
  );
}
