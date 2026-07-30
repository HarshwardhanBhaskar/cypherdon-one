"use client";

// ============================================================
// Cypherdon One — Navbar
// Top navigation with branding and route links
// ============================================================

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield, LayoutDashboard, MessageSquare, ScrollText, Settings } from "lucide-react";

const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/chat", label: "Secure Chat", icon: MessageSquare },
  { href: "/governance", label: "Governance", icon: Settings },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link href="/" className="navbar-brand">
          <div className="brand-icon">
            <Shield size={22} />
          </div>
          <div className="brand-text">
            <span className="brand-name">Cypherdon</span>
            <span className="brand-suffix">One</span>
          </div>
        </Link>

        <div className="nav-links">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${isActive ? "active" : ""}`}
              >
                <Icon size={16} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="nav-right">
          <div className="api-status">
            <div className="status-dot" />
            <span>Konsole Connected</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          background: rgba(8, 10, 20, 0.85);
          backdrop-filter: blur(20px) saturate(180%);
          border-bottom: 1px solid rgba(99, 102, 241, 0.15);
        }
        .navbar-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 24px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }
        .brand-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: linear-gradient(135deg, #6366F1, #8B5CF6);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 0 20px rgba(99, 102, 241, 0.3);
        }
        .brand-text {
          display: flex;
          align-items: baseline;
          gap: 6px;
        }
        .brand-name {
          font-size: 20px;
          font-weight: 800;
          background: linear-gradient(135deg, #fff, #C7D2FE);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: -0.5px;
        }
        .brand-suffix {
          font-size: 14px;
          font-weight: 600;
          color: #6366F1;
          letter-spacing: 1px;
        }
        .nav-links {
          display: flex;
          gap: 4px;
        }
        .nav-link {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 500;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .nav-link:hover {
          color: rgba(255,255,255,0.9);
          background: rgba(255,255,255,0.05);
        }
        .nav-link.active {
          color: #fff;
          background: rgba(99, 102, 241, 0.15);
          border: 1px solid rgba(99, 102, 241, 0.3);
        }
        .nav-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .api-status {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.25);
          border-radius: 20px;
          font-size: 12px;
          color: #10B981;
          font-weight: 500;
        }
        .status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #10B981;
          box-shadow: 0 0 8px #10B981;
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }
          .api-status span {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
}
