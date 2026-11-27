"use client";

import React from "react";
import { Leaf, Flame, Wheat, ArrowUpRight } from "lucide-react";

export function OrchardDiningSection() {
  return (
    <section
      id="dining"
      className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-6 lg:gap-x-12 lg:gap-y-5 items-start">
        {/* 1. Heading & Intro (Mobile: 1st | Desktop: Top-Right) */}
        <div className="lg:col-span-6 lg:col-start-7 lg:row-start-1 space-y-2.5 lg:self-end">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#E06354] font-bold block">
            Epicurean Hearth
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] text-[#141715] font-normal leading-[1.12] tracking-tight">
            Dining sheltered beneath the timber eaves.
          </h2>
          <p className="text-xs sm:text-sm text-[#56635A] leading-relaxed max-w-xl">
            Feast with barefoot ease under rustic exposed sal-wood trusses. The pavilion frames rows
            of fruiting trees that cast soft shifting shadows across linen-draped banquet tables.
          </p>
        </div>

        {/* 2. Dining Photography with Overlaid Badges (Mobile: 2nd | Desktop: Full Left Column) */}
        <div className="lg:col-span-6 lg:col-start-1 lg:row-start-1 lg:row-span-2 lg:self-center">
          <div className="relative">
            {/* Main Photo Frame */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-[4/3] bg-[#F2EDE2] border border-[rgba(139,130,88,0.18)]">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80"
                alt="Community long-table harvest dining beneath the orchard pavilion at Pomelo Garden"
                data-dining-slot="DINING_MAIN_IMAGE"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

              {/* Bottom-Left Overlay Label */}
              <div className="absolute bottom-9 sm:bottom-5 left-3 sm:left-4 bg-[#FAF8F3]/95 backdrop-blur-sm rounded-lg px-3 py-2 sm:px-3.5 sm:py-2.5 shadow-md max-w-[190px] sm:max-w-[250px]">
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#788E73] font-bold block">
                  The Verandah Hearth
                </span>
                <span className="font-serif text-xs sm:text-sm font-bold text-[#141715] leading-snug block mt-0.5">
                  Community Long-Table Harvest Lunch
                </span>
              </div>
            </div>

            {/* Overlapping Bottom-Right Callout Card (Flush to right edge) */}
            <div className="relative z-10 -mt-7 ml-auto mr-0 lg:-mr-4 w-[74%] sm:w-[275px] bg-white rounded-xl p-3.5 sm:p-4 shadow-xl border border-[rgba(139,130,88,0.16)] flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#FAF8F3] border border-[#E06354]/25 flex items-center justify-center shrink-0 mt-0.5">
                <Leaf className="w-4 h-4 text-[#E06354]" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#141715] block">
                  100% Zero-Food-Miles
                </span>
                <span className="text-[11px] text-[#56635A] leading-snug block mt-0.5">
                  Gathered mornings from our perimeter groves.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Dish Highlight Cards & CTA (Mobile: 3rd | Desktop: Bottom-Right) */}
        <div className="lg:col-span-6 lg:col-start-7 lg:row-start-2 space-y-4 lg:self-start">
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-white border border-[rgba(139,130,88,0.16)] flex items-start gap-3.5 shadow-2xs">
              <Wheat className="w-4 h-4 text-[#788E73] shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <h3 className="text-xs sm:text-sm font-bold text-[#141715]">
                  Pomelo &amp; Wild Basil Carpaccio
                </h3>
                <p className="text-[11px] sm:text-xs text-[#56635A] leading-relaxed">
                  Ruby pulp segments, cold-pressed mustard oil, sea salt, garden mint.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[rgba(139,130,88,0.16)] flex items-start gap-3.5 shadow-2xs">
              <Flame className="w-4 h-4 text-[#E06354] shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <h3 className="text-xs sm:text-sm font-bold text-[#141715]">
                  Cast-Iron Mudpot Sourdough &amp; Dal
                </h3>
                <p className="text-[11px] sm:text-xs text-[#56635A] leading-relaxed">
                  Fermented over 36 hours, baked in wood charcoal pits alongside smoky lentils.
                </p>
              </div>
            </div>
          </div>

          <div>
            <a
              href="https://wa.me/919850607607?text=Hello%2C%20I%20would%20like%20to%20view%20the%20Pomelo%20Garden%20tasting%20menu%20and%20dining%20options."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-widest text-[#B93A2B] hover:text-[#141715] transition-colors"
            >
              <span>View Pavilion Tasting Menu</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
