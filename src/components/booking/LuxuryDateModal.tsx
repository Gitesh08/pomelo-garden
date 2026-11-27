"use client";

import React, { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, X, Clock, ShieldCheck } from "lucide-react";
import { useResortStore } from "@/lib/resort-store";

interface LuxuryDateModalProps {
  isOpen: boolean;
  onClose: () => void;
  startDate: string;
  endDate: string;
  onApply: (start: string, end: string) => void;
}

// Stable base date for SSR
const BASE_YEAR = 2026;
const BASE_MONTH = 10; // 0-indexed: 10 = November

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function formatISODate(year: number, month: number, day: number): string {
  const m = String(month + 1).padStart(2, "0");
  const d = String(day).padStart(2, "0");
  return `${year}-${m}-${d}`;
}

function parseISODate(dateStr: string): { year: number; month: number; day: number } | null {
  if (!dateStr) return null;
  const parts = dateStr.split("-");
  if (parts.length !== 3) return null;
  return {
    year: parseInt(parts[0], 10),
    month: parseInt(parts[1], 10) - 1,
    day: parseInt(parts[2], 10),
  };
}

export function LuxuryDateModal({
  isOpen,
  onClose,
  startDate,
  endDate,
  onApply,
}: LuxuryDateModalProps) {
  const { getAvailabilityForDate } = useResortStore();

  // Current viewed month (left month on desktop, single month on mobile)
  const [viewYear, setViewYear] = useState<number>(BASE_YEAR);
  const [viewMonth, setViewMonth] = useState<number>(BASE_MONTH);

  // Local selection state while modal is open
  const [selStart, setSelStart] = useState<string>(startDate || "2026-11-26");
  const [selEnd, setSelEnd] = useState<string>(endDate || "2026-11-28");
  const [hoverDate, setHoverDate] = useState<string | null>(null);

  // Reset local state when opened
  React.useEffect(() => {
    if (isOpen) {
      if (startDate) {
        setSelStart(startDate);
        const parsed = parseISODate(startDate);
        if (parsed) {
          setViewYear(parsed.year);
          setViewMonth(parsed.month);
        }
      }
      if (endDate) setSelEnd(endDate);
    }
  }, [isOpen, startDate, endDate]);

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  // Right month for dual display on desktop
  const nextMonthYear = viewMonth === 11 ? viewYear + 1 : viewYear;
  const nextMonthIndex = viewMonth === 11 ? 0 : viewMonth + 1;

  // Check if any date in a range is fully booked
  const hasSoldOutDateInRange = (startStr: string, endStr: string) => {
    const s = new Date(startStr);
    const e = new Date(endStr);
    const curr = new Date(s);
    while (curr <= e) {
      const y = curr.getFullYear();
      const m = String(curr.getMonth() + 1).padStart(2, "0");
      const d = String(curr.getDate()).padStart(2, "0");
      const dStr = `${y}-${m}-${d}`;
      const av = getAvailabilityForDate(dStr);
      if (av.totalAvailable === 0) return true;
      curr.setDate(curr.getDate() + 1);
    }
    return false;
  };

  // Handle date selection: click start, click end (or reset if earlier)
  const handleDayClick = (dateStr: string, isPast: boolean, isSoldOut: boolean) => {
    // Strictly forbid selecting any sold out or past date
    if (isPast || isSoldOut) return;

    if (!selStart || (selStart && selEnd)) {
      // Start fresh selection
      setSelStart(dateStr);
      setSelEnd("");
    } else if (selStart && !selEnd) {
      if (dateStr < selStart) {
        // Earlier than start: reset with new start date
        setSelStart(dateStr);
        setSelEnd("");
      } else if (dateStr === selStart) {
        // Same day picnic stay
        setSelEnd(dateStr);
      } else {
        // Check if there are any sold out dates in the middle of this range
        if (hasSoldOutDateInRange(selStart, dateStr)) {
          // Range crosses a sold out date: reset to this date as new start
          setSelStart(dateStr);
          setSelEnd("");
        } else {
          // Valid range with open inventory across all nights
          setSelEnd(dateStr);
        }
      }
    }
  };

  // Calculate nights count
  const nightsCount = useMemo(() => {
    if (!selStart || !selEnd) return 0;
    if (selStart === selEnd) return 1; // day picnic
    const s = new Date(selStart).getTime();
    const e = new Date(selEnd).getTime();
    const diff = Math.round((e - s) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  }, [selStart, selEnd]);

  // Formatted date range label
  const formattedRange = useMemo(() => {
    if (!selStart) return "Select check-in date";
    const s = parseISODate(selStart);
    if (!s) return "";
    const sStr = `${s.day} ${MONTH_NAMES[s.month].slice(0, 3)} ${s.year}`;

    if (!selEnd) return `${sStr} to Select check-out`;
    if (selStart === selEnd) return `${sStr} (One-Day Picnic)`;

    const e = parseISODate(selEnd);
    if (!e) return sStr;
    const eStr = `${e.day} ${MONTH_NAMES[e.month].slice(0, 3)} ${e.year}`;
    return `${sStr} to ${eStr}`;
  }, [selStart, selEnd]);

  const handleApply = () => {
    if (!selStart) return;
    const finalEnd = selEnd || selStart;
    onApply(selStart, finalEnd);
    onClose();
  };

  // Render a calendar grid for a specific month
  const renderMonthGrid = (year: number, month: number) => {
    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    const days: (number | null)[] = [];
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(null);
    }
    for (let d = 1; d <= totalDays; d++) {
      days.push(d);
    }

    return (
      <div className="w-full">
        {/* Month Title */}
        <div className="text-center font-serif text-lg sm:text-xl font-bold text-[#141715] mb-4">
          {MONTH_NAMES[month]} {year}
        </div>

        {/* Days of week header */}
        <div className="grid grid-cols-7 mb-2 text-center">
          {DAY_LABELS.map((label, idx) => (
            <span
              key={idx}
              className="text-[11px] font-mono uppercase tracking-wider text-[#56635A]/70 font-semibold py-1"
            >
              {label}
            </span>
          ))}
        </div>

        {/* Calendar days grid */}
        <div className="grid grid-cols-7 gap-y-1">
          {days.map((day, idx) => {
            if (day === null) {
              return <div key={`empty-${idx}`} className="h-10 sm:h-11" />;
            }

            const dateStr = formatISODate(year, month, day);
            const isToday = dateStr === "2026-11-26";
            const isPast = dateStr < "2026-11-26";

            // Availability check
            const avail = getAvailabilityForDate(dateStr);
            const isSoldOut = avail.totalAvailable === 0 && !isPast;
            const isLimited = avail.totalAvailable === 1 && !isPast;

            // Selection flags
            const isStart = selStart === dateStr;
            const isEnd = selEnd === dateStr;
            const isInRange =
              selStart && selEnd && dateStr > selStart && dateStr < selEnd;
            const isHoverRange =
              selStart &&
              !selEnd &&
              hoverDate &&
              hoverDate > selStart &&
              dateStr > selStart &&
              dateStr <= hoverDate;

            const isHighlighted = isStart || isEnd || isInRange || isHoverRange;

            return (
              <div
                key={dateStr}
                className="relative flex items-center justify-center h-10 sm:h-11"
                onMouseEnter={() => {
                  if (selStart && !selEnd) setHoverDate(dateStr);
                }}
              >
                {/* Continuous range ribbon background (Cheval Blanc style) */}
                {isHighlighted && selEnd && selStart !== selEnd && (
                  <div
                    className={`absolute inset-y-1 z-0 bg-[#141715] ${
                      isStart
                        ? "left-1 right-0 rounded-l-full"
                        : isEnd
                        ? "left-0 right-1 rounded-r-full"
                        : "inset-x-0"
                    }`}
                  />
                )}

                {/* Hover ribbon before selection is locked */}
                {isHoverRange && (
                  <div className="absolute inset-y-1 inset-x-0 z-0 bg-[#141715]/10" />
                )}

                {/* Day button */}
                <button
                  type="button"
                  disabled={isPast || isSoldOut}
                  onClick={() => handleDayClick(dateStr, isPast, isSoldOut)}
                  className={`relative z-10 w-9 h-9 sm:w-10 sm:h-10 flex flex-col items-center justify-center text-xs sm:text-sm font-medium transition-all ${
                    isStart || isEnd
                      ? "rounded-full bg-[#141715] text-[#FAF8F3] font-bold shadow-sm"
                      : isInRange
                      ? "text-[#FAF8F3] font-semibold"
                      : isPast
                      ? "text-gray-300 cursor-not-allowed pointer-events-none"
                      : isSoldOut
                      ? "text-gray-300 line-through cursor-not-allowed pointer-events-none bg-neutral-100/80 rounded-full select-none"
                      : "text-[#141715] hover:bg-[#F2EDE2] rounded-full cursor-pointer"
                  }`}
                >
                  <span className={`${isToday && !isStart && !isEnd ? "underline decoration-2 underline-offset-4 font-bold" : ""}`}>
                    {day}
                  </span>

                  {/* Limited availability dot (Four Seasons style) */}
                  {isLimited && !isStart && !isEnd && !isInRange && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 absolute bottom-1" />
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      {/* Dimmed backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Luxury Popover Card */}
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-[#E2E7E4] overflow-hidden z-10 flex flex-col animate-in zoom-in-95 duration-200 max-h-[92vh]">
        {/* Top Header Bar */}
        <div className="px-6 py-4 border-b border-[#E2E7E4] flex items-center justify-between bg-[#FAF8F3]">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#788E73] font-bold block">
              Live Availability Calendar
            </span>
            <span className="font-serif text-lg sm:text-xl font-bold text-[#141715]">
              Select Check-In and Check-Out Dates
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-gray-500 hover:text-black hover:bg-gray-100 transition-colors"
            aria-label="Close calendar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Calendar Months Section */}
        <div className="p-4 sm:p-8 overflow-y-auto relative">
          {/* Navigation Arrows */}
          <div className="flex items-center justify-between absolute top-4 sm:top-8 left-4 right-4 sm:left-8 sm:right-8 z-20 pointer-events-none">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-2 rounded-full bg-white hover:bg-[#F2EDE2] border border-[#E2E7E4] text-[#141715] shadow-xs pointer-events-auto transition-colors cursor-pointer"
              aria-label="Previous Month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNextMonth}
              className="p-2 rounded-full bg-white hover:bg-[#F2EDE2] border border-[#E2E7E4] text-[#141715] shadow-xs pointer-events-auto transition-colors cursor-pointer"
              aria-label="Next Month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Dual Month View (Desktop) & Single Month View (Mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Left Month */}
            <div className="pt-2">
              {renderMonthGrid(viewYear, viewMonth)}
            </div>

            {/* Right Month (visible on tablet/desktop) */}
            <div className="hidden md:block pt-2">
              {renderMonthGrid(nextMonthYear, nextMonthIndex)}
            </div>
          </div>

          {/* Four Seasons Style Legend */}
          <div className="mt-8 pt-4 border-t border-[#E2E7E4] flex flex-wrap items-center justify-between gap-4 text-xs text-[#56635A]">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2 font-mono text-[11px]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#141715]" />
                <span>Selected</span>
              </span>
              <span className="flex items-center gap-2 font-mono text-[11px]">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>Limited (1 Cottage Left)</span>
              </span>
              <span className="flex items-center gap-2 font-mono text-[11px]">
                <span className="w-3 h-0.5 bg-gray-400" />
                <span>Sold out</span>
              </span>
            </div>

            <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#788E73]">
              <Clock className="w-3.5 h-3.5" />
              <span>Real-time inventory synced</span>
            </div>
          </div>
        </div>

        {/* Four Seasons Style Bottom Action Bar */}
        <div className="px-6 py-4 bg-[#FAF8F3] border-t border-[#E2E7E4] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <span className="text-[#56635A]">Dates:</span>
            <span className="font-bold text-[#141715] font-mono">{formattedRange}</span>
            {nightsCount > 0 && (
              <span className="px-2 py-0.5 rounded bg-[#141715]/10 text-[#141715] font-mono text-xs font-semibold">
                {nightsCount} {nightsCount === 1 ? "Night" : "Nights"}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-lg border border-[#E2E7E4] text-[#141715] hover:bg-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!selStart}
              onClick={handleApply}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-lg bg-[#141715] hover:bg-[#28302b] text-[#FAF8F3] text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer disabled:opacity-50"
            >
              Apply Dates
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
