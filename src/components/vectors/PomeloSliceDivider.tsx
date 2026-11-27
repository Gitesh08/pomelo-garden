"use client";

import React from "react";

interface PomeloSliceDividerProps {
  className?: string;
}

export const PomeloSliceDivider: React.FC<PomeloSliceDividerProps> = ({ className = "" }) => {
  // 8 symmetrical radial carpel segments around center (32, 32)
  const segmentAngles = [0, 45, 90, 135, 180, 225, 270, 315];

  return (
    <div className={`w-full flex items-center justify-center py-6 select-none ${className}`}>
      <div className="flex items-center gap-2 sm:gap-4 max-w-2xl w-full px-4">
        {/* Left Dashed Line & Botanical Citrus Leaf Sprig */}
        <div className="flex-1 flex items-center">
          <div className="h-[1px] w-full border-t border-dashed border-[#8B8258]/30"></div>
          
          {/* Left Botanical Sprig: Handcrafted organic citrus branch with delicate veins */}
          <div className="w-10 h-7 sm:w-12 sm:h-8 shrink-0 flex items-center justify-center">
            <svg
              viewBox="0 0 44 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="divLeafGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8EA966" />
                  <stop offset="50%" stopColor="#6C894D" />
                  <stop offset="100%" stopColor="#4F6838" />
                </linearGradient>
                <linearGradient id="divLeafGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#A8BE88" />
                  <stop offset="100%" stopColor="#789358" />
                </linearGradient>
              </defs>

              {/* Natural curved organic stem tapering into the dashed line */}
              <path
                d="M1 14 C12 14, 22 13.5, 36 9"
                stroke="#6B5E43"
                strokeWidth="1.2"
                strokeLinecap="round"
                opacity="0.8"
              />

              {/* Main Botanical Citrus Leaf Blade */}
              <path
                d="M12 14 C13 7, 26 4, 38 8 C33 16, 20 18, 12 14 Z"
                fill="url(#divLeafGrad1)"
                stroke="#3D4E2C"
                strokeWidth="0.8"
              />

              {/* Delicate Curved Central Leaf Midrib Spine */}
              <path
                d="M13 14 C22 11.5, 30 9.5, 37 8"
                stroke="#E8EED9"
                strokeWidth="0.75"
                strokeLinecap="round"
                opacity="0.75"
              />

              {/* Subtle Lateral Leaf Veins */}
              <path
                d="M20 12.5 C21 10, 24 8.5, 27 8 M26 10.8 C28 9, 31 8, 33 7.8 M18 13 C20 15, 24 16, 27 15.5 M24 11.5 C26 13.5, 29 14, 32 13.5"
                stroke="#D6E3BE"
                strokeWidth="0.45"
                strokeLinecap="round"
                opacity="0.5"
              />

              {/* Secondary Young Sprout Leaf */}
              <path
                d="M7 14 C5 19, 13 21, 18 17 C15 14.5, 10 13.5, 7 14 Z"
                fill="url(#divLeafGrad2)"
                stroke="#4F6838"
                strokeWidth="0.7"
              />
              <path
                d="M8 14.5 C12 17, 15 17.5, 17 17"
                stroke="#F2EDE2"
                strokeWidth="0.5"
                strokeLinecap="round"
                opacity="0.65"
              />

              {/* Small Citrus Blossom Bud Accent */}
              <circle cx="36" cy="9" r="1.5" fill="#FAF8F3" stroke="#8B8258" strokeWidth="0.6" />
              <circle cx="36" cy="9" r="0.6" fill="#F4A236" />
            </svg>
          </div>
        </div>

        {/* Center: Flawlessly Balanced Botanical Pomelo Fruit Cross-Section */}
        <div className="relative shrink-0 flex items-center justify-center p-1.5 bg-[#FAF8F3] rounded-full shadow-xs border border-[rgba(139,130,88,0.22)] group hover:scale-105 transition-transform duration-300">
          <svg
            className="w-11 h-11 sm:w-12 sm:h-12"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              {/* Outer Zest Gradient (Realistic Citrus Rind) */}
              <linearGradient id="pomeloRindGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#5E832B" />
                <stop offset="50%" stopColor="#7BA23F" />
                <stop offset="100%" stopColor="#8DAF4A" />
              </linearGradient>

              {/* Juicy Ruby Vesicle Gradient */}
              <radialGradient id="rubyPulpGrad" cx="50%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#F47A6B" />
                <stop offset="60%" stopColor="#E06354" />
                <stop offset="100%" stopColor="#BD4335" />
              </radialGradient>

              {/* Soft Drop Shadow for Pulp */}
              <filter id="pulpShadow" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="0.5" stdDeviation="0.8" floodColor="#BD4335" floodOpacity="0.25" />
              </filter>
            </defs>

            {/* 1. Outer Citrus Rind Peel */}
            <circle
              cx="32"
              cy="32"
              r="28.5"
              fill="url(#pomeloRindGrad)"
              stroke="#4B6A20"
              strokeWidth="0.8"
            />

            {/* 2. Natural Rind Pores / Oil Glands (Subtle texture) */}
            <circle cx="32" cy="5.5" r="0.65" fill="#3D5618" opacity="0.6" />
            <circle cx="48" cy="11" r="0.65" fill="#3D5618" opacity="0.6" />
            <circle cx="57.5" cy="27" r="0.65" fill="#3D5618" opacity="0.6" />
            <circle cx="53" cy="45" r="0.65" fill="#3D5618" opacity="0.6" />
            <circle cx="37" cy="57.5" r="0.65" fill="#3D5618" opacity="0.6" />
            <circle cx="16" cy="52" r="0.65" fill="#3D5618" opacity="0.6" />
            <circle cx="6.5" cy="35" r="0.65" fill="#3D5618" opacity="0.6" />
            <circle cx="12" cy="17" r="0.65" fill="#3D5618" opacity="0.6" />

            {/* 3. Thick Spongy White Albedo (Pomelo Pith) */}
            <circle
              cx="32"
              cy="32"
              r="25.5"
              fill="#FDFCF8"
              stroke="#EFE8D8"
              strokeWidth="1"
            />

            {/* 4. Delicate Inner Pith Membrane Ring */}
            <circle
              cx="32"
              cy="32"
              r="21"
              stroke="#E2D8C3"
              strokeWidth="0.8"
              strokeDasharray="2.5 2"
              fill="none"
            />

            {/* 5. Mathematically Symmetrical 8-Carpel Segments with Glistening Vesicles */}
            <g filter="url(#pulpShadow)">
              {segmentAngles.map((angle) => (
                <g key={angle} transform={`rotate(${angle} 32 32)`}>
                  {/* Carpel droplet segment */}
                  <path
                    d="M32 12.5 C28.8 15.5, 28.5 22, 32 25.5 C35.5 22, 35.2 15.5, 32 12.5 Z"
                    fill="url(#rubyPulpGrad)"
                    stroke="#BD4335"
                    strokeWidth="0.3"
                  />
                  {/* Internal vesicle light highlight */}
                  <ellipse
                    cx="32"
                    cy="18.5"
                    rx="0.9"
                    ry="2.4"
                    fill="#FFFFFF"
                    opacity="0.55"
                  />
                </g>
              ))}
            </g>

            {/* 6. Central Star Pith Core & Seed Eye */}
            <circle cx="32" cy="32" r="3.2" fill="#FAF8F3" stroke="#D3C9B2" strokeWidth="0.8" />
            <circle cx="32" cy="32" r="1.4" fill="#8B8258" opacity="0.45" />
          </svg>
        </div>

        {/* Right Dashed Line & Perfectly Symmetrical Mirror Sprig */}
        <div className="flex-1 flex items-center">
          {/* Right Botanical Sprig: Exact horizontal mirror of left sprig */}
          <div className="w-10 h-7 sm:w-12 sm:h-8 shrink-0 flex items-center justify-center">
            <svg
              viewBox="0 0 44 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full transform -scale-x-100"
              aria-hidden="true"
            >
              {/* Natural curved organic stem tapering into the dashed line */}
              <path
                d="M1 14 C12 14, 22 13.5, 36 9"
                stroke="#6B5E43"
                strokeWidth="1.2"
                strokeLinecap="round"
                opacity="0.8"
              />

              {/* Main Botanical Citrus Leaf Blade */}
              <path
                d="M12 14 C13 7, 26 4, 38 8 C33 16, 20 18, 12 14 Z"
                fill="url(#divLeafGrad1)"
                stroke="#3D4E2C"
                strokeWidth="0.8"
              />

              {/* Delicate Curved Central Leaf Midrib Spine */}
              <path
                d="M13 14 C22 11.5, 30 9.5, 37 8"
                stroke="#E8EED9"
                strokeWidth="0.75"
                strokeLinecap="round"
                opacity="0.75"
              />

              {/* Subtle Lateral Leaf Veins */}
              <path
                d="M20 12.5 C21 10, 24 8.5, 27 8 M26 10.8 C28 9, 31 8, 33 7.8 M18 13 C20 15, 24 16, 27 15.5 M24 11.5 C26 13.5, 29 14, 32 13.5"
                stroke="#D6E3BE"
                strokeWidth="0.45"
                strokeLinecap="round"
                opacity="0.5"
              />

              {/* Secondary Young Sprout Leaf */}
              <path
                d="M7 14 C5 19, 13 21, 18 17 C15 14.5, 10 13.5, 7 14 Z"
                fill="url(#divLeafGrad2)"
                stroke="#4F6838"
                strokeWidth="0.7"
              />
              <path
                d="M8 14.5 C12 17, 15 17.5, 17 17"
                stroke="#F2EDE2"
                strokeWidth="0.5"
                strokeLinecap="round"
                opacity="0.65"
              />

              {/* Small Citrus Blossom Bud Accent */}
              <circle cx="36" cy="9" r="1.5" fill="#FAF8F3" stroke="#8B8258" strokeWidth="0.6" />
              <circle cx="36" cy="9" r="0.6" fill="#F4A236" />
            </svg>
          </div>

          <div className="h-[1px] w-full border-t border-dashed border-[#8B8258]/30"></div>
        </div>
      </div>
    </div>
  );
};
