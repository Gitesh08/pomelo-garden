"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Compass, Heart, ShieldCheck, Sparkles, Sprout, Trees } from "lucide-react";

export function OurStorySection() {
  return (
    <section id="our-story" className="py-16 sm:py-24 bg-[#F2EDE2]/60 border-y border-[rgba(139,130,88,0.2)] relative overflow-hidden scroll-mt-20">
      {/* Background Subtle Watermark Vector */}
      <div className="absolute right-[-60px] top-1/2 -translate-y-1/2 w-96 h-96 pointer-events-none opacity-[0.04]">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#141715]">
          <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
          <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="1" />
          <path d="M50 15 L50 85 M15 50 L85 50" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 lg:gap-x-14 lg:gap-y-6 items-start">
          {/* 1. Heading Block (Mobile: 1st | Desktop: Top-Right) */}
          <div className="lg:col-span-6 lg:col-start-7 lg:row-start-1 space-y-2 lg:self-end">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest font-semibold text-[#788E73]">
              <Sprout className="w-4 h-4 text-[#7BA23F]" />
              <span>The Grove Roots</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#141715] tracking-tight leading-tight">
              Where Rare Citrus Flourishes and Time Slows Down
            </h2>
          </div>

          {/* 2. Layered Editorial Photo Composition (Mobile: 2nd | Desktop: Full Left Column) */}
          <div className="lg:col-span-6 lg:col-start-1 lg:row-start-1 lg:row-span-2 lg:self-center relative pb-12 sm:pb-8 pr-1 sm:pr-0">
            {/* Main Primary Image (Back Image) */}
            <div className="relative rounded-3xl overflow-hidden shadow-lg border border-[rgba(139,130,88,0.25)] bg-[#FAF8F3] aspect-[4/3] group">
              <img
                src="https://res.cloudinary.com/db7h39kx9/image/upload/v1795764399/unnamed_2_shegmv.webp"
                alt="Pomelo Garden Orchard in Saphale"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-2.5 sm:p-3 rounded-xl bg-white/90 backdrop-blur-md border border-[rgba(139,130,88,0.2)] flex items-center justify-between text-xs">
                <span className="font-mono text-[#788E73] font-semibold text-[10px] sm:text-[11px] uppercase tracking-wider">
                  Saphale Agro-Horticulture
                </span>
                <span className="font-mono text-[9px] sm:text-[10px] text-gray-500">
                  19.68° N, 72.82° E
                </span>
              </div>
            </div>

            {/* Overlapping Secondary Polaroid Style Card (Visible on Both Mobile & Desktop) */}
            <div className="absolute -bottom-6 right-1 sm:-bottom-8 sm:-right-4 w-36 sm:w-56 md:w-60 rounded-xl sm:rounded-2xl bg-white p-2 sm:p-3 shadow-2xl border border-[rgba(139,130,88,0.25)] transform rotate-2 hover:rotate-0 transition-transform duration-300 z-10">
              <div className="relative aspect-square rounded-lg sm:rounded-xl overflow-hidden bg-[#F2EDE2] mb-1.5 sm:mb-2.5">
                <img
                  src="https://res.cloudinary.com/db7h39kx9/image/upload/v1795765115/Suha_Pomelo_2019_bra7kh.jpg"
                  alt="Harvested Sweet Pomelo"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 px-1.5 py-0.5 rounded-full bg-black/70 text-white text-[8px] sm:text-[9px] font-mono tracking-wider">
                  Citrus Grandis
                </span>
              </div>
              <div className="space-y-0.5 text-center">
                <span className="block font-serif text-[11px] sm:text-xs font-bold text-[#141715] leading-tight">
                  Sweet Ruby Pomelos
                </span>
                <span className="block text-[9px] sm:text-[10px] font-mono text-[#788E73]">
                  Hand-Tended With Care
                </span>
              </div>
            </div>

            {/* Handcrafted Botanical Heritage Seal Badge */}
            <div className="absolute -top-5 -left-3 sm:-left-5 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#141715] text-[#FAF8F3] p-1.5 shadow-xl flex flex-col items-center justify-center border-2 border-[#8B8258] text-center select-none">
              <span className="text-[8px] sm:text-[9px] font-mono uppercase tracking-widest text-[#7BA23F] font-bold">
                ESTD
              </span>
              <span className="font-serif text-sm sm:text-base font-bold text-white leading-none">
                2018
              </span>
              <span className="text-[7px] sm:text-[8px] font-mono tracking-wider text-[#FAF8F3]/75 uppercase">
                Saphale
              </span>
            </div>
          </div>

          {/* 3. Narrative Content & Heritage Pillars (Mobile: 3rd | Desktop: Bottom-Right) */}
          <div className="lg:col-span-6 lg:col-start-7 lg:row-start-2 lg:self-start space-y-6">
            <div className="space-y-4 text-xs sm:text-sm text-[#56635A] leading-relaxed font-sans">
              <p>
                Tucked away in the quiet agrarian hills of Saphale, just 90 minutes from Mumbai, Pomelo Garden
                began with a singular purpose: to preserve the authentic agricultural rhythm of the coastal
                Konkan belt and nurture a sanctuary where guests can experience genuine orchard serenity.
              </p>
              <p>
                Here, there are no artificial manicured lawns or impersonal hotel corridors. Mountain spring water
                flows through earthen canals to nourish more than 300 citrus trees, coconut palms, and chikoo groves.
                Meals are cooked over slow mango wood fire, using recipes handed down through generations of coastal
                homesteads.
              </p>
            </div>

            {/* 4 Authentic Farm Pillars */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-2">
              <div className="p-3.5 sm:p-4 rounded-xl bg-white/80 border border-[rgba(139,130,88,0.2)] space-y-1">
                <span className="text-xl sm:text-2xl font-serif font-bold text-[#141715] block">
                  12 Acres
                </span>
                <span className="text-[11px] font-mono text-[#788E73] font-semibold uppercase tracking-wider block">
                  Agro-Forestry
                </span>
                <span className="text-[10px] text-gray-500 block leading-tight">
                  Zero chemical runoff or synthetic sprays
                </span>
              </div>

              <div className="p-3.5 sm:p-4 rounded-xl bg-white/80 border border-[rgba(139,130,88,0.2)] space-y-1">
                <span className="text-xl sm:text-2xl font-serif font-bold text-[#141715] block">
                  100% Spring
                </span>
                <span className="text-[11px] font-mono text-[#788E73] font-semibold uppercase tracking-wider block">
                  Mountain Aquifer
                </span>
                <span className="text-[10px] text-gray-500 block leading-tight">
                  Naturally filtered spring water pool
                </span>
              </div>

              <div className="p-3.5 sm:p-4 rounded-xl bg-white/80 border border-[rgba(139,130,88,0.2)] space-y-1">
                <span className="text-xl sm:text-2xl font-serif font-bold text-[#141715] block">
                  Clay Hearth
                </span>
                <span className="text-[11px] font-mono text-[#788E73] font-semibold uppercase tracking-wider block">
                  Chulha Dining
                </span>
                <span className="text-[10px] text-gray-500 block leading-tight">
                  Hand-pressed rice bhakri and fresh fish
                </span>
              </div>

              <div className="p-3.5 sm:p-4 rounded-xl bg-white/80 border border-[rgba(139,130,88,0.2)] space-y-1">
                <span className="text-xl sm:text-2xl font-serif font-bold text-[#141715] block">
                  5 Cottages
                </span>
                <span className="text-[11px] font-mono text-[#788E73] font-semibold uppercase tracking-wider block">
                  Intimate Privacy
                </span>
                <span className="text-[10px] text-gray-500 block leading-tight">
                  Never crowded, always tranquil
                </span>
              </div>
            </div>

            {/* Stewardship Quote & CTA */}
            <div className="pt-4 border-t border-[rgba(139,130,88,0.2)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="italic text-xs text-[#56635A] max-w-sm">
                &quot;We cultivated this orchard not as a commercial venture, but as our family retreat to share with guests who cherish nature, simple living, and wholesome food.&quot;
              </div>

              <Link
                href="/rooms"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#141715] hover:bg-[#252c27] text-[#FAF8F3] text-xs font-semibold uppercase tracking-wider transition-colors shrink-0"
              >
                <span>View Cottages</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#7BA23F]" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
