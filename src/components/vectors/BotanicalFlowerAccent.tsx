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
  return (
    <div
      className={`pointer-events-none select-none ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="pomeloPetalWarm" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFA67A" />
            <stop offset="60%" stopColor="#E06354" />
            <stop offset="100%" stopColor="#C44B3D" />
          </linearGradient>
          <linearGradient id="leafGreenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#89B055" />
            <stop offset="100%" stopColor="#4D6B35" />
          </linearGradient>
        </defs>

        {/* Botanical Leaves Background */}
        <g opacity="0.9">
          <path
            d="M50 120 C20 125, 5 95, 25 75 C45 55, 65 95, 50 120 Z"
            fill="url(#leafGreenGrad)"
          />
          <path d="M50 120 Q 30 85, 25 75" stroke="#FAF8F3" strokeWidth="0.8" opacity="0.6" />

          <path
            d="M110 135 C135 145, 155 120, 140 95 C125 70, 95 105, 110 135 Z"
            fill="url(#leafGreenGrad)"
          />
          <path d="M110 135 Q 130 105, 140 95" stroke="#FAF8F3" strokeWidth="0.8" opacity="0.6" />

          <path
            d="M95 30 C120 15, 140 35, 130 60 C120 85, 85 55, 95 30 Z"
            fill="#788E73"
            opacity="0.8"
          />
        </g>

        {/* Citrus Blossom / Pomelo Flower Petals */}
        <g opacity="0.95">
          {/* Petal 1 (Top) */}
          <path
            d="M80 80 C60 45, 75 15, 90 20 C105 25, 100 55, 80 80 Z"
            fill="url(#pomeloPetalWarm)"
          />
          {/* Petal 2 (Right) */}
          <path
            d="M80 80 C115 65, 145 80, 140 95 C135 110, 105 100, 80 80 Z"
            fill="url(#pomeloPetalWarm)"
          />
          {/* Petal 3 (Bottom-Right) */}
          <path
            d="M80 80 C95 115, 85 145, 70 140 C55 135, 65 105, 80 80 Z"
            fill="url(#pomeloPetalWarm)"
          />
          {/* Petal 4 (Left) */}
          <path
            d="M80 80 C45 95, 15 80, 20 65 C25 50, 55 60, 80 80 Z"
            fill="url(#pomeloPetalWarm)"
          />
          {/* Petal 5 (Top-Left) */}
          <path
            d="M80 80 C50 60, 40 30, 55 25 C70 20, 75 50, 80 80 Z"
            fill="url(#pomeloPetalWarm)"
          />
        </g>

        {/* Golden Citrus Stamen Center */}
        <circle cx="80" cy="80" r="10" fill="#F4B042" />
        <circle cx="80" cy="80" r="6" fill="#8B8258" opacity="0.8" />
        <circle cx="77" cy="77" r="1.5" fill="#FFFFFF" />
      </svg>
    </div>
  );
}
