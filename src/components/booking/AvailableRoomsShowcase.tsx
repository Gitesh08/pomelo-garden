"use client";

import React from "react";
import {
  Calendar,
  Users,
  Check,
  ArrowRight,
  ShieldCheck,
  MessageCircle,
  Clock,
  Sparkles,
} from "lucide-react";
import { useResortStore, ROOM_CATEGORIES } from "@/lib/resort-store";

interface AvailableRoomsShowcaseProps {
  startDate: string;
  endDate: string;
  adultCount: number;
  childCount: number;
  selectedCategory: string;
  onOpenCalendar: () => void;
  onSelectCategoryFilter: (categoryId: string) => void;
}

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

export function AvailableRoomsShowcase({
  startDate,
  endDate,
  adultCount,
  childCount,
  selectedCategory,
  onOpenCalendar,
  onSelectCategoryFilter,
}: AvailableRoomsShowcaseProps) {
  const { getAvailabilityForDateRange } = useResortStore();

  const nights = React.useMemo(() => {
    if (!startDate || !endDate) return 1;
    if (startDate === endDate) return 1;
    const s = new Date(startDate).getTime();
    const e = new Date(endDate).getTime();
    const diff = Math.round((e - s) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  }, [startDate, endDate]);

  const rangeAvailability = React.useMemo(() => {
    return getAvailabilityForDateRange(startDate, endDate);
  }, [startDate, endDate, getAvailabilityForDateRange]);

  const dateSummaryText = React.useMemo(() => {
    const s = formatDateShort(startDate);
    const e = formatDateShort(endDate);
    if (!endDate || startDate === endDate) return `${s} (Day Picnic)`;
    return `${s} to ${e} (${nights} ${nights === 1 ? "Night" : "Nights"})`;
  }, [startDate, endDate, nights]);

  // Filter categories if user selected a specific one
  const displayCategories = React.useMemo(() => {
    if (selectedCategory === "all") return rangeAvailability.categories;
    return rangeAvailability.categories.filter(
      (c) => c.category.id === selectedCategory
    );
  }, [rangeAvailability, selectedCategory]);

  const createWhatsAppLink = (
    categoryName: string,
    pricePerNight: number,
    roomsAvailable: number
  ) => {
    const totalEst = pricePerNight * nights;
    const lines = [
      `*Pomelo Garden · Room Reservation*`,
      `• *Room Category:* ${categoryName}`,
      `• *Dates:* ${startDate} to ${endDate} (${nights} ${nights === 1 ? "Night" : "Nights"})`,
      `• *Guests:* ${adultCount} Adults${childCount > 0 ? `, ${childCount} Children` : ""}`,
      `• *Estimated Rate:* ₹${totalEst.toLocaleString("en-IN")} (${nights} nights @ ₹${pricePerNight.toLocaleString("en-IN")}/night)`,
      ``,
      `Hello, I see ${categoryName} is available on these dates. Please confirm and share booking details!`,
    ];
    return `https://wa.me/919850607607?text=${encodeURIComponent(lines.join("\n"))}`;
  };

  return (
    <section id="available-rooms" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[rgba(139,130,88,0.18)]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-[#7BA23F] animate-pulse" />
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#788E73] font-bold">
              Real-time Availability
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#141715]">
            Rooms Available for Your Stay
          </h2>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2 text-xs sm:text-sm text-[#56635A]">
            <span className="font-mono font-bold text-[#141715] bg-[#F2EDE2] px-2.5 py-1 rounded-md">
              {dateSummaryText}
            </span>
            <span>·</span>
            <span>
              {adultCount} {adultCount === 1 ? "Adult" : "Adults"}
              {childCount > 0 ? `, ${childCount} Children` : ""}
            </span>
            <span>·</span>
            <span className="text-[#788E73] font-medium flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>Direct reservation confirmation</span>
            </span>
          </div>
        </div>

        {/* Change Dates Action */}
        <button
          type="button"
          onClick={onOpenCalendar}
          className="self-start md:self-auto px-4 py-2 rounded-xl bg-white hover:bg-[#FAF8F3] border border-[rgba(139,130,88,0.25)] text-xs font-semibold uppercase tracking-wider text-[#141715] flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
        >
          <Calendar className="w-3.5 h-3.5 text-[#E06354]" />
          <span>Change Dates</span>
        </button>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-none">
        {[
          { id: "all", label: "All Cottages & Suites (5 Total)" },
          { id: "deluxe-cottage", label: "Deluxe Citrus Cottage (2 Cottages)" },
          { id: "pool-suite", label: "Plunge Pool Suite (2 Suites)" },
          { id: "heritage-loft", label: "Heritage Farmstead Loft (1 Cottage)" },
        ].map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => onSelectCategoryFilter(f.id)}
            className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold transition-colors cursor-pointer ${
              selectedCategory === f.id
                ? "bg-[#141715] text-[#FAF8F3]"
                : "bg-[#F2EDE2]/70 hover:bg-[#F2EDE2] text-[#141715] border border-[rgba(139,130,88,0.18)]"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* 3 Categories Cards Grid (Photo-First, Low Wordiness) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-2">
        {displayCategories.map((catAvail) => {
          const { category, totalRooms, availableRooms, bookedRooms, rooms } = catAvail;
          const isSoldOut = availableRooms === 0;
          const isSingleCottageLeft = availableRooms === 1;
          const totalEstimated = category.basePrice * nights;
          const waLink = createWhatsAppLink(
            category.name,
            category.basePrice,
            availableRooms
          );

          return (
            <div
              key={category.id}
              className={`rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md ${
                isSoldOut
                  ? "bg-white/70 border-gray-200 opacity-80"
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
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 space-y-4">
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl text-[#141715] font-bold">
                      {category.name}
                    </h3>
                    <p className="text-xs text-[#56635A] mt-1 line-clamp-1">
                      {category.tagline}
                    </p>
                  </div>

                  {/* Rate Display */}
                  <div className="pt-2 border-t border-[rgba(139,130,88,0.16)] flex items-baseline justify-between">
                    <div>
                      <span className="text-xl sm:text-2xl font-sans font-bold text-[#141715] tabular-nums">
                        ₹{category.basePrice.toLocaleString("en-IN")}
                      </span>
                      <span className="text-xs text-[#56635A] ml-1">/ night</span>
                    </div>

                    {nights > 1 && (
                      <span className="text-xs font-mono font-semibold text-[#E06354]">
                        ₹{totalEstimated.toLocaleString("en-IN")} ({nights} nights)
                      </span>
                    )}
                  </div>

                  {/* Specific Accommodation Units */}
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
                            <span className="font-bold text-[#141715]">
                              {rm.room.name}
                            </span>
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

                  {/* Highlights (Concise Pills) */}
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

              {/* Action Button */}
              <div className="p-5 sm:p-6 pt-0">
                {isSoldOut ? (
                  <button
                    type="button"
                    onClick={onOpenCalendar}
                    className="w-full py-3 px-4 rounded-xl border border-[rgba(139,130,88,0.3)] bg-[#FAF8F3] text-[#141715] hover:bg-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Choose Different Dates</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#E06354]" />
                  </button>
                ) : (
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-[#141715] hover:bg-[#28302b] text-[#FAF8F3] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-[#7BA23F]" />
                    <span>Reserve on WhatsApp</span>
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Direct Reassurance Note */}
      <div className="mt-8 p-4 rounded-xl bg-white border border-[rgba(139,130,88,0.2)] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#56635A]">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-4 h-4 text-[#7BA23F] shrink-0" />
          <span>
            <strong>Personal Hospitality:</strong> Handcrafted reservations. No advance charged until dates are confirmed.
          </span>
        </div>
        <span className="font-mono text-[#141715] font-semibold">
          Call: +91 98506 07607
        </span>
      </div>
    </section>
  );
}
