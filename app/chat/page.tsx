"use client";

import { useState } from "react";
import EnterpriseSidebar from "@/components/sidebar";
import EnterpriseHeader from "@/components/header";
import {
  Search, Plus, Shield, Eye, Lock, AlertTriangle, Send, CheckCircle2, RefreshCw
} from "lucide-react";

export default function SecureChatPage() {
  const [conversations] = useState([
    { id: "1", title: "Q2 Financial Summary", time: "Today", active: true },
    { id: "2", title: "API Key Exposure Check", time: "Today", active: false },
    { id: "3", title: "Employee Data Analysis", time: "Yesterday", active: false },
    { id: "4", title: "Marketing Campaign Plan", time: "3d ago", active: false },
    { id: "5", title: "Code Review Assistant", time: "5d ago", active: false },
  ]);

  const [input, setInput] = useState(
    "Analyze the following data and give me insights:\nEmail: john.doe@acme.com\nPhone: +1 234 567 8910\nAadhaar: 1234 5678 9012\nAPI Key: sk-proj-abc123def456ghi789"
  );

  return (
    <div className="chat-layout">
      <EnterpriseSidebar />
      <EnterpriseHeader title="AI Secure Chat" showFilters={false} />

      <main className="chat-content-grid">
        {/* Left Sub-Sidebar: Conversations List (Matching Reference Screen 3) */}
        <div className="chat-threads-sidebar">
          <button className="btn-new-chat">
            <Plus size={14} />
            <span>New Chat</span>
          </button>

          <div className="chat-search">
            <Search size={14} className="search-icon" />
            <input type="text" placeholder="Search conversations..." className="search-input" />
          </div>

          <div className="threads-list">
            {conversations.map((thread) => (
              <div
                key={thread.id}
                className={`thread-item ${thread.active ? "active" : ""}`}
              >
                <div className="thread-title">{thread.title}</div>
                <div className="thread-time">{thread.time}</div>
              </div>
            ))}
          </div>

          <div className="view-all-link">View all conversations</div>
        </div>

        {/* Middle: Chat Workspace Stream */}
        <div className="chat-stream-panel">
          <div className="chat-messages-container">
            <div className="msg-box user">
              <div className="msg-role-lbl">You</div>
              <div className="msg-body">{input}</div>
            </div>

            <div className="msg-box assistant">
              <div className="msg-role-lbl">
                <span>Cypherdon AI (Gemini 2.5 Flash)</span>
              </div>
              <div className="msg-body">
                The prompt contains personal information (Email, Phone, Aadhaar) and an active API Key credential. The Cypherdon One Governance Engine has masked the credentials before model inference.
                <br /><br />
                <strong>Sanitized Output:</strong><br />
                The financial & data request has been processed securely. Sensitive credentials have been redacted to ensure compliance with Data Protection Policy.
              </div>
            </div>
          </div>

          {/* Prompt Input Row */}
          <div className="chat-input-bar">
            <textarea
              className="chat-textarea"
              rows={2}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
            />
            <button className="btn-send">
              <Send size={15} />
            </button>
          </div>
        </div>

        {/* Right Panel: Live Security Inspector (Matching Reference Screen 3) */}
        <div className="security-inspector-panel">
          <div className="inspector-header">
            <Shield size={16} className="text-indigo-600" />
            <span>Cypherdon One Scan</span>
          </div>

          <div className="scan-details-grid">
            <div className="scan-detail-card danger">
              <div className="detail-header">
                <Eye size={14} className="text-red-500" />
                <span>PII Detected</span>
              </div>
              <div className="detail-tags">
                <span className="tag">Email</span>
                <span className="tag">Phone</span>
                <span className="tag">Aadhaar</span>
              </div>
            </div>

            <div className="scan-detail-card danger">
              <div className="detail-header">
                <Lock size={14} className="text-red-500" />
                <span>Secrets Detected</span>
              </div>
              <div className="detail-tags">
                <span className="tag warning">API Key</span>
              </div>
            </div>

            <div className="scan-detail-card">
              <div className="detail-header">
                <AlertTriangle size={14} className="text-amber-500" />
                <span>Risk Score</span>
              </div>
              <div className="risk-score-display">
                <span className="score-number">18</span>
                <span className="score-total">/100</span>
                <span className="score-badge-low">Low Risk</span>
              </div>
            </div>

            <div className="scan-detail-card">
              <div className="detail-header">
                <CheckCircle2 size={14} className="text-emerald-500" />
                <span>Policy</span>
              </div>
              <div className="policy-name-lbl">Data Protection Policy</div>
            </div>
          </div>

          <div className="ai-response-summary">
            <h4>AI Response (Gemini 2.5 Flash)</h4>
            <p>The data contains personal information and API credentials. Please remove or mask the sensitive fields.</p>
          </div>
        </div>
      </main>

      <style jsx>{`
        .chat-layout {
          min-height: 100vh;
          background: #F8FAFC;
        }

        .chat-content-grid {
          margin-left: 220px;
          display: grid;
          grid-template-columns: 240px 1fr 280px;
          height: calc(100vh - 60px);
          background: #FFFFFF;
        }

        /* Sub Sidebar */
        .chat-threads-sidebar {
          border-right: 1px solid #E2E8F0;
          padding: 16px 12px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          background: #FAFAFA;
        }
        .btn-new-chat {
          width: 100%;
          background: #4F46E5;
          color: #FFFFFF;
          border: none;
          border-radius: 6px;
          padding: 8px 12px;
          font-size: 13px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          cursor: pointer;
        }
        .chat-search {
          position: relative;
        }
        .search-icon {
          position: absolute;
          left: 10px;
          top: 9px;
          color: #94A3B8;
        }
        .search-input {
          width: 100%;
          padding: 6px 10px 6px 30px;
          border-radius: 6px;
          border: 1px solid #E2E8F0;
          font-size: 12px;
          outline: none;
        }
        .threads-list {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
          overflow-y: auto;
        }
        .thread-item {
          padding: 8px 10px;
          border-radius: 6px;
          cursor: pointer;
        }
        .thread-item:hover {
          background: #F1F5F9;
        }
        .thread-item.active {
          background: #EEF2FF;
        }
        .thread-title {
          font-size: 12px;
          font-weight: 600;
          color: #0F172A;
        }
        .thread-time {
          font-size: 10px;
          color: #94A3B8;
          margin-top: 2px;
        }
        .view-all-link {
          font-size: 11px;
          color: #4F46E5;
          font-weight: 500;
          cursor: pointer;
          text-align: center;
        }

        /* Middle Stream */
        .chat-stream-panel {
          display: flex;
          flex-direction: column;
          border-right: 1px solid #E2E8F0;
          padding: 20px;
          justify-content: space-between;
        }
        .chat-messages-container {
          display: flex;
          flex-direction: column;
          gap: 16px;
          overflow-y: auto;
        }
        .msg-box {
          padding: 12px 16px;
          border-radius: 8px;
          font-size: 13px;
          line-height: 1.5;
        }
        .msg-box.user {
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          color: #0F172A;
          font-family: var(--font-mono);
        }
        .msg-box.assistant {
          background: #EEF2FF;
          border: 1px solid #C7D2FE;
          color: #1E1B4B;
        }
        .msg-role-lbl {
          font-size: 11px;
          font-weight: 700;
          margin-bottom: 6px;
          color: #4F46E5;
        }

        .chat-input-bar {
          display: flex;
          gap: 8px;
          margin-top: 16px;
        }
        .chat-textarea {
          flex: 1;
          border: 1px solid #E2E8F0;
          border-radius: 6px;
          padding: 8px 12px;
          font-size: 13px;
          font-family: inherit;
          outline: none;
          resize: none;
        }
        .btn-send {
          width: 38px;
          height: 38px;
          background: #4F46E5;
          color: #FFFFFF;
          border: none;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          align-self: flex-end;
        }

        /* Right Inspector */
        .security-inspector-panel {
          padding: 16px;
          background: #FAFAFA;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .inspector-header {
          display: flex;
          align-items: center;
          gap: 6px;
          font-weight: 700;
          font-size: 14px;
          color: #0F172A;
          padding-bottom: 10px;
          border-bottom: 1px solid #E2E8F0;
        }
        .scan-details-grid {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .scan-detail-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 8px;
          padding: 10px 12px;
        }
        .scan-detail-card.danger {
          border-color: #FECACA;
          background: #FEF2F2;
        }
        .detail-header {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 600;
          color: #0F172A;
          margin-bottom: 6px;
        }
        .detail-tags {
          display: flex;
          gap: 4px;
          flex-wrap: wrap;
        }
        .tag {
          font-size: 10px;
          font-weight: 600;
          background: #FEE2E2;
          color: #991B1B;
          padding: 2px 6px;
          border-radius: 4px;
        }
        .tag.warning {
          background: #FEF3C7;
          color: #92400E;
        }
        .risk-score-display {
          display: flex;
          align-items: baseline;
          gap: 4px;
        }
        .score-number {
          font-size: 18px;
          font-weight: 800;
          color: #16A34A;
        }
        .score-total {
          font-size: 11px;
          color: #94A3B8;
        }
        .score-badge-low {
          font-size: 10px;
          background: #DCFCE7;
          color: #166534;
          font-weight: 600;
          padding: 1px 6px;
          border-radius: 4px;
          margin-left: auto;
        }
        .policy-name-lbl {
          font-size: 12px;
          font-weight: 600;
          color: #4F46E5;
        }
        .ai-response-summary {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 8px;
          padding: 12px;
        }
        .ai-response-summary h4 {
          font-size: 12px;
          font-weight: 700;
          margin: 0 0 6px;
          color: #0F172A;
        }
        .ai-response-summary p {
          font-size: 11px;
          color: #64748B;
          margin: 0;
          line-height: 1.4;
        }
      `}</style>
    </div>
  );
}
