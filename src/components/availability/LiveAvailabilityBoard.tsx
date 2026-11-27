"use client";

import React, { useState, useMemo } from "react";
import {
  Calendar,
  Check,
  Clock,
  Sparkles,
  Bed,
  Users,
  Waves,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Radio,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { useResortStore, ROOM_CATEGORIES, RoomCategory, getTodayISO, addDaysToISO } from "@/lib/resort-store";

interface LiveAvailabilityBoardProps {
  onSelectBookingDate?: (date: string, categoryId?: string) => void;
}

export function LiveAvailabilityBoard({ onSelectBookingDate }: LiveAvailabilityBoardProps) {
  const { getAvailabilityForDate } = useResortStore();
  const [selectedDate, setSelectedDate] = useState<string>(() => getTodayISO());

  // Generate 12 upcoming dates starting dynamically from today
  const dateOptions = useMemo(() => {
    const today = getTodayISO();
    const list = [];
    for (let i = 0; i < 12; i++) {
      const dateStr = addDaysToISO(today, i);
      const [y, m, d] = dateStr.split("-").map(Number);
      const cur = new Date(y, m - 1, d);
      const dayOfWeek = cur.toLocaleDateString("en-US", { weekday: "short" });
      const displayDate = cur.toLocaleDateString("en-US", { day: "2-digit", month: "short" });
      const dayNum = cur.getDay();
      const isWeekend = dayNum === 0 || dayNum === 6;

      let label: string | undefined = undefined;
      if (i === 0) label = "Today";
      else if (i === 1) label = "Tomorrow";
      else if (isWeekend) label = "Weekend";

      list.push({
        dateStr,
        dayOfWeek,
        displayDate,
        isWeekend,
        label,
      });
    }
    return list;
  }, []);

  // Compute live availability for currently selected date
  const availability = useMemo(() => {
    return getAvailabilityForDate(selectedDate);
  }, [getAvailabilityForDate, selectedDate]);

  // Find next available date for a given category
  const findNextAvailableDate = (categoryId: string) => {
    for (const opt of dateOptions) {
      const dayAvail = getAvailabilityForDate(opt.dateStr);
      const cat = dayAvail.categories.find((c) => c.category.id === categoryId);
      if (cat && cat.availableRooms > 0) {
        setSelectedDate(opt.dateStr);
        return;
      }
    }
  };

  const handleSelectRoom = (categoryId: string) => {
    if (onSelectBookingDate) {
      onSelectBookingDate(selectedDate, categoryId);
    }
    const elem = document.getElementById("packages");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="availability" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Header Badge & Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7BA23F]/10 border border-[#7BA23F]/25 text-[#7BA23F] text-xs font-mono font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#7BA23F] animate-pulse"></span>
            <span>Realtime Inventory Synchronized</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#141715] tracking-tight">
            Live Cottage Availability & Open Dates
          </h2>
          <p className="text-sm text-[#56635A] max-w-xl">
            Directly connected to our reservation ledger. Select any calendar date to
            inspect open cottages and suites across our 5 bespoke accommodations.
          </p>
        </div>

        {/* Aggregate Status Indicator for Selected Date */}
        <div className="self-start md:self-auto bg-[#F2EDE2] border border-[rgba(139,130,88,0.2)] p-3.5 sm:p-4 rounded-xl flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-[#FAF8F3] border border-[rgba(139,130,88,0.16)] flex items-center justify-center text-[#E06354] shrink-0">
            <Bed className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-lg sm:text-xl font-bold text-[#141715] tabular-nums">
                {availability.totalAvailable} of {availability.totalRooms} Cottages Open
              </span>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                  availability.totalAvailable > 0
                    ? "bg-[#7BA23F]/15 text-[#7BA23F]"
                    : "bg-[#E06354]/15 text-[#E06354]"
                }`}
              >
                {availability.totalAvailable > 0 ? "Slots Open" : "Sold Out"}
              </span>
            </div>
            <p className="text-xs text-[#56635A] mt-0.5">
              Selected: <strong className="text-[#141715] font-mono">{selectedDate}</strong>
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          INTERACTIVE HORIZONTAL DATE HORIZON TRACK (Touch Friendly & Responsive)
         ========================================================================= */}
      <div className="space-y-2 mb-8">
        <div className="flex items-center justify-between text-xs text-[#56635A] font-medium px-1">
          <span className="flex items-center gap-1.5 font-mono uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5 text-[#7BA23F]" />
            <span>Select Date (Swipe Horizontally)</span>
          </span>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-[11px] text-[#8B8258]">
              Custom Date:
            </span>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-[#FAF8F3] text-[#141715] text-xs font-mono px-2.5 py-1 rounded-md border border-[rgba(139,130,88,0.25)] focus:ring-1 focus:ring-[#E06354] focus:outline-none"
            />
          </div>
        </div>

        {/* Scrollable Track */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-3 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none snap-x">
          {dateOptions.map((opt) => {
            const isSelected = selectedDate === opt.dateStr;
            const dayAvail = getAvailabilityForDate(opt.dateStr);
            const isFull = dayAvail.totalAvailable === 0;

            return (
              <button
                key={opt.dateStr}
                type="button"
                onClick={() => setSelectedDate(opt.dateStr)}
                className={`snap-start shrink-0 p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between w-28 sm:w-32 min-h-[96px] ${
                  isSelected
                    ? "bg-[#141715] text-[#FAF8F3] border-[#141715] shadow-md ring-2 ring-[#E06354]"
                    : "bg-[#F2EDE2]/70 hover:bg-[#F2EDE2] border-[rgba(139,130,88,0.18)] text-[#141715]"
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span
                    className={`text-[10px] uppercase font-bold tracking-wider font-mono ${
                      isSelected
                        ? "text-[#89D6B1]"
                        : opt.isWeekend
                        ? "text-[#E06354]"
                        : "text-[#788E73]"
                    }`}
                  >
                    {opt.label || opt.dayOfWeek}
                  </span>
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E06354] animate-pulse"></span>
                  )}
                </div>

                <div className="my-1">
                  <span className="font-serif text-lg font-bold block leading-none">
                    {opt.displayDate}
                  </span>
                </div>

                {/* Slot Badge */}
                <div className="pt-1.5 border-t border-current/10 flex items-center gap-1.5 text-[10px] font-mono">
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      isFull
                        ? "bg-[#E06354]"
                        : dayAvail.totalAvailable === 1
                        ? "bg-amber-500"
                        : "bg-[#7BA23F]"
                    }`}
                  ></span>
                  <span className="truncate">
                    {isFull
                      ? "Booked"
                      : `${dayAvail.totalAvailable} open`}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          3-CATEGORY AVAILABILITY GRID (Up to 5 Rooms across 3 Distinct Categories)
         ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {availability.categories.map((catAvail) => {
          const { category, totalRooms, availableRooms, bookedRooms, heldRooms, status, rooms } =
            catAvail;
          const isSoldOut = availableRooms === 0;

          return (
            <div
              key={category.id}
              className={`rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md ${
                isSoldOut
                  ? "bg-[#FAF8F3]/70 border-[rgba(139,130,88,0.15)] opacity-90"
                  : "bg-[#F2EDE2] border-[rgba(139,130,88,0.24)]"
              }`}
            >
              {/* Photo & Category Banner */}
              <div>
                <div className="relative w-full aspect-[16/10] bg-[#FAF8F3] overflow-hidden">
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-[#FAF8F3]/90 backdrop-blur-xs text-[#141715] text-[10px] font-mono font-bold uppercase tracking-wider">
                      {category.type}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-[#141715]/80 text-[#FAF8F3] text-[10px] font-mono font-medium">
                      {totalRooms} {totalRooms === 1 ? "Cottage" : "Cottages"}
                    </span>
                  </div>

                  {/* Availability Stamp */}
                  <div className="absolute bottom-3 right-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider shadow-xs ${
                        isSoldOut
                          ? "bg-[#E06354] text-white"
                          : availableRooms === 1
                          ? "bg-amber-600 text-white"
                          : "bg-[#7BA23F] text-white"
                      }`}
                    >
                      {isSoldOut ? "Sold Out" : `${availableRooms} of ${totalRooms} Available`}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 space-y-4">
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl text-[#141715] font-bold">
                      {category.name}
                    </h3>
                    <p className="text-xs text-[#56635A] mt-1 line-clamp-2">
                      {category.tagline}
                    </p>
                  </div>

                  {/* Pricing & Pax */}
                  <div className="flex items-baseline justify-between pt-2 border-t border-[rgba(139,130,88,0.16)] text-xs">
                    <span className="text-[#56635A] flex items-center gap-1 font-mono">
                      <Users className="w-3.5 h-3.5 text-[#788E73]" />
                      <span>{category.capacityText}</span>
                    </span>
                    <span className="font-sans font-bold text-base text-[#E06354] tabular-nums">
                      ₹{category.basePrice.toLocaleString("en-IN")}
                      <span className="text-[10px] font-normal text-[#56635A]">/night</span>
                    </span>
                  </div>

                  {/* Individual Room Status Slots */}
                  <div className="space-y-2 pt-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#788E73] font-bold block">
                      Room Status for {selectedDate}:
                    </span>
                    <div className="space-y-1.5">
                      {rooms.map((rm) => {
                        const isRoomAvail = rm.status === "Available";
                        const isRoomHeld = rm.status === "Held";

                        return (
                          <div
                            key={rm.room.id}
                            className={`p-2.5 rounded-lg border flex items-center justify-between text-xs transition-colors ${
                              isRoomAvail
                                ? "bg-[#FAF8F3] border-[#7BA23F]/30"
                                : isRoomHeld
                                ? "bg-amber-50 border-amber-200"
                                : "bg-neutral-100/70 border-neutral-200"
                            }`}
                          >
                            <div className="min-w-0 pr-2">
                              <span className="font-bold text-[#141715] block truncate">
                                {rm.room.name}
                              </span>
                              <span className="text-[10px] text-[#56635A] truncate block font-mono">
                                {rm.room.subTitle.split("·")[0]}
                              </span>
                            </div>

                            <span
                              className={`shrink-0 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider ${
                                isRoomAvail
                                  ? "bg-[#7BA23F]/15 text-[#7BA23F]"
                                  : isRoomHeld
                                  ? "bg-amber-100 text-amber-700"
                                  : "bg-[#E06354]/15 text-[#E06354]"
                              }`}
                            >
                              {isRoomAvail ? "Open" : isRoomHeld ? "On Hold" : "Booked"}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Amenities Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {category.amenities.slice(0, 3).map((amenity, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-[#FAF8F3] text-[10px] font-mono text-[#56635A] border border-[rgba(139,130,88,0.12)]"
                      >
                        ✓ {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 sm:p-6 pt-0">
                {isSoldOut ? (
                  <button
                    type="button"
                    onClick={() => findNextAvailableDate(category.id)}
                    className="w-full py-3 px-4 rounded-xl border border-[rgba(139,130,88,0.3)] bg-[#FAF8F3] text-[#141715] hover:bg-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Check Next Open Date</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#E06354]" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleSelectRoom(category.id)}
                    className="w-full py-3 px-4 rounded-xl bg-[#141715] hover:bg-[#28302b] text-[#FAF8F3] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-sm hover:shadow cursor-pointer"
                  >
                    <span>Select for Quote</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#7BA23F]" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Security & Reassurance Strip */}
      <div className="mt-8 p-4 rounded-xl bg-[#FAF8F3] border border-[rgba(139,130,88,0.2)] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#56635A]">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#7BA23F] shrink-0" />
          <span>
            <strong>Instant WhatsApp Confirmation:</strong> Realtime inventory status. No advance
            payment deducted online until Mr. Raut verifies your dates.
          </span>
        </div>
        <a
          href="#packages"
          className="font-semibold text-[#E06354] hover:underline flex items-center gap-1 shrink-0 text-xs font-mono"
        >
          <span>Open Full Tariff Calculator</span>
          <span>↓</span>
        </a>
      </div>
    </section>
  );
}
