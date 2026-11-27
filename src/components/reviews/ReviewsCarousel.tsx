"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle } from "lucide-react";

interface ReviewItem {
  id: string;
  name: string;
  city: string;
  stayType: string;
  rating: number;
  date: string;
  quote: string;
  avatarSeed: string;
}

const REVIEWS_DATA: ReviewItem[] = [
  {
    id: "rev-1",
    name: "Dr. Vikram Deshmukh",
    city: "Bandra West, Mumbai",
    stayType: "Overnight Family Stay (8 Guests)",
    rating: 5,
    date: "Visited November 2026",
    quote:
      "We visited with 8 family members for an overnight retreat. The chulha-cooked chicken curry with hot rice bhakri was truly unforgettable. Spotlessly clean cottage rooms, tranquil pool, and crisp morning air under the pomelo trees.",
    avatarSeed: "VD",
  },
  {
    id: "rev-2",
    name: "Ananya & Rohan Merchant",
    city: "Kothrud, Pune",
    stayType: "Couples Plunge Pool Villa",
    rating: 5,
    date: "Visited November 2026",
    quote:
      "Celebrated our wedding anniversary in the plunge villa. The private dip pool overlooking the misty Ghats ridge gave us complete privacy. Watching sunset from our terrace while sipping fresh kokum sherbet was magical.",
    avatarSeed: "AR",
  },
  {
    id: "rev-3",
    name: "Farhan Merchant",
    city: "South Mumbai",
    stayType: "One-Day Picnic Harvest Retreat",
    rating: 5,
    date: "Visited November 2026",
    quote:
      "Took the One-Day Picnic package from Mumbai. Just 10 minutes from Saphale railway station. We plucked sweet ripe pomelos right off the trees, swam in the spring pool, and enjoyed an extraordinary coastal Agri buffet.",
    avatarSeed: "FM",
  },
  {
    id: "rev-4",
    name: "Pooja & Sameer Kulkarni",
    city: "Thane West",
    stayType: "Deluxe Citrus Cottage (AC)",
    rating: 5,
    date: "Visited October 2026",
    quote:
      "A rare slow-living sanctuary just 90 minutes from the city. The teakwood cottages with private garden sit-outs are beautifully kept. The evening acoustic campfire and stargazing made our weekend genuinely restorative.",
    avatarSeed: "PK",
  },
  {
    id: "rev-5",
    name: "Kapadia Group Alumni",
    city: "Borivali, Mumbai",
    stayType: "Private Property Buyout",
    rating: 5,
    date: "Visited October 2026",
    quote:
      "We booked all 5 cottages exclusively for our college batch reunion. Having the entire 12-acre campus, private pool, and dedicated kitchen staff all to ourselves made it feel like a private luxury estate.",
    avatarSeed: "KG",
  },
];

export function ReviewsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const total = REVIEWS_DATA.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Touch gesture handling for mobile screens
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchEndX(null);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    const isSwipeLeft = distance > 45;
    const isSwipeRight = distance < -45;

    if (isSwipeLeft) {
      nextSlide();
    } else if (isSwipeRight) {
      prevSlide();
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  // Optional subtle auto-rotation when not hovered
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  const activeReview = REVIEWS_DATA[currentIndex];

  return (
    <div
      className="relative w-full max-w-5xl mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* =========================================================================
          CAROUSEL CONTAINER WITH FLUID TOUCH GESTURES
         ========================================================================= */}
      <div
        className="relative overflow-hidden rounded-3xl bg-white border border-[rgba(139,130,88,0.22)] shadow-sm p-6 sm:p-10 md:p-12 transition-all"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Subtle Decorative Quote Watermark */}
        <div className="absolute top-4 right-6 pointer-events-none select-none opacity-5 text-[#E06354]">
          <Quote className="w-24 h-24 sm:w-32 sm:h-32" />
        </div>

        {/* Slide Content */}
        <div className="relative z-10 flex flex-col justify-between min-h-[260px] sm:min-h-[220px]">
          {/* Top Row: Stars & Stay Badge */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[rgba(139,130,88,0.14)]">
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-1">
                {[...Array(activeReview.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#E06354] text-[#E06354]" />
                ))}
              </div>
              <span className="font-mono text-xs font-bold text-[#141715] ml-1">
                5.0 Verified Stay
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-mono text-[#788E73]">
              <CheckCircle className="w-3.5 h-3.5 text-[#7BA23F]" />
              <span>{activeReview.stayType}</span>
            </div>
          </div>

          {/* Middle: Review Quote Body */}
          <div className="py-6 sm:py-8">
            <p className="font-serif text-lg sm:text-2xl md:text-3xl text-[#141715] font-light leading-relaxed italic">
              &ldquo;{activeReview.quote}&rdquo;
            </p>
          </div>

          {/* Bottom: Author Details & Date */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[rgba(139,130,88,0.14)]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#141715] text-[#FAF8F3] font-serif font-bold text-sm flex items-center justify-center shrink-0 shadow-xs">
                {activeReview.avatarSeed}
              </div>
              <div>
                <span className="font-serif font-bold text-[#141715] text-base block leading-none">
                  {activeReview.name}
                </span>
                <span className="text-xs text-[#56635A] mt-0.5 block font-sans">
                  {activeReview.city}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-[11px] font-mono text-[#788E73]">
                {activeReview.date}
              </span>

              {/* Slide Counter (e.g. 01 / 05) */}
              <span className="font-mono text-xs font-bold text-[#141715] bg-[#F2EDE2] px-2.5 py-1 rounded-md">
                0{currentIndex + 1} / 0{total}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          CONTROLS: ARROWS & INDICATOR PILLS (TOUCH & DESKTOP ACCESSIBLE)
         ========================================================================= */}
      <div className="flex items-center justify-between mt-6 px-2">
        {/* Paging Dots */}
        <div className="flex items-center gap-2">
          {REVIEWS_DATA.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                currentIndex === idx
                  ? "w-8 h-2.5 bg-[#141715]"
                  : "w-2.5 h-2.5 bg-[rgba(139,130,88,0.3)] hover:bg-[rgba(139,130,88,0.6)]"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Prev / Next Arrows */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={prevSlide}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white hover:bg-[#FAF8F3] border border-[rgba(139,130,88,0.25)] flex items-center justify-center text-[#141715] shadow-xs hover:shadow transition-all active:scale-95 cursor-pointer"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#141715] hover:bg-[#28302b] text-[#FAF8F3] flex items-center justify-center shadow-xs hover:shadow transition-all active:scale-95 cursor-pointer"
            aria-label="Next review"
          >
            <ChevronRight className="w-5 h-5 text-[#FAF8F3]" />
          </button>
        </div>
      </div>
    </div>
  );
}
