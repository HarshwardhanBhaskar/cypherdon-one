"use client";

import { useState } from "react";
import EnterpriseSidebar from "@/components/sidebar";
import EnterpriseHeader from "@/components/header";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("General");
  const [orgName, setOrgName] = useState("Acme Corporation");
  const [defaultModel, setDefaultModel] = useState("Gemini 2.5 Flash");
  const [retention, setRetention] = useState("30 Days");
  const [timezone, setTimezone] = useState("(UTC+05:30) Asia/Kolkata");

  const [toggles, setToggles] = useState({
    requireApproval: true,
    blockSecrets: true,
    blockPII: true,
    realtimeScan: true,
    auditLogging: true,
  });

  const handleToggle = (key: keyof typeof toggles) => {
    setToggles({ ...toggles, [key]: !toggles[key] });
  };

  return (
    <div className="settings-layout">
      <EnterpriseSidebar />
      <EnterpriseHeader title="Settings" showFilters={false} />

      <main className="main-content-area">
        {/* Settings Tabs (Matching Reference Screen 9) */}
        <div className="settings-tabs-row">
          {["General", "Members", "Roles", "Notifications", "API Keys", "Audit Logs"].map((tab) => (
            <button
              key={tab}
              className={`tab-btn ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Form & Security Controls Split */}
        <div className="settings-split-grid">
          {/* Left Form Panel */}
          <div className="settings-panel">
            <div className="form-group">
              <label className="form-label">Organization Name</label>
              <input
                type="text"
                className="form-control"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Default AI Model</label>
              <select
                className="form-control"
                value={defaultModel}
                onChange={(e) => setDefaultModel(e.target.value)}
              >
                <option value="Gemini 2.5 Flash">Gemini 2.5 Flash</option>
                <option value="DeepSeek V4 Flash">DeepSeek V4 Flash</option>
                <option value="Qwen 3.5 Flash">Qwen 3.5 Flash</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Data Retention</label>
              <select
                className="form-control"
                value={retention}
                onChange={(e) => setRetention(e.target.value)}
              >
                <option value="30 Days">30 Days</option>
                <option value="60 Days">60 Days</option>
                <option value="90 Days">90 Days</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Time Zone</label>
              <input
                type="text"
                className="form-control"
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
              />
            </div>

            <button className="btn-save-changes">Save Changes</button>
          </div>

          {/* Right Security Controls Toggles Panel */}
          <div className="settings-panel">
            <h3 className="panel-title">Security</h3>

            <div className="toggle-rows-list">
              <div className="toggle-row">
                <div className="toggle-info">
                  <div className="toggle-name">Require Approval for High Risk</div>
                  <div className="toggle-sub">Always require approval</div>
                </div>
                <button
                  className={`toggle-switch ${toggles.requireApproval ? "on" : ""}`}
                  onClick={() => handleToggle("requireApproval")}
                >
                  <span className="switch-handle"></span>
                </button>
              </div>

              <div className="toggle-row">
                <div className="toggle-info">
                  <div className="toggle-name">Block Secrets</div>
                  <div className="toggle-sub">Block secret patterns in real-time</div>
                </div>
                <button
                  className={`toggle-switch ${toggles.blockSecrets ? "on" : ""}`}
                  onClick={() => handleToggle("blockSecrets")}
                >
                  <span className="switch-handle"></span>
                </button>
              </div>

              <div className="toggle-row">
                <div className="toggle-info">
                  <div className="toggle-name">Block PII</div>
                  <div className="toggle-sub">Block PII data in real-time</div>
                </div>
                <button
                  className={`toggle-switch ${toggles.blockPII ? "on" : ""}`}
                  onClick={() => handleToggle("blockPII")}
                >
                  <span className="switch-handle"></span>
                </button>
              </div>

              <div className="toggle-row">
                <div className="toggle-info">
                  <div className="toggle-name">Enable Real-Time Scanning</div>
                  <div className="toggle-sub">Scan every interaction in real-time</div>
                </div>
                <button
                  className={`toggle-switch ${toggles.realtimeScan ? "on" : ""}`}
                  onClick={() => handleToggle("realtimeScan")}
                >
                  <span className="switch-handle"></span>
                </button>
              </div>

              <div className="toggle-row">
                <div className="toggle-info">
                  <div className="toggle-name">Audit Logging</div>
                  <div className="toggle-sub">Log all interactions</div>
                </div>
                <button
                  className={`toggle-switch ${toggles.auditLogging ? "on" : ""}`}
                  onClick={() => handleToggle("auditLogging")}
                >
                  <span className="switch-handle"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        .settings-layout {
          min-height: 100vh;
          background: #F8FAFC;
        }

        .settings-tabs-row {
          display: flex;
          gap: 20px;
          border-bottom: 1px solid #E2E8F0;
          margin-bottom: 20px;
        }
        .tab-btn {
          background: none;
          border: none;
          padding: 8px 4px;
          font-size: 13px;
          font-weight: 500;
          color: #64748B;
          cursor: pointer;
          border-bottom: 2px solid transparent;
        }
        .tab-btn.active {
          color: #4F46E5;
          font-weight: 600;
          border-bottom-color: #4F46E5;
        }

        .settings-split-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .settings-panel {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 10px;
          padding: 20px;
        }
        .panel-title {
          font-size: 15px;
          font-weight: 700;
          color: #0F172A;
          margin: 0 0 16px;
        }

        .form-group {
          margin-bottom: 16px;
        }
        .form-label {
          display: block;
          font-size: 12px;
          font-weight: 600;
          color: #0F172A;
          margin-bottom: 6px;
        }
        .form-control {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid #CBD5E1;
          border-radius: 6px;
          font-size: 13px;
          outline: none;
          color: #0F172A;
        }
        .btn-save-changes {
          background: #4F46E5;
          color: #FFFFFF;
          border: none;
          border-radius: 6px;
          padding: 8px 16px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          margin-top: 8px;
        }

        .toggle-rows-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .toggle-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .toggle-name {
          font-size: 13px;
          font-weight: 600;
          color: #0F172A;
        }
        .toggle-sub {
          font-size: 11px;
          color: #64748B;
        }

        .toggle-switch {
          width: 38px;
          height: 20px;
          background: #CBD5E1;
          border-radius: 10px;
          border: none;
          position: relative;
          cursor: pointer;
          transition: background 0.2s;
        }
        .toggle-switch.on {
          background: #4F46E5;
        }
        .switch-handle {
          width: 16px;
          height: 16px;
          background: #FFFFFF;
          border-radius: 50%;
          position: absolute;
          top: 2px;
          left: 2px;
          transition: transform 0.2s;
        }
        .toggle-switch.on .switch-handle {
          transform: translateX(18px);
        }
      `}</style>
    </div>
  );
}
