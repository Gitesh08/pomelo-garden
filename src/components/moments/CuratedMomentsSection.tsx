"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface MomentItem {
  id: string;
  title: string;
  timing: string;
  summary: string;
  details: string;
  highlights: string[];
  imageUrl: string;
  imagePlaceholderNote: string;
}

const MOMENTS_DATA: MomentItem[] = [
  {
    id: "pool",
    title: "Natural Spring Swimming Pool",
    timing: "7:00 AM - 8:00 PM",
    summary: "65ft x 30ft, spring-fed and chemical-free.",
    details:
      "Framed by chikoo trees and coconut palms, with limestone decks and teakwood loungers fed by pure rock-filtered mountain spring water.",
    highlights: ["Mountain Spring Source", "Shaded Chikoo Canopy"],
    imageUrl:
      "https://res.cloudinary.com/db7h39kx9/image/upload/v1795807445/Where_nature_paints_its_own_masterpiece._pkydvb.webp",
    imagePlaceholderNote: "IMAGE PLACEHOLDER: Natural Spring Pool & Limestone Deck",
  },
  {
    id: "groves",
    title: "12-Acre Pomelo & Citrus Groves",
    timing: "Morning & Sunset Walks",
    summary: "Harvest walks past 300+ citrus trees.",
    details:
      "Stroll along earthen irrigation canals shaded by mature citrus trees, inhale white pomelo blossoms, and sample sun-warmed fruit straight from the branch.",
    highlights: ["Over 300 Citrus Trees", "Seasonal Tasting Walks"],
    imageUrl:
      "https://res.cloudinary.com/db7h39kx9/image/upload/v1795764401/unnamed_khku8c.webp",
    imagePlaceholderNote: "IMAGE PLACEHOLDER: Pomelo Trees & Orchard Walking Trails",
  },
  {
    id: "kitchen",
    title: "Agri Chulha Kitchen",
    timing: "Breakfast, Lunch & Dinner",
    summary: "Bhakri and gavran chicken on a clay hearth.",
    details:
      "Traditional wood-fired cooking using local mango and coconut timber, serving piping-hot hand-pressed rice bhakri, fresh Surmai rawa fry, and cooling solkadhi.",
    highlights: ["100% Wood-Fired", "Fresh Coastal Surmai"],
    imageUrl:
      "https://res.cloudinary.com/db7h39kx9/image/upload/v1795808546/unnamed_9_cdft18.jpg",
    imagePlaceholderNote: "IMAGE PLACEHOLDER: Wood-Fired Clay Chulha & Hand-Pressed Bhakri",
  },
  {
    id: "bonfire",
    title: "Starlit Campfire",
    timing: "Dusk - 10:30 PM",
    summary: "Cedar-wood fire under dark Sahyadri skies.",
    details:
      "As dusk blankets the orchard, gather around crackling cedar logs or reserve the entire 12-acre resort with all 5 cottages for private family milestones.",
    highlights: ["Acoustic Cedar Wood Fire", "Sahyadri Star Gazing"],
    imageUrl:
      "https://res.cloudinary.com/db7h39kx9/image/upload/v1795808512/Untitled_design_1_rto5ox.webp",
    imagePlaceholderNote: "IMAGE PLACEHOLDER: Campfire Nights Under Stars & Verandah",
  },
];

export function CuratedMomentsSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleCard = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="orchard"
      className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20"
    >
      {/* Clean Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8">
        <div className="space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#788E73] font-semibold block">
            Saphale Foothills
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#141715] font-normal tracking-tight leading-[1.1]">
            What You&apos;ll Do Here
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-[#56635A] max-w-md leading-relaxed">
          Spring-water swims, harvest walks, and coastal meals under pomelo branches.
        </p>
      </div>

      {/* Subtle Meta Prompt */}
      <div className="mb-5 text-[10px] font-mono uppercase tracking-widest text-[#8B8258] font-medium">
        4 Experiences · Tap any card for details
      </div>

      {/* 4 Experience Cards (Uniform Clean Layout on Mobile & Desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {MOMENTS_DATA.map((item) => {
          const isExpanded = expandedId === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => toggleCard(item.id)}
              aria-expanded={isExpanded}
              className="group text-left bg-white rounded-2xl border border-[rgba(139,130,88,0.2)] overflow-hidden shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col cursor-pointer"
            >
              {/* Clean Uncluttered Photo Frame */}
              <div className="w-full aspect-[16/10] overflow-hidden bg-[#F2EDE2]">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  data-placeholder={item.imagePlaceholderNote}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                />
              </div>

              {/* Compact Content Body */}
              <div className="p-4 sm:p-6 w-full space-y-2.5 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-serif text-xl sm:text-2xl text-[#141715] font-medium leading-snug">
                      {item.title}
                    </h3>
                    <ChevronDown
                      className={`w-4 h-4 text-[#8B8258] shrink-0 mt-1.5 transition-transform duration-200 ${
                        isExpanded ? "rotate-180 text-[#141715]" : ""
                      }`}
                    />
                  </div>

                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#788E73] font-semibold block">
                    {item.timing}
                  </span>

                  <p className="text-xs sm:text-sm text-[#56635A] leading-relaxed pt-0.5">
                    {item.summary}
                  </p>

                  {isExpanded && (
                    <p className="text-xs sm:text-sm text-[#141715]/85 leading-relaxed pt-2 border-t border-[rgba(139,130,88,0.14)] mt-2">
                      {item.details}
                    </p>
                  )}
                </div>

                {/* Two Restrained Hairline Pills */}
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  {item.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full border border-[rgba(139,130,88,0.28)] bg-[#FAF8F3] text-[11px] font-sans text-[#56635A]"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Grounded Dark Forest Bottom Callout */}
      <div className="mt-6 sm:mt-8 p-6 sm:p-8 rounded-2xl bg-[#101814] text-[#FAF8F3] flex flex-col sm:flex-row sm:items-center justify-between gap-5 shadow-md">
        <div className="space-y-1.5 max-w-xl">
          <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal leading-tight">
            Celebrating something?
          </h3>
          <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
            Buyouts for up to 25 guests, candlelight orchard dinners and custom barbecue setups.
          </p>
        </div>

        <a
          href="https://wa.me/919850607607?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20a%20special%20occasion%20or%20buyout%20at%20Pomelo%20Garden."
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#1E6F50] hover:bg-[#185e43] text-white text-xs sm:text-sm font-semibold text-center transition-colors shrink-0"
        >
          Inquire on WhatsApp
        </a>
      </div>
    </section>
  );
}
