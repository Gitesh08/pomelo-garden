"use client";

import React, { useState, useMemo, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Calendar,
  Users,
  ArrowLeft,
  MessageCircle,
  Clock,
  ShieldCheck,
  Check,
  ArrowRight,
  Sparkles,
  Info,
  Plus,
  Minus,
  RotateCcw,
  Home,
  CheckCircle2,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useResortStore, RoomCategory, RoomCategoryAvailability } from "@/lib/resort-store";
import { ModifyStayModal } from "@/components/booking/ModifyStayModal";

const MONTH_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function formatDateShort(dateStr: string): string {
  if (!dateStr) return "";
  const parts = dateStr.split("-");
  if (parts.length !== 3) return dateStr;
  const m = parseInt(parts[1], 10) - 1;
  const d = parseInt(parts[2], 10);
  return `${d} ${MONTH_SHORT[m] || ""}`;
}

function RoomsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { roomCategories, getAvailabilityForDateRange } = useResortStore();

  const urlCheckIn = searchParams.get("checkIn") || "";
  const urlCheckOut = searchParams.get("checkOut") || "";
  const urlAdults = parseInt(searchParams.get("adults") || "2", 10);
  const urlChildren = parseInt(searchParams.get("children") || "0", 10);

  const [startDate, setStartDate] = useState(urlCheckIn);
  const [endDate, setEndDate] = useState(urlCheckOut);
  const [adultCount, setAdultCount] = useState(urlAdults);
  const [childCount, setChildCount] = useState(urlChildren);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [modifyModalOpen, setModifyModalOpen] = useState(false);

  // Multi-room selection state: map of categoryId -> count
  const [selectedRooms, setSelectedRooms] = useState<Record<string, number>>({});

  const containerRef = useRef<HTMLDivElement>(null);
  const dockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchParams.get("checkIn") !== null) setStartDate(searchParams.get("checkIn") || "");
    if (searchParams.get("checkOut") !== null) setEndDate(searchParams.get("checkOut") || "");
    if (searchParams.get("adults")) setAdultCount(parseInt(searchParams.get("adults")!, 10));
    if (searchParams.get("children")) setChildCount(parseInt(searchParams.get("children")!, 10));
  }, [searchParams]);

  // GSAP Entrance Animations
  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".room-card",
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: "power2.out",
          }
        );

        gsap.fromTo(
          ".rooms-header-fade",
          { y: -20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
          }
        );
      }, containerRef);

      return () => ctx.revert();
    }
  }, [selectedFilter]);

  // Animate reservation dock when rooms are selected
  const totalSelectedCount = useMemo(() => {
    return Object.values(selectedRooms).reduce((acc, c) => acc + c, 0);
  }, [selectedRooms]);

  useEffect(() => {
    if (dockRef.current) {
      if (totalSelectedCount > 0) {
        gsap.fromTo(
          dockRef.current,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" }
        );
      }
    }
  }, [totalSelectedCount > 0]); // only trigger on appearance transition

  const nights = useMemo(() => {
    if (!startDate || !endDate) return 1;
    if (startDate === endDate) return 1;
    const [sy, sm, sd] = startDate.split("-").map(Number);
    const [ey, em, ed] = endDate.split("-").map(Number);
    const diff = Math.round((Date.UTC(ey, em - 1, ed) - Date.UTC(sy, sm - 1, sd)) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  }, [startDate, endDate]);

  const hasDatesSelected = Boolean(startDate && endDate);

  const rangeAvailability = useMemo(() => {
    if (!startDate) {
      // Default placeholder availability
      return {
        date: "Placeholder",
        totalRooms: 5,
        totalAvailable: 5,
        totalBooked: 0,
        totalHeld: 0,
        isFullyBooked: false,
        categories: roomCategories.map((cat) => ({
          category: cat,
          totalRooms: cat.roomCount,
          availableRooms: cat.roomCount,
          bookedRooms: 0,
          heldRooms: 0,
          status: "Available" as const,
          rooms: [],
        })),
      };
    }
    return getAvailabilityForDateRange(startDate, endDate || startDate);
  }, [startDate, endDate, getAvailabilityForDateRange, roomCategories]);

  const dateSummaryText = useMemo(() => {
    if (!startDate) return "Select Dates";
    const s = formatDateShort(startDate);
    const e = formatDateShort(endDate);
    if (!endDate || startDate === endDate) return `${s} (Day Picnic)`;
    return `${s} to ${e} (${nights} ${nights === 1 ? "Night" : "Nights"})`;
  }, [startDate, endDate, nights]);

  const handleApplyStay = (start: string, end: string, adults: number, children: number) => {
    setStartDate(start);
    setEndDate(end);
    setAdultCount(adults);
    setChildCount(children);
    // Reset selected rooms when dates change to avoid stale inventory mismatch
    setSelectedRooms({});
    const params = new URLSearchParams();
    if (start) params.set("checkIn", start);
    if (end) params.set("checkOut", end);
    params.set("adults", String(adults));
    params.set("children", String(children));
    router.replace(`/rooms?${params.toString()}`);
  };

  const displayCategories = useMemo(() => {
    if (selectedFilter === "all") return rangeAvailability.categories;
    return rangeAvailability.categories.filter((c) => c.category.id === selectedFilter);
  }, [rangeAvailability, selectedFilter]);

  // Multi-room modification helpers
  const handleIncrementRoom = (categoryId: string, maxAvailable: number) => {
    if (!hasDatesSelected) {
      setModifyModalOpen(true);
      return;
    }
    setSelectedRooms((prev) => {
      const current = prev[categoryId] || 0;
      if (current >= maxAvailable) return prev;
      return { ...prev, [categoryId]: current + 1 };
    });
  };

  const handleDecrementRoom = (categoryId: string) => {
    setSelectedRooms((prev) => {
      const current = prev[categoryId] || 0;
      if (current <= 1) {
        const next = { ...prev };
        delete next[categoryId];
        return next;
      }
      return { ...prev, [categoryId]: current - 1 };
    });
  };

  const handleClearSelection = () => {
    setSelectedRooms({});
  };

  // Grand total and details calculation for multi-room dock
  const { totalRatePerNight, totalPaxCapacity, grandTotal, selectedItemsList } = useMemo(() => {
    let ratePerNight = 0;
    let paxCap = 0;
    const items: { category: RoomCategory; count: number; subtotal: number }[] = [];

    roomCategories.forEach((cat) => {
      const count = selectedRooms[cat.id] || 0;
      if (count > 0) {
        ratePerNight += count * cat.basePrice;
        paxCap += count * 4; // 4 guests capacity per cottage unit
        items.push({
          category: cat,
          count,
          subtotal: count * cat.basePrice * nights,
        });
      }
    });

    const total = ratePerNight * nights;
    return {
      totalRatePerNight: ratePerNight,
      totalPaxCapacity: paxCap,
      grandTotal: total,
      selectedItemsList: items,
    };
  }, [selectedRooms, nights, roomCategories]);

  // Formatted WhatsApp booking message for multiple selected rooms
  const multiRoomWhatsAppUrl = useMemo(() => {
    const lines = [
      `*Pomelo Garden · Cottage Reservation Request*`,
      `• *Dates:* ${startDate || "Upcoming"} to ${endDate || startDate || "Upcoming"} (${nights} ${nights === 1 ? "Night" : "Nights"})`,
      `• *Guests:* ${adultCount} Adults${childCount > 0 ? `, ${childCount} Children` : ""}`,
      `• *Selected Accommodations:*`,
    ];

    selectedItemsList.forEach((item) => {
      lines.push(
        `  - ${item.count} × ${item.category.name} (@ ₹${item.category.basePrice.toLocaleString("en-IN")}/night)`
      );
    });

    lines.push(
      `• *Estimated Total:* ₹${grandTotal.toLocaleString("en-IN")} (${nights} nights @ ₹${totalRatePerNight.toLocaleString("en-IN")}/night)`
    );
    lines.push(``);
    lines.push(
      `Hello! I would like to reserve these ${totalSelectedCount} cottages for our stay. Please share confirmation and advance details.`
    );

    return `https://wa.me/919850607607?text=${encodeURIComponent(lines.join("\n"))}`;
  }, [
    startDate,
    endDate,
    nights,
    adultCount,
    childCount,
    selectedItemsList,
    grandTotal,
    totalRatePerNight,
    totalSelectedCount,
  ]);

  return (
    <div
      ref={containerRef}
      className={`min-h-screen bg-[#FAF8F3] text-[#141715] font-sans selection:bg-[#E06354]/20 ${
        totalSelectedCount > 0 ? "pb-32 sm:pb-36" : "pb-16"
      }`}
    >
      {/* =========================================================================
          1. STICKY LUXURY HEADER WITH UNIFIED CONTROLLER PILL
         ========================================================================= */}
      <header className="sticky top-0 z-40 w-full bg-[#FAF8F3]/95 backdrop-blur-md border-b border-[rgba(139,130,88,0.18)] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-3">
          {/* Back to Home & Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group text-xs font-semibold uppercase tracking-wider text-[#141715] shrink-0"
          >
            <div className="w-8 h-8 rounded-full bg-white/90 p-0.5 border border-[rgba(139,130,88,0.2)] flex items-center justify-center shrink-0 shadow-xs">
              <ArrowLeft className="w-4 h-4 text-[#141715] group-hover:-translate-x-0.5 transition-transform" />
            </div>
            <div className="hidden sm:flex flex-col min-w-0">
              <span className="font-serif font-bold text-base leading-none">Pomelo Garden</span>
              <span className="font-serif text-[10px] text-[#788E73] tracking-widest uppercase mt-0.5">
                Resort By The Ghats
              </span>
            </div>
          </Link>

          {/* Center Luxury Pill Controller (Dates + Headcount + Modify Button) */}
          <div className="flex items-center gap-2 bg-white rounded-full border border-[rgba(139,130,88,0.22)] shadow-xs px-2.5 sm:px-4 py-1.5 min-w-0">
            <button
              type="button"
              onClick={() => setModifyModalOpen(true)}
              className="flex items-center gap-2 text-left cursor-pointer hover:opacity-85 transition-opacity min-w-0"
            >
              <Calendar className="w-3.5 h-3.5 text-[#E06354] shrink-0" />
              <span
                className={`text-xs font-bold font-mono truncate ${
                  hasDatesSelected ? "text-[#141715]" : "text-[#788E73]"
                }`}
              >
                {dateSummaryText}
              </span>
              <span className="hidden md:inline text-gray-300">|</span>
              <span className="hidden md:inline text-xs font-medium text-[#56635A] whitespace-nowrap">
                {adultCount} {adultCount === 1 ? "Adult" : "Adults"}
                {childCount > 0 ? `, ${childCount} Child` : ""}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setModifyModalOpen(true)}
              className="px-2.5 py-1 rounded-full bg-[#141715] text-[#FAF8F3] text-[10px] font-mono font-bold uppercase tracking-wider hover:bg-[#28302b] transition-colors cursor-pointer shrink-0"
            >
              Modify
            </button>
          </div>

          {/* Right Inventory Indicator */}
          <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-[#788E73]">
            <span className="w-2 h-2 rounded-full bg-[#7BA23F] animate-pulse" />
            <span>5 Cottages Total</span>
          </div>
        </div>
      </header>

      {/* =========================================================================
          2. MAIN ROOMS SHOWCASE CONTENT
         ========================================================================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-8">
        {/* Title & Filter Header */}
        <div className="rooms-header-fade flex flex-col md:flex-row md:items-end justify-between gap-5 border-b border-[rgba(139,130,88,0.16)] pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#788E73] font-bold">
                Boutique Inventory · Saphale Groves
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#141715] tracking-tight">
              Select Your Cottage or Suite
            </h1>
            <p className="text-xs sm:text-sm text-[#56635A] mt-2">
              {hasDatesSelected ? (
                <>Live availability for {dateSummaryText} · Direct reserve via WhatsApp</>
              ) : (
                <>Pick your dates to verify live availability for your private getaway</>
              )}
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: "all", label: "All Accommodations" },
              { id: "deluxe-cottage", label: "Deluxe Cottage" },
              { id: "pool-suite", label: "Plunge Pool Suite" },
              { id: "heritage-loft", label: "Heritage Loft" },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setSelectedFilter(f.id)}
                className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold transition-colors cursor-pointer ${
                  selectedFilter === f.id
                    ? "bg-[#141715] text-[#FAF8F3] shadow-xs"
                    : "bg-white hover:bg-[#F2EDE2] text-[#141715] border border-[rgba(139,130,88,0.2)]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Empty Dates Prompt Banner */}
        {!hasDatesSelected && (
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[rgba(139,130,88,0.22)] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FAF8F3] border border-[rgba(139,130,88,0.25)] flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5 text-[#E06354]" />
              </div>
              <div>
                <span className="font-serif font-bold text-sm sm:text-base text-[#141715] block">
                  Select Check-In and Check-Out Dates
                </span>
                <span className="text-xs text-[#56635A]">
                  Check live room availability, calculate stay rates, and reserve multiple cottages.
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setModifyModalOpen(true)}
              className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#141715] hover:bg-[#28302b] text-[#FAF8F3] text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer shrink-0"
            >
              Choose Dates Now
            </button>
          </div>
        )}

        {/* 3 Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {displayCategories.map((catAvail) => {
            const { category, totalRooms, availableRooms, rooms } = catAvail;
            const isSoldOut = hasDatesSelected && availableRooms === 0;
            const isSingleCottageLeft = hasDatesSelected && availableRooms === 1;
            const selectedCount = selectedRooms[category.id] || 0;
            const totalEstimated = category.basePrice * nights;

            return (
              <div
                key={category.id}
                className={`room-card rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md ${
                  isSoldOut
                    ? "bg-white/70 border-gray-200 opacity-80"
                    : selectedCount > 0
                    ? "bg-white border-[#141715] ring-2 ring-[#141715]/10"
                    : "bg-white border-[rgba(139,130,88,0.22)]"
                }`}
              >
                {/* Photo & Availability Banner */}
                <div>
                  <div className="relative aspect-[16/11] bg-[#FAF8F3] overflow-hidden group">
                    <img
                      src={category.imageUrl}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Top tags */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-[#FAF8F3]/95 backdrop-blur-xs text-[#141715] text-[10px] font-mono font-bold uppercase tracking-wider">
                        {category.type}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-[#141715]/85 text-[#FAF8F3] text-[10px] font-mono">
                        {totalRooms} {totalRooms === 1 ? "Cottage" : "Cottages"}
                      </span>
                    </div>

                    {/* Availability Badge */}
                    <div className="absolute bottom-3 right-3">
                      {hasDatesSelected ? (
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider shadow-xs ${
                            isSoldOut
                              ? "bg-[#E06354] text-white"
                              : isSingleCottageLeft
                              ? "bg-amber-600 text-white"
                              : "bg-[#7BA23F] text-white"
                          }`}
                        >
                          {isSoldOut
                            ? "Sold Out"
                            : isSingleCottageLeft
                            ? "Only 1 Left"
                            : `${availableRooms} Available`}
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#141715]/80 backdrop-blur-xs text-white">
                          Select Dates
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 sm:p-6 space-y-4">
                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl text-[#141715] font-bold">
                        {category.name}
                      </h3>
                      <p className="text-xs text-[#56635A] mt-1 line-clamp-2 leading-relaxed">
                        {category.tagline}
                      </p>
                    </div>

                    {/* PROMINENT MAX CAPACITY & SPECS BLOCK (User Requested Feature) */}
                    <div className="p-3.5 rounded-xl bg-[#FAF8F3] border border-[rgba(139,130,88,0.18)] space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono uppercase font-bold text-[#788E73] text-[10px] flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-[#7BA23F]" />
                          <span>Max Capacity</span>
                        </span>
                        <span className="font-bold text-[#141715] text-xs">
                          {category.capacityText}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] text-[#56635A] font-medium pt-1 border-t border-[rgba(139,130,88,0.12)]">
                        <span>📐 380 sq.ft</span>
                        <span>·</span>
                        <span>🛏️ Teakwood Bed + Sit-Out</span>
                        <span>·</span>
                        <span>🌿 Orchard View</span>
                      </div>
                    </div>

                    {/* Rate Display */}
                    <div className="pt-2 border-t border-[rgba(139,130,88,0.16)] flex items-baseline justify-between">
                      <div>
                        <span className="text-xl sm:text-2xl font-sans font-bold text-[#141715] tabular-nums">
                          ₹{category.basePrice.toLocaleString("en-IN")}
                        </span>
                        <span className="text-xs text-[#56635A] ml-1">/ night</span>
                      </div>

                      {hasDatesSelected && nights > 1 && (
                        <span className="text-xs font-mono font-semibold text-[#E06354]">
                          ₹{totalEstimated.toLocaleString("en-IN")} ({nights} nights)
                        </span>
                      )}
                    </div>

                    {/* Specific Accommodation Units (Show only when dates are selected) */}
                    {hasDatesSelected && rooms.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#788E73] font-bold block">
                          Accommodations in this Category:
                        </span>
                        <div className="space-y-1">
                          {rooms.map((rm) => {
                            const isOpen = rm.status === "Available";
                            return (
                              <div
                                key={rm.room.id}
                                className="flex items-center justify-between text-xs py-1 px-2 rounded bg-[#FAF8F3] border border-[rgba(139,130,88,0.1)]"
                              >
                                <span className="font-bold text-[#141715]">{rm.room.name}</span>
                                <span
                                  className={`text-[10px] font-mono font-bold uppercase tracking-wider ${
                                    isOpen ? "text-[#7BA23F]" : "text-gray-400 line-through"
                                  }`}
                                >
                                  {isOpen ? "Open" : "Booked"}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Amenities Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {category.amenities.slice(0, 6).map((amenity, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded bg-[#F2EDE2]/70 text-[10px] font-mono text-[#56635A]"
                        >
                          ✓ {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* MULTI-ROOM SELECTION ACTION BUTTONS */}
                <div className="p-5 sm:p-6 pt-0">
                  {!hasDatesSelected ? (
                    <button
                      type="button"
                      onClick={() => setModifyModalOpen(true)}
                      className="w-full py-3 px-4 rounded-xl bg-[#141715] hover:bg-[#28302b] text-[#FAF8F3] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
                    >
                      <Calendar className="w-4 h-4 text-[#E06354]" />
                      <span>Select Dates to Check Rates</span>
                    </button>
                  ) : isSoldOut ? (
                    <button
                      type="button"
                      onClick={() => setModifyModalOpen(true)}
                      className="w-full py-3 px-4 rounded-xl border border-[rgba(139,130,88,0.3)] bg-[#FAF8F3] text-[#141715] hover:bg-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Dates Booked · Change Dates</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#E06354]" />
                    </button>
                  ) : selectedCount === 0 ? (
                    <button
                      type="button"
                      onClick={() => handleIncrementRoom(category.id, availableRooms)}
                      className="w-full py-3 px-4 rounded-xl bg-[#141715] hover:bg-[#28302b] text-[#FAF8F3] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xs hover:shadow cursor-pointer active:scale-98"
                    >
                      <Plus className="w-4 h-4 text-[#7BA23F]" />
                      <span>Add Cottage to Stay</span>
                    </button>
                  ) : (
                    /* Interactive Stepper when selected */
                    <div className="flex items-center justify-between p-1 bg-[#141715] rounded-xl text-[#FAF8F3] shadow-md">
                      <button
                        type="button"
                        onClick={() => handleDecrementRoom(category.id)}
                        className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
                        aria-label="Decrease room count"
                      >
                        <Minus className="w-4 h-4 text-[#FAF8F3]" />
                      </button>

                      <div className="text-center px-2">
                        <span className="text-xs font-bold font-mono text-[#FAF8F3] block">
                          {selectedCount} {selectedCount === 1 ? "Cottage" : "Cottages"} Selected
                        </span>
                        <span className="text-[10px] text-[#7BA23F] font-mono">
                          {selectedCount >= availableRooms
                            ? `Max ${availableRooms} available`
                            : `+ Add more (up to ${availableRooms})`}
                        </span>
                      </div>

                      <button
                        type="button"
                        disabled={selectedCount >= availableRooms}
                        onClick={() => handleIncrementRoom(category.id, availableRooms)}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                          selectedCount >= availableRooms
                            ? "bg-white/5 opacity-40 cursor-not-allowed"
                            : "bg-white/10 hover:bg-white/20"
                        }`}
                        aria-label="Increase room count"
                      >
                        <Plus className="w-4 h-4 text-[#7BA23F]" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Reassurance Strip */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[rgba(139,130,88,0.2)] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#56635A]">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#7BA23F] shrink-0" />
            <span>
              <strong>Personal Reservation:</strong> Instant WhatsApp coordination. No advance is charged online until your dates are confirmed.
            </span>
          </div>
          <a
            href="tel:+919850607607"
            className="font-mono text-[#141715] font-semibold hover:underline shrink-0"
          >
            Call: +91 98506 07607
          </a>
        </div>
      </main>

      {/* =========================================================================
          3. STICKY LUXURY RESERVATION DOCK (Appears when 1+ rooms selected)
          Allows multi-room booking (e.g. 2 different rooms or 2 same rooms)
         ========================================================================= */}
      {totalSelectedCount > 0 && (
        <aside
          id="reservation-dock"
          ref={dockRef}
          aria-label="Reservation summary dock"
          className="fixed bottom-4 left-3 right-3 sm:left-6 sm:right-6 max-w-4xl mx-auto z-40 bg-[#141715] text-[#FAF8F3] rounded-2xl shadow-2xl p-4 sm:p-5 border border-white/15 backdrop-blur-md"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Left: Summary Breakdown */}
            <div className="min-w-0 space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full bg-[#7BA23F] text-[#141715] text-[10px] font-mono font-bold uppercase tracking-wider">
                  {totalSelectedCount} {totalSelectedCount === 1 ? "Cottage" : "Cottages"} Selected
                </span>
                <span className="text-xs text-gray-300 font-mono">
                  Accommodates up to {totalPaxCapacity} Guests
                </span>
                <span className="text-gray-400">·</span>
                <span className="text-xs text-gray-300 font-mono">
                  {nights} {nights === 1 ? "Night" : "Nights"}
                </span>
              </div>

              {/* Itemized summary badges */}
              <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none text-[11px] text-gray-300">
                {selectedItemsList.map((item) => (
                  <span
                    key={item.category.id}
                    className="shrink-0 px-2 py-0.5 rounded bg-white/10 text-white font-mono"
                  >
                    {item.count} × {item.category.name}
                  </span>
                ))}
              </div>

              {/* Price Calculation */}
              <div className="flex items-baseline gap-2 pt-0.5">
                <span className="font-sans font-bold text-xl sm:text-2xl text-white tabular-nums">
                  ₹{grandTotal.toLocaleString("en-IN")}
                </span>
                <span className="text-xs text-gray-400">
                  (₹{totalRatePerNight.toLocaleString("en-IN")}/night)
                </span>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={handleClearSelection}
                className="px-3 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs text-gray-300 transition-colors cursor-pointer flex items-center gap-1"
                title="Clear Selected Rooms"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>

              <a
                href={multiRoomWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial px-5 py-3 rounded-xl bg-[#7BA23F] hover:bg-[#6e9237] text-[#141715] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-[#141715]" />
                <span>Reserve on WhatsApp</span>
              </a>
            </div>
          </div>
        </aside>
      )}

      {/* Unified Modify Stay Modal (Dates + Adults + Children) */}
      <ModifyStayModal
        isOpen={modifyModalOpen}
        onClose={() => setModifyModalOpen(false)}
        startDate={startDate}
        endDate={endDate}
        adultCount={adultCount}
        childCount={childCount}
        onApply={handleApplyStay}
      />
    </div>
  );
}

export default function RoomsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF8F3] flex items-center justify-center font-mono text-xs">
          Loading rooms...
        </div>
      }
    >
      <RoomsContent />
    </Suspense>
  );
}
