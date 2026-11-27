"use client";

import React from "react";

interface BotanicalFlowerAccentProps {
  className?: string;
  size?: number;
}

export function BotanicalFlowerAccent({
  className = "",
  size = 140,
}: BotanicalFlowerAccentProps) {
  const segments = [0, 45, 90, 135, 180, 225, 270, 315];

  return (
    <div
      className={`pointer-events-none select-none ${className}`}
      style={size ? { width: `${size}px`, height: `${size}px` } : undefined}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <radialGradient id="wholePomeloGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#E6E58B" />
            <stop offset="55%" stopColor="#9AB856" />
            <stop offset="100%" stopColor="#5E7D34" />
          </radialGradient>
          <linearGradient id="pomeloLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8EB459" />
            <stop offset="100%" stopColor="#486530" />
          </linearGradient>
          <radialGradient id="rubySegmentGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F28D7D" />
            <stop offset="100%" stopColor="#D95344" />
          </radialGradient>
        </defs>

        {/* Botanical Citrus Leaves */}
        <g opacity="0.92">
          <path
            d="M52 62 C26 42, 16 18, 36 14 C56 10, 68 38, 52 62 Z"
            fill="url(#pomeloLeafGrad)"
          />
          <path
            d="M52 62 Q 40 36, 36 16"
            stroke="#FAF8F3"
            strokeWidth="0.9"
            strokeLinecap="round"
            opacity="0.55"
          />
          <path
            d="M72 56 C76 26, 98 12, 114 24 C130 36, 102 62, 72 56 Z"
            fill="#789650"
          />
          <path
            d="M72 56 Q 94 38, 112 25"
            stroke="#FAF8F3"
            strokeWidth="0.8"
            strokeLinecap="round"
            opacity="0.5"
          />
        </g>

        {/* Whole Sun-Ripened Pomelo Fruit */}
        <g>
          <circle cx="62" cy="86" r="36" fill="url(#wholePomeloGrad)" />
          <circle cx="52" cy="72" r="1.2" fill="#FAF8F3" opacity="0.4" />
          <circle cx="44" cy="82" r="1" fill="#FAF8F3" opacity="0.35" />
          <circle cx="58" cy="64" r="1" fill="#FAF8F3" opacity="0.35" />
        </g>

        {/* Halved Ruby Pomelo Slice (8 Symmetrical Segments) */}
        <g>
          {/* Outer Citrus Rind */}
          <circle cx="102" cy="108" r="38" fill="#7BA23F" />
          {/* Soft Ivory Pith */}
          <circle cx="102" cy="108" r="33.5" fill="#FAF8F3" />
          {/* 8 Symmetrical Radial Ruby Pulp Wedges */}
          <g>
            {segments.map((angle) => (
              <path
                key={angle}
                d="M 102 104 L 92 78 A 28 28 0 0 1 112 78 Z"
                fill="url(#rubySegmentGrad)"
                transform={`rotate(${angle} 102 108)`}
                opacity="0.94"
              />
            ))}
          </g>
          {/* Central Pith Core */}
          <circle cx="102" cy="108" r="4.5" fill="#FAF8F3" />
        </g>
      </svg>
    </div>
  );
}
