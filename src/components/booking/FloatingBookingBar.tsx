"use client";

import React, { useState } from "react";
import { Calendar, Users, ArrowRight, ChevronDown } from "lucide-react";

interface FloatingBookingBarProps {
  startDate: string;
  endDate: string;
  adultCount: number;
  childCount: number;
  onOpenCalendar: () => void;
  onUpdateGuests: (adults: number, children: number) => void;
  onCheckRates: () => void;
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
  if (!dateStr) return "Select dates";
  const parts = dateStr.split("-");
  if (parts.length !== 3) return dateStr;
  const m = parseInt(parts[1], 10) - 1;
  const d = parseInt(parts[2], 10);
  return `${d} ${MONTH_SHORT[m] || ""}`;
}

export function FloatingBookingBar({
  startDate,
  endDate,
  adultCount,
  childCount,
  onOpenCalendar,
  onUpdateGuests,
  onCheckRates,
}: FloatingBookingBarProps) {
  const [guestsOpen, setGuestsOpen] = useState(false);

  const nights = React.useMemo(() => {
    if (!startDate || !endDate) return 1;
    if (startDate === endDate) return 1;
    const s = new Date(startDate).getTime();
    const e = new Date(endDate).getTime();
    const diff = Math.round((e - s) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  }, [startDate, endDate]);

  const datesDisplay = React.useMemo(() => {
    if (!startDate) return "Select Dates";
    const s = formatDateShort(startDate);
    if (!endDate || startDate === endDate) return `${s} (Day Picnic)`;
    const e = formatDateShort(endDate);
    return `${s} to ${e} (${nights} ${nights === 1 ? "Night" : "Nights"})`;
  }, [startDate, endDate, nights]);

  const guestsSummary = React.useMemo(() => {
    return `${adultCount} ${adultCount === 1 ? "Adult" : "Adults"}${
      childCount > 0 ? `, ${childCount} Child` : ""
    }`;
  }, [adultCount, childCount]);

  return (
    <div className="w-full max-w-4xl mx-auto relative z-30">
      {/* =========================================================================
          DESKTOP LUXURY BAR (md:flex)
          Cheval Blanc & Four Seasons Minimalist Reservation Dock
         ========================================================================= */}
      <div className="hidden md:flex bg-white/95 backdrop-blur-md rounded-2xl border border-[rgba(139,130,88,0.22)] shadow-xl p-2 items-center gap-2">
        {/* Field 1: Dates Trigger */}
        <button
          type="button"
          onClick={onOpenCalendar}
          className="flex-1 px-4 py-3 rounded-xl hover:bg-[#F2EDE2]/60 transition-colors text-left flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-lg bg-[#FAF8F3] border border-[rgba(139,130,88,0.2)] flex items-center justify-center shrink-0 group-hover:bg-white transition-colors">
            <Calendar className="w-4 h-4 text-[#E06354]" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#788E73] font-bold">
              Check-In to Check-Out
            </span>
            <span className={`text-sm font-bold font-sans truncate ${startDate ? "text-[#141715]" : "text-[#788E73]"}`}>
              {startDate ? datesDisplay : "Select Dates"}
            </span>
          </div>
        </button>

        <div className="w-px h-8 bg-gray-200" />

        {/* Field 2: Guests Trigger */}
        <div className="relative flex-1">
          <button
            type="button"
            onClick={() => setGuestsOpen(!guestsOpen)}
            className="w-full px-4 py-3 rounded-xl hover:bg-[#F2EDE2]/60 transition-colors text-left flex items-center justify-between cursor-pointer group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-[#FAF8F3] border border-[rgba(139,130,88,0.2)] flex items-center justify-center shrink-0 group-hover:bg-white transition-colors">
                <Users className="w-4 h-4 text-[#7BA23F]" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#788E73] font-bold">
                  Guests
                </span>
                <span className="text-sm font-bold text-[#141715] truncate">
                  {guestsSummary}
                </span>
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-black transition-colors shrink-0" />
          </button>

          {/* Guests Popover */}
          {guestsOpen && (
            <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-[#E2E7E4] p-4 z-50 space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#141715] block">Adults</span>
                  <span className="text-[10px] text-gray-500">Age 12+</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onUpdateGuests(Math.max(1, adultCount - 1), childCount)}
                    className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center text-xs font-bold hover:bg-gray-100 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-6 text-center text-xs font-bold">{adultCount}</span>
                  <button
                    type="button"
                    onClick={() => onUpdateGuests(adultCount + 1, childCount)}
                    className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center text-xs font-bold hover:bg-gray-100 cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <div>
                  <span className="text-xs font-bold text-[#141715] block">Children</span>
                  <span className="text-[10px] text-gray-500">Age 5 to 11</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onUpdateGuests(adultCount, Math.max(0, childCount - 1))}
                    className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center text-xs font-bold hover:bg-gray-100 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-6 text-center text-xs font-bold">{childCount}</span>
                  <button
                    type="button"
                    onClick={() => onUpdateGuests(adultCount, childCount + 1)}
                    className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center text-xs font-bold hover:bg-gray-100 cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setGuestsOpen(false)}
                className="w-full py-2 bg-[#141715] text-[#FAF8F3] text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-black cursor-pointer"
              >
                Apply
              </button>
            </div>
          )}
        </div>

        {/* Action Button: Check Rates */}
        <button
          type="button"
          onClick={onCheckRates}
          className="px-8 py-3.5 rounded-xl bg-[#141715] hover:bg-[#28302b] text-[#FAF8F3] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg cursor-pointer shrink-0"
        >
          <span>Check Rates</span>
          <ArrowRight className="w-4 h-4 text-[#E06354]" />
        </button>
      </div>

      {/* =========================================================================
          MOBILE LUXURY BAR (md:hidden)
          Sleek, compact, tactile card designed specifically for small viewports
         ========================================================================= */}
      <div className="md:hidden bg-white/95 backdrop-blur-md rounded-2xl border border-[rgba(139,130,88,0.22)] shadow-xl p-3 flex flex-col gap-2.5">
        {/* Row 1: Interactive Tappable Dates & Guests Pill */}
        <div className="grid grid-cols-2 gap-2">
          {/* Dates Chip */}
          <button
            type="button"
            onClick={onOpenCalendar}
            className="p-2.5 rounded-xl bg-[#FAF8F3] border border-[rgba(139,130,88,0.18)] text-left flex items-center gap-2.5 cursor-pointer active:scale-98 transition-transform"
          >
            <Calendar className="w-4 h-4 text-[#E06354] shrink-0" />
            <div className="min-w-0 flex-1">
              <span className="text-[9px] font-mono uppercase tracking-wider text-[#788E73] font-bold block truncate">
                Dates
              </span>
              <span className={`text-xs font-bold block truncate ${startDate ? "text-[#141715]" : "text-[#788E73]"}`}>
                {startDate ? `${formatDateShort(startDate)} to ${formatDateShort(endDate)}` : "Select Dates"}
              </span>
            </div>
          </button>

          {/* Guests Chip */}
          <button
            type="button"
            onClick={() => setGuestsOpen(true)}
            className="p-2.5 rounded-xl bg-[#FAF8F3] border border-[rgba(139,130,88,0.18)] text-left flex items-center gap-2.5 cursor-pointer active:scale-98 transition-transform"
          >
            <Users className="w-4 h-4 text-[#7BA23F] shrink-0" />
            <div className="min-w-0 flex-1">
              <span className="text-[9px] font-mono uppercase tracking-wider text-[#788E73] font-bold block truncate">
                Guests
              </span>
              <span className="text-xs font-bold text-[#141715] block truncate">
                {adultCount} Adults{childCount > 0 ? `, ${childCount} Child` : ""}
              </span>
            </div>
          </button>
        </div>

        {/* Row 2: Full Width Tactile Action Button */}
        <button
          type="button"
          onClick={onCheckRates}
          className="w-full py-3 rounded-xl bg-[#141715] text-[#FAF8F3] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm active:scale-98 transition-transform cursor-pointer"
        >
          <span>Check Rates & Available Rooms</span>
          <ArrowRight className="w-4 h-4 text-[#E06354]" />
        </button>

        {/* Mobile Guests Modal Sheet */}
        {guestsOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3">
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-xs"
              onClick={() => setGuestsOpen(false)}
            />
            <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-[#E2E7E4] p-5 z-10 space-y-4 animate-in slide-in-from-bottom duration-200">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <span className="font-serif text-lg font-bold text-[#141715]">
                  Select Guests
                </span>
                <button
                  type="button"
                  onClick={() => setGuestsOpen(false)}
                  className="text-xs font-mono text-gray-500 hover:text-black"
                >
                  Close
                </button>
              </div>

              <div className="flex items-center justify-between py-1">
                <div>
                  <span className="text-xs font-bold text-[#141715] block">Adults</span>
                  <span className="text-[10px] text-gray-500">Age 12+</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onUpdateGuests(Math.max(1, adultCount - 1), childCount)}
                    className="w-9 h-9 rounded-xl border border-gray-300 flex items-center justify-center text-sm font-bold active:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="w-6 text-center text-sm font-bold font-mono">{adultCount}</span>
                  <button
                    type="button"
                    onClick={() => onUpdateGuests(adultCount + 1, childCount)}
                    className="w-9 h-9 rounded-xl border border-gray-300 flex items-center justify-center text-sm font-bold active:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between py-1 border-t border-gray-100">
                <div>
                  <span className="text-xs font-bold text-[#141715] block">Children</span>
                  <span className="text-[10px] text-gray-500">Age 5 to 11</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onUpdateGuests(adultCount, Math.max(0, childCount - 1))}
                    className="w-9 h-9 rounded-xl border border-gray-300 flex items-center justify-center text-sm font-bold active:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="w-6 text-center text-sm font-bold font-mono">{childCount}</span>
                  <button
                    type="button"
                    onClick={() => onUpdateGuests(adultCount, childCount + 1)}
                    className="w-9 h-9 rounded-xl border border-gray-300 flex items-center justify-center text-sm font-bold active:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setGuestsOpen(false)}
                className="w-full py-3 bg-[#141715] text-[#FAF8F3] text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-black"
              >
                Apply Guests
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
