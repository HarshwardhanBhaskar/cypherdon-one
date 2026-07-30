"use client";

// ============================================================
// Cypherdon One — Model Selector Component
// Dropdown for choosing AI model with cost/speed info
// ============================================================

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Zap, DollarSign, Shield } from "lucide-react";
import { AVAILABLE_MODELS } from "@/lib/konsole";

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (modelId: string) => void;
}

export default function ModelSelector({ selectedModel, onModelChange }: ModelSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = AVAILABLE_MODELS.find((m) => m.id === selectedModel) || AVAILABLE_MODELS[0];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="model-selector" ref={ref}>
      <button className="selector-trigger" onClick={() => setIsOpen(!isOpen)}>
        <span className="model-icon">{selected.icon}</span>
        <div className="model-info">
          <span className="model-name">{selected.name}</span>
          <span className="model-provider">{selected.provider}</span>
        </div>
        <ChevronDown size={16} className={`chevron ${isOpen ? "rotated" : ""}`} />
      </button>

      {isOpen && (
        <div className="selector-dropdown">
          {AVAILABLE_MODELS.map((model) => (
            <button
              key={model.id}
              className={`model-option ${model.id === selectedModel ? "selected" : ""}`}
              onClick={() => {
                onModelChange(model.id);
                setIsOpen(false);
              }}
            >
              <span className="option-icon">{model.icon}</span>
              <div className="option-info">
                <span className="option-name">{model.name}</span>
                <div className="option-meta">
                  <span className="meta-item">
                    <Zap size={10} />
                    {model.speedRating}
                  </span>
                  <span className="meta-item">
                    <DollarSign size={10} />
                    ₹{model.costPer1kTokens}/1k
                  </span>
                  <span className="meta-item">
                    <Shield size={10} />
                    {model.safetyRating}%
                  </span>
                </div>
              </div>
              {model.id === selectedModel && <span className="check">✓</span>}
            </button>
          ))}
        </div>
      )}

      <style jsx>{`
        .model-selector {
          position: relative;
        }
        .selector-trigger {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 14px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          color: #fff;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: inherit;
        }
        .selector-trigger:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(99, 102, 241, 0.4);
        }
        .model-icon {
          font-size: 18px;
        }
        .model-info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .model-name {
          font-size: 13px;
          font-weight: 600;
        }
        .model-provider {
          font-size: 10px;
          color: rgba(255,255,255,0.4);
        }
        .chevron {
          color: rgba(255,255,255,0.4);
          transition: transform 0.2s ease;
        }
        .chevron.rotated {
          transform: rotate(180deg);
        }
        .selector-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          width: 300px;
          background: rgba(15, 23, 42, 0.98);
          border: 1px solid rgba(99, 102, 241, 0.25);
          border-radius: 14px;
          padding: 6px;
          z-index: 50;
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
          backdrop-filter: blur(20px);
          max-height: 400px;
          overflow-y: auto;
        }
        .model-option {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 10px 12px;
          background: transparent;
          border: none;
          border-radius: 10px;
          color: #fff;
          cursor: pointer;
          transition: all 0.15s ease;
          font-family: inherit;
          text-align: left;
        }
        .model-option:hover {
          background: rgba(99, 102, 241, 0.1);
        }
        .model-option.selected {
          background: rgba(99, 102, 241, 0.15);
          border: 1px solid rgba(99, 102, 241, 0.3);
        }
        .option-icon {
          font-size: 20px;
          width: 30px;
          text-align: center;
        }
        .option-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .option-name {
          font-size: 13px;
          font-weight: 600;
        }
        .option-meta {
          display: flex;
          gap: 10px;
        }
        .meta-item {
          display: flex;
          align-items: center;
          gap: 3px;
          font-size: 10px;
          color: rgba(255,255,255,0.4);
        }
        .check {
          color: #6366F1;
          font-weight: 700;
          font-size: 16px;
        }
      `}</style>
    </div>
  );
}
