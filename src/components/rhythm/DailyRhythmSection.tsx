"use client";

import React, { useState } from "react";
import { Sparkles, Clock, ChevronLeft, ChevronRight } from "lucide-react";

interface CadenceStep {
  id: string;
  time: string;
  period: string;
  title: string;
  sensoryBadge: string;
  narrative: string;
  sensoryDetail: string;
  accentColor: string;
  pillColor: string;
  renderMotionSvg: (isActive: boolean, isLarge?: boolean, scope?: string) => React.ReactNode;
}

const CADENCE_STEPS: CadenceStep[] = [
  {
    id: "dawn",
    time: "06:30 AM",
    period: "Dawn Orchard Stroll",
    title: "Sunrise Birdcalls & Misty Citrus Groves",
    sensoryBadge: "Dewdrops & Morning Lemongrass Tea",
    narrative:
      "Awaken naturally as Sahyadri mountain mists gently part across 12 acres of tranquil citrus groves. Walk unhurried earthen pathways with sweet-scented pomelo blossoms, accompanied by melodious bulbul birdcalls and freshly clipped lemongrass tea.",
    sensoryDetail: "Cool morning dewdrops on citrus leaves and wild lemongrass tea warming in your hands.",
    accentColor: "#7BA23F",
    pillColor: "bg-[#7BA23F]/15 text-[#5A7E24] border-[#7BA23F]/30",
    renderMotionSvg: (isActive: boolean, isLarge = false, scope = "rhythm") => {
      const sizeClasses = isLarge ? "w-28 h-24 sm:w-32 sm:h-28" : "w-16 h-14 sm:w-20 sm:h-16";
      const sunGrad = `${scope}-dawnSun`;
      const glowGrad = `${scope}-dawnGlow`;
      const leafGrad = `${scope}-dawnLeaf`;

      return (
        <svg
          viewBox="0 0 100 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${sizeClasses} transition-all duration-300 drop-shadow-sm select-none`}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={sunGrad} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="40%" stopColor="#FBBF24" />
              <stop offset="85%" stopColor="#F97316" />
              <stop offset="100%" stopColor="#EA580C" />
            </linearGradient>
            <radialGradient id={glowGrad} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FDE047" stopOpacity="0.5" />
              <stop offset="70%" stopColor="#F59E0B" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
            </radialGradient>
            <linearGradient id={leafGrad} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#84CC16" />
              <stop offset="100%" stopColor="#4D7C0F" />
            </linearGradient>
          </defs>

          <style>
            {`
              @keyframes dawnSunPulse {
                0%, 100% { transform: scale(1); opacity: 0.95; }
                50% { transform: scale(1.06); opacity: 1; }
              }
              @keyframes birdGliding {
                0%, 100% { transform: translate(0, 0); }
                50% { transform: translate(3px, -2px); }
              }
              @keyframes mistDrift {
                0%, 100% { transform: translateX(0); opacity: 0.5; }
                50% { transform: translateX(4px); opacity: 0.75; }
              }
              .anim-dawn-sun { transform-origin: 50px 32px; animation: dawnSunPulse 3.5s ease-in-out infinite; }
              .anim-bird { animation: birdGliding 4s ease-in-out infinite; }
              .anim-mist { animation: mistDrift 6s ease-in-out infinite; }
            `}
          </style>

          {/* Ambient Dawn Sunlight Corona Glow */}
          <circle cx="50" cy="32" r="28" fill={`url(#${glowGrad})`} className="anim-dawn-sun" />

          {/* Radiating Sunbeams */}
          <g stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" opacity="0.85">
            <line x1="50" y1="8" x2="50" y2="14" />
            <line x1="33" y1="15" x2="37" y2="19" />
            <line x1="67" y1="15" x2="63" y2="19" />
            <line x1="26" y1="32" x2="20" y2="32" />
            <line x1="74" y1="32" x2="80" y2="32" />
          </g>

          {/* Rising Radiant Golden Sun Core */}
          <circle
            cx="50"
            cy="32"
            r="16"
            fill={`url(#${sunGrad})`}
            stroke="#EA580C"
            strokeWidth="1.2"
            className="anim-dawn-sun"
          />
          <circle cx="50" cy="32" r="19" stroke="#FEF08A" strokeWidth="1" strokeDasharray="3 3" opacity="0.7" />

          {/* Sahyadri Foothills Misty Ridge Silhouettes */}
          <path
            d="M5 56 C20 46, 38 48, 52 42 C66 36, 80 48, 95 44"
            stroke="#8B8258"
            strokeWidth="2.2"
            strokeLinecap="round"
            className="anim-mist"
          />
          <path
            d="M12 62 C28 54, 46 56, 62 50 C76 46, 86 54, 94 52"
            stroke="#A89B6C"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.6"
          />

          {/* Dewy Botanical Citrus Branch with Hanging Fruit & Water Droplet */}
          <path d="M10 60 C26 50, 42 46, 68 44" stroke="#6B5E43" strokeWidth="2.4" strokeLinecap="round" />
          {/* Main Leaf */}
          <path
            d="M24 54 C20 42, 34 38, 42 44 C36 56, 26 56, 24 54 Z"
            fill={`url(#${leafGrad})`}
            stroke="#141715"
            strokeWidth="1.4"
          />
          {/* Natural Midrib */}
          <path d="M26 53 C31 47, 38 44, 41 44" stroke="#FAF8F3" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
          {/* Ripe Hanging Pomelo Mini Fruit */}
          <circle cx="48" cy="53" r="6.5" fill="#7BA23F" stroke="#3F6212" strokeWidth="1.4" />
          <ellipse cx="46.5" cy="51" rx="1.8" ry="1" fill="#FFFFFF" opacity="0.6" />
          {/* Glistening Dewdrop */}
          <circle cx="36" cy="46" r="1.5" fill="#FFFFFF" />

          {/* Gliding Mountain Songbirds */}
          <g className="anim-bird">
            <path d="M62 20 C64 16, 68 17, 71 20 C73 17, 77 16, 80 20" stroke="#141715" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M74 13 C75 10, 78 11, 80 13 C82 11, 85 10, 87 13" stroke="#141715" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
          </g>
        </svg>
      );
    },
  },
  {
    id: "breakfast",
    time: "09:30 AM",
    period: "Clay Chulha Hearth Breakfast",
    title: "Hand-Pressed Rice Bhakri & Slow-Brewed Tea",
    sensoryBadge: "Authentic Terracotta Hearth",
    narrative:
      "Gather around the kitchen verandah as local cooks fire the traditional terracotta chulha with aged mango and coconut timber. Savor piping-hot hand-pressed rice bhakris straight off the clay tava, accompanied by fresh kande pohe, country eggs, and spiced coconut chutney.",
    sensoryDetail: "Aroma of crackling sweet mango woodsmoke and steaming crisp bhakri off the earthen hearth.",
    accentColor: "#C2410C",
    pillColor: "bg-[#C2410C]/15 text-[#9A3412] border-[#C2410C]/30",
    renderMotionSvg: (isActive: boolean, isLarge = false, scope = "rhythm") => {
      const sizeClasses = isLarge ? "w-28 h-24 sm:w-32 sm:h-28" : "w-16 h-14 sm:w-20 sm:h-16";
      const potGrad = `${scope}-chulhaPot`;
      const logGrad = `${scope}-chulhaLog`;
      const emberGrad = `${scope}-chulhaEmber`;

      return (
        <svg
          viewBox="0 0 100 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${sizeClasses} transition-all duration-300 drop-shadow-sm select-none`}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={potGrad} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EA580C" />
              <stop offset="50%" stopColor="#C2410C" />
              <stop offset="100%" stopColor="#9A3412" />
            </linearGradient>
            <linearGradient id={logGrad} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#78350F" />
              <stop offset="100%" stopColor="#451A03" />
            </linearGradient>
            <radialGradient id={emberGrad} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="50%" stopColor="#EF4444" />
              <stop offset="100%" stopColor="#7C2D12" stopOpacity="0" />
            </radialGradient>
          </defs>

          <style>
            {`
              @keyframes steamRise1 {
                0% { transform: translate(0, 0) scaleX(1); opacity: 0.3; }
                50% { transform: translate(-2px, -6px) scaleX(1.15); opacity: 0.85; }
                100% { transform: translate(1px, -14px) scaleX(1.3); opacity: 0; }
              }
              @keyframes steamRise2 {
                0% { transform: translate(0, 0) scaleX(1); opacity: 0.3; }
                50% { transform: translate(3px, -5px) scaleX(1.1); opacity: 0.8; }
                100% { transform: translate(-1px, -13px) scaleX(1.25); opacity: 0; }
              }
              @keyframes emberFlicker {
                0%, 100% { opacity: 0.75; transform: scale(1); }
                50% { opacity: 1; transform: scale(1.12); }
              }
              .anim-steam-1 { animation: steamRise1 3s ease-in-out infinite; }
              .anim-steam-2 { animation: steamRise2 3.6s ease-in-out infinite 0.7s; }
              .anim-ember { transform-origin: 50px 65px; animation: emberFlicker 2s ease-in-out infinite; }
            `}
          </style>

          {/* Rising Steam Wisps from Clay Hearth */}
          <g stroke="#A89B6C" strokeWidth="1.6" strokeLinecap="round">
            <path d="M44 26 C40 20, 48 16, 44 10 C42 6, 46 4, 43 0" className="anim-steam-1" />
            <path d="M56 25 C52 19, 60 15, 56 9 C54 5, 58 3, 55 0" className="anim-steam-2" />
          </g>

          {/* Crossed Cedar and Mango Wood Chulha Hearth Logs */}
          <g>
            <rect
              x="16"
              y="60"
              width="68"
              height="10"
              rx="5"
              transform="rotate(-12 50 65)"
              fill={`url(#${logGrad})`}
              stroke="#141715"
              strokeWidth="1.8"
            />
            <rect
              x="16"
              y="60"
              width="68"
              height="10"
              rx="5"
              transform="rotate(12 50 65)"
              fill="#92400E"
              stroke="#141715"
              strokeWidth="1.8"
            />
            <circle cx="21" cy="62" r="3.2" fill="#B45309" stroke="#141715" strokeWidth="1" />
            <circle cx="21" cy="62" r="1.5" fill="#78350F" />
          </g>

          {/* Glowing Red & Amber Fire Embers Bed */}
          <circle cx="50" cy="64" r="14" fill={`url(#${emberGrad})`} className="anim-ember" />
          <circle cx="42" cy="63" r="3.2" fill="#F59E0B" />
          <circle cx="58" cy="62" r="3" fill="#EF4444" />
          <circle cx="50" cy="61" r="3.6" fill="#FDE047" />

          {/* Traditional Clay Handi Cooking Pot */}
          <path
            d="M26 40 C26 31, 35 27, 50 27 C65 27, 74 31, 74 40 C74 56, 64 59, 50 59 C36 59, 26 56, 26 40 Z"
            fill={`url(#${potGrad})`}
            stroke="#141715"
            strokeWidth="2.2"
          />
          {/* Earthen Terracotta Rim and Lid */}
          <ellipse cx="50" cy="31" rx="20" ry="5.5" fill="#C2410C" stroke="#141715" strokeWidth="1.8" />
          <ellipse cx="50" cy="30" rx="14" ry="3.5" fill="#EA580C" stroke="#141715" strokeWidth="1.2" />
          <circle cx="50" cy="25" r="3" fill="#7C2D12" stroke="#141715" strokeWidth="1.2" />

          {/* Pot Highlight Sheen */}
          <path
            d="M32 40 C32 35, 38 33, 44 33"
            stroke="#FEF08A"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.6"
          />
        </svg>
      );
    },
  },
  {
    id: "pool",
    time: "01:30 PM",
    period: "Spring Pool Plunge & Siesta",
    title: "Mountain Aquifer Swim & Shaded Teak Loungers",
    sensoryBadge: "Pure Natural Aquifer Waters",
    narrative:
      "Escape the midday warmth in the 65ft natural spring water pool, constantly replenished by cool mountain aquifer runoff. Dry off on sun-warmed limestone decks beneath the rustling canopy of coconut palms and drift into a peaceful verandah siesta.",
    sensoryDetail: "Chemical-free mineral spring water soothing your skin under shaded palm fronds.",
    accentColor: "#0284C7",
    pillColor: "bg-[#0284C7]/15 text-[#0369A1] border-[#0284C7]/30",
    renderMotionSvg: (isActive: boolean, isLarge = false, scope = "rhythm") => {
      const sizeClasses = isLarge ? "w-28 h-24 sm:w-32 sm:h-28" : "w-16 h-14 sm:w-20 sm:h-16";
      const waveGrad1 = `${scope}-waveGrad1`;
      const waveGrad2 = `${scope}-waveGrad2`;
      const palmGrad = `${scope}-palmGrad`;

      return (
        <svg
          viewBox="0 0 100 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${sizeClasses} transition-all duration-300 drop-shadow-sm select-none`}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={waveGrad1} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="50%" stopColor="#0284C7" />
              <stop offset="100%" stopColor="#0369A1" />
            </linearGradient>
            <linearGradient id={waveGrad2} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7DD3FC" />
              <stop offset="100%" stopColor="#38BDF8" />
            </linearGradient>
            <linearGradient id={palmGrad} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#65A30D" />
              <stop offset="100%" stopColor="#365314" />
            </linearGradient>
          </defs>

          <style>
            {`
              @keyframes waveOscillation {
                0%, 100% { transform: translateX(0); }
                50% { transform: translateX(3px); }
              }
              @keyframes waveOscillationRev {
                0%, 100% { transform: translateX(0); }
                50% { transform: translateX(-3px); }
              }
              @keyframes palmSwaying {
                0%, 100% { transform: rotate(0deg); }
                50% { transform: rotate(-2.5deg); }
              }
              .anim-wave-1 { animation: waveOscillation 4s ease-in-out infinite; }
              .anim-wave-2 { animation: waveOscillationRev 3.5s ease-in-out infinite; }
              .anim-palm { transform-origin: 20px 18px; animation: palmSwaying 5s ease-in-out infinite; }
            `}
          </style>

          {/* Limestone Pool Deck Border with Paver Seams */}
          <path d="M10 40 L90 40" stroke="#D3C9B2" strokeWidth="4" strokeLinecap="round" />
          <line x1="32" y1="38" x2="32" y2="42" stroke="#8B8258" strokeWidth="1.5" />
          <line x1="68" y1="38" x2="68" y2="42" stroke="#8B8258" strokeWidth="1.5" />

          {/* Flowing Mountain Spring Water Ripple 1 */}
          <path
            d="M12 50 C24 43, 36 55, 50 49 C64 43, 76 55, 88 48"
            stroke={`url(#${waveGrad1})`}
            strokeWidth="3.6"
            strokeLinecap="round"
            className="anim-wave-1"
          />

          {/* Deep Azure Spring Water Ripple 2 */}
          <path
            d="M16 60 C28 53, 40 65, 52 58 C64 51, 74 63, 84 57"
            stroke="#0369A1"
            strokeWidth="2.8"
            strokeLinecap="round"
            opacity="0.85"
            className="anim-wave-2"
          />

          {/* Water Shimmer Highlight Droplets */}
          <circle cx="36" cy="47" r="1.8" fill="#FFFFFF" opacity="0.9" />
          <circle cx="64" cy="46" r="2.2" fill="#FFFFFF" opacity="0.9" />
          <circle cx="48" cy="56" r="1.5" fill="#7DD3FC" />

          {/* Shading Coconut Palm Canopy Frond */}
          <g className="anim-palm">
            <path d="M16 16 C32 16, 52 26, 62 36" stroke="#141715" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M26 15 C24 6, 38 7, 42 16 Z" fill={`url(#${palmGrad})`} stroke="#141715" strokeWidth="1.2" />
            <path d="M38 18 C38 9, 52 11, 54 21 Z" fill="#65A30D" stroke="#141715" strokeWidth="1.2" />
            <path d="M48 24 C50 16, 62 18, 62 28 Z" fill="#84CC16" stroke="#141715" strokeWidth="1.2" />
            <path d="M20 18 C14 12, 16 6, 24 9 Z" fill="#4D7C0F" stroke="#141715" strokeWidth="1" />
          </g>
        </svg>
      );
    },
  },
  {
    id: "sunset",
    time: "05:30 PM",
    period: "Golden Hour Solkadhi & High Tea",
    title: "Chilled Pink Kokum Solkadhi & Ridge Sunset",
    sensoryBadge: "Sunset Over Saphale Foothills",
    narrative:
      "As the golden evening light washes across the Sahyadri ridges, relax on the garden lawn with fresh chilled kokum solkadhi blended with coconut milk, green chili, and mint sprigs, accompanied by crisp local onion pakodas.",
    sensoryDetail: "Tart, velvety chilled pink solkadhi as the distant hill ridges glow in apricot and amber.",
    accentColor: "#E06354",
    pillColor: "bg-[#E06354]/15 text-[#C0392B] border-[#E06354]/30",
    renderMotionSvg: (isActive: boolean, isLarge = false, scope = "rhythm") => {
      const sizeClasses = isLarge ? "w-28 h-24 sm:w-32 sm:h-28" : "w-16 h-14 sm:w-20 sm:h-16";
      const sunsetGrad = `${scope}-sunsetSun`;
      const liquidGrad = `${scope}-solkadhiLiquid`;
      const cupGrad = `${scope}-earthenCup`;

      return (
        <svg
          viewBox="0 0 100 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${sizeClasses} transition-all duration-300 drop-shadow-sm select-none`}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={sunsetGrad} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="60%" stopColor="#EA580C" />
              <stop offset="100%" stopColor="#E06354" />
            </linearGradient>
            <linearGradient id={liquidGrad} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F47A6B" />
              <stop offset="70%" stopColor="#E06354" />
              <stop offset="100%" stopColor="#BD4335" />
            </linearGradient>
            <linearGradient id={cupGrad} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#92400E" />
            </linearGradient>
          </defs>

          <style>
            {`
              @keyframes sunsetSunGlow {
                0%, 100% { transform: scale(1); opacity: 0.9; }
                50% { transform: scale(1.05); opacity: 1; }
              }
              .anim-sunset-sun { transform-origin: 65px 32px; animation: sunsetSunGlow 4s ease-in-out infinite; }
            `}
          </style>

          {/* Sunset Horizon Sun Sinking into Ridge */}
          <g className="anim-sunset-sun">
            <path
              d="M44 38 C44 24, 54 14, 66 14 C78 14, 88 24, 88 38 Z"
              fill={`url(#${sunsetGrad})`}
              stroke="#EA580C"
              strokeWidth="1.4"
            />
            <line x1="66" y1="8" x2="66" y2="3" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="80" y1="14" x2="84" y2="10" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="52" y1="14" x2="48" y2="10" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />
          </g>

          {/* Mountain Ridge Foreground */}
          <path
            d="M8 58 C24 48, 48 50, 68 46 C80 42, 90 48, 96 46"
            stroke="#8B8258"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Traditional Clay Cup with Cooling Pink Solkadhi */}
          <g>
            <path
              d="M18 34 L23 66 H45 L50 34 H18 Z"
              fill={`url(#${cupGrad})`}
              stroke="#141715"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <ellipse cx="34" cy="34" rx="16" ry="4.5" fill="#B45309" stroke="#141715" strokeWidth="1.6" />
            <ellipse
              cx="34"
              cy="35"
              rx="13.5"
              ry="3.5"
              fill={`url(#${liquidGrad})`}
              stroke="#BD4335"
              strokeWidth="1"
            />
            <ellipse cx="28" cy="34" rx="3.5" ry="1.4" fill="#FFFFFF" opacity="0.9" />
            <path d="M40 31 C43 23, 50 25, 48 32 Z" fill="#65A30D" stroke="#141715" strokeWidth="1" />
          </g>
        </svg>
      );
    },
  },
  {
    id: "night",
    time: "08:30 PM",
    period: "Sahyadri Bonfire & Starlit Feast",
    title: "Acoustic Cedar Wood Fire & Night Stargazing",
    sensoryBadge: "Pristine Dark Sky Constellations",
    narrative:
      "When night blankets the orchard, gather around a crackling cedar wood fire pit. Pristine unpolluted skies reveal bright constellations, while the kitchen serves slow-cooked gavran chicken, coastal fish fry, and fragrant Indrayani rice under the stars.",
    sensoryDetail: "Crackling cedar timber, glowing floating embers, and an immense sky of glittering stars.",
    accentColor: "#F59E0B",
    pillColor: "bg-[#F59E0B]/15 text-[#B45309] border-[#F59E0B]/30",
    renderMotionSvg: (isActive: boolean, isLarge = false, scope = "rhythm") => {
      const sizeClasses = isLarge ? "w-28 h-24 sm:w-32 sm:h-28" : "w-16 h-14 sm:w-20 sm:h-16";
      const fireOuter = `${scope}-fireOuter`;
      const fireInner = `${scope}-fireInner`;

      return (
        <svg
          viewBox="0 0 100 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${sizeClasses} transition-all duration-300 drop-shadow-sm select-none`}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={fireOuter} x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#B91C1C" />
              <stop offset="40%" stopColor="#EA580C" />
              <stop offset="85%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#FDE047" />
            </linearGradient>
            <linearGradient id={fireInner} x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="60%" stopColor="#FDE047" />
              <stop offset="100%" stopColor="#FFFFFF" />
            </linearGradient>
          </defs>

          <style>
            {`
              @keyframes flameFlickering {
                0%, 100% { transform: scale(1) rotate(0deg); }
                25% { transform: scale(1.04, 0.97) rotate(-1.5deg); }
                50% { transform: scale(0.97, 1.05) rotate(1.5deg); }
                75% { transform: scale(1.02, 1.01) rotate(-0.5deg); }
              }
              @keyframes starTwinkling {
                0%, 100% { opacity: 0.35; transform: scale(0.85); }
                50% { opacity: 1; transform: scale(1.25); }
              }
              @keyframes emberFloating {
                0% { transform: translate(0, 0); opacity: 0.9; }
                50% { transform: translate(-3px, -8px); opacity: 1; }
                100% { transform: translate(2px, -18px); opacity: 0; }
              }
              .anim-flame { transform-origin: 50px 60px; animation: flameFlickering 2.2s ease-in-out infinite; }
              .anim-star-1 { transform-origin: 22px 14px; animation: starTwinkling 2.5s ease-in-out infinite; }
              .anim-star-2 { transform-origin: 40px 10px; animation: starTwinkling 3.2s ease-in-out infinite 0.8s; }
              .anim-star-3 { transform-origin: 82px 16px; animation: starTwinkling 2.8s ease-in-out infinite 1.4s; }
              .anim-ember-1 { animation: emberFloating 2.8s ease-in-out infinite; }
              .anim-ember-2 { animation: emberFloating 3.2s ease-in-out infinite 1.1s; }
            `}
          </style>

          {/* Golden Crescent Moon */}
          <path
            d="M66 10 C61 10, 56 14, 56 20 C56 26, 61 30, 68 30 C65 32, 61 32, 58 31 C53 29, 50 23, 51 18 C52 13, 58 9, 66 10 Z"
            fill="#FDE047"
            stroke="#CA8A04"
            strokeWidth="0.8"
          />

          {/* Twinkling Sahyadri Night Stars */}
          <g>
            <circle cx="22" cy="14" r="1.8" fill="#FFFFFF" className="anim-star-1" />
            <circle cx="40" cy="10" r="1.5" fill="#FEF08A" className="anim-star-2" />
            <circle cx="82" cy="16" r="1.8" fill="#FFFFFF" className="anim-star-3" />
            <circle cx="30" cy="24" r="1.2" fill="#FFFFFF" opacity="0.75" />
            <circle cx="88" cy="28" r="1.2" fill="#FEF08A" opacity="0.75" />
          </g>

          {/* Crossed Cedar Campfire Logs with Bark Texture */}
          <g>
            <rect
              x="18"
              y="58"
              width="64"
              height="10"
              rx="5"
              transform="rotate(-15 50 63)"
              fill="#78350F"
              stroke="#141715"
              strokeWidth="1.8"
            />
            <rect
              x="18"
              y="58"
              width="64"
              height="10"
              rx="5"
              transform="rotate(15 50 63)"
              fill="#92400E"
              stroke="#141715"
              strokeWidth="1.8"
            />
            <circle cx="24" cy="61" r="3.2" fill="#B45309" stroke="#141715" strokeWidth="1" />
            <circle cx="24" cy="61" r="1.5" fill="#78350F" />
          </g>

          {/* Glowing Hearth Embers Base */}
          <circle cx="44" cy="64" r="2.8" fill="#F59E0B" />
          <circle cx="56" cy="63" r="3" fill="#EF4444" />
          <circle cx="50" cy="62" r="3.5" fill="#FDE047" />

          {/* Leaping Bonfire Flame Tongues (Multi-layer Motion) */}
          <g className="anim-flame">
            <path
              d="M50 20 C57 32, 70 40, 67 56 C64 64, 57 66, 50 66 C43 66, 36 64, 33 56 C30 40, 43 32, 50 20 Z"
              fill={`url(#${fireOuter})`}
              stroke="#141715"
              strokeWidth="1.6"
            />
            <path
              d="M50 32 C55 40, 63 46, 61 58 C59 63, 55 64, 50 64 C45 64, 41 63, 39 58 C37 46, 45 40, 50 32 Z"
              fill={`url(#${fireInner})`}
            />
            <path
              d="M50 44 C53 49, 57 53, 56 60 C55 63, 52 63.5, 50 63.5 C48 63.5, 45 63, 44 60 C43 53, 47 49, 50 44 Z"
              fill="#FFFFFF"
            />
          </g>

          {/* Floating Embers in Motion */}
          <circle cx="44" cy="30" r="1.5" fill="#F59E0B" className="anim-ember-1" />
          <circle cx="58" cy="26" r="1.6" fill="#EF4444" className="anim-ember-2" />
        </svg>
      );
    },
  },
];

export function DailyRhythmSection() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const handlePrev = () => {
    setActiveStep((prev) => (prev > 0 ? prev - 1 : CADENCE_STEPS.length - 1));
  };

  const handleNext = () => {
    setActiveStep((prev) => (prev < CADENCE_STEPS.length - 1 ? prev + 1 : 0));
  };

  return (
    <section
      id="daily-rhythm"
      className="py-16 sm:py-24 bg-[#FAF8F3] border-b border-[rgba(139,130,88,0.2)] scroll-mt-20 overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7BA23F]/10 border border-[#7BA23F]/25 text-[#5A7E24] text-[11px] font-mono uppercase tracking-widest font-semibold">
            <Clock className="w-3.5 h-3.5 text-[#7BA23F]" />
            <span>The Daily Rhythm • Slow Living</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#141715] tracking-tight">
            A Day from Dawn to Starlight
          </h2>
          <p className="text-xs sm:text-sm text-[#56635A] max-w-lg mx-auto leading-relaxed font-sans">
            Experience how time unfolds when dictated only by the sun, the orchard breeze, and the
            wood-fired clay hearth.
          </p>
        </div>

        {/* =========================================================================
            DESKTOP CONNECTING VINE & 5 DETAILED MILESTONE SELECTORS
           ========================================================================= */}
        <div className="hidden lg:block relative">
          {/* Continuous Traveling Botanical Vine */}
          <div className="relative mb-5">
            <svg
              viewBox="0 0 1000 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-8 text-[#8B8258]"
            >
              <path
                d="M 50 16 Q 160 8, 250 16 T 450 16 T 650 16 T 850 16 T 950 16"
                stroke="#D3C9B2"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              <path
                d={`M 50 16 Q 160 8, 250 16 T 450 16 T 650 16 T 850 16 T 950 16`}
                stroke="#7BA23F"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="transition-all duration-700"
                style={{
                  strokeDasharray: "900",
                  strokeDashoffset: `${900 - ((activeStep + 1) / 5) * 900}`,
                }}
              />
              {[100, 300, 500, 700, 900].map((cx, idx) => (
                <g key={idx} className="transition-all duration-300">
                  <circle
                    cx={cx}
                    cy="16"
                    r={activeStep === idx ? "7" : "5"}
                    fill={activeStep >= idx ? "#7BA23F" : "#FAF8F3"}
                    stroke="#141715"
                    strokeWidth="1.5"
                  />
                  {activeStep === idx && (
                    <circle cx={cx} cy="16" r="10" stroke="#7BA23F" strokeWidth="1" strokeDasharray="2 2" />
                  )}
                </g>
              ))}
            </svg>
          </div>

          {/* 5 Milestone Interactive Cards with Motion Vectors */}
          <div className="grid grid-cols-5 gap-3.5 mb-8">
            {CADENCE_STEPS.map((step, idx) => {
              const isSelected = activeStep === idx;
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  className={`group p-4 rounded-2xl text-left transition-all duration-300 border flex flex-col justify-between cursor-pointer min-h-[170px] ${
                    isSelected
                      ? "bg-white shadow-xl border-[#141715] scale-[1.03] ring-1 ring-[#141715]/10"
                      : "bg-[#F2EDE2]/70 hover:bg-white/95 border-[rgba(139,130,88,0.22)] hover:border-[rgba(139,130,88,0.4)]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-1 w-full mb-2">
                    <span className="font-mono text-xs font-bold text-[#141715] px-2.5 py-0.5 rounded-full bg-white/90 border border-[rgba(139,130,88,0.2)] shrink-0">
                      {step.time}
                    </span>
                    <div className="shrink-0 flex items-center justify-center">
                      {step.renderMotionSvg(isSelected, false, "desk-card")}
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#788E73] font-bold block mb-1">
                      {step.period}
                    </span>
                    <h4 className="font-serif text-sm font-bold text-[#141715] line-clamp-2 leading-snug">
                      {step.title}
                    </h4>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            MOBILE SWIPEABLE CADENCE CARDS WITH MINI MOTION VECTORS
            Ensures mobile users get the identical 5 stage cards and vectors!
           ========================================================================= */}
        <div className="lg:hidden mb-6">
          <div className="flex items-center justify-between gap-2 mb-3 px-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#788E73] font-bold">
              Stage {activeStep + 1} of 5 • {CADENCE_STEPS[activeStep].period}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handlePrev}
                className="w-8 h-8 rounded-full bg-white border border-[rgba(139,130,88,0.25)] flex items-center justify-center text-[#141715] hover:bg-[#F2EDE2] transition-colors shadow-xs"
                aria-label="Previous Cadence Stage"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="w-8 h-8 rounded-full bg-white border border-[rgba(139,130,88,0.25)] flex items-center justify-center text-[#141715] hover:bg-[#F2EDE2] transition-colors shadow-xs"
                aria-label="Next Cadence Stage"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Mobile Horizontal Swipeable Cards with Live Animated Vectors */}
          <div className="flex items-stretch gap-3 overflow-x-auto pb-3 pt-1 px-1 no-scrollbar snap-x snap-mandatory">
            {CADENCE_STEPS.map((step, idx) => {
              const isSelected = activeStep === idx;
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  className={`snap-start w-[210px] shrink-0 p-3.5 rounded-2xl text-left transition-all duration-200 border flex flex-col justify-between ${
                    isSelected
                      ? "bg-white shadow-md border-[#141715] ring-1 ring-[#141715]/10"
                      : "bg-[#F2EDE2]/70 border-[rgba(139,130,88,0.22)]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 w-full mb-2">
                    <span className="font-mono text-[11px] font-bold text-[#141715] px-2 py-0.5 rounded-full bg-white border border-[rgba(139,130,88,0.2)]">
                      {step.time}
                    </span>
                    <div className="shrink-0 flex items-center justify-center">
                      {step.renderMotionSvg(isSelected, false, `mob-card-${step.id}`)}
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#788E73] font-bold block mb-0.5">
                      {step.period}
                    </span>
                    <h4 className="font-serif text-xs font-bold text-[#141715] line-clamp-2 leading-snug">
                      {step.title}
                    </h4>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            ACTIVE CADENCE DETAILED SHOWCASE FRAME (Visible on Both Desktop & Mobile!)
            This solves the user issue: "also for mobile that another frame we have in desktop it is missing"
           ========================================================================= */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[rgba(139,130,88,0.25)] shadow-md grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left Column: Descriptive Narrative & Micro Details */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-[#141715] text-[#FAF8F3]">
                {CADENCE_STEPS[activeStep].time}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider font-semibold border ${CADENCE_STEPS[activeStep].pillColor}`}
              >
                {CADENCE_STEPS[activeStep].sensoryBadge}
              </span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#141715] leading-tight font-bold">
              {CADENCE_STEPS[activeStep].title}
            </h3>

            <p className="text-xs sm:text-sm text-[#56635A] leading-relaxed max-w-2xl font-sans">
              {CADENCE_STEPS[activeStep].narrative}
            </p>

            <div className="p-3.5 sm:p-4 rounded-xl bg-[#FAF8F3] border border-[rgba(139,130,88,0.2)] flex items-start gap-3 text-xs text-[#56635A]">
              <Sparkles className="w-4 h-4 text-[#7BA23F] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#141715] block font-mono text-[11px] uppercase tracking-wider mb-0.5">
                  Orchard Sensory Detail
                </span>
                <span className="leading-relaxed">{CADENCE_STEPS[activeStep].sensoryDetail}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Prominent Realistic Motion Vector Artwork */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl bg-[#F2EDE2]/70 border border-[rgba(139,130,88,0.2)] text-center space-y-3">
            <div className="p-4 sm:p-6 rounded-2xl bg-white shadow-sm border border-[rgba(139,130,88,0.2)] flex items-center justify-center">
              {CADENCE_STEPS[activeStep].renderMotionSvg(true, true, "showcase")}
            </div>
            <div>
              <span className="font-serif text-base sm:text-lg font-bold text-[#141715] block">
                {CADENCE_STEPS[activeStep].period}
              </span>
              <span className="text-[11px] font-mono text-[#788E73]">
                {CADENCE_STEPS[activeStep].time} • Saphale Foothills
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
