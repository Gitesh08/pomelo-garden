"use client";

import React, { useState } from "react";
import { Calendar, ArrowRight } from "lucide-react";

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
  return `${MONTH_SHORT[m] || ""} ${d}`;
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

  const totalGuests = adultCount + childCount;

  const datesDisplay = React.useMemo(() => {
    if (!startDate) return "Select Dates";
    const s = formatDateShort(startDate);
    if (!endDate || startDate === endDate) return s;
    const e = formatDateShort(endDate);
    return `${s} - ${e}`;
  }, [startDate, endDate]);

  const guestsLabel = `${totalGuests} ${totalGuests === 1 ? "Guest" : "Guests"}`;

  return (
    <div className="w-full flex justify-center relative z-30">
      {/* =========================================================================
          DESKTOP MINIMALIST PILL (hidden md:flex)
         ========================================================================= */}
      <div className="hidden md:flex items-center gap-2 bg-[#FAF8F3]/95 backdrop-blur-md rounded-xl shadow-2xl border border-white/40 p-1.5 pl-4 relative">
        {/* Dates Trigger */}
        <button
          type="button"
          onClick={onOpenCalendar}
          className="text-xs font-medium text-[#141715] hover:text-[#B93A2B] transition-colors cursor-pointer whitespace-nowrap px-1 py-1.5"
        >
          {datesDisplay}
        </button>

        <span className="text-gray-400 text-xs select-none">·</span>

        {/* Guests Trigger + Upward Popover */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setGuestsOpen(!guestsOpen)}
            className="text-xs font-medium text-[#141715] hover:text-[#B93A2B] transition-colors cursor-pointer whitespace-nowrap px-1 py-1.5"
          >
            {guestsLabel}
          </button>

          {guestsOpen && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-72 bg-white rounded-xl shadow-2xl border border-[#E2E7E4] p-4 z-50 space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#141715] block">Adults</span>
                  <span className="text-[10px] text-gray-500">Age 12+</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onUpdateGuests(Math.max(1, adultCount - 1), childCount)}
                    className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center text-xs font-bold hover:bg-gray-100 cursor-pointer text-[#141715]"
                  >
                    -
                  </button>
                  <span className="w-6 text-center text-xs font-bold text-[#141715]">{adultCount}</span>
                  <button
                    type="button"
                    onClick={() => onUpdateGuests(adultCount + 1, childCount)}
                    className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center text-xs font-bold hover:bg-gray-100 cursor-pointer text-[#141715]"
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
                    className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center text-xs font-bold hover:bg-gray-100 cursor-pointer text-[#141715]"
                  >
                    -
                  </button>
                  <span className="w-6 text-center text-xs font-bold text-[#141715]">{childCount}</span>
                  <button
                    type="button"
                    onClick={() => onUpdateGuests(adultCount, childCount + 1)}
                    className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center text-xs font-bold hover:bg-gray-100 cursor-pointer text-[#141715]"
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

        {/* Terracotta Action CTA */}
        <button
          type="button"
          onClick={onCheckRates}
          className="ml-2 px-5 py-2.5 rounded-lg bg-[#B93A2B] hover:bg-[#9f2f22] text-white text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-sm cursor-pointer active:scale-95 whitespace-nowrap"
        >
          <span>Check Availability</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* =========================================================================
          MOBILE MINIMALIST PILL (md:hidden)
         ========================================================================= */}
      <div className="md:hidden w-full bg-[#FAF8F3]/95 backdrop-blur-md rounded-xl shadow-2xl border border-white/40 p-1.5 pl-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <button
            type="button"
            onClick={onOpenCalendar}
            className="flex items-center gap-2 text-xs font-medium text-[#141715] truncate cursor-pointer py-1.5"
          >
            <Calendar className="w-4 h-4 text-[#56635A] shrink-0" />
            <span className="truncate">{datesDisplay}</span>
          </button>

          <span className="text-gray-400 text-xs select-none shrink-0">·</span>

          <button
            type="button"
            onClick={() => setGuestsOpen(true)}
            className="text-xs font-medium text-[#141715] whitespace-nowrap cursor-pointer py-1.5"
          >
            {guestsLabel}
          </button>
        </div>

        <button
          type="button"
          onClick={onCheckRates}
          className="px-6 min-w-[132px] py-2.5 rounded-lg bg-[#B93A2B] hover:bg-[#9f2f22] text-white text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-transform cursor-pointer shrink-0"
        >
          <span>Reserve</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        {/* Mobile Guests Modal Sheet */}
        {guestsOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-center p-3">
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
                    className="w-9 h-9 rounded-xl border border-gray-300 flex items-center justify-center text-sm font-bold active:bg-gray-100 text-[#141715]"
                  >
                    -
                  </button>
                  <span className="w-6 text-center text-sm font-bold font-mono text-[#141715]">{adultCount}</span>
                  <button
                    type="button"
                    onClick={() => onUpdateGuests(adultCount + 1, childCount)}
                    className="w-9 h-9 rounded-xl border border-gray-300 flex items-center justify-center text-sm font-bold active:bg-gray-100 text-[#141715]"
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
                    className="w-9 h-9 rounded-xl border border-gray-300 flex items-center justify-center text-sm font-bold active:bg-gray-100 text-[#141715]"
                  >
                    -
                  </button>
                  <span className="w-6 text-center text-sm font-bold font-mono text-[#141715]">{childCount}</span>
                  <button
                    type="button"
                    onClick={() => onUpdateGuests(adultCount, childCount + 1)}
                    className="w-9 h-9 rounded-xl border border-gray-300 flex items-center justify-center text-sm font-bold active:bg-gray-100 text-[#141715]"
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
