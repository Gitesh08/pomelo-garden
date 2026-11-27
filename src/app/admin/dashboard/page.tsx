"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Users,
  Bed,
  Wallet,
  TrendingUp,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Plus,
  Utensils,
  CheckCircle,
  AlertTriangle,
  Send,
  Printer,
  BadgeCheck,
  Check,
} from "lucide-react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { useResortStore } from "@/lib/resort-store";

export default function AdminDashboardPage() {
  const { bookings, rooms, updateBookingStatus } = useResortStore();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Interactive selected date (defaults to 2026-11-26)
  const [selectedDate, setSelectedDate] = useState<string>("2026-11-26");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Quick Date Navigation Handlers
  const handlePrevDay = () => {
    const [y, m, d] = selectedDate.split("-").map(Number);
    const dateObj = new Date(y, m - 1, d);
    dateObj.setDate(dateObj.getDate() - 1);
    const ny = dateObj.getFullYear();
    const nm = String(dateObj.getMonth() + 1).padStart(2, "0");
    const nd = String(dateObj.getDate()).padStart(2, "0");
    setSelectedDate(`${ny}-${nm}-${nd}`);
  };

  const handleNextDay = () => {
    const [y, m, d] = selectedDate.split("-").map(Number);
    const dateObj = new Date(y, m - 1, d);
    dateObj.setDate(dateObj.getDate() + 1);
    const ny = dateObj.getFullYear();
    const nm = String(dateObj.getMonth() + 1).padStart(2, "0");
    const nd = String(dateObj.getDate()).padStart(2, "0");
    setSelectedDate(`${ny}-${nm}-${nd}`);
  };

  const handleToday = () => {
    setSelectedDate("2026-11-26");
  };

  // Formatted selected date for human display
  const formattedSelectedDate = useMemo(() => {
    try {
      const [y, m, d] = selectedDate.split("-").map(Number);
      const dateObj = new Date(y, m - 1, d);
      return dateObj.toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return selectedDate;
    }
  }, [selectedDate]);

  // Dynamic 7-Day Window centered on selected date (-1 to +5 days)
  const weekDays = useMemo(() => {
    const [y, m, d] = selectedDate.split("-").map(Number);
    const base = new Date(y, m - 1, d);
    const start = new Date(base);
    start.setDate(base.getDate() - 1);

    const days = [];
    for (let i = 0; i < 7; i++) {
      const cur = new Date(start);
      cur.setDate(start.getDate() + i);
      const year = cur.getFullYear();
      const month = String(cur.getMonth() + 1).padStart(2, "0");
      const day = String(cur.getDate()).padStart(2, "0");
      const dateStr = `${year}-${month}-${day}`;
      const dayName = cur.toLocaleDateString("en-US", { weekday: "short" });
      const monthShort = cur.toLocaleDateString("en-US", { month: "short" });
      const isToday = dateStr === "2026-11-26";
      const isSelected = dateStr === selectedDate;

      days.push({
        dateStr,
        label: `${dayName} ${cur.getDate()}`,
        full: `${dayName} ${cur.getDate()} ${monthShort}`,
        dayName,
        dayNum: cur.getDate(),
        monthShort,
        isToday,
        isSelected,
      });
    }
    return days;
  }, [selectedDate]);

  // Dynamic room status lookup for any room and date
  const getRoomDayStatus = (roomId: string, dateStr: string) => {
    const b = bookings.find(
      (booking) =>
        booking.rooms.includes(roomId) &&
        booking.checkIn <= dateStr &&
        dateStr < booking.checkOut
    );
    if (b) {
      let badgeColor = "bg-[#1E6F50] text-white";
      if (b.status === "Pending Advance") badgeColor = "bg-[#E06354] text-white";
      if (b.status === "Checked-In") badgeColor = "bg-[#1E6F50] text-white";
      if (b.status === "Completed") badgeColor = "bg-gray-100 text-gray-700";

      const guestDesc = `${b.guestName} (${b.adults + b.children}p)`;
      const payDesc = b.balanceDue > 0 ? `Due ₹${b.balanceDue.toLocaleString("en-IN")}` : "Paid Full";

      return {
        isBooked: true,
        booking: b,
        status: b.status,
        guest: guestDesc,
        payment: payDesc,
        badgeColor,
      };
    }

    return {
      isBooked: false,
      booking: null,
      status: "Vacant",
      guest: "Clean & Ready",
      payment: "Open for Booking",
      badgeColor: "bg-gray-100 text-gray-700",
    };
  };

  // KPI Calculations
  const totalGuestsToday = 24; // 16 Adults, 8 Kids
  const occupiedCount = rooms.filter((r) => r.currentStatus === "Occupied").length;
  const occupancyPercentage = Math.round((occupiedCount / rooms.length) * 100);
  const totalDueToday = bookings
    .filter((b) => b.balanceDue > 0)
    .reduce((acc, curr) => acc + curr.balanceDue, 0);

  // Quick Check-in action
  const handleCheckIn = (id: string, name: string) => {
    updateBookingStatus(id, "Checked-In");
    showToast(`✓ Guest ${name} has been Checked-In. Room assigned!`);
  };

  return (
    <AdminSidebar>
      <div className="space-y-6 sm:space-y-8 max-w-7xl mx-auto">
        {/* Toast alert */}
        {toastMessage && (
          <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-50 bg-[#101814] text-white px-4 sm:px-5 py-3 rounded-xl shadow-2xl border border-[#1E6F50] flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-2 text-xs font-semibold">
            <BadgeCheck className="w-4 h-4 text-[#89D6B1] shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Top Command & Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E2E7E4]">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-gray-500 mb-0.5">
              <span>Saphale Groves</span>
              <span>›</span>
              <span className="text-[#1E6F50] font-semibold">Property Command</span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-[#161D1A]">
              Property Overview
            </h1>
          </div>

          {/* Quick Actions & Date Controls */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Interactive Calendar Date Picker & Daily Navigation */}
            <div className="flex items-center bg-white rounded-xl border border-[#E2E7E4] shadow-xs text-xs font-mono p-1">
              <button
                type="button"
                onClick={handlePrevDay}
                className="p-1.5 hover:text-[#1E6F50] hover:bg-[#F3F5F4] rounded-lg transition-colors cursor-pointer"
                title="Previous Day"
                aria-label="Previous day"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Clickable Date Display with hidden native date picker */}
              <label
                className="relative flex items-center gap-1.5 px-2.5 py-1 rounded-lg hover:bg-[#F3F5F4] transition-colors cursor-pointer select-none"
                title="Click to pick any date on calendar"
              >
                <Calendar className="w-3.5 h-3.5 text-[#1E6F50]" />
                <span className="font-semibold text-[#161D1A]">{formattedSelectedDate}</span>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => e.target.value && setSelectedDate(e.target.value)}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
              </label>

              <button
                type="button"
                onClick={handleNextDay}
                className="p-1.5 hover:text-[#1E6F50] hover:bg-[#F3F5F4] rounded-lg transition-colors cursor-pointer"
                title="Next Day"
                aria-label="Next day"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {selectedDate !== "2026-11-26" && (
                <button
                  type="button"
                  onClick={handleToday}
                  className="ml-1 px-2 py-0.5 rounded bg-[#1E6F50]/10 text-[#1E6F50] text-[10px] font-bold hover:bg-[#1E6F50] hover:text-white transition-colors cursor-pointer"
                  title="Jump back to Today (26 Nov)"
                >
                  Today
                </button>
              )}
            </div>

            <Link
              href="/admin/bookings"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#141715] hover:bg-[#28302b] text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-xs cursor-pointer active:scale-98"
            >
              <Plus className="w-3.5 h-3.5 text-[#89D6B1]" />
              <span>New Booking</span>
            </Link>
          </div>
        </div>

        {/* 4 Precision KPI Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {/* Card 1: Today's Guests */}
          <div className="bg-white rounded-2xl p-3.5 sm:p-5 border border-[#E2E7E4] shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-gray-500 truncate">
                Today&apos;s Guests
              </span>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#F4FBF6] flex items-center justify-center text-[#1E6F50] shrink-0">
                <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-baseline gap-1 sm:gap-2">
                <span className="font-mono text-xl sm:text-3xl font-bold text-[#161D1A]">
                  {totalGuestsToday}
                </span>
                <span className="text-[10px] sm:text-xs uppercase font-mono text-gray-500">Pax</span>
              </div>
              <div className="flex items-center justify-between pt-1.5 border-t border-gray-100 text-[10px] sm:text-[11px] font-mono text-gray-600">
                <span>16 Adults · 8 Kids</span>
                <span className="text-[#1E6F50] font-semibold hidden sm:inline">+4 vs yesterday</span>
              </div>
            </div>
          </div>

          {/* Card 2: Rooms Occupied */}
          <div className="bg-white rounded-2xl p-3.5 sm:p-5 border border-[#E2E7E4] shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-gray-500 truncate">
                Rooms Occupied
              </span>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#F4FBF6] flex items-center justify-center text-[#1E6F50] shrink-0">
                <Bed className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-baseline justify-between">
                <div className="flex items-baseline gap-1">
                  <span className="font-mono text-xl sm:text-3xl font-bold text-[#161D1A]">
                    {occupiedCount}
                  </span>
                  <span className="font-mono text-[10px] sm:text-xs text-gray-500">/ {rooms.length} Units</span>
                </div>
                <span className="px-1.5 py-0.5 rounded bg-[#F4FBF6] text-[#1E6F50] font-mono text-[10px] sm:text-xs font-bold">
                  {occupancyPercentage}%
                </span>
              </div>
              <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#1E6F50] h-full rounded-full transition-all duration-500"
                  style={{ width: `${occupancyPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Card 3: Balance Due Today */}
          <div className="bg-white rounded-2xl p-3.5 sm:p-5 border border-[#E2E7E4] shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-gray-500 truncate">
                Balance Due
              </span>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#E06354]/10 flex items-center justify-center text-[#E06354] shrink-0">
                <Wallet className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-baseline gap-1">
                <span className="font-mono text-lg sm:text-2xl font-bold text-[#E06354]">
                  ₹{totalDueToday.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex items-center justify-between pt-1.5 border-t border-gray-100 text-[10px] sm:text-[11px] font-mono">
                <span className="text-[#E06354] font-semibold">2 Unsettled</span>
                <span className="text-gray-500 hidden sm:inline">Desk collection</span>
              </div>
            </div>
          </div>

          {/* Card 4: Monthly Revenue */}
          <div className="bg-white rounded-2xl p-3.5 sm:p-5 border border-[#E2E7E4] shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-gray-500 truncate">
                Monthly MTD
              </span>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#F4FBF6] flex items-center justify-center text-[#1E6F50] shrink-0">
                <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-baseline gap-1">
                <span className="font-mono text-lg sm:text-2xl font-bold text-[#161D1A]">₹2,84,500</span>
              </div>
              <div className="flex items-center justify-between pt-1.5 border-t border-gray-100 text-[10px] sm:text-[11px] font-mono text-gray-600">
                <span>88% Target</span>
                <span className="text-[#1E6F50] font-semibold hidden sm:inline">+12.4%</span>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            7-DAY ROOM AVAILABILITY (Mobile Card Deck + Desktop Matrix Grid)
           ========================================================================= */}
        <div className="bg-white rounded-2xl border border-[#E2E7E4] shadow-xs overflow-hidden">
          {/* Header */}
          <div className="p-4 sm:p-5 bg-[#F9FAF9] border-b border-[#E2E7E4] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#1E6F50]" />
              <h2 className="text-sm sm:text-base font-bold text-[#161D1A]">
                Room Allocation & Availability Matrix
              </h2>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-3 text-[11px] font-mono text-gray-600 flex-wrap">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-[#1E6F50]"></span>
                <span>Confirmed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-[#E06354]"></span>
                <span>Pending</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-gray-200"></span>
                <span>Vacant</span>
              </div>
            </div>
          </div>

          {/* MOBILE VIEW: Dynamic Day Selector + Real-Time Room Allocation Cards (md:hidden) */}
          <div className="md:hidden p-3.5 space-y-3">
            {/* Dynamic Day Pills Bar */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {weekDays.map((d) => (
                <button
                  key={d.dateStr}
                  type="button"
                  onClick={() => setSelectedDate(d.dateStr)}
                  className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-mono font-semibold transition-colors cursor-pointer ${
                    d.isSelected
                      ? "bg-[#141715] text-[#FAF8F3] shadow-xs"
                      : d.isToday
                      ? "bg-[#1E6F50]/15 text-[#1E6F50] border border-[#1E6F50]/30"
                      : "bg-[#F3F5F4] text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {d.label} {d.isToday ? "(Today)" : ""}
                </button>
              ))}
            </div>

            {/* Cards for each room on the selected day from live store */}
            <div className="space-y-2.5 pt-1">
              {rooms.map((room) => {
                const info = getRoomDayStatus(room.id, selectedDate);
                return (
                  <div
                    key={`${room.id}-${selectedDate}`}
                    className="p-3.5 rounded-xl bg-[#FAF8F3] border border-[rgba(139,130,88,0.18)] space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="font-bold text-xs text-[#141715] block">
                          {room.name}
                        </span>
                        <span className="text-[10px] font-mono text-[#788E73]">
                          {room.type}
                        </span>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded-md font-mono text-[10px] font-bold uppercase tracking-wider ${info.badgeColor}`}
                      >
                        {info.status}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[rgba(139,130,88,0.12)] text-xs">
                      <span className="font-medium text-[#161D1A] truncate max-w-[190px]">
                        {info.guest}
                      </span>
                      <span className="text-[10px] font-mono text-gray-500 whitespace-nowrap">
                        {info.payment}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* DESKTOP VIEW: Full 7-Day Live Allocation Matrix (hidden md:block) */}
          <div className="hidden md:block overflow-x-auto">
            <div className="min-w-[920px]">
              {/* Day Columns Header */}
              <div className="grid grid-cols-[220px_repeat(7,1fr)] bg-[#F4FBF6]/60 border-b border-[#E2E7E4] text-[11px] font-mono uppercase text-gray-500 font-semibold py-2">
                <div className="px-4 sticky left-0 bg-[#F4FBF6] z-20 shadow-[2px_0_4px_rgba(0,0,0,0.05)]">
                  Accommodation Unit
                </div>
                {weekDays.map((d) => (
                  <button
                    key={d.dateStr}
                    type="button"
                    onClick={() => setSelectedDate(d.dateStr)}
                    className={`text-center py-0.5 rounded transition-colors cursor-pointer ${
                      d.isSelected
                        ? "bg-[#141715] text-[#FAF8F3] font-bold shadow-xs"
                        : d.isToday
                        ? "bg-[#1E6F50]/15 text-[#1E6F50] font-bold"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    {d.full} {d.isToday ? "(Today)" : ""}
                  </button>
                ))}
              </div>

              {/* Rows for each room */}
              <div className="divide-y divide-[#E2E7E4] text-xs">
                {rooms.map((room) => (
                  <div
                    key={room.id}
                    className="grid grid-cols-[220px_repeat(7,1fr)] items-center h-14 hover:bg-[#F9FAF9] transition-colors"
                  >
                    <div className="px-4 flex flex-col justify-center sticky left-0 bg-white z-10 shadow-[2px_0_4px_rgba(0,0,0,0.05)] h-full">
                      <span className="font-bold text-[#161D1A]">{room.name}</span>
                      <span className="text-[10px] font-mono text-[#7BA23F]">{room.type}</span>
                    </div>

                    {weekDays.map((d) => {
                      const info = getRoomDayStatus(room.id, d.dateStr);
                      return (
                        <div key={`${room.id}-${d.dateStr}`} className="px-1 text-center">
                          {info.isBooked ? (
                            <div
                              className={`h-9 rounded px-2 flex items-center justify-between font-mono text-[11px] shadow-xs ${info.badgeColor}`}
                              title={`${info.guest} · ${info.status} · ${info.payment}`}
                            >
                              <span className="truncate font-semibold">{info.booking?.guestName}</span>
                              <span className="text-[9px] bg-black/20 px-1 py-0.5 rounded shrink-0 ml-1">
                                {info.status === "Checked-In" ? "In" : "Booked"}
                              </span>
                            </div>
                          ) : (
                            <div className="h-9 rounded border border-dashed border-gray-200 flex items-center justify-center font-mono text-[10px] text-gray-400 hover:border-[#1E6F50] hover:text-[#1E6F50] hover:bg-[#F4FBF6] transition-colors">
                              Vacant
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            BOTTOM 2-COLUMN SPLIT: Kitchen Manifest & Upcoming Arrivals
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Left Column: Kitchen & Meal Manifest */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E2E7E4] shadow-xs p-4 sm:p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E2E7E4]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#F4FBF6] text-[#1E6F50] flex items-center justify-center">
                  <Utensils className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[#161D1A]">
                    Today&apos;s Kitchen Manifest
                  </h3>
                  <span className="text-[11px] font-mono text-gray-500">
                    Chulha Fire Hearth Schedule
                  </span>
                </div>
              </div>

              {/* Plate count pill */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F4FBF6] border border-[#1E6F50]/20 text-xs font-mono self-start sm:self-auto">
                <span className="text-[#1E6F50] font-bold">16 Veg</span>
                <span className="text-gray-300">·</span>
                <span className="text-[#E06354] font-bold">8 Non-Veg</span>
                <span className="text-gray-300">·</span>
                <span className="text-[#161D1A] font-semibold">24 Pax</span>
              </div>
            </div>

            {/* Meal Services Cards */}
            <div className="space-y-2.5">
              {/* Breakfast */}
              <div className="p-3.5 rounded-xl bg-[#F9FAF9] border border-[#E2E7E4] space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#161D1A]">
                    Breakfast (08:30 AM to 10:00 AM)
                  </span>
                  <span className="font-mono text-[10px] text-[#1E6F50] font-semibold bg-[#1E6F50]/10 px-2 py-0.5 rounded">
                    Completed
                  </span>
                </div>
                <p className="text-xs text-gray-600">
                  <strong className="text-[#161D1A]">16 Veg:</strong> Konkan Misal Pav, Poha. <strong className="text-[#161D1A]">8 Non-Veg:</strong> Masala Bhurji Pav.
                </p>
              </div>

              {/* Lunch */}
              <div className="p-3.5 rounded-xl bg-[#F9FAF9] border border-[#E2E7E4] space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#161D1A]">
                    Chulha-Cooked Lunch (01:00 PM to 02:30 PM)
                  </span>
                  <span className="font-mono text-[10px] text-[#E06354] font-semibold bg-[#E06354]/10 px-2 py-0.5 rounded flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E06354] animate-pulse"></span>
                    Prep in Progress
                  </span>
                </div>
                <p className="text-xs text-gray-600">
                  <strong className="text-[#161D1A]">16 Non-Veg:</strong> Fresh Surmai Fry & Agri Chicken Thali. <strong className="text-[#161D1A]">8 Veg:</strong> Pithla Bhakri, Dal Tadka.
                </p>
              </div>

              {/* High Tea */}
              <div className="p-3.5 rounded-xl bg-[#F9FAF9] border border-[#E2E7E4] space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#161D1A]">Evening High Tea (05:00 PM)</span>
                  <span className="font-mono text-[10px] text-gray-500 bg-gray-200 px-2 py-0.5 rounded">
                    Scheduled
                  </span>
                </div>
                <p className="text-xs text-gray-600">
                  Lemongrass Kulhad Chai with freshly steamed hot Ukadiche Modak (24 Pax).
                </p>
              </div>

              {/* Allergen alert */}
              <div className="p-3 rounded-lg bg-[#E06354]/10 border border-[#E06354]/20 flex items-start gap-2 text-xs text-[#E06354]">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  <strong>Allergen Notice:</strong> 2 guests in Room 103 are allergic to peanuts.
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2 pt-1 flex-wrap">
              <button
                type="button"
                onClick={() => showToast("Kitchen manifest sent to printer.")}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#F3F5F4] hover:bg-[#E2E7E4] text-xs font-semibold text-[#161D1A] transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>
              <button
                type="button"
                onClick={() => showToast("WhatsApp update dispatched to Kitchen Staff!")}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1E6F50] hover:bg-[#185e43] text-white text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 text-[#89D6B1]" />
                <span>Notify Kitchen</span>
              </button>
            </div>
          </div>

          {/* Right Column: Upcoming Arrivals Desk */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-[#E2E7E4] shadow-xs p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E7E4]">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-[#161D1A]">Arrivals & Check-In</h3>
                <span className="text-[11px] font-mono text-gray-500">Expected Today</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#F4FBF6] text-[#1E6F50] font-mono text-xs font-semibold">
                3 Expected
              </span>
            </div>

            {/* Inbound Guests List */}
            <div className="space-y-2.5">
              {bookings.slice(0, 3).map((b) => (
                <div
                  key={b.id}
                  className="p-3.5 rounded-xl bg-[#F9FAF9] border border-[#E2E7E4] space-y-2 hover:border-[#1E6F50] transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-bold text-[#161D1A] block">{b.guestName}</span>
                      <span className="text-[10px] font-mono text-gray-500">
                        {b.rooms.join(", ")} · {b.adults} Adults{b.children > 0 ? `, ${b.children} Kids` : ""}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-[#1E6F50]/10 text-[#1E6F50]">
                      {b.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-[11px]">
                    <span className="font-mono text-gray-600">
                      ID: {b.idType} •••• {b.idLast4}
                    </span>
                    {b.status !== "Checked-In" ? (
                      <button
                        type="button"
                        onClick={() => handleCheckIn(b.id, b.guestName)}
                        className="px-3 py-1 rounded-lg bg-[#1E6F50] text-white hover:bg-[#185e43] font-semibold text-[11px] transition-colors cursor-pointer"
                      >
                        Check-In
                      </button>
                    ) : (
                      <span className="text-[#1E6F50] font-semibold flex items-center gap-1 text-[11px]">
                        <CheckCircle className="w-3.5 h-3.5" /> Checked-In
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-1">
              <Link
                href="/admin/bookings"
                className="w-full py-2.5 rounded-xl border border-[#E2E7E4] hover:bg-[#F3F5F4] text-xs font-semibold text-center block text-[#161D1A] transition-colors"
              >
                View Full Bookings & ID Vault ({bookings.length}) →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AdminSidebar>
  );
}
