"use client";

import React from "react";

interface AmenityItem {
  id: string;
  title: string;
  detail: string;
  renderSvg: (scope: "desk" | "mob") => React.ReactNode;
}

const AMENITIES_LIST: AmenityItem[] = [
  {
    id: "pool",
    title: "SWIM & SPLASH",
    detail: "65ft x 30ft spring pool",
    renderSvg: (scope) => {
      const sunGrad = `${scope}-poolSun`;
      const waveGrad1 = `${scope}-waveGrad1`;
      const waveGrad2 = `${scope}-waveGrad2`;
      return (
        <svg
          viewBox="0 0 64 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-11 mx-auto transition-transform duration-300 group-hover:scale-110"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={sunGrad} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="40%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#F97316" />
            </linearGradient>
            <linearGradient id={waveGrad1} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="50%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#1D4ED8" />
            </linearGradient>
            <linearGradient id={waveGrad2} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#67E8F9" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          {/* Luminous Golden Sun Rising over Spring Water */}
          <circle cx="32" cy="16" r="11" fill={`url(#${sunGrad})`} stroke="#EA580C" strokeWidth="0.8" />
          <circle cx="32" cy="16" r="14" stroke="#FDE047" strokeWidth="1" strokeDasharray="3 3" opacity="0.65" />
          
          {/* Radiating Sunbeams */}
          <path d="M32 2 V5 M19 7 L21 9 M45 7 L43 9 M15 16 H18 M46 16 H49" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />

          {/* Back Turquoise Aquifer Shimmer Layer */}
          <path
            d="M6 31 C14 26, 22 35, 32 30 C42 25, 50 34, 58 29 L58 35 C50 40, 42 31, 32 36 C22 41, 14 32, 6 37 Z"
            fill={`url(#${waveGrad2})`}
          />

          {/* Realistic Glistening Surface Wave 1 */}
          <path
            d="M6 33 C15 28, 23 37, 32 32 C41 27, 49 36, 58 31"
            stroke={`url(#${waveGrad1})`}
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Deep Azure Secondary Wave 2 */}
          <path
            d="M8 41 C16 36, 24 45, 33 40 C42 35, 50 44, 56 39"
            stroke="#1E40AF"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.85"
          />

          {/* Spring Water Froth Droplets */}
          <circle cx="21" cy="30" r="1.2" fill="#FFFFFF" />
          <circle cx="43" cy="28" r="1.5" fill="#FFFFFF" />
          <circle cx="33" cy="38" r="1" fill="#FFFFFF" opacity="0.85" />
          
          {/* Subtle Organic Ink Definition */}
          <path
            d="M10 33 C18 29, 24 36, 32 32 C40 28, 48 35, 54 31"
            stroke="#141715"
            strokeWidth="0.8"
            strokeLinecap="round"
            opacity="0.4"
          />
        </svg>
      );
    },
  },
  {
    id: "ac",
    title: "COOL AIR CON",
    detail: "Split AC in every cottage",
    renderSvg: (scope) => {
      const acBody = `${scope}-acBody`;
      const coolBreeze = `${scope}-coolBreeze`;
      return (
        <svg
          viewBox="0 0 64 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-11 mx-auto transition-transform duration-300 group-hover:scale-110"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={acBody} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="60%" stopColor="#FAF8F3" />
              <stop offset="100%" stopColor="#ECE6D8" />
            </linearGradient>
            <linearGradient id={coolBreeze} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#818CF8" />
            </linearGradient>
          </defs>
          {/* Beveled Architectural AC Unit */}
          <rect
            x="8"
            y="10"
            width="48"
            height="22"
            rx="4.5"
            fill={`url(#${acBody})`}
            stroke="#141715"
            strokeWidth="1.8"
          />
          {/* Upper Vent Display Seam */}
          <line x1="12" y1="16" x2="52" y2="16" stroke="#D3C9B2" strokeWidth="1" />
          
          {/* Digital Temp & Mode Display */}
          <rect x="42" y="19" width="10" height="5" rx="1.5" fill="#141715" />
          <circle cx="45" cy="21.5" r="0.8" fill="#7BA23F" />
          <circle cx="49" cy="21.5" r="0.8" fill="#38BDF8" />

          {/* Lower Air Louver Blade */}
          <path
            d="M12 26 C24 28, 40 28, 52 26"
            stroke="#788E73"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Flowing Cool Air Ribbon Waves */}
          <path
            d="M14 36 C22 43, 30 35, 38 42 C44 47, 50 42, 54 46"
            stroke={`url(#${coolBreeze})`}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M18 43 C26 49, 32 42, 40 48 C46 52, 49 48, 52 51"
            stroke="#38BDF8"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.7"
          />

          {/* Crystalline Snowflake Accent */}
          <g transform="translate(24, 21) scale(0.7)" stroke="#38BDF8" strokeWidth="1.4" strokeLinecap="round">
            <line x1="0" y1="-5" x2="0" y2="5" />
            <line x1="-5" y1="0" x2="5" y2="0" />
            <line x1="-3.5" y1="-3.5" x2="3.5" y2="3.5" />
            <line x1="-3.5" y1="3.5" x2="3.5" y2="-3.5" />
          </g>
        </svg>
      );
    },
  },
  {
    id: "garden",
    title: "PRIVATE GARDEN",
    detail: "12-acre citrus orchard & lawns",
    renderSvg: (scope) => {
      const pomeloGrad = `${scope}-gardenPomeloGrad`;
      const leafGrad1 = `${scope}-gardenLeafGrad1`;
      return (
        <svg
          viewBox="0 0 64 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-11 mx-auto transition-transform duration-300 group-hover:scale-110"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={pomeloGrad} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A3E635" />
              <stop offset="40%" stopColor="#84CC16" />
              <stop offset="100%" stopColor="#4D7C0F" />
            </linearGradient>
            <linearGradient id={leafGrad1} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#84CC16" />
              <stop offset="100%" stopColor="#3F6212" />
            </linearGradient>
          </defs>

          {/* 1. Curved Orchard Twig / Branch */}
          <path
            d="M6 42 C16 34, 26 22, 54 12"
            stroke="#6B5E43"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M24 28 C28 24, 34 22, 42 20"
            stroke="#6B5E43"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* 2. Hanging Ripe Pomelo Fruit with Calyx */}
          <line x1="22" y1="31" x2="22" y2="34" stroke="#6B5E43" strokeWidth="2" strokeLinecap="round" />
          <circle
            cx="22"
            cy="42"
            r="9.5"
            fill={`url(#${pomeloGrad})`}
            stroke="#3F6212"
            strokeWidth="1.4"
          />
          {/* Soft fruit highlight */}
          <ellipse cx="20" cy="39" rx="2.8" ry="1.6" fill="#FFFFFF" opacity="0.45" />
          {/* Star calyx at fruit stem */}
          <path d="M19.5 33.5 L24.5 33.5 M22 32 L22 35" stroke="#3F6212" strokeWidth="1.2" strokeLinecap="round" />

          {/* 3. Realistic Botanical Citrus Leaves */}
          {/* Main Large Leaf */}
          <g transform="translate(26, 18) rotate(-28)">
            <path
              d="M0 0 C6 -13, 18 -14, 23 0 C15 10, 6 9, 0 0 Z"
              fill={`url(#${leafGrad1})`}
              stroke="#2B3C13"
              strokeWidth="1.2"
            />
            <path d="M0 0 C8 -5, 16 -4, 23 0" stroke="#E8EED9" strokeWidth="0.8" opacity="0.8" />
          </g>

          {/* Secondary Leaf */}
          <g transform="translate(42, 14) rotate(22)">
            <path
              d="M0 0 C5 -11, 15 -12, 19 0 C13 9, 5 8, 0 0 Z"
              fill="#65A30D"
              stroke="#2B3C13"
              strokeWidth="1.1"
            />
            <path d="M0 0 C6 -4, 13 -3, 19 0" stroke="#F2EDE2" strokeWidth="0.7" opacity="0.75" />
          </g>

          {/* Young Bud Leaf */}
          <g transform="translate(50, 11) rotate(-6)">
            <path
              d="M0 0 C3 -7, 11 -7, 14 0 C10 6, 3 5, 0 0 Z"
              fill="#A3E635"
              stroke="#2B3C13"
              strokeWidth="0.9"
            />
          </g>

          {/* Grass Tuft Accent at Base */}
          <path d="M8 50 L10 46 L12 50 M14 50 L16 45 L18 50" stroke="#65A30D" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
    },
  },
  {
    id: "pets",
    title: "PETS WELCOME",
    detail: "Furry family welcome to roam",
    renderSvg: (scope) => {
      const pawWash = `${scope}-pawWash`;
      return (
        <svg
          viewBox="0 0 64 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-11 mx-auto transition-transform duration-300 group-hover:scale-110"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={pawWash} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A89B6C" />
              <stop offset="100%" stopColor="#7E7247" />
            </linearGradient>
          </defs>

          {/* Organic Paw Pad */}
          <path
            d="M32 26 C24 26, 19 34, 21 41 C23 47, 30 49, 32 49 C34 49, 41 47, 43 41 C45 34, 40 26, 32 26 Z"
            fill={`url(#${pawWash})`}
            stroke="#141715"
            strokeWidth="1.6"
          />
          {/* Inner Pad Highlight */}
          <ellipse cx="32" cy="38" rx="5.5" ry="4" fill="#FAF8F3" opacity="0.3" />

          {/* 4 Realistic Toe Beans with Natural Angle */}
          <ellipse
            cx="19"
            cy="22"
            rx="4.2"
            ry="6"
            transform="rotate(-20 19 22)"
            fill="#788E73"
            stroke="#141715"
            strokeWidth="1.4"
          />
          <ellipse
            cx="28"
            cy="15"
            rx="4.4"
            ry="6.5"
            transform="rotate(-6 28 15)"
            fill="#7BA23F"
            stroke="#141715"
            strokeWidth="1.4"
          />
          <ellipse
            cx="36"
            cy="15"
            rx="4.4"
            ry="6.5"
            transform="rotate(6 36 15)"
            fill="#7BA23F"
            stroke="#141715"
            strokeWidth="1.4"
          />
          <ellipse
            cx="45"
            cy="22"
            rx="4.2"
            ry="6"
            transform="rotate(20 45 22)"
            fill="#788E73"
            stroke="#141715"
            strokeWidth="1.4"
          />

          {/* Playful Heart Accent */}
          <path
            d="M48 38 C48 35, 52 35, 52 38 C52 41, 48 43, 48 43 C48 43, 44 41, 44 38 C44 35, 48 35, 48 38 Z"
            fill="#E06354"
          />
        </svg>
      );
    },
  },
  {
    id: "campfire",
    title: "CAMPFIRE NIGHTS",
    detail: "Wood fire & acoustic evenings",
    renderSvg: (scope) => {
      const fireOuter = `${scope}-fireOuter`;
      const fireCore = `${scope}-fireCore`;
      return (
        <svg
          viewBox="0 0 64 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-11 mx-auto transition-transform duration-300 group-hover:scale-110"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={fireOuter} x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#C2410C" />
              <stop offset="50%" stopColor="#EA580C" />
              <stop offset="100%" stopColor="#E06354" />
            </linearGradient>
            <linearGradient id={fireCore} x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#FCD34D" />
            </linearGradient>
          </defs>

          {/* Realistic Crossed Cedar Logs with Wood Grain */}
          <g transform="rotate(-18 32 46)">
            <rect x="10" y="42" width="44" height="7.5" rx="3.75" fill="#6B4423" stroke="#141715" strokeWidth="1.5" />
            <line x1="16" y1="45" x2="48" y2="45" stroke="#4A2E15" strokeWidth="0.9" strokeDasharray="6 3" />
          </g>
          <g transform="rotate(18 32 46)">
            <rect x="10" y="42" width="44" height="7.5" rx="3.75" fill="#8B5A2B" stroke="#141715" strokeWidth="1.5" />
            <line x1="16" y1="46" x2="48" y2="46" stroke="#5A3515" strokeWidth="0.9" strokeDasharray="5 4" />
          </g>

          {/* Glowing Fire Embers at Base */}
          <circle cx="28" cy="43" r="2.5" fill="#F59E0B" />
          <circle cx="36" cy="43" r="3" fill="#EF4444" />
          <circle cx="32" cy="44" r="2" fill="#FCD34D" />

          {/* Outer Flickering Flame Tongue */}
          <path
            d="M32 6 C38 17, 50 24, 47 37 C45 45, 38 47, 32 47 C26 47, 19 45, 17 37 C14 24, 26 17, 32 6 Z"
            fill={`url(#${fireOuter})`}
            stroke="#141715"
            strokeWidth="1.5"
          />

          {/* Inner Luminous Golden Flame Tongue */}
          <path
            d="M32 16 C36 23, 43 27, 41 38 C39 43, 36 45, 32 45 C28 45, 25 43, 23 38 C21 29, 28 23, 32 16 Z"
            fill={`url(#${fireCore})`}
          />

          {/* Hot Pure White Flame Heart */}
          <path
            d="M32 26 C34 30, 37 34, 36 40 C35 43, 33 44, 32 44 C31 44, 29 43, 28 40 C27 34, 30 30, 32 26 Z"
            fill="#FAF8F3"
          />

          {/* Floating Dancing Spark Embers */}
          <circle cx="22" cy="14" r="1.4" fill="#F59E0B" />
          <circle cx="43" cy="11" r="1.6" fill="#EF4444" />
          <circle cx="34" cy="2" r="1.2" fill="#FCD34D" />
        </svg>
      );
    },
  },
  {
    id: "play",
    title: "KIDS PLAY GROVE",
    detail: "Swings, slides & lawn games",
    renderSvg: () => {
      return (
        <svg
          viewBox="0 0 64 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-11 mx-auto transition-transform duration-300 group-hover:scale-110"
          aria-hidden="true"
        >
          {/* Overhead Leafy Orchard Bough */}
          <path
            d="M4 14 C20 12, 40 14, 60 12"
            stroke="#56635A"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          {/* Little Leaves on the Tree Branch */}
          <path d="M12 12 C10 6, 18 6, 20 12 Z" fill="#7BA23F" stroke="#141715" strokeWidth="0.8" />
          <path d="M44 13 C46 7, 54 8, 52 14 Z" fill="#788E73" stroke="#141715" strokeWidth="0.8" />
          <path d="M28 13 C30 8, 38 9, 36 14 Z" fill="#9EB097" stroke="#141715" strokeWidth="0.8" />

          {/* Twisted Hemp Swing Ropes */}
          <line
            x1="22"
            y1="14"
            x2="21"
            y2="37"
            stroke="#8B8258"
            strokeWidth="1.8"
            strokeDasharray="3 2"
          />
          <line
            x1="36"
            y1="14"
            x2="35"
            y2="37"
            stroke="#8B8258"
            strokeWidth="1.8"
            strokeDasharray="3 2"
          />

          {/* Rustic Solid Wood Plank Swing Seat */}
          <rect
            x="16"
            y="37"
            width="24"
            height="5"
            rx="2"
            fill="#8B5A2B"
            stroke="#141715"
            strokeWidth="1.4"
          />
          {/* Rope Knots under seat */}
          <circle cx="21" cy="43" r="1.5" fill="#8B8258" />
          <circle cx="35" cy="43" r="1.5" fill="#8B8258" />

          {/* Bouncing Colorful Play Ball */}
          <circle cx="48" cy="42" r="6" fill="#E06354" stroke="#141715" strokeWidth="1.2" />
          <path d="M44 38 C48 38, 52 42, 52 46" stroke="#F4B042" strokeWidth="2" strokeLinecap="round" />

          {/* Lawn Grass Tuft Base */}
          <path d="M10 50 L12 46 L14 50 M18 50 L20 45 L22 50 M44 50 L46 45 L48 50" stroke="#7BA23F" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
    },
  },
  {
    id: "wifi",
    title: "ORCHARD WIFI",
    detail: "High-speed optical fiber across groves",
    renderSvg: () => {
      return (
        <svg
          viewBox="0 0 64 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-11 mx-auto transition-transform duration-300 group-hover:scale-110"
          aria-hidden="true"
        >
          {/* Base Beacon Node / Signal Origin */}
          <circle cx="32" cy="45" r="4.5" fill="#141715" stroke="#FAF8F3" strokeWidth="1.2" />
          <circle cx="32" cy="45" r="2" fill="#7BA23F" />

          {/* 3 Crisp, Clean Wireless Signal Broadcast Waves (No weird leaves on waves) */}
          {/* Inner Signal Arc */}
          <path
            d="M24 36 C28 31.5, 36 31.5, 40 36"
            stroke="#7BA23F"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          {/* Middle Signal Arc */}
          <path
            d="M17 27 C25 18, 39 18, 47 27"
            stroke="#0284C7"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          {/* Outer Signal Arc */}
          <path
            d="M10 18 C22 5, 42 5, 54 18"
            stroke="#141715"
            strokeWidth="2.8"
            strokeLinecap="round"
          />

          {/* Clean Signal Endpoint Accents */}
          <circle cx="10" cy="18" r="1.5" fill="#141715" />
          <circle cx="54" cy="18" r="1.5" fill="#141715" />
        </svg>
      );
    },
  },
  {
    id: "parking",
    title: "PRIVATE PARKING & EV",
    detail: "Secure on-site lot & 11kW EV charger",
    renderSvg: () => {
      return (
        <svg
          viewBox="0 0 64 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-11 mx-auto transition-transform duration-300 group-hover:scale-110"
          aria-hidden="true"
        >
          {/* Timber Shaded Pergola with Vine Canopy */}
          <path
            d="M6 16 L32 9 L58 16"
            stroke="#141715"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line x1="11" y1="16" x2="11" y2="48" stroke="#8B8258" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="53" y1="16" x2="53" y2="48" stroke="#8B8258" strokeWidth="2.2" strokeLinecap="round" />

          {/* Climbing Green Bougainvillea Leaves on Pergola */}
          <circle cx="10" cy="24" r="2.5" fill="#7BA23F" />
          <circle cx="12" cy="32" r="2.2" fill="#788E73" />
          <circle cx="54" cy="22" r="2.5" fill="#7BA23F" />
          <circle cx="52" cy="30" r="2.2" fill="#9EB097" />
          {/* Pink Flower Bloom */}
          <circle cx="13" cy="23" r="1.5" fill="#E06354" />
          <circle cx="51" cy="21" r="1.5" fill="#E06354" />

          {/* Modern SUV Car Silhouette */}
          <path
            d="M17 40 L21 28 C23 25, 27 24, 32 24 C37 24, 41 25, 43 28 L47 40 H17 Z"
            fill="#FAF8F3"
            stroke="#141715"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          {/* Tinted Windshield */}
          <path
            d="M23 28 L25 32 H39 L41 28 C39 26, 35 25.5, 32 25.5 C29 25.5, 25 26, 23 28 Z"
            fill="#38BDF8"
            opacity="0.6"
          />
          {/* Tires */}
          <circle cx="22" cy="43" r="4" fill="#141715" />
          <circle cx="22" cy="43" r="1.8" fill="#D3C9B2" />
          <circle cx="42" cy="43" r="4" fill="#141715" />
          <circle cx="42" cy="43" r="1.8" fill="#D3C9B2" />

          {/* Green EV Charging Station & Spark */}
          <rect x="49" y="32" width="6" height="12" rx="1.5" fill="#7BA23F" stroke="#141715" strokeWidth="1" />
          <path d="M52 35 L50 39 H53 L51 43" stroke="#FAF8F3" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    },
  },
];

export function ArtisanalAmenitiesRibbon() {
  return (
    <section className="py-12 sm:py-16 bg-[#FAF8F3] border-y border-[rgba(139,130,88,0.2)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-12 space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-widest font-bold text-[#788E73] block">
            Resort Inclusions
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#141715] tracking-tight">
            Thoughtful Orchard Amenities
          </h2>
          <p className="text-xs sm:text-sm text-[#56635A] max-w-md mx-auto leading-relaxed">
            Everything you need for an unhurried, comfortable stay amidst 12 acres of tranquil greenery.
          </p>
        </div>

        {/* =========================================================================
            DESKTOP & LARGE TABLETS (8 COLUMNS STRIP WITH DASHED DIVIDERS)
            Directly replicates the artisanal luxury reference layout
           ========================================================================= */}
        <div className="hidden lg:grid lg:grid-cols-8 divide-x divide-dashed divide-[rgba(139,130,88,0.28)] bg-white/70 rounded-2xl border border-[rgba(139,130,88,0.2)] shadow-xs py-6 px-2">
          {AMENITIES_LIST.map((item) => (
            <div
              key={item.id}
              className="group px-3 py-2 text-center flex flex-col items-center justify-between transition-all duration-300 hover:-translate-y-1 cursor-default"
            >
              {/* Detailed Realistic Artwork scoped for desktop */}
              <div className="mb-3 flex items-center justify-center min-h-[50px]">
                {item.renderSvg("desk")}
              </div>

              {/* Title & Micro-detail */}
              <div className="space-y-1">
                <span className="block text-[11px] font-bold tracking-wider text-[#141715] uppercase font-sans leading-tight">
                  {item.title}
                </span>
                <span className="block text-[10px] text-[#56635A] font-mono leading-snug">
                  {item.detail}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* =========================================================================
            MOBILE & SMALL TABLET: 2 COLUMNS PER ROW GRID
            Clean 2x4 grid on mobile screens with tactile cards and scoped gradients
           ========================================================================= */}
        <div className="lg:hidden grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {AMENITIES_LIST.map((item) => (
            <div
              key={item.id}
              className="group bg-white/85 p-3.5 sm:p-4 rounded-xl border border-[rgba(139,130,88,0.2)] text-center flex flex-col items-center justify-between shadow-xs transition-all duration-200 hover:border-[rgba(139,130,88,0.4)]"
            >
              {/* Detailed Realistic Artwork scoped for mobile (never loses gradients!) */}
              <div className="mb-2.5 flex items-center justify-center min-h-[48px]">
                {item.renderSvg("mob")}
              </div>

              {/* Title & Micro-detail */}
              <div className="space-y-0.5 w-full">
                <span className="block text-[11px] font-bold tracking-wider text-[#141715] uppercase font-sans leading-tight">
                  {item.title}
                </span>
                <span className="block text-[10px] text-[#56635A] font-mono leading-tight">
                  {item.detail}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
