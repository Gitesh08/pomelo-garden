"use client";

import React, { useState } from "react";
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
import { DailyRhythmSection } from "@/components/rhythm/DailyRhythmSection";

export default function GuestLandingPage() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

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

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      setNewsletterEmail("");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#141715] font-sans selection:bg-[#E06354]/20 pb-20 sm:pb-0">
      {/* =========================================================================
          1. STICKY MINIMAL HEADER
         ========================================================================= */}
      <header className="sticky top-0 z-40 w-full bg-[#FAF8F3]/90 backdrop-blur-md border-b border-[rgba(139,130,88,0.16)] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Logo & Brand Tagline */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
            <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full overflow-hidden bg-white/70 border border-[rgba(139,130,88,0.2)] flex items-center justify-center p-0.5 shadow-sm shrink-0">
              <img
                src="/images/pomelo-garden-logo.svg"
                alt="Pomelo Garden Logo"
                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-serif text-lg sm:text-2xl font-bold tracking-tight text-[#141715] leading-none truncate">
                Pomelo Garden
              </span>
              <span className="font-serif text-[10px] sm:text-xs text-[#788E73] tracking-widest uppercase mt-0.5 font-medium truncate">
                Resort By The Ghats
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-7 text-xs font-semibold tracking-wider uppercase text-[#56635A]">
            <Link
              href={`/rooms?checkIn=${startDate}&checkOut=${endDate}&adults=${adultCount}&children=${childCount}`}
              className="hover:text-[#141715] transition-colors relative py-1 flex items-center gap-1.5"
            >
              <span>Cottages</span>
              <span className="px-1.5 py-0.2 rounded bg-[#7BA23F]/15 text-[#7BA23F] font-mono text-[9px]">
                Live
              </span>
            </Link>
            <a href="#orchard" className="hover:text-[#141715] transition-colors relative py-1">
              Experiences
            </a>
            <a href="#our-story" className="hover:text-[#141715] transition-colors relative py-1">
              Our Story
            </a>
            <a href="#gallery" className="hover:text-[#141715] transition-colors relative py-1">
              Gallery
            </a>
            <a href="#daily-rhythm" className="hover:text-[#141715] transition-colors relative py-1">
              Daily Rhythm
            </a>
            <a href="#location" className="hover:text-[#141715] transition-colors relative py-1">
              Location
            </a>
          </nav>

          {/* WhatsApp Action & Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={directWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#141715] hover:bg-[#252c27] text-[#FAF8F3] text-xs uppercase tracking-wider font-semibold px-3 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-sm hover:shadow transition-all duration-200 shrink-0"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#7BA23F]" />
              <span className="hidden sm:inline">Book on WhatsApp</span>
              <span className="sm:hidden text-[11px]">WhatsApp</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[#141715] hover:bg-[#F2EDE2] transition-colors"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-white/80 p-0.5 border border-[rgba(139,130,88,0.2)]">
                    <img
                      src="/images/pomelo-garden-logo.svg"
                      alt="Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <span className="font-serif font-bold text-[#141715] block text-base leading-none">
                      Pomelo Garden
                    </span>
                    <span className="font-serif text-[10px] text-[#788E73] uppercase tracking-widest">
                      Resort By The Ghats
                    </span>
                  </div>
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
                  <span className="px-2 py-0.5 rounded bg-[#7BA23F]/15 text-[#7BA23F] font-mono text-[10px] font-bold">
                    Live Rates
                  </span>
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
                  className="w-full bg-[#141715] text-[#FAF8F3] py-3 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs"
                >
                  <MessageSquare className="w-4 h-4 text-[#7BA23F]" />
                  <span>Book on WhatsApp</span>
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
          2. ORGANIC BLENDED HERO SECTION (Inspired by Pomaii Design & Vectors)
          Seamless wave cut layering landscape photography with soft ivory canvas
         ========================================================================= */}
      <section className="relative min-h-[580px] sm:min-h-[660px] lg:min-h-[740px] flex flex-col justify-between pt-6 pb-12 sm:pt-10 sm:pb-16 z-20">
        {/* Full-bleed background hero photography with its own contained overflow */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCi7vPw3FOLyDW6B-ZolyBkozWBkQORJidKhQUInUCmLJbZBMNYYTlcb-fvd56JmIMz36GDKdTJeXXFMDkERLMFGw7WtXfDkkiG6eFYDUNi7wOURNLCbk2JD6Hzu6tK52p71CZOE9f0rolm6lkdkkqvaSZtbclpQB5w4SXxSNPjHfsyBBYKSu3_9bGEofouHsFB52_d8x_CV69zmZieu2YKPPovgoY_z94If2FofMM"
            alt="Scenic orchard pool villa and Western Ghats mountains at Pomelo Garden"
            className="w-full h-full object-cover object-center lg:object-right"
          />
          {/* Organic Curved Vector Wave Overlay (Blends Photo & Canvas seamlessly) */}
          <OrganicWaveHero />
        </div>

        {/* Botanical leaf sprigs tucked into corners */}
        <div className="hidden sm:block pointer-events-none">
          <BotanicalCornerSprig position="top-left" size={200} />
        </div>

        {/* Hero Content (Positioned over the soft organic ivory wave) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full pt-4 sm:pt-8 md:pt-12">
          <div className="max-w-xl md:max-w-2xl flex flex-col gap-4 sm:gap-6">
            <div className="self-start">
              <GhatsContourBadge />
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#141715] font-light tracking-tight leading-[1.12]">
              Sunlit Citrus Groves.{" "}
              <span className="block font-normal text-[#E06354] font-serif italic mt-1">
                Sweet Sanctuary by the Ghats.
              </span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-[#56635A] max-w-lg font-normal leading-relaxed">
              Wake up to morning birdsong in 12 acres of fragrant pomelo and chikoo orchards.
              Natural spring-fed pool dips, wood-fired chulha feasts with hot rice bhakri, and 5 secluded private cottages in Saphale.
            </p>

            {/* Primary Action Button */}
            <div className="pt-2 flex items-center gap-3">
              <Link
                href={`/rooms?checkIn=${startDate}&checkOut=${endDate}&adults=${adultCount}&children=${childCount}`}
                className="px-6 py-3.5 rounded-full bg-[#E06354] hover:bg-[#c95244] text-white text-xs font-semibold uppercase tracking-widest flex items-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
              >
                <span>Explore Cottages & Rates</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="#location"
                className="px-5 py-3.5 rounded-full bg-white/80 hover:bg-white text-[#141715] border border-[rgba(139,130,88,0.25)] text-xs font-semibold uppercase tracking-wider backdrop-blur-xs transition-colors hidden sm:inline-flex items-center gap-1.5"
              >
                <Compass className="w-3.5 h-3.5 text-[#788E73]" />
                <span>10 Mins from Station</span>
              </a>
            </div>
          </div>
        </div>

        {/* =========================================================================
            FLOATING BOOKING BAR (Sits at the wave overlap junction, like in Pomaii)
           ========================================================================= */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full mt-10 sm:mt-16">
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
      </section>

      {/* =========================================================================
          3. CURATED MOMENTS IN SAPHALE (Fresh Balanced Editorial Grid)
         ========================================================================= */}
      <CuratedMomentsSection />

      {/* =========================================================================
          4. OUR STORY: THE ORCHARD HERITAGE & ROOTS
         ========================================================================= */}
      <OurStorySection />

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
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 space-y-4 relative z-10">
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

          {/* Botanical Citrus Flower Accent Illustration (Bottom Right) */}
          <div className="absolute -bottom-6 -right-6 pointer-events-none opacity-80 hidden sm:block">
            <BotanicalFlowerAccent size={160} />
          </div>
        </div>
      </section>

      {/* =========================================================================
          9. CURATED VISUAL GALLERY: GLIMPSES OF GROVE LIFE
         ========================================================================= */}
      <OrchardGallerySection />

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
      <footer className="bg-[#FAF8F3] border-t border-[rgba(139,130,88,0.2)] pt-12 pb-12 relative overflow-hidden">
        <div className="hidden sm:block pointer-events-none">
          <BotanicalCornerSprig position="bottom-right" size={180} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
          {/* Top Row: 4 Impressive Metrics + Direct Social/Concierge (like Pomaii) */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 pb-10 border-b border-[rgba(139,130,88,0.16)] items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#F2EDE2] border border-[rgba(139,130,88,0.25)] flex items-center justify-center shrink-0">
                <Trees className="w-4 h-4 text-[#7BA23F]" />
              </div>
              <div>
                <span className="font-serif font-bold text-lg text-[#141715] block leading-none">
                  12-Acre
                </span>
                <span className="text-[11px] text-[#56635A] font-mono mt-0.5 block">
                  Citrus Orchard
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#F2EDE2] border border-[rgba(139,130,88,0.25)] flex items-center justify-center shrink-0">
                <Bed className="w-4 h-4 text-[#788E73]" />
              </div>
              <div>
                <span className="font-serif font-bold text-lg text-[#141715] block leading-none">
                  5 Cottages
                </span>
                <span className="text-[11px] text-[#56635A] font-mono mt-0.5 block">
                  Boutique Stays
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#F2EDE2] border border-[rgba(139,130,88,0.25)] flex items-center justify-center shrink-0">
                <Star className="w-4 h-4 fill-[#E06354] text-[#E06354]" />
              </div>
              <div>
                <span className="font-serif font-bold text-lg text-[#141715] block leading-none">
                  4.8 ★
                </span>
                <span className="text-[11px] text-[#56635A] font-mono mt-0.5 block">
                  103+ Reviews
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#F2EDE2] border border-[rgba(139,130,88,0.25)] flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4 text-[#8B8258]" />
              </div>
              <div>
                <span className="font-serif font-bold text-lg text-[#141715] block leading-none">
                  10 Mins
                </span>
                <span className="text-[11px] text-[#56635A] font-mono mt-0.5 block">
                  Saphale Station
                </span>
              </div>
            </div>

            {/* Direct WhatsApp Concierge Button */}
            <div className="col-span-2 lg:col-span-1 flex justify-start lg:justify-end">
              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#141715] text-[#FAF8F3] hover:bg-[#28302b] text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#7BA23F]" />
                <span>Concierge</span>
              </a>
            </div>
          </div>

          {/* Lower 4-Column Grid: Brand + Sanctuary + Experiences + Harvest Newsletter */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-10 border-b border-[rgba(139,130,88,0.16)]">
            {/* Column 1: Brand Info */}
            <div className="md:col-span-4 space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src="/images/pomelo-garden-logo.svg"
                  alt="Pomelo Garden"
                  className="w-10 h-10 object-contain"
                />
                <div>
                  <span className="font-serif text-2xl font-bold text-[#141715] leading-none block">
                    Pomelo Garden
                  </span>
                  <span className="font-serif text-xs text-[#788E73] tracking-widest uppercase">
                    Resort By The Ghats
                  </span>
                </div>
              </div>
              <p className="text-xs text-[#56635A] max-w-sm leading-relaxed">
                An authentic agro-horticulture sanctuary and boutique resort in Saphale, Palghar.
                Dedicated to slow living, fresh pomelo air, and pure natural quiet.
              </p>
            </div>

            {/* Column 2: Sanctuary Links */}
            <div className="md:col-span-2 space-y-2 text-xs">
              <span className="uppercase font-bold tracking-wider text-[#141715] block font-mono text-[11px]">
                Sanctuary
              </span>
              <ul className="space-y-1.5 text-[#56635A]">
                <li>
                  <Link
                    href={`/rooms?checkIn=${startDate}&checkOut=${endDate}&adults=${adultCount}&children=${childCount}`}
                    className="hover:text-[#141715] transition-colors"
                  >
                    Cottages & Suites
                  </Link>
                </li>
                <li>
                  <a href="#orchard" className="hover:text-[#141715] transition-colors">
                    Curated Moments
                  </a>
                </li>
                <li>
                  <a href="#our-story" className="hover:text-[#141715] transition-colors">
                    Our Story
                  </a>
                </li>
                <li>
                  <a href="#gallery" className="hover:text-[#141715] transition-colors">
                    Visual Gallery
                  </a>
                </li>
                <li>
                  <a href="#daily-rhythm" className="hover:text-[#141715] transition-colors">
                    Daily Rhythm
                  </a>
                </li>
                <li>
                  <a href="#location" className="hover:text-[#141715] transition-colors">
                    Location & Travel
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Guest Experiences */}
            <div className="md:col-span-2 space-y-2 text-xs">
              <span className="uppercase font-bold tracking-wider text-[#141715] block font-mono text-[11px]">
                Experiences
              </span>
              <ul className="space-y-1.5 text-[#56635A]">
                <li>
                  <Link
                    href={`/rooms?checkIn=${startDate}&checkOut=${endDate}&adults=${adultCount}&children=${childCount}`}
                    className="hover:text-[#141715] transition-colors"
                  >
                    Plunge Pool Villas
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/rooms?checkIn=${startDate}&checkOut=${endDate}&adults=${adultCount}&children=${childCount}`}
                    className="hover:text-[#141715] transition-colors"
                  >
                    Deluxe Cottages
                  </Link>
                </li>
                <li>
                  <a href="#kitchen" className="hover:text-[#141715] transition-colors">
                    Chulha Bhakri Dining
                  </a>
                </li>
                <li>
                  <a href={directWhatsAppUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#141715] transition-colors">
                    Property Buyouts 20+
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Newsletter / Seasonal Harvest Notes (like Pomaii) */}
            <div className="md:col-span-4 space-y-3 text-xs">
              <span className="uppercase font-bold tracking-wider text-[#141715] block font-mono text-[11px]">
                Orchard Notes & Harvest Alerts
              </span>
              <p className="text-xs text-[#56635A] leading-relaxed">
                Receive alerts when sweet pomelos are in harvest and secret weekend getaway dates open.
              </p>

              {newsletterSubscribed ? (
                <div className="p-3 rounded-xl bg-[#F4FBF6] border border-[#1E6F50]/20 flex items-center gap-2 text-xs text-[#1E6F50] font-medium">
                  <CheckCircle className="w-4 h-4 text-[#1E6F50]" />
                  <span>Thank you! We will notify you for the next pomelo harvest.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter email or WhatsApp..."
                    required
                    className="flex-1 h-10 px-3.5 rounded-full bg-white border border-[rgba(139,130,88,0.25)] text-xs text-[#141715] placeholder-gray-400 focus:outline-none focus:border-[#141715] font-sans"
                  />
                  <button
                    type="submit"
                    className="h-10 px-5 rounded-full bg-[#141715] text-[#FAF8F3] hover:bg-[#28302b] text-xs font-semibold uppercase tracking-wider transition-colors shrink-0 cursor-pointer"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Bottom Copyright Strip */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#56635A]">
            <p>© 2026 Pomelo Garden. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <span className="text-[11px] text-[#8B8258]">
                Hosted with care by Mr. & Mrs. Raut
              </span>
              <Link
                href="/admin/login"
                className="text-xs text-[#141715] font-semibold hover:underline flex items-center gap-1"
              >
                <span>Staff Ledger</span>
                <span>↗</span>
              </Link>
            </div>
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

      {/* =========================================================================
          10. FIXED MOBILE BOTTOM BOOKING DOCK (Four Seasons Mobile Bar)
         ========================================================================= */}
      <div className="fixed bottom-0 inset-x-0 z-30 sm:hidden bg-white/95 backdrop-blur-md border-t border-[rgba(139,130,88,0.25)] p-3 shadow-lg flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setCalendarOpen(true)}
          className="flex-1 text-left py-1 cursor-pointer"
        >
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#788E73] font-bold block">
            Dates Selected
          </span>
          <span className="text-xs font-bold text-[#141715] truncate font-sans">
            {startDate && endDate ? `${startDate.slice(5)} to ${endDate.slice(5)}` : "Select Dates"}
          </span>
        </button>

        <button
          type="button"
          onClick={handleNavigateToRooms}
          className="px-4 py-2.5 rounded-lg bg-[#141715] text-[#FAF8F3] text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5 shrink-0 cursor-pointer"
        >
          <span>Check Rooms</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#E06354]" />
        </button>
      </div>
    </div>
  );
}
