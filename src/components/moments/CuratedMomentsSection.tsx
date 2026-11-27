"use client";

import React, { useState } from "react";
import {
  Waves,
  Trees,
  Utensils,
  Sparkles,
  ArrowRight,
  Clock,
  CheckCircle,
  Eye,
} from "lucide-react";

interface MomentItem {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  tag: string;
  tagColor: string;
  imagePlaceholderNote: string;
  imageUrl: string;
  highlights: string[];
  timing: string;
}

const MOMENTS_DATA: MomentItem[] = [
  {
    id: "pool",
    category: "water",
    title: "Natural Spring Swimming Pool",
    subtitle: "Spring-Fed Mountain Aquifer",
    description:
      "A 65ft x 30ft natural spring water pool framed by chikoo trees and coconut palms. Limestone decks and teakwood loungers offer cool, chemical-free relaxation with pure water filtered through surrounding rock strata.",
    tag: "Spring-Fed Water",
    tagColor: "bg-[#38BDF8]/15 text-[#0284C7] border-[#38BDF8]/30",
    imagePlaceholderNote: "IMAGE PLACEHOLDER: Natural Spring Pool & Limestone Deck",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCi7vPw3FOLyDW6B-ZolyBkozWBkQORJidKhQUInUCmLJbZBMNYYTlcb-fvd56JmIMz36GDKdTJeXXFMDkERLMFGw7WtXfDkkiG6eFYDUNi7wOURNLCbk2JD6Hzu6tK52p71CZOE9f0rolm6lkdkkqvaSZtbclpQB5w4SXxSNPjHfsyBBYKSu3_9bGEofouHsFB52_d8x_CV69zmZieu2YKPPovgoY_z94If2FofMM",
    highlights: ["65ft x 30ft Pool Basin", "Mountain Spring Source", "Shaded Chikoo Canopy"],
    timing: "Open 07:00 AM to 08:00 PM",
  },
  {
    id: "groves",
    category: "orchard",
    title: "12-Acre Pomelo & Citrus Groves",
    subtitle: "Botanical Agro-Horticulture",
    description:
      "Stroll along earthen irrigation canals shaded by mature citrus trees. Experience guided harvest walks, inhale fragrant white pomelo blossoms in spring, and sample sun-warmed fruit harvested directly from the branch.",
    tag: "Citrus Harvest",
    tagColor: "bg-[#7BA23F]/15 text-[#5A7E24] border-[#7BA23F]/30",
    imagePlaceholderNote: "IMAGE PLACEHOLDER: Pomelo Trees & Orchard Walking Trails",
    imageUrl:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80",
    highlights: ["Over 300 Citrus Trees", "Earthen Irrigation Canals", "Seasonal Tasting Walks"],
    timing: "Daily Morning & Sunset Walks",
  },
  {
    id: "kitchen",
    category: "dining",
    title: "Home-Style Agri Chulha Kitchen",
    subtitle: "Wood-Fired Coastal Recipes",
    description:
      "Traditional clay hearth cooking using local mango and coconut timber. Enjoy piping-hot hand-pressed rice bhakri, slow-cooked gavran country chicken, fresh Surmai rawa fry, and cooling coastal solkadhi prepared with fresh coconut milk.",
    tag: "Clay Hearth",
    tagColor: "bg-[#E06354]/15 text-[#C0392B] border-[#E06354]/30",
    imagePlaceholderNote: "IMAGE PLACEHOLDER: Wood-Fired Clay Chulha & Hand-Pressed Bhakri",
    imageUrl:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
    highlights: ["100% Wood-Fired Cooking", "Hand-Pressed Rice Bhakri", "Fresh Coastal Surmai"],
    timing: "Breakfast, Lunch & Chulha Dinner",
  },
  {
    id: "bonfire",
    category: "night",
    title: "Starlit Campfire & Exclusive Buyouts",
    subtitle: "Sahyadri Evenings & Family Celebrations",
    description:
      "As dusk blankets the orchard, gather around crackling cedar wood logs under unpolluted night skies. Reserve the entire 12-acre resort with all 5 cottages for private family reunions, milestones, or peaceful group retreats.",
    tag: "Acoustic Evenings",
    tagColor: "bg-[#8B8258]/15 text-[#6B6338] border-[#8B8258]/30",
    imagePlaceholderNote: "IMAGE PLACEHOLDER: Campfire Nights Under Stars & Verandah",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC0BFb_TtjuugqlLCRyoCMFwMzIrnaIBqpH5gUUr-tFVieMrkb7rYHAEjs8hSeigzrabwNEWtAg9pQ4fRDk_lqseeU6KYUMazmawvtYhsuahjQSbIK8pUl3m4Wwep2WuVR9x1UIZOK45haQLy2OvQULp1VqrjBzAAQ3Ex1YI0f7XeRV4VRc_tJhFGuHUrSC3XEz2R8BbXz_bVxHJzAWU7KEE0IvR8tu6fj0iESVnws",
    highlights: ["Acoustic Cedar Wood Fire", "Up to 25 Guests Buyout", "Sahyadri Star Gazing"],
    timing: "Dusk to 10:30 PM",
  },
];

export function CuratedMomentsSection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedMoment, setSelectedMoment] = useState<MomentItem | null>(null);

  const filteredMoments =
    activeCategory === "all"
      ? MOMENTS_DATA
      : MOMENTS_DATA.filter((m) => m.category === activeCategory);

  return (
    <section id="orchard" className="py-14 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14 pb-6 border-b border-[rgba(139,130,88,0.2)]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7BA23F]/10 border border-[#7BA23F]/25 text-[#5A7E24] text-[11px] font-mono uppercase tracking-widest font-semibold mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7BA23F]"></span>
            <span>Slow Cadence • Saphale Foothills</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#141715] tracking-tight">
            Curated Moments in Saphale
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#56635A] max-w-md font-sans leading-relaxed">
          Misty morning birdcalls, afternoon swim in natural spring waters, and unhurried coastal meals
          under shaded pomelo branches.
        </p>
      </div>

      {/* Category Filter Pills (Mobile Scrollable) */}
      <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-8 sm:mb-10 no-scrollbar">
        {[
          { key: "all", label: "All Experiences" },
          { key: "water", label: "Spring Water Pool" },
          { key: "orchard", label: "12-Acre Groves" },
          { key: "dining", label: "Agri Kitchen" },
          { key: "night", label: "Campfires & Buyouts" },
        ].map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 shrink-0 cursor-pointer ${
              activeCategory === cat.key
                ? "bg-[#141715] text-[#FAF8F3] shadow-sm"
                : "bg-white/80 text-[#56635A] border border-[rgba(139,130,88,0.25)] hover:border-[#141715] hover:text-[#141715]"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Fresh Balanced Editorial Grid (Every Card Has Rich Imagery + Typography) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {filteredMoments.map((item, index) => (
          <div
            key={item.id}
            className="group bg-white/85 rounded-2xl sm:rounded-3xl border border-[rgba(139,130,88,0.22)] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
          >
            {/* Image Container with Inset Badges and Aspect Ratio */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden bg-[#F2EDE2]">
              <img
                src={item.imageUrl}
                alt={item.title}
                data-placeholder={item.imagePlaceholderNote}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Inset Category Tag */}
              <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 z-10">
                <span
                  className={`px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider backdrop-blur-md border ${item.tagColor}`}
                >
                  {item.tag}
                </span>
              </div>

              {/* Inset Timing Badge */}
              <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-10">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#141715]/80 backdrop-blur-md text-[#FAF8F3] text-[10px] font-mono">
                  <Clock className="w-3 h-3 text-[#7BA23F]" />
                  <span>{item.timing}</span>
                </div>
              </div>

              {/* Gradient Scrim for Contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>
            </div>

            {/* Content Body */}
            <div className="p-5 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#788E73] font-semibold block">
                  {item.subtitle}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#141715] leading-tight">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#56635A] leading-relaxed pt-1">
                  {item.description}
                </p>
              </div>

              {/* Highlights Chips */}
              <div className="pt-4 border-t border-[rgba(139,130,88,0.18)] flex flex-wrap items-center gap-2">
                {item.highlights.map((h, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#FAF8F3] border border-[rgba(139,130,88,0.2)] text-[11px] font-mono text-[#56635A]"
                  >
                    <CheckCircle className="w-3 h-3 text-[#7BA23F]" />
                    <span>{h}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Editorial Callout */}
      <div className="mt-10 sm:mt-14 p-6 sm:p-8 rounded-2xl bg-[#F2EDE2]/70 border border-[rgba(139,130,88,0.25)] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white border border-[rgba(139,130,88,0.25)] flex items-center justify-center text-[#7BA23F] shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-serif text-base sm:text-lg text-[#141715]">
              Looking to celebrate a special occasion?
            </h4>
            <p className="text-xs text-[#56635A]">
              We arrange bespoke candlelight orchard dinners, guided harvests, and custom barbecue setups.
            </p>
          </div>
        </div>

        <a
          href="https://wa.me/919850607607?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20a%20special%20occasion%20or%20buyout%20at%20Pomelo%20Garden."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#141715] hover:bg-[#252c27] text-[#FAF8F3] text-xs uppercase tracking-wider font-semibold transition-colors shrink-0"
        >
          <span>Inquire on WhatsApp</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#7BA23F]" />
        </a>
      </div>
    </section>
  );
}
