"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  MessageSquare,
  MapPin,
  Phone,
  ArrowRight,
  Clock,
  Sparkles,
  Car,
  Utensils,
  Waves,
  Menu,
  X,
  Compass,
  Star,
  Zap,
  Trees,
  ShieldCheck,
  Heart,
  Send,
  Bed,
  CheckCircle,
} from "lucide-react";
import { PomeloSliceDivider } from "@/components/vectors/PomeloSliceDivider";
import { BotanicalCornerSprig } from "@/components/vectors/BotanicalCornerSprig";
import { GhatsContourBadge } from "@/components/vectors/GhatsContourBadge";
import { OrganicWaveHero } from "@/components/vectors/OrganicWaveHero";
import { BotanicalFlowerAccent } from "@/components/vectors/BotanicalFlowerAccent";
import { LuxuryDateModal } from "@/components/booking/LuxuryDateModal";
import { FloatingBookingBar } from "@/components/booking/FloatingBookingBar";
import { ReviewsCarousel } from "@/components/reviews/ReviewsCarousel";
import { ArtisanalAmenitiesRibbon } from "@/components/amenities/ArtisanalAmenitiesRibbon";
import { CuratedMomentsSection } from "@/components/moments/CuratedMomentsSection";
import { OurStorySection } from "@/components/story/OurStorySection";
import { OrchardGallerySection } from "@/components/gallery/OrchardGallerySection";
import { OrchardDiningSection } from "@/components/dining/OrchardDiningSection";
import { DailyRhythmSection } from "@/components/rhythm/DailyRhythmSection";

export default function GuestLandingPage() {
  const router = useRouter();
  const heroRef = useRef<HTMLElement>(null);
  const [navSolid, setNavSolid] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const headerHeight = window.innerWidth >= 640 ? 96 : 80;
      setNavSolid(rect.bottom <= headerHeight);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // --- Luxury Booking State ---
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [adultCount, setAdultCount] = useState(2);
  const [childCount, setChildCount] = useState(0);

  const handleApplyCalendarDates = (start: string, end: string) => {
    setStartDate(start);
    setEndDate(end);
  };

  const handleNavigateToRooms = () => {
    const q = new URLSearchParams();
    if (startDate) q.set("checkIn", startDate);
    if (endDate) q.set("checkOut", endDate);
    q.set("adults", String(adultCount));
    q.set("children", String(childCount));
    router.push(`/rooms?${q.toString()}`);
  };

  const directWhatsAppUrl = `https://wa.me/919850607607?text=${encodeURIComponent(
    `Hello, I would like to inquire about staying at Pomelo Garden Saphale for ${startDate} to ${endDate} (${adultCount} Adults). Please assist!`
  )}`;

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#141715] font-sans selection:bg-[#E06354]/20">
      {/* =========================================================================
          1. FIXED MINIMAL HEADER (Transparent over Hero, Ivory Frost on Scroll)
         ========================================================================= */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 w-full transition-colors duration-300 ${
          navSolid
            ? "bg-[#FAF8F3]/95 backdrop-blur-md border-b border-[rgba(139,130,88,0.16)] shadow-xs"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-24 flex items-center justify-between">
          {/* Logo Only (Enlarged for clear crest legibility) */}
          <Link href="/" className="flex items-center group" aria-label="Pomelo Garden Home">
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden bg-white border border-[rgba(139,130,88,0.22)] flex items-center justify-center p-1 shadow-md shrink-0">
              <img
                src="/images/pomelo-logo.png"
                alt="Pomelo Garden Logo"
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            className={`hidden md:flex items-center gap-6 lg:gap-8 text-xs font-semibold tracking-wider uppercase transition-colors ${
              navSolid ? "text-[#56635A]" : "text-white drop-shadow-xs"
            }`}
          >
            <Link
              href={`/rooms?checkIn=${startDate}&checkOut=${endDate}&adults=${adultCount}&children=${childCount}`}
              className={`transition-colors relative py-1 ${
                navSolid ? "hover:text-[#141715]" : "hover:text-white/80"
              }`}
            >
              Cottages
            </Link>
            <a
              href="#orchard"
              className={`transition-colors relative py-1 ${
                navSolid ? "hover:text-[#141715]" : "hover:text-white/80"
              }`}
            >
              Experiences
            </a>
            <a
              href="#our-story"
              className={`transition-colors relative py-1 ${
                navSolid ? "hover:text-[#141715]" : "hover:text-white/80"
              }`}
            >
              Our Story
            </a>
            <a
              href="#gallery"
              className={`transition-colors relative py-1 ${
                navSolid ? "hover:text-[#141715]" : "hover:text-white/80"
              }`}
            >
              Gallery
            </a>
            <a
              href="#daily-rhythm"
              className={`transition-colors relative py-1 ${
                navSolid ? "hover:text-[#141715]" : "hover:text-white/80"
              }`}
            >
              Daily Rhythm
            </a>
            <a
              href="#location"
              className={`transition-colors relative py-1 ${
                navSolid ? "hover:text-[#141715]" : "hover:text-white/80"
              }`}
            >
              Location
            </a>
          </nav>

          {/* WhatsApp Reserve CTA & Mobile Hamburger */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <a
              href={directWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white text-xs uppercase tracking-wider font-bold px-4 sm:px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all duration-200 shrink-0 active:scale-95"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 shrink-0"
                aria-hidden="true"
              >
                <path d="M12.031 2c-5.516 0-9.969 4.453-9.969 9.969 0 1.766.469 3.484 1.344 5l-1.406 5.156 5.281-1.375c1.469.797 3.109 1.219 4.75 1.219 5.516 0 9.969-4.453 9.969-9.969S17.547 2 12.031 2zm5.813 14.125c-.25.703-1.438 1.344-2 1.422-.531.078-1.203.109-1.938-.125-.453-.141-1.031-.328-1.766-.656-3.094-1.344-5.109-4.484-5.266-4.688-.156-.203-1.266-1.688-1.266-3.219s.797-2.281 1.078-2.594c.281-.313.609-.391.813-.391.203 0 .406.016.578.016.188 0 .438-.078.688.516.25.609.859 2.094.938 2.25.078.156.125.344.031.547-.094.203-.141.328-.297.5-.156.172-.313.391-.453.516-.156.141-.313.297-.141.594.172.297.781 1.281 1.672 2.078 1.156 1.031 2.125 1.344 2.422 1.5.297.156.469.125.641-.078.172-.203.75-.875.953-1.172.203-.297.406-.25.672-.156.266.094 1.719.813 2.016.953.297.156.484.234.563.359.078.125.078.734-.172 1.438z" />
              </svg>
              <span>Reserve</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2.5 rounded-full transition-colors cursor-pointer ${
                navSolid
                  ? "text-[#141715] hover:bg-[#F2EDE2]"
                  : "text-white bg-black/25 hover:bg-black/40 backdrop-blur-xs border border-white/25 shadow-sm"
              }`}
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" strokeWidth={2.25} />
              ) : (
                <Menu className="w-6 h-6" strokeWidth={2.25} />
              )}
            </button>
          </div>
        </div>

        {/* Full Mobile Navigation Drawer Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex flex-col">
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="relative bg-[#FAF8F3] border-b border-[rgba(139,130,88,0.25)] p-5 space-y-4 shadow-2xl z-10 animate-in slide-in-from-top duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-[rgba(139,130,88,0.16)]">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-white p-1 border border-[rgba(139,130,88,0.25)]">
                  <img
                    src="/images/pomelo-logo.png"
                    alt="Pomelo Garden Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-[#141715] hover:bg-[#F2EDE2]"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex flex-col space-y-1">
                <Link
                  href={`/rooms?checkIn=${startDate}&checkOut=${endDate}&adults=${adultCount}&children=${childCount}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between text-sm font-semibold tracking-wider uppercase text-[#141715] py-2.5 px-2 rounded-lg hover:bg-[#F2EDE2] transition-colors"
                >
                  <span>Cottages</span>
                </Link>
                {[
                  { name: "Experiences", href: "#orchard" },
                  { name: "Our Story", href: "#our-story" },
                  { name: "Visual Gallery", href: "#gallery" },
                  { name: "Daily Rhythm", href: "#daily-rhythm" },
                  { name: "Location", href: "#location" },
                ].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between text-sm font-semibold tracking-wider uppercase text-[#141715] py-2.5 px-2 rounded-lg hover:bg-[#F2EDE2] transition-colors"
                  >
                    <span>{item.name}</span>
                  </a>
                ))}
              </nav>

              <div className="pt-3 border-t border-[rgba(139,130,88,0.16)] flex flex-col gap-2.5">
                <a
                  href={directWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#1ebe5d] text-white py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4 shrink-0"
                    aria-hidden="true"
                  >
                    <path d="M12.031 2c-5.516 0-9.969 4.453-9.969 9.969 0 1.766.469 3.484 1.344 5l-1.406 5.156 5.281-1.375c1.469.797 3.109 1.219 4.75 1.219 5.516 0 9.969-4.453 9.969-9.969S17.547 2 12.031 2zm5.813 14.125c-.25.703-1.438 1.344-2 1.422-.531.078-1.203.109-1.938-.125-.453-.141-1.031-.328-1.766-.656-3.094-1.344-5.109-4.484-5.266-4.688-.156-.203-1.266-1.688-1.266-3.219s.797-2.281 1.078-2.594c.281-.313.609-.391.813-.391.203 0 .406.016.578.016.188 0 .438-.078.688.516.25.609.859 2.094.938 2.25.078.156.125.344.031.547-.094.203-.141.328-.297.5-.156.172-.313.391-.453.516-.156.141-.313.297-.141.594.172.297.781 1.281 1.672 2.078 1.156 1.031 2.125 1.344 2.422 1.5.297.156.469.125.641-.078.172-.203.75-.875.953-1.172.203-.297.406-.25.672-.156.266.094 1.719.813 2.016.953.297.156.484.234.563.359.078.125.078.734-.172 1.438z" />
                  </svg>
                  <span>Reserve</span>
                </a>
                <div className="flex items-center justify-between text-xs pt-1 px-1">
                  <a
                    href="tel:+919850607607"
                    className="flex items-center gap-1.5 font-mono text-[#56635A]"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#E06354]" />
                    <span>+91 98506 07607</span>
                  </a>
                  <Link
                    href="/admin/login"
                    className="text-xs text-[#8B8258] hover:underline uppercase tracking-wider font-semibold"
                  >
                    Staff Portal ↗
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* =========================================================================
          2. FULL-BLEED MINIMALIST HERO SECTION
         ========================================================================= */}
      <section
        ref={heroRef}
        className="relative min-h-[92svh] sm:min-h-[720px] lg:min-h-[840px] flex flex-col justify-end pb-8 sm:pb-12 pt-24 z-20"
      >
        {/* Full-bleed background hero photography (responsive desktop & mobile) */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <picture>
            <source
              media="(min-width: 768px)"
              srcSet="https://res.cloudinary.com/db7h39kx9/image/upload/v1795764401/unnamed_khku8c.webp"
            />
            <img
              src="https://res.cloudinary.com/db7h39kx9/image/upload/v1795791355/unnamed_4_rvvvox.jpg"
              alt="Scenic orchard pool villa and Western Ghats mountains at Pomelo Garden"
              className="w-full h-full object-cover object-center"
            />
          </picture>
          {/* Subtle top & bottom gradient scrim for crisp white typography */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-black/80" />
        </div>

        {/* Bottom-Aligned Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full space-y-6 sm:space-y-8">
          {/* Editorial Headline & 1-line Subtitle (Bottom-Left) */}
          <div className="max-w-2xl space-y-2 sm:space-y-3">
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight leading-[1.1] drop-shadow-xs">
              Sunlit Citrus Groves.{" "}
              <span className="block italic font-light text-white/95 mt-1">
                Sweet Sanctuary by the Ghats.
              </span>
            </h1>

            <p className="text-xs sm:text-base text-white/85 max-w-xl font-normal leading-relaxed">
              Twelve secluded acres of heirloom pomelo orchards, spring-fed pool &amp; 5 private cottages in Saphale.
            </p>
          </div>

          {/* Centered Minimalist Booking Pill */}
          <div className="w-full pt-1">
            <FloatingBookingBar
              startDate={startDate}
              endDate={endDate}
              adultCount={adultCount}
              childCount={childCount}
              onOpenCalendar={() => setCalendarOpen(true)}
              onUpdateGuests={(a, c) => {
                setAdultCount(a);
                setChildCount(c);
              }}
              onCheckRates={handleNavigateToRooms}
            />
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. OUR STORY: THE ORCHARD HERITAGE & ROOTS
         ========================================================================= */}
      <OurStorySection />

      <PomeloSliceDivider />

      {/* =========================================================================
          4. CURATED MOMENTS IN SAPHALE (Fresh Balanced Editorial Grid)
         ========================================================================= */}
      <CuratedMomentsSection />

      <PomeloSliceDivider />

      {/* =========================================================================
          5. THE DAILY RHYTHM: SLOW LIVING IN SAPHALE (Dawn to Starlight Cadence)
         ========================================================================= */}
      <DailyRhythmSection />

      {/* =========================================================================
          6. ARTISANAL HAND-DRAWN AMENITIES RIBBON (Inspired by Luxury Camp Strip)
          Swim & Splash, Air Con, Garden, Pets, Campfire, Kids Play, WiFi, Parking
         ========================================================================= */}
      <ArtisanalAmenitiesRibbon />

      {/* =========================================================================
          8. SPECIAL OFFER / CURVED RETREAT BANNER (Inspired by Pomaii Green Banner)
          Deep Forest Canvas with Curved Mask, Landscape Photo, and Botanical Vector
         ========================================================================= */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative">
          <div className="relative rounded-3xl bg-[#101814] text-[#FAF8F3] overflow-hidden shadow-xl border border-white/10 grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Left Column: Landscape Photography with Organic Curved Blend */}
            <div className="lg:col-span-5 relative h-64 sm:h-80 lg:h-full min-h-[260px] overflow-hidden">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0BFb_TtjuugqlLCRyoCMFwMzIrnaIBqpH5gUUr-tFVieMrkb7rYHAEjs8hSeigzrabwNEWtAg9pQ4fRDk_lqseeU6KYUMazmawvtYhsuahjQSbIK8pUl3m4Wwep2WuVR9x1UIZOK45haQLy2OvQULp1VqrjBzAAQ3Ex1YI0f7XeRV4VRc_tJhFGuHUrSC3XEz2R8BbXz_bVxHJzAWU7KEE0IvR8tu6fj0iESVnws"
                alt="Plunge pool villa at sunrise overlooking Western Ghats"
                className="w-full h-full object-cover"
              />
              {/* Subtle Gradient Vignette onto dark background */}
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-transparent via-[#101814]/40 to-[#101814]" />
            </div>

            {/* Right Column: Editorial Copy & CTAs */}
            <div className="lg:col-span-7 p-6 pb-10 sm:p-10 lg:p-12 space-y-4 relative z-10">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#F4B042] font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#F4B042]" />
                  <span>Special Experience</span>
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white leading-tight">
                Your Ghats Retreat Starts Here
              </h2>

              <p className="text-xs sm:text-sm text-white/80 max-w-xl leading-relaxed">
                Book private plunge pool suites with uninterrupted sunrise views over the Tandulwadi
                ridge. Includes all 4 meals, chulha cooking, pool access, and fresh pomelos.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  href={`/rooms?checkIn=${startDate}&checkOut=${endDate}&adults=${adultCount}&children=${childCount}`}
                  className="px-6 py-3 rounded-full bg-[#E06354] hover:bg-[#c95244] text-white text-xs font-semibold uppercase tracking-widest flex items-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <span>View Available Suites</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={directWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider border border-white/20 transition-colors"
                >
                  Inquire via WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Botanical Pomelo Accent Illustration (Unclipped Upper Layer Over Card Corner) */}
          <div className="absolute -bottom-5 -right-2 sm:-bottom-8 sm:-right-6 z-20 pointer-events-none w-24 h-24 sm:w-44 sm:h-44 drop-shadow-xl">
            <BotanicalFlowerAccent size={0} className="w-full h-full" />
          </div>
        </div>
      </section>

      {/* =========================================================================
          9. CURATED VISUAL GALLERY: GLIMPSES OF GROVE LIFE
         ========================================================================= */}
      <OrchardGallerySection />

      <PomeloSliceDivider />

      {/* =========================================================================
          10. EPICUREAN HEARTH & ORCHARD DINING
         ========================================================================= */}
      <OrchardDiningSection />

      <PomeloSliceDivider />

      {/* =========================================================================
          6. REVIEWS SECTION WITH PROPER TOUCH CAROUSEL
         ========================================================================= */}
      <section id="reviews" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#788E73]">
            Guest Hospitality
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#141715]">
            Reflections from Guests
          </h2>
          <div className="flex items-center justify-center gap-2 text-xs text-[#56635A]">
            <div className="flex items-center gap-0.5 text-[#E06354]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#E06354]" />
              ))}
            </div>
            <span className="font-mono font-bold text-[#141715]">4.8 / 5.0</span>
            <span>·</span>
            <span>Over 103+ verified stays</span>
          </div>
        </div>

        {/* The New Interactive Carousel */}
        <ReviewsCarousel />
      </section>

      <PomeloSliceDivider />

      {/* =========================================================================
          7. GETTING HERE & SEAMLESS APPROACH
         ========================================================================= */}
      <section id="location" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-[#788E73] block mb-1">
                Gentle Transit
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#141715]">
                Getting to Pomelo Garden
              </h2>
              <p className="text-xs sm:text-sm text-[#56635A] mt-2 leading-relaxed">
                Tandulwadi Road, Saphale (East), Palghar. An easy, scenic drive from Mumbai or a
                quick 10-minute auto ride from Saphale Station.
              </p>
            </div>

            <div className="space-y-2.5 font-sans text-xs">
              <div className="p-3.5 rounded-xl bg-[#F2EDE2] flex items-center justify-between border border-[rgba(139,130,88,0.16)]">
                <div className="flex items-center gap-3">
                  <Compass className="w-4 h-4 text-[#788E73]" />
                  <span className="font-medium text-[#141715]">Saphale Railway Station</span>
                </div>
                <span className="font-mono font-bold text-[#E06354]">7 km (10-12 mins)</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F2EDE2] flex items-center justify-between border border-[rgba(139,130,88,0.16)]">
                <div className="flex items-center gap-3">
                  <Waves className="w-4 h-4 text-[#788E73]" />
                  <span className="font-medium text-[#141715]">Kelwa Beach & Historic Fort</span>
                </div>
                <span className="font-mono font-bold text-[#E06354]">14 km (20 mins)</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F2EDE2] flex items-center justify-between border border-[rgba(139,130,88,0.16)]">
                <div className="flex items-center gap-3">
                  <Car className="w-4 h-4 text-[#788E73]" />
                  <span className="font-medium text-[#141715]">Mumbai (via Western Express Highway)</span>
                </div>
                <span className="font-mono font-bold text-[#E06354]">85 km (~1h 45m)</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#7BA23F]/10 border border-[#7BA23F]/20 flex items-center gap-2.5 text-xs text-[#56635A]">
              <Zap className="w-4 h-4 text-[#7BA23F] shrink-0" />
              <span>On-site EV fast charger (11 kW Type-2) available for overnight guests.</span>
            </div>
          </div>

          {/* Map Frame */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden bg-[#F2EDE2] border border-[rgba(139,130,88,0.2)] p-2.5 shadow-sm">
              <div className="w-full h-80 rounded-xl overflow-hidden relative">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwA_q5in-9gQ5LTK2VZVlpw8-tnh9ZOy7exInsbmXS66y18fXs0U3A6yUvwSzBKUHTrJFZECwDyxC9Fdi0omC7aR2dZhanZhmPqygqKqH6S5jZlyM1Vglf5qDEtgIX7b57FSgl7hvAvowJEyoTcOqgSzf8EPdqKzl9wLTd1uVpPOkGiA120cE2p6bzwha2pD-B3XGWORqzUO9u1LeKUjYy_GoIOwAKNCxyX7V8hhs"
                  alt="Cartographic map of Saphale Palghar near Pomelo Garden"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-[#FAF8F3]/95 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-[rgba(139,130,88,0.2)] shadow-md">
                  <div className="flex items-center gap-2 text-[#141715] font-serif font-bold text-sm">
                    <MapPin className="w-4 h-4 text-[#E06354]" />
                    <span>Pomelo Garden Resort</span>
                  </div>
                  <p className="text-[10px] text-[#56635A] mt-0.5">
                    Tandulwadi Road, Saphale (E), Palghar
                  </p>
                  <a
                    href="https://maps.google.com/?q=Saphale+Palghar+Maharashtra"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-[#E06354] font-semibold hover:underline mt-1.5"
                  >
                    <span>Open Google Maps</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. IMPRESSIVE EDITORIAL FOOTER (Inspired by Pomaii Footer Architecture)
          Features Top Stats Row + 4-Column Layout + Harvest Notes Newsletter
         ========================================================================= */}
      {/* =========================================================================
          8. GROUNDED DEEP FOREST FOOTER
         ========================================================================= */}
      <footer className="bg-[#101814] text-[#FAF8F3] border-t border-white/10 pt-14 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-white/10">
            {/* Column 1: Brand & Location */}
            <div className="md:col-span-5 space-y-4">
              <Link href="/" className="inline-block" aria-label="Pomelo Garden Home">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-white p-1 shadow-md">
                  <img
                    src="/images/pomelo-logo.png"
                    alt="Pomelo Garden Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
              </Link>
              <p className="text-xs sm:text-sm text-white/75 max-w-sm leading-relaxed">
                Twelve secluded acres of pomelo and chikoo orchards in Saphale, Palghar.
                Natural spring-fed pool, wood-fired chulha dining, and five private cottages.
              </p>
              <div className="space-y-1.5 text-xs text-white/70 pt-1">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#7BA23F] shrink-0" />
                  <span>Tandulwadi Road, Saphale (East), Palghar 401102</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#E06354] shrink-0" />
                  <a href="tel:+919850607607" className="hover:text-white transition-colors font-mono">
                    +91 98506 07607
                  </a>
                </div>
              </div>
            </div>

            {/* Column 2: Explore */}
            <div className="md:col-span-3 space-y-3 text-xs">
              <span className="uppercase font-bold tracking-widest text-white/50 block font-mono text-[10px]">
                Explore
              </span>
              <ul className="space-y-2 text-white/80">
                <li>
                  <Link
                    href={`/rooms?checkIn=${startDate}&checkOut=${endDate}&adults=${adultCount}&children=${childCount}`}
                    className="hover:text-white transition-colors"
                  >
                    Cottages &amp; Rates
                  </Link>
                </li>
                <li>
                  <a href="#our-story" className="hover:text-white transition-colors">
                    Our Story
                  </a>
                </li>
                <li>
                  <a href="#orchard" className="hover:text-white transition-colors">
                    Curated Moments
                  </a>
                </li>
                <li>
                  <a href="#gallery" className="hover:text-white transition-colors">
                    Gallery
                  </a>
                </li>
                <li>
                  <a href="#dining" className="hover:text-white transition-colors">
                    Orchard Dining
                  </a>
                </li>
                <li>
                  <a href="#location" className="hover:text-white transition-colors">
                    Getting Here
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Direct Reservations */}
            <div className="md:col-span-4 space-y-4 text-xs">
              <span className="uppercase font-bold tracking-widest text-white/50 block font-mono text-[10px]">
                Direct Reservations
              </span>
              <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                Book directly with the orchard desk for weekend stays, family gatherings, or full
                12-acre property buyouts.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href={directWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4 shrink-0"
                    aria-hidden="true"
                  >
                    <path d="M12.031 2c-5.516 0-9.969 4.453-9.969 9.969 0 1.766.469 3.484 1.344 5l-1.406 5.156 5.281-1.375c1.469.797 3.109 1.219 4.75 1.219 5.516 0 9.969-4.453 9.969-9.969S17.547 2 12.031 2zm5.813 14.125c-.25.703-1.438 1.344-2 1.422-.531.078-1.203.109-1.938-.125-.453-.141-1.031-.328-1.766-.656-3.094-1.344-5.109-4.484-5.266-4.688-.156-.203-1.266-1.688-1.266-3.219s.797-2.281 1.078-2.594c.281-.313.609-.391.813-.391.203 0 .406.016.578.016.188 0 .438-.078.688.516.25.609.859 2.094.938 2.25.078.156.125.344.031.547-.094.203-.141.328-.297.5-.156.172-.313.391-.453.516-.156.141-.313.297-.141.594.172.297.781 1.281 1.672 2.078 1.156 1.031 2.125 1.344 2.422 1.5.297.156.469.125.641-.078.172-.203.75-.875.953-1.172.203-.297.406-.25.672-.156.266.094 1.719.813 2.016.953.297.156.484.234.563.359.078.125.078.734-.172 1.438z" />
                  </svg>
                  <span>Reserve on WhatsApp</span>
                </a>
                <Link
                  href={`/rooms?checkIn=${startDate}&checkOut=${endDate}&adults=${adultCount}&children=${childCount}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider border border-white/15 transition-colors"
                >
                  <span>Check Availability</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Copyright Strip */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/55">
            <p>© 2026 Pomelo Garden, Saphale. All rights reserved.</p>
            <Link
              href="/admin/login"
              className="text-xs text-white/80 hover:text-white font-semibold hover:underline flex items-center gap-1"
            >
              <span>Staff Portal</span>
              <span>↗</span>
            </Link>
          </div>
        </div>
      </footer>

      {/* =========================================================================
          9. LUXURY MODAL POPUP (Cheval Blanc & Four Seasons Style)
         ========================================================================= */}
      <LuxuryDateModal
        isOpen={calendarOpen}
        onClose={() => setCalendarOpen(false)}
        startDate={startDate}
        endDate={endDate}
        onApply={handleApplyCalendarDates}
      />
    </div>
  );
}
