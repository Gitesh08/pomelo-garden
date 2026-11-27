"use client";

import React from "react";

interface OrganicWaveHeroProps {
  className?: string;
}

export function OrganicWaveHero({ className = "" }: OrganicWaveHeroProps) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none select-none z-10 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* =========================================================================
          DESKTOP & TABLET ORGANIC BLEND (md and up)
          Layered silk ribbons and organic hill curves inspired by luxury travel
          sweeping across the bottom and left to frame the typography and pool
         ========================================================================= */}
      <svg
        viewBox="0 0 1440 820"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="hidden md:block w-full h-full"
      >
        <defs>
          {/* Subtle translucent silk gradient */}
          <linearGradient id="silkFlowSubtle" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FAF8F3" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#FAF8F3" stopOpacity="0.75" />
            <stop offset="80%" stopColor="#FAF8F3" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FAF8F3" stopOpacity="0" />
          </linearGradient>

          {/* Frosted ivory transition ribbon */}
          <linearGradient id="silkRibbon" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FAF8F3" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#F2EDE2" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.1" />
          </linearGradient>

          {/* Soft contour stroke gradient */}
          <linearGradient id="contourStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
            <stop offset="60%" stopColor="rgba(242,237,226,0.6)" />
            <stop offset="100%" stopColor="rgba(224,99,84,0.2)" />
          </linearGradient>
        </defs>

        {/* 1. Translucent outer billowing wave ribbon */}
        <path
          d="M0 0 L580 0 C540 180 460 300 540 430 C620 560 760 580 880 630 C1000 680 1100 740 1220 820 L0 820 Z"
          fill="url(#silkRibbon)"
          opacity="0.8"
        />

        {/* 2. Soft Ivory Canvas (Frames hero typography on left, curves down across bottom) */}
        <path
          d="M0 0 L520 0 C460 170 410 290 490 410 C570 530 710 560 820 620 C930 680 1020 740 1140 820 L0 820 Z"
          fill="#FAF8F3"
        />

        {/* 3. Base Bottom Wave (Ensures the bottom 140px seamlessly merges with #FAF8F3) */}
        <path
          d="M0 680 C360 620 720 710 1140 660 C1260 645 1360 665 1440 680 L1440 820 L0 820 Z"
          fill="#FAF8F3"
        />

        {/* 4. Elegant flowing highlight contour line */}
        <path
          d="M520 0 C460 170 410 290 490 410 C570 530 710 560 820 620 C930 680 1020 740 1140 820"
          stroke="url(#contourStroke)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* 5. Delicate secondary dashed accent curve */}
        <path
          d="M545 0 C485 180 430 300 515 425 C595 545 740 575 850 635 C960 695 1050 755 1170 820"
          stroke="rgba(139,130,88,0.2)"
          strokeWidth="1.5"
          strokeDasharray="4 6"
        />

        {/* 6. Translucent botanical leaf sprigs along the wave ridge */}
        <g opacity="0.8" transform="translate(480, 260) rotate(-20) scale(0.65)">
          <path
            d="M0 0 C22 -18, 50 -12, 44 14 C38 35, 18 24, 0 0 Z"
            fill="#788E73"
          />
          <path d="M0 0 Q 20 4, 44 14" stroke="#FAF8F3" strokeWidth="0.8" opacity="0.7" />
        </g>

        <g opacity="0.75" transform="translate(730, 560) rotate(18) scale(0.7)">
          <path
            d="M0 0 C26 -22, 58 -16, 50 15 C42 38, 20 28, 0 0 Z"
            fill="#9EB097"
          />
          <path d="M0 0 Q 24 5, 50 15" stroke="#FAF8F3" strokeWidth="0.8" opacity="0.7" />
        </g>
      </svg>

      {/* =========================================================================
          MOBILE ORGANIC BLEND (Phones & Small Screens)
          A lush, multi-tier curve at the base of the hero that gracefully blends
          the photography into the ivory body without blocking text
         ========================================================================= */}
      <div className="md:hidden absolute inset-x-0 bottom-0 pointer-events-none">
        {/* Soft gradient mist for text contrast on mobile */}
        <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-[#FAF8F3] via-[#FAF8F3]/90 to-transparent" />

        {/* Clean undulating bottom wave */}
        <svg
          viewBox="0 0 390 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="relative w-full h-24"
        >
          {/* Translucent back ribbon */}
          <path
            d="M0 45 C100 15 220 65 390 20 L390 120 L0 120 Z"
            fill="#FAF8F3"
            opacity="0.6"
          />
          {/* Main solid ivory bottom wave */}
          <path
            d="M0 60 C120 30 260 75 390 40 L390 120 L0 120 Z"
            fill="#FAF8F3"
          />
          {/* Fine top contour line */}
          <path
            d="M0 60 C120 30 260 75 390 40"
            stroke="rgba(255,255,255,0.8)"
            strokeWidth="1.5"
          />
        </svg>
      </div>
    </div>
  );
}
