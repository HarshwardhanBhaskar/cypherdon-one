"use client";

// ============================================================
// Cypherdon One — Trust Score Component
// Animated radial gauges showing Security, Privacy, Compliance, Confidence
// ============================================================

import { useEffect, useState } from "react";
import { TrustScore } from "@/lib/types";

interface TrustScoreProps {
  score: TrustScore;
  size?: "sm" | "md" | "lg";
  animate?: boolean;
}

export default function TrustScoreDisplay({ score, size = "md", animate = true }: TrustScoreProps) {
  const [animatedScore, setAnimatedScore] = useState(animate ? 0 : score.overall);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!animate) return;

    const duration = 1500;
    const steps = 60;
    const increment = score.overall / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= score.overall) {
        setAnimatedScore(score.overall);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.round(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [score.overall, animate]);

  const dimensions = { sm: 80, md: 120, lg: 160 };
  const dim = dimensions[size];
  const strokeWidth = size === "sm" ? 6 : size === "md" ? 8 : 10;
  const radius = (dim - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const getColor = (value: number) => {
    if (value >= 80) return "#10B981";
    if (value >= 50) return "#F59E0B";
    return "#EF4444";
  };

  const subScores = [
    { label: "Security", value: score.security, icon: "🛡️" },
    { label: "Privacy", value: score.privacy, icon: "🔒" },
    { label: "Compliance", value: score.compliance, icon: "📋" },
    { label: "Confidence", value: score.confidence, icon: "✅" },
  ];

  if (!mounted) return null;

  return (
    <div className="trust-score-container">
      {/* Main Score Gauge */}
      <div className="main-gauge">
        <svg width={dim} height={dim} viewBox={`0 0 ${dim} ${dim}`}>
          {/* Background circle */}
          <circle
            cx={dim / 2}
            cy={dim / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={strokeWidth}
          />
          {/* Score arc */}
          <circle
            cx={dim / 2}
            cy={dim / 2}
            r={radius}
            fill="none"
            stroke={getColor(animatedScore)}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (circumference * animatedScore) / 100}
            transform={`rotate(-90 ${dim / 2} ${dim / 2})`}
            style={{ transition: "stroke-dashoffset 1.5s ease-out, stroke 0.5s ease" }}
          />
          {/* Glow effect */}
          <circle
            cx={dim / 2}
            cy={dim / 2}
            r={radius}
            fill="none"
            stroke={getColor(animatedScore)}
            strokeWidth={strokeWidth + 4}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (circumference * animatedScore) / 100}
            transform={`rotate(-90 ${dim / 2} ${dim / 2})`}
            opacity={0.15}
            style={{ transition: "stroke-dashoffset 1.5s ease-out" }}
          />
        </svg>
        <div className="gauge-label">
          <span className="gauge-value" style={{ color: getColor(animatedScore) }}>
            {animatedScore}
          </span>
          <span className="gauge-unit">%</span>
        </div>
        <div className="gauge-title">Trust Score</div>
      </div>

      {/* Sub Scores */}
      <div className="sub-scores">
        {subScores.map((sub) => (
          <div key={sub.label} className="sub-score-item">
            <div className="sub-score-header">
              <span className="sub-score-icon">{sub.icon}</span>
              <span className="sub-score-label">{sub.label}</span>
            </div>
            <div className="sub-score-bar-bg">
              <div
                className="sub-score-bar-fill"
                style={{
                  width: `${sub.value}%`,
                  backgroundColor: getColor(sub.value),
                  transition: "width 1.5s ease-out",
                }}
              />
            </div>
            <span className="sub-score-value" style={{ color: getColor(sub.value) }}>
              {sub.value}%
            </span>
          </div>
        ))}
      </div>

      <style jsx>{`
        .trust-score-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }
        .main-gauge {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .gauge-label {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          align-items: baseline;
          gap: 2px;
        }
        .gauge-value {
          font-size: ${size === "lg" ? "36px" : size === "md" ? "28px" : "20px"};
          font-weight: 800;
          font-family: 'Inter', sans-serif;
        }
        .gauge-unit {
          font-size: ${size === "lg" ? "16px" : "12px"};
          color: rgba(255,255,255,0.5);
          font-weight: 600;
        }
        .gauge-title {
          margin-top: 8px;
          font-size: 12px;
          color: rgba(255,255,255,0.6);
          text-transform: uppercase;
          letter-spacing: 1.5px;
          font-weight: 600;
        }
        .sub-scores {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .sub-score-item {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .sub-score-header {
          display: flex;
          align-items: center;
          gap: 6px;
          min-width: 110px;
        }
        .sub-score-icon {
          font-size: 14px;
        }
        .sub-score-label {
          font-size: 13px;
          color: rgba(255,255,255,0.7);
          font-weight: 500;
        }
        .sub-score-bar-bg {
          flex: 1;
          height: 6px;
          background: rgba(255,255,255,0.08);
          border-radius: 3px;
          overflow: hidden;
        }
        .sub-score-bar-fill {
          height: 100%;
          border-radius: 3px;
        }
        .sub-score-value {
          font-size: 13px;
          font-weight: 700;
          min-width: 40px;
          text-align: right;
        }
      `}</style>
    </div>
  );
}
