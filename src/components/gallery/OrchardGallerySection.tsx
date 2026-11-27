"use client";

import React, { useState, useRef } from "react";
import { Image as ImageIcon, X, Maximize2, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryPhoto {
  id: string;
  title: string;
  category: "orchard" | "pool" | "dining" | "cottage";
  categoryLabel: string;
  caption: string;
  aspect: string; // Tailwind aspect ratio or col-span
  imageUrl: string;
  placeholderId: string;
}

const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: "g1",
    title: "12-Acre Pomelo Groves in Morning Light",
    category: "orchard",
    categoryLabel: "The Groves",
    caption: "Sunbeams filtering through leafy citrus boughs and earthen irrigation canals at 7:00 AM.",
    aspect: "col-span-1 md:col-span-2 md:row-span-2 aspect-[4/3] md:aspect-auto",
    imageUrl:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80",
    placeholderId: "GALLERY_SLOT_1_ORCHARD_MAIN",
  },
  {
    id: "g2",
    title: "Spring Water Plunge & Limestone Deck",
    category: "pool",
    categoryLabel: "Spring Pool",
    caption: "Cold mountain spring water naturally filtered through surrounding rock strata.",
    aspect: "col-span-1 aspect-[4/3]",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCi7vPw3FOLyDW6B-ZolyBkozWBkQORJidKhQUInUCmLJbZBMNYYTlcb-fvd56JmIMz36GDKdTJeXXFMDkERLMFGw7WtXfDkkiG6eFYDUNi7wOURNLCbk2JD6Hzu6tK52p71CZOE9f0rolm6lkdkkqvaSZtbclpQB5w4SXxSNPjHfsyBBYKSu3_9bGEofouHsFB52_d8x_CV69zmZieu2YKPPovgoY_z94If2FofMM",
    placeholderId: "GALLERY_SLOT_2_POOL",
  },
  {
    id: "g3",
    title: "Hand-Pressed Rice Bhakri on Clay Hearth",
    category: "dining",
    categoryLabel: "Agri Feast",
    caption: "Freshly roasted over mango wood coals with country chicken gravy and solkadhi.",
    aspect: "col-span-1 aspect-[4/3]",
    imageUrl:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
    placeholderId: "GALLERY_SLOT_3_CHULHA_DINING",
  },
  {
    id: "g4",
    title: "Cottage Verandah Overlooking Citrus Trees",
    category: "cottage",
    categoryLabel: "Cottages & Nights",
    caption: "Teakwood armchairs and breezy outdoor deck for quiet afternoon reading.",
    aspect: "col-span-1 aspect-[4/3]",
    imageUrl:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    placeholderId: "GALLERY_SLOT_4_COTTAGE_VERANDAH",
  },
  {
    id: "g5",
    title: "Sun-Ripened Ruby Pomelo Harvest",
    category: "orchard",
    categoryLabel: "The Groves",
    caption: "Fragrant sweet citrus picked fresh from mature grove branches in seasonal harvest.",
    aspect: "col-span-1 aspect-[4/3]",
    imageUrl:
      "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800&q=80",
    placeholderId: "GALLERY_SLOT_5_HARVEST_CLOSEUP",
  },
  {
    id: "g6",
    title: "Cedar Campfire Under Sahyadri Stars",
    category: "cottage",
    categoryLabel: "Cottages & Nights",
    caption: "Wood-fired acoustic evenings with acoustic music and slow storytelling.",
    aspect: "col-span-1 md:col-span-2 aspect-[16/9] md:aspect-auto",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC0BFb_TtjuugqlLCRyoCMFwMzIrnaIBqpH5gUUr-tFVieMrkb7rYHAEjs8hSeigzrabwNEWtAg9pQ4fRDk_lqseeU6KYUMazmawvtYhsuahjQSbIK8pUl3m4Wwep2WuVR9x1UIZOK45haQLy2OvQULp1VqrjBzAAQ3Ex1YI0f7XeRV4VRc_tJhFGuHUrSC3XEz2R8BbXz_bVxHJzAWU7KEE0IvR8tu6fj0iESVnws",
    placeholderId: "GALLERY_SLOT_6_CAMPFIRE_NIGHT",
  },
];

export function OrchardGallerySection() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [lightboxPhoto, setLightboxPhoto] = useState<GalleryPhoto | null>(null);
  const [mobileSlide, setMobileSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const filteredPhotos =
    activeFilter === "all"
      ? GALLERY_PHOTOS
      : GALLERY_PHOTOS.filter((p) => p.category === activeFilter);

  const handleFilterChange = (key: string) => {
    setActiveFilter(key);
    setMobileSlide(0);
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  };

  const scrollToSlide = (index: number) => {
    if (!carouselRef.current) return;
    const clamped = Math.max(0, Math.min(index, filteredPhotos.length - 1));
    setMobileSlide(clamped);
    const child = carouselRef.current.children[clamped] as HTMLElement | undefined;
    if (child) {
      carouselRef.current.scrollTo({
        left: child.offsetLeft - 16,
        behavior: "smooth",
      });
    }
  };

  const handleCarouselScroll = () => {
    if (!carouselRef.current) return;
    const el = carouselRef.current;
    const cardWidth = (el.firstElementChild as HTMLElement | null)?.offsetWidth || 300;
    const idx = Math.round(el.scrollLeft / (cardWidth + 16));
    if (idx >= 0 && idx < filteredPhotos.length) {
      setMobileSlide(idx);
    }
  };

  return (
    <section id="gallery" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7BA23F]/10 border border-[#7BA23F]/25 text-[#5A7E24] text-[11px] font-mono uppercase tracking-widest font-semibold mb-3">
            <ImageIcon className="w-3.5 h-3.5 text-[#7BA23F]" />
            <span>Visual Stories • Grove Perspectives</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#141715] tracking-tight">
            Glimpses of Grove Life
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#56635A] max-w-md font-sans leading-relaxed">
          A visual chronicle of quiet mornings, natural pool dips, clay hearth feasts, and starry Sahyadri
          night skies.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-8 sm:mb-10 no-scrollbar">
        {[
          { key: "all", label: "All Glimpses" },
          { key: "orchard", label: "The Groves" },
          { key: "pool", label: "Spring Pool" },
          { key: "dining", label: "Agri Feast" },
          { key: "cottage", label: "Cottages & Bonfires" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => handleFilterChange(tab.key)}
            className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 shrink-0 cursor-pointer ${
              activeFilter === tab.key
                ? "bg-[#141715] text-[#FAF8F3] shadow-sm"
                : "bg-white/80 text-[#56635A] border border-[rgba(139,130,88,0.25)] hover:border-[#141715] hover:text-[#141715]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* MOBILE CAROUSEL (md:hidden): Smooth Snap Swipeable Deck */}
      <div className="md:hidden space-y-4">
        <div
          ref={carouselRef}
          onScroll={handleCarouselScroll}
          className="flex items-stretch gap-4 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setLightboxPhoto(photo)}
              className="w-[82vw] max-w-[340px] shrink-0 snap-center relative rounded-2xl overflow-hidden border border-[rgba(139,130,88,0.22)] bg-[#F2EDE2] shadow-sm cursor-pointer"
            >
              <div className="aspect-[4/3] w-full relative overflow-hidden">
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  data-gallery-slot={photo.placeholderId}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/45 backdrop-blur-md text-[10px] font-mono uppercase tracking-wider text-white">
                  {photo.categoryLabel}
                </span>
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/45 backdrop-blur-md flex items-center justify-center text-white">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white space-y-0.5">
                  <h4 className="font-serif text-base font-bold leading-snug">{photo.title}</h4>
                  <p className="text-[11px] text-white/80 line-clamp-1">{photo.caption}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Carousel Controls */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5">
            {filteredPhotos.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => scrollToSlide(idx)}
                aria-label={`Slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  mobileSlide === idx ? "w-5 bg-[#141715]" : "w-1.5 bg-[#8B8258]/30"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollToSlide(mobileSlide - 1)}
              disabled={mobileSlide === 0}
              className="w-8 h-8 rounded-full border border-[rgba(139,130,88,0.25)] bg-white flex items-center justify-center text-[#141715] disabled:opacity-35 cursor-pointer"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollToSlide(mobileSlide + 1)}
              disabled={mobileSlide >= filteredPhotos.length - 1}
              className="w-8 h-8 rounded-full border border-[rgba(139,130,88,0.25)] bg-white flex items-center justify-center text-[#141715] disabled:opacity-35 cursor-pointer"
              aria-label="Next photo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* DESKTOP EDITORIAL PHOTO MOSAIC (hidden md:grid) */}
      <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-5 auto-rows-[260px]">
        {filteredPhotos.map((photo) => (
          <div
            key={photo.id}
            onClick={() => setLightboxPhoto(photo)}
            className={`group relative rounded-2xl overflow-hidden border border-[rgba(139,130,88,0.22)] bg-[#F2EDE2] cursor-pointer shadow-xs hover:shadow-md transition-all duration-300 ${photo.aspect}`}
          >
            {/* Image Tag with explicit user placeholder identifier */}
            <img
              src={photo.imageUrl}
              alt={photo.title}
              data-gallery-slot={photo.placeholderId}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />

            {/* Gradient Dark Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 sm:p-5 text-white">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-mono uppercase tracking-wider text-white">
                  {photo.categoryLabel}
                </span>
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="space-y-1">
                <h4 className="font-serif text-base sm:text-lg font-bold text-white leading-tight">
                  {photo.title}
                </h4>
                <p className="text-[11px] text-white/80 line-clamp-2 font-sans">
                  {photo.caption}
                </p>
              </div>
            </div>

            {/* Always Visible Category Chip for Mobile */}
            <div className="sm:hidden absolute bottom-2 left-2 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-[10px] font-mono text-white">
              {photo.title}
            </div>
          </div>
        ))}
      </div>

      {/* Placeholder Help Guide for Owner */}
      <div className="mt-8 text-center text-xs font-mono text-gray-500">
        <span>Click any photograph to view high-resolution perspective</span>
      </div>

      {/* Lightbox Modal */}
      {lightboxPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative max-w-4xl w-full bg-[#141715] text-[#FAF8F3] rounded-3xl overflow-hidden shadow-2xl border border-white/15">
            {/* Close Button */}
            <button
              onClick={() => setLightboxPhoto(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image Frame */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-black">
              <img
                src={lightboxPhoto.imageUrl}
                alt={lightboxPhoto.title}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Modal Caption */}
            <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/10 bg-[#141715]">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#7BA23F]/20 text-[#7BA23F] font-mono text-[10px] uppercase font-bold tracking-wider">
                    {lightboxPhoto.categoryLabel}
                  </span>
                  <span className="text-xs font-mono text-gray-400">
                    Saphale, Maharashtra
                  </span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl text-white">
                  {lightboxPhoto.title}
                </h3>
                <p className="text-xs text-gray-300 max-w-xl font-sans">
                  {lightboxPhoto.caption}
                </p>
              </div>

              <div className="text-[10px] font-mono text-gray-400">
                {lightboxPhoto.placeholderId}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
