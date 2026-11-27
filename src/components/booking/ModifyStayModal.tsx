"use client";

import React, { useState } from "react";
import { X, Calendar as CalendarIcon, Users, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { useResortStore } from "@/lib/resort-store";

interface ModifyStayModalProps {
  isOpen: boolean;
  onClose: () => void;
  startDate: string;
  endDate: string;
  adultCount: number;
  childCount: number;
  onApply: (start: string, end: string, adults: number, children: number) => void;
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function getTodayISO(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function ModifyStayModal({
  isOpen,
  onClose,
  startDate: initialStart,
  endDate: initialEnd,
  adultCount: initialAdults,
  childCount: initialChildren,
  onApply,
}: ModifyStayModalProps) {
  const { getAvailabilityForDate } = useResortStore();

  const [tempStart, setTempStart] = useState<string>(initialStart || "");
  const [tempEnd, setTempEnd] = useState<string>(initialEnd || "");
  const [tempAdults, setTempAdults] = useState<number>(initialAdults || 2);
  const [tempChildren, setTempChildren] = useState<number>(initialChildren || 0);

  // Month navigation: defaults to current local month and year
  const [viewYear, setViewYear] = useState<number>(() => {
    if (initialStart) {
      const parts = initialStart.split("-").map(Number);
      if (parts[0]) return parts[0];
    }
    return new Date().getFullYear();
  });
  const [viewMonth, setViewMonth] = useState<number>(() => {
    if (initialStart) {
      const parts = initialStart.split("-").map(Number);
      if (parts[1]) return parts[1] - 1;
    }
    return new Date().getMonth();
  });

  React.useEffect(() => {
    if (isOpen) {
      setTempStart(initialStart || "");
      setTempEnd(initialEnd || "");
      setTempAdults(initialAdults || 2);
      setTempChildren(initialChildren || 0);
      if (initialStart) {
        const parts = initialStart.split("-").map(Number);
        if (parts.length === 3 && parts[0] && parts[1]) {
          setViewYear(parts[0]);
          setViewMonth(parts[1] - 1);
        }
      } else {
        const now = new Date();
        setViewYear(now.getFullYear());
        setViewMonth(now.getMonth());
      }
    }
  }, [isOpen, initialStart, initialEnd, initialAdults, initialChildren]);

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const isPrevDisabled =
    viewYear < currentYear || (viewYear === currentYear && viewMonth <= currentMonth);

  const handlePrevMonth = () => {
    if (isPrevDisabled) return;
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

  const handleDateClick = (dateStr: string) => {
    const today = getTodayISO();
    if (dateStr < today) return;

    const dayAvail = getAvailabilityForDate(dateStr);
    if (dayAvail.isFullyBooked) return;

    if (!tempStart || (tempStart && tempEnd)) {
      setTempStart(dateStr);
      setTempEnd("");
    } else {
      if (dateStr < tempStart) {
        setTempStart(dateStr);
        setTempEnd("");
      } else {
        setTempEnd(dateStr);
      }
    }
  };

  const nightsCount = React.useMemo(() => {
    if (!tempStart || !tempEnd) return 1;
    if (tempStart === tempEnd) return 1;
    const [sy, sm, sd] = tempStart.split("-").map(Number);
    const [ey, em, ed] = tempEnd.split("-").map(Number);
    const diff = Math.round((Date.UTC(ey, em - 1, ed) - Date.UTC(sy, sm - 1, sd)) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  }, [tempStart, tempEnd]);

  const handleApply = () => {
    const finalStart = tempStart || "";
    const finalEnd = tempEnd || tempStart || "";
    onApply(finalStart, finalEnd, tempAdults, tempChildren);
    onClose();
  };

  const renderMonth = (year: number, monthIndex: number) => {
    const firstDay = new Date(year, monthIndex, 1).getDay();
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const days = [];
    const todayStr = getTodayISO();

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-9 w-9" />);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      const isPast = dateStr < todayStr;
      const isToday = dateStr === todayStr;
      const dayAvail = isPast ? null : getAvailabilityForDate(dateStr);
      const isSoldOut = !isPast && (dayAvail?.isFullyBooked || false);
      const isStart = tempStart === dateStr;
      const isEnd = tempEnd === dateStr;
      const isInRange = Boolean(tempStart && tempEnd && dateStr > tempStart && dateStr < tempEnd);

      let btnClass = "h-9 w-9 text-xs font-medium rounded-full flex flex-col items-center justify-center transition-all select-none ";

      if (isPast) {
        btnClass += "text-gray-300 cursor-not-allowed pointer-events-none ";
      } else if (isSoldOut) {
        btnClass += "text-gray-300 line-through cursor-not-allowed bg-gray-50 ";
      } else if (isStart || isEnd) {
        btnClass += "bg-[#141715] text-[#FAF8F3] font-bold shadow-sm ";
      } else if (isInRange) {
        btnClass += "bg-[#F2EDE2] text-[#141715] font-semibold ";
      } else {
        btnClass += "text-[#141715] hover:bg-[#F2EDE2] cursor-pointer ";
      }

      days.push(
        <button
          key={dateStr}
          type="button"
          disabled={isPast || isSoldOut}
          onClick={() => handleDateClick(dateStr)}
          className={btnClass}
        >
          <span className={isToday && !isStart && !isEnd ? "underline decoration-2 underline-offset-4 font-bold" : ""}>
            {d}
          </span>
        </button>
      );
    }

    return (
      <div className="space-y-3">
        <div className="text-center font-serif font-bold text-sm text-[#141715]">
          {MONTH_NAMES[monthIndex]} {year}
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-mono uppercase text-[#788E73]">
          {WEEKDAYS.map((w) => (
            <span key={w}>{w}</span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 justify-items-center">{days}</div>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[rgba(139,130,88,0.22)] overflow-hidden z-10 flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 bg-[#FAF8F3] border-b border-[rgba(139,130,88,0.16)] flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#788E73] font-bold block">
              Reservation Controller
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#141715]">
              Modify Stay & Guests
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-black hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Section 1: Guest Headcount */}
          <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[rgba(139,130,88,0.18)] space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-[#788E73] font-bold block flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" />
              <span>Step 1: Party Size</span>
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Adults Counter */}
              <div className="p-3 bg-white rounded-xl border border-gray-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#141715] block">Adults</span>
                  <span className="text-[10px] text-[#56635A]">Age 12+</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setTempAdults(Math.max(1, tempAdults - 1))}
                    className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center text-sm font-bold hover:bg-gray-100 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="font-mono font-bold text-sm w-4 text-center">
                    {tempAdults}
                  </span>
                  <button
                    type="button"
                    onClick={() => setTempAdults(tempAdults + 1)}
                    className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center text-sm font-bold hover:bg-gray-100 cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Children Counter */}
              <div className="p-3 bg-white rounded-xl border border-gray-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#141715] block">Children</span>
                  <span className="text-[10px] text-[#56635A]">Ages 0 to 11</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setTempChildren(Math.max(0, tempChildren - 1))}
                    className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center text-sm font-bold hover:bg-gray-100 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="font-mono font-bold text-sm w-4 text-center">
                    {tempChildren}
                  </span>
                  <button
                    type="button"
                    onClick={() => setTempChildren(tempChildren + 1)}
                    className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center text-sm font-bold hover:bg-gray-100 cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Calendar Dates */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-[#788E73] font-bold flex items-center gap-1.5">
                <CalendarIcon className="w-3.5 h-3.5" />
                <span>Step 2: Dates of Stay</span>
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  disabled={isPrevDisabled}
                  className={`p-1 rounded-full text-gray-600 transition-colors ${
                    isPrevDisabled
                      ? "opacity-30 cursor-not-allowed pointer-events-none"
                      : "hover:bg-gray-100 cursor-pointer"
                  }`}
                  aria-label="Previous month"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNextMonth}
                  className="p-1 rounded-full hover:bg-gray-100 text-gray-600 cursor-pointer transition-colors"
                  aria-label="Next month"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-gray-200 shadow-xs">
              {renderMonth(viewYear, viewMonth)}
            </div>
          </div>
        </div>

        {/* Footer Action */}
        <div className="px-6 py-4 bg-[#FAF8F3] border-t border-[rgba(139,130,88,0.16)] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-[#56635A]">
            <span className="font-bold text-[#141715]">
              {tempStart ? `${tempStart} to ${tempEnd || tempStart}` : "Select dates"}
            </span>
            <span className="mx-2">·</span>
            <span>
              {tempAdults} {tempAdults === 1 ? "Adult" : "Adults"}
              {tempChildren > 0 ? `, ${tempChildren} Children` : ""}
            </span>
          </div>

          <button
            type="button"
            onClick={handleApply}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#141715] hover:bg-[#28302b] text-[#FAF8F3] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <Check className="w-4 h-4 text-[#7BA23F]" />
            <span>Apply & Update Availability</span>
          </button>
        </div>
      </div>
    </div>
  );
}
