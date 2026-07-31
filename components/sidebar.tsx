"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquare,
  FileCheck,
  ShieldAlert,
  Globe2,
  BarChart3,
  Blocks,
  Settings,
  Shield,
  ChevronDown,
  UserCheck
} from "lucide-react";

const navigationItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/chat", label: "AI Chat", icon: MessageSquare },
  { href: "/passport/SP-2026-07-30-6F3A", label: "Security Passport", icon: FileCheck },
  { href: "/governance", label: "Policies", icon: ShieldAlert },
  { href: "/risk-intelligence", label: "Risk Intelligence", icon: Globe2 },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/integrations", label: "Integrations", icon: Blocks },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function EnterpriseSidebar() {
  const pathname = usePathname();
  const isDarkTheme = pathname === "/chat";

  return (
    <aside className={`enterprise-sidebar ${isDarkTheme ? "dark-theme" : ""}`}>
      {/* Brand Header */}
      <div className="sidebar-brand">
        <div className="brand-logo-bg">
          <Shield size={18} className="text-white" />
        </div>
        <div className="brand-title">
          <span className="brand-name">Cypherdon</span>
          <span className="brand-badge">One</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="sidebar-nav">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href.startsWith("/passport") && pathname.startsWith("/passport"));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-item ${isActive ? "active" : ""}`}
            >
              <Icon size={16} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Profile Footer */}
      <div className="sidebar-footer">
        <div className="user-avatar">
          <UserCheck size={18} />
        </div>
        <div className="user-details">
          <div className="user-name">Harshwardhan B.</div>
          <div className="user-role">Security Admin</div>
        </div>
      </div>

      <style jsx>{`
        .enterprise-sidebar {
          width: 220px;
          height: 100vh;
          background: #FFFFFF;
          border-right: 1px solid #E2E8F0;
          display: flex;
          flex-direction: column;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 50;
          font-family: var(--font-sans);
          transition: background 0.2s, border-color 0.2s;
        }

        /* Dark Theme Variation (for AI Chat Workspace) */
        .enterprise-sidebar.dark-theme {
          background: #0B0F19;
          border-right: 1px solid rgba(255, 255, 255, 0.08);
        }
        .enterprise-sidebar.dark-theme .sidebar-brand {
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .enterprise-sidebar.dark-theme .brand-name {
          color: #FFFFFF;
        }
        .enterprise-sidebar.dark-theme .nav-item {
          color: #94A3B8;
        }
        .enterprise-sidebar.dark-theme .nav-item:hover {
          background: rgba(255, 255, 255, 0.05);
          color: #FFFFFF;
        }
        .enterprise-sidebar.dark-theme .nav-item.active {
          background: rgba(79, 70, 229, 0.25);
          color: #818CF8;
        }
        .enterprise-sidebar.dark-theme .sidebar-footer {
          background: #070A12;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }
        .enterprise-sidebar.dark-theme .user-name {
          color: #FFFFFF;
        }
        .enterprise-sidebar.dark-theme .user-role {
          color: #94A3B8;
        }

        .sidebar-brand {
          height: 60px;
          padding: 0 16px;
          display: flex;
          align-items: center;
          gap: 10px;
          border-bottom: 1px solid #F1F5F9;
        }
        .brand-logo-bg {
          width: 32px;
          height: 32px;
          background: #4F46E5;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 4px rgba(79, 70, 229, 0.2);
        }
        .brand-title {
          display: flex;
          align-items: baseline;
          gap: 4px;
        }
        .brand-name {
          font-weight: 700;
          font-size: 16px;
          color: #0F172A;
          letter-spacing: -0.3px;
        }
        .brand-badge {
          font-weight: 600;
          font-size: 13px;
          color: #4F46E5;
        }
        .sidebar-nav {
          flex: 1;
          padding: 16px 10px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .nav-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 500;
          color: #64748B;
          text-decoration: none;
          transition: all 0.15s ease;
        }
        .nav-item:hover {
          background: #F8FAFC;
          color: #0F172A;
        }
        .nav-item.active {
          background: #EEF2FF;
          color: #4F46E5;
          font-weight: 600;
        }
        .sidebar-footer {
          padding: 12px 16px;
          border-top: 1px solid #F1F5F9;
          display: flex;
          align-items: center;
          gap: 10px;
          background: #FAFAFA;
        }
        .user-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #E0E7FF;
          color: #4F46E5;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
        }
        .user-details {
          display: flex;
          flex-direction: column;
        }
        .user-name {
          font-size: 12px;
          font-weight: 600;
          color: #0F172A;
        }
        .user-role {
          font-size: 10px;
          color: #64748B;
        }
      `}</style>
    </aside>
  );
}
