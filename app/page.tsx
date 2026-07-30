"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield, ArrowRight, Lock, Eye, AlertTriangle, FileCheck, Zap,
  Building2, ChevronRight, HelpCircle, Award, Cpu, Globe2, Sparkles, Terminal,
  Activity, Menu, X, Play, CheckCircle2, ShieldAlert, BarChart3, Database
} from "lucide-react";

const bentoFeatures = [
  {
    icon: ShieldAlert,
    tag: "ATTACK PROTECTION",
    title: "Real-Time Prompt Analyzer",
    desc: "Blocks prompt injection, jailbreak attempts, system prompt extraction, and role override attacks before they reach the model.",
    span: "col-span-2",
    accent: "#6366F1"
  },
  {
    icon: Eye,
    tag: "DATA PRIVACY",
    title: "PII & Secret Redaction",
    desc: "Automatically detects and masks Aadhaar, PAN, credit cards, emails, and API keys (OpenAI, AWS, GitHub) in real time.",
    span: "col-span-1",
    accent: "#06B6D4"
  },
  {
    icon: FileCheck,
    tag: "AUDITABILITY",
    title: "AI Security Passport",
    desc: "Generates a tamper-proof digital certificate for every single AI interaction with latency, cost, and compliance metrics.",
    span: "col-span-1",
    accent: "#10B981"
  },
  {
    icon: BarChart3,
    tag: "GOVERNANCE METRICS",
    title: "Trust Score Engine",
    desc: "Calculates live scores across Security, Privacy, Compliance, and Confidence dimensions for enterprise-wide risk visibility.",
    span: "col-span-2",
    accent: "#8B5CF6"
  }
];

export default function LinearVercelLandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="landing-root">
      {/* Background Mesh Grid */}
      <div className="bg-grid-pattern" />
      <div className="glow-orb orb-1" />
      <div className="glow-orb orb-2" />

      {/* Top Header - Perfect Pixel Alignment */}
      <header className="navbar-header">
        <div className="navbar-container">
          <Link href="/" className="navbar-logo">
            <div className="logo-box">
              <Shield size={18} className="text-white" />
            </div>
            <span className="logo-title">Cypherdon <span className="logo-accent">One</span></span>
          </Link>

          <nav className="navbar-nav">
            <a href="#features">Features</a>
            <a href="#architecture">Architecture</a>
            <a href="#bento">Bento Grid</a>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/about">About HB Tech</Link>
          </nav>

          <div className="navbar-actions">
            <Link href="/dashboard" className="nav-btn-ghost">Sign In</Link>
            <Link href="/chat" className="nav-btn-primary">
              <span>Launch Workspace</span>
              <ArrowRight size={14} />
            </Link>
            <button className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mobile-dropdown"
            >
              <a href="#features" onClick={() => setMobileMenuOpen(false)}>Features</a>
              <a href="#architecture" onClick={() => setMobileMenuOpen(false)}>Architecture</a>
              <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>Executive Dashboard</Link>
              <Link href="/chat" onClick={() => setMobileMenuOpen(false)}>AI Secure Chat</Link>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content-wrapper">
          <div className="hero-text-block">
            <div className="pill-badge">
              <Sparkles size={13} className="text-indigo-400" />
              <span>Developed by HB Technologies • Powered by Konsole Harness</span>
            </div>

            <h1 className="hero-headline">
              Govern AI.<br />
              Protect What Matters.<br />
              <span className="gradient-text">Build With Confidence.</span>
            </h1>

            <p className="hero-subtitle">
              Cypherdon One provides real-time PII detection, secret scanning, prompt injection defense, and auditable Security Passports for every enterprise AI decision.
            </p>

            <div className="hero-actions">
              <Link href="/chat" className="btn-cta-main">
                <Play size={15} fill="currentColor" />
                <span>Try Interactive Chat</span>
              </Link>

              <Link href="/dashboard" className="btn-cta-secondary">
                <Activity size={15} />
                <span>Executive Dashboard</span>
              </Link>
            </div>
          </div>

          {/* Right Hero Visual: 3D Shield & Terminal Card */}
          <div className="hero-visual-card">
            <div className="visual-inner">
              <Image
                src="/hero_shield.png"
                alt="3D Security Shield"
                width={520}
                height={340}
                className="hero-image"
                priority
              />
              <div className="live-status-pill">
                <span className="pulse-dot" />
                <span>Konsole Security Harness Connected</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Feature Section */}
      <section id="bento" className="bento-section">
        <div className="section-title-wrap">
          <span className="section-kicker">CORE CAPABILITIES</span>
          <h2>Enterprise AI Governance Bento Grid</h2>
          <p>Four core engines working synchronously to inspect and audit every prompt.</p>
        </div>

        <div className="bento-grid">
          {bentoFeatures.map((feat) => {
            const Icon = feat.icon;
            return (
              <div key={feat.title} className={`bento-card ${feat.span}`}>
                <div className="card-tag" style={{ color: feat.accent }}>
                  <Icon size={14} />
                  <span>{feat.tag}</span>
                </div>
                <h3 className="card-title">{feat.title}</h3>
                <p className="card-desc">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Architecture Showcase */}
      <section id="architecture" className="arch-section">
        <div className="section-title-wrap">
          <span className="section-kicker">ZERO-KNOWLEDGE ARCHITECTURE</span>
          <h2>Konsole Security Harness Topology</h2>
          <p>Seamlessly proxying prompts through zero-knowledge encryption before reaching model endpoints.</p>
        </div>

        <div className="arch-card">
          <Image
            src="/harness_3d.png"
            alt="3D Harness Architecture"
            width={1000}
            height={420}
            className="arch-img"
          />
        </div>
      </section>

      {/* Dark CTA Banner */}
      <section className="cta-banner-section">
        <div className="cta-banner-card">
          <h2>Ready to Secure Your Enterprise AI Workflow?</h2>
          <p>Deploy Cypherdon One today and gain full control, compliance, and visibility.</p>
          <div className="banner-buttons">
            <Link href="/chat" className="btn-cta-main">
              <span>Launch Workspace</span>
              <ArrowRight size={16} />
            </Link>
            <Link href="/dashboard" className="btn-cta-secondary">
              <span>View Executive Dashboard</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Clean Structured 4-Column Corporate Footer */}
      <footer className="footer-container">
        <div className="footer-grid">
          <div className="footer-col-brand">
            <div className="brand-header">
              <div className="logo-box">
                <Shield size={16} className="text-white" />
              </div>
              <span className="brand-name">Cypherdon One</span>
            </div>
            <p className="brand-desc">
              Enterprise AI Governance Platform protecting organizational AI decisions.
            </p>
            <div className="hb-badge">
              <span>Developed & Maintained by <strong>HB Technologies</strong></span>
            </div>
          </div>

          <div className="footer-col">
            <span className="col-title">Platform</span>
            <Link href="/dashboard">Executive Dashboard</Link>
            <Link href="/chat">AI Secure Chat</Link>
            <Link href="/passport/SP-2026-07-30-6F3A">Security Passport</Link>
            <Link href="/governance">Policies Console</Link>
          </div>

          <div className="footer-col">
            <span className="col-title">Security & Intelligence</span>
            <Link href="/risk-intelligence">Risk Intelligence</Link>
            <Link href="/analytics">Analytics & Metrics</Link>
            <Link href="/integrations">Integrations</Link>
            <Link href="/settings">Settings</Link>
          </div>

          <div className="footer-col">
            <span className="col-title">Company & Hackathon</span>
            <Link href="/about">About HB Technologies</Link>
            <a href="https://konsole.one" target="_blank" rel="noreferrer">Konsole Harness Docs</a>
            <a href="https://github.com/HarshwardhanBhaskar" target="_blank" rel="noreferrer">GitHub Repository</a>
            <span className="license-tag">MIT License</span>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <span>© 2026 Cypherdon One by <strong>HB Technologies</strong>. All rights reserved.</span>
          <span>Built for Konsole by ClearTrust Hackathon 2026</span>
        </div>
      </footer>

      <style jsx>{`
        .landing-root {
          background: #0B1020;
          color: #FFFFFF;
          font-family: var(--font-sans);
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }

        .bg-grid-pattern {
          position: fixed;
          inset: 0;
          background-image: linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 32px 32px;
          pointer-events: none;
          z-index: 0;
        }
        .glow-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(140px);
          pointer-events: none;
        }
        .orb-1 { width: 500px; height: 500px; top: -100px; left: -100px; background: rgba(79, 70, 229, 0.15); }
        .orb-2 { width: 450px; height: 450px; top: 200px; right: -100px; background: rgba(6, 182, 212, 0.12); }

        /* Navbar Header */
        .navbar-header {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(11, 16, 32, 0.9);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .navbar-container {
          max-width: 1200px;
          margin: 0 auto;
          height: 64px;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .navbar-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }
        .logo-box {
          width: 32px;
          height: 32px;
          background: #4F46E5;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 12px rgba(79, 70, 229, 0.4);
        }
        .logo-title {
          font-weight: 800;
          font-size: 17px;
          color: #FFFFFF;
        }
        .logo-accent {
          color: #818CF8;
        }

        .navbar-nav {
          display: flex;
          align-items: center;
          gap: 28px;
        }
        .navbar-nav a {
          color: #94A3B8;
          font-size: 13px;
          font-weight: 500;
          text-decoration: none;
          transition: color 0.15s;
        }
        .navbar-nav a:hover {
          color: #FFFFFF;
        }

        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .nav-btn-ghost {
          color: #CBD5E1;
          font-size: 13px;
          font-weight: 500;
          text-decoration: none;
        }
        .nav-btn-primary {
          background: #4F46E5;
          color: #FFFFFF;
          font-size: 13px;
          font-weight: 600;
          padding: 8px 16px;
          border-radius: 6px;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .mobile-toggle {
          display: none;
          background: none;
          border: none;
          color: #FFFFFF;
        }
        .mobile-dropdown {
          background: #0F172A;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding: 16px 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .mobile-dropdown a {
          color: #CBD5E1;
          font-size: 14px;
          text-decoration: none;
        }

        /* Hero */
        .hero-section {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
          padding: 60px 24px;
        }
        .hero-content-wrapper {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 40px;
          align-items: center;
        }
        .pill-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(79, 70, 229, 0.15);
          border: 1px solid rgba(129, 140, 248, 0.3);
          border-radius: 20px;
          padding: 6px 14px;
          font-size: 12px;
          color: #C7D2FE;
          font-weight: 600;
          margin-bottom: 20px;
        }
        .hero-headline {
          font-size: 46px;
          font-weight: 900;
          line-height: 1.1;
          letter-spacing: -1px;
          margin-bottom: 16px;
        }
        .gradient-text {
          background: linear-gradient(135deg, #818CF8, #38BDF8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero-subtitle {
          font-size: 15px;
          color: #94A3B8;
          line-height: 1.6;
          margin-bottom: 28px;
          max-width: 500px;
        }

        .hero-actions {
          display: flex;
          gap: 12px;
        }
        .btn-cta-main {
          background: #4F46E5;
          color: #FFFFFF;
          font-size: 14px;
          font-weight: 700;
          padding: 12px 24px;
          border-radius: 8px;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .btn-cta-secondary {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #FFFFFF;
          font-size: 14px;
          font-weight: 600;
          padding: 12px 24px;
          border-radius: 8px;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* Hero Visual Card */
        .hero-visual-card {
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(129, 140, 248, 0.2);
          border-radius: 14px;
          padding: 14px;
        }
        .visual-inner {
          position: relative;
          border-radius: 10px;
          overflow: hidden;
        }
        .hero-image {
          width: 100%;
          height: auto;
          display: block;
        }
        .live-status-pill {
          position: absolute;
          bottom: 16px;
          left: 16px;
          right: 16px;
          background: rgba(15, 23, 42, 0.9);
          border: 1px solid rgba(34, 197, 94, 0.3);
          border-radius: 8px;
          padding: 8px 12px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 600;
          color: #4ADE80;
        }
        .pulse-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #22C55E;
          box-shadow: 0 0 8px #22C55E;
        }

        /* Bento Grid */
        .bento-section {
          max-width: 1200px;
          margin: 80px auto;
          padding: 0 24px;
        }
        .section-title-wrap {
          text-align: center;
          margin-bottom: 40px;
        }
        .section-kicker {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1px;
          color: #818CF8;
        }
        .section-title-wrap h2 {
          font-size: 32px;
          font-weight: 800;
          margin: 8px 0;
        }
        .section-title-wrap p {
          font-size: 14px;
          color: #94A3B8;
        }

        .bento-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .bento-card {
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 24px;
          transition: border-color 0.2s;
        }
        .bento-card:hover {
          border-color: rgba(99, 102, 241, 0.3);
        }
        .bento-card.col-span-2 { grid-column: span 2; }
        .bento-card.col-span-1 { grid-column: span 1; }

        .card-tag {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.5px;
          margin-bottom: 12px;
        }
        .card-title {
          font-size: 18px;
          font-weight: 700;
          color: #FFFFFF;
          margin-bottom: 8px;
        }
        .card-desc {
          font-size: 13px;
          color: #94A3B8;
          line-height: 1.5;
        }

        /* Arch */
        .arch-section {
          max-width: 1200px;
          margin: 80px auto;
          padding: 0 24px;
        }
        .arch-card {
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 20px;
        }
        .arch-img {
          width: 100%;
          height: auto;
          border-radius: 8px;
        }

        /* CTA Banner */
        .cta-banner-section {
          max-width: 1200px;
          margin: 80px auto;
          padding: 0 24px;
        }
        .cta-banner-card {
          background: linear-gradient(135deg, rgba(79, 70, 229, 0.2), rgba(6, 182, 212, 0.15));
          border: 1px solid rgba(129, 140, 248, 0.3);
          border-radius: 16px;
          padding: 48px;
          text-align: center;
        }
        .cta-banner-card h2 {
          font-size: 28px;
          font-weight: 800;
          margin-bottom: 10px;
        }
        .cta-banner-card p {
          font-size: 14px;
          color: #CBD5E1;
          margin-bottom: 24px;
        }
        .banner-buttons {
          display: flex;
          justify-content: center;
          gap: 14px;
        }

        /* Footer */
        .footer-container {
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          background: #070B18;
          padding: 48px 24px 24px;
          position: relative;
          z-index: 1;
        }
        .footer-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 32px;
          padding-bottom: 32px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }
        .brand-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 10px;
        }
        .brand-name {
          font-size: 16px;
          font-weight: 800;
          color: #FFFFFF;
        }
        .brand-desc {
          font-size: 12px;
          color: #94A3B8;
          line-height: 1.5;
          margin-bottom: 12px;
        }
        .hb-badge {
          display: inline-block;
          font-size: 11px;
          color: #818CF8;
          background: rgba(79, 70, 229, 0.15);
          padding: 4px 10px;
          border-radius: 6px;
        }

        .col-title {
          display: block;
          font-size: 12px;
          font-weight: 700;
          color: #FFFFFF;
          margin-bottom: 14px;
        }
        .footer-col {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .footer-col a {
          color: #94A3B8;
          font-size: 13px;
          text-decoration: none;
        }
        .footer-col a:hover {
          color: #FFFFFF;
        }
        .license-tag {
          font-size: 11px;
          color: #64748B;
        }

        .footer-bottom-bar {
          max-width: 1200px;
          margin: 20px auto 0;
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: #64748B;
        }

        @media (max-width: 900px) {
          .hero-content-wrapper { grid-template-columns: 1fr; }
          .navbar-nav { display: none; }
          .mobile-toggle { display: block; }
          .bento-grid { grid-template-columns: 1fr; }
          .bento-card.col-span-2 { grid-column: span 1; }
          .footer-grid { grid-template-columns: 1fr 1fr; }
          .footer-bottom-bar { flex-direction: column; gap: 8px; text-align: center; }
        }
      `}</style>
    </div>
  );
}
