"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Users,
  Bed,
  Wallet,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Plus,
  CheckCircle,
  AlertTriangle,
  BadgeCheck,
  Check,
  PhoneCall,
  MessageSquare,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  LogOut,
  LogIn,
} from "lucide-react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { useResortStore, getTodayISO, addDaysToISO } from "@/lib/resort-store";

export default function AdminDashboardPage() {
  const { bookings, rooms, updateBookingStatus, updateBooking } = useResortStore();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Interactive selected date (defaults dynamically to today)
  const [selectedDate, setSelectedDate] = useState<string>(() => getTodayISO());

  // Roster Tab for Front-Office Operations (arrivals, inhouse, departures)
  const [activeRosterTab, setActiveRosterTab] = useState<"arrivals" | "inhouse" | "departures">("arrivals");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Quick Date Navigation Handlers (guarded against navigating into past)
  const handlePrevDay = () => {
    const today = getTodayISO();
    if (selectedDate <= today) return;
    const [y, m, d] = selectedDate.split("-").map(Number);
    const dateObj = new Date(y, m - 1, d);
    dateObj.setDate(dateObj.getDate() - 1);
    const ny = dateObj.getFullYear();
    const nm = String(dateObj.getMonth() + 1).padStart(2, "0");
    const nd = String(dateObj.getDate()).padStart(2, "0");
    const newDate = `${ny}-${nm}-${nd}`;
    setSelectedDate(newDate < today ? today : newDate);
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

  const handlePrevWeek = () => {
    const today = getTodayISO();
    if (selectedDate <= today) return;
    const [y, m, d] = selectedDate.split("-").map(Number);
    const dateObj = new Date(y, m - 1, d);
    dateObj.setDate(dateObj.getDate() - 7);
    const ny = dateObj.getFullYear();
    const nm = String(dateObj.getMonth() + 1).padStart(2, "0");
    const nd = String(dateObj.getDate()).padStart(2, "0");
    const newDate = `${ny}-${nm}-${nd}`;
    setSelectedDate(newDate < today ? today : newDate);
  };

  const handleNextWeek = () => {
    const [y, m, d] = selectedDate.split("-").map(Number);
    const dateObj = new Date(y, m - 1, d);
    dateObj.setDate(dateObj.getDate() + 7);
    const ny = dateObj.getFullYear();
    const nm = String(dateObj.getMonth() + 1).padStart(2, "0");
    const nd = String(dateObj.getDate()).padStart(2, "0");
    setSelectedDate(`${ny}-${nm}-${nd}`);
  };

  const handleToday = () => {
    setSelectedDate(getTodayISO());
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

  // Dynamic 7-Day Window starting strictly from selectedDate (always today or future)
  const weekDays = useMemo(() => {
    const today = getTodayISO();
    const effectiveBase = selectedDate < today ? today : selectedDate;
    const [y, m, d] = effectiveBase.split("-").map(Number);
    const base = new Date(y, m - 1, d);

    const days = [];
    for (let i = 0; i < 7; i++) {
      const cur = new Date(base);
      cur.setDate(base.getDate() + i);
      const year = cur.getFullYear();
      const month = String(cur.getMonth() + 1).padStart(2, "0");
      const day = String(cur.getDate()).padStart(2, "0");
      const dateStr = `${year}-${month}-${day}`;
      const dayName = cur.toLocaleDateString("en-US", { weekday: "short" });
      const monthShort = cur.toLocaleDateString("en-US", { month: "short" });
      const isToday = dateStr === today;
      const isSelected = dateStr === selectedDate;

      days.push({
        dateStr,
        label: isToday ? "Today" : `${dayName} ${cur.getDate()}`,
        full: isToday ? `Today ${cur.getDate()} ${monthShort}` : `${dayName} ${cur.getDate()} ${monthShort}`,
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
    const active = bookings.filter((b) => b.status !== "Cancelled");

    // All active bookings occupying this room on dateStr (including day picnics)
    const occupying = active.filter((b) => {
      if (!b.rooms.includes(roomId)) return false;
      if (b.checkIn === b.checkOut) {
        return b.checkIn === dateStr;
      }
      return b.checkIn <= dateStr && dateStr < b.checkOut;
    });

    // Check if any booking is departing this morning at 10 AM
    const departures = active.filter(
      (b) => b.rooms.includes(roomId) && b.checkIn !== b.checkOut && b.checkOut === dateStr
    );

    // Conflict detection: 2 or more separate bookings assigned to this room on the same date
    if (occupying.length > 1) {
      const guestNames = occupying.map((b) => b.guestName).join(" + ");
      return {
        isBooked: true,
        isConflict: true,
        booking: occupying[0],
        allBookings: occupying,
        status: "Conflict",
        guest: `CONFLICT: ${guestNames}`,
        payment: `${occupying.length} overlapping bookings`,
        badgeColor: "bg-red-600 text-white animate-pulse",
      };
    }

    // Single booking occupying this night
    if (occupying.length === 1) {
      const b = occupying[0];
      let badgeColor = "bg-[#1E6F50] text-white";
      if (b.status === "Pending Advance") badgeColor = "bg-[#D97706] text-white";
      if (b.status === "Checked-In") badgeColor = "bg-[#065F46] text-white";
      if (b.status === "Completed") badgeColor = "bg-gray-100 text-gray-700";

      const isMultiRoom = b.rooms.length > 1;
      const roomIndex = b.rooms.indexOf(roomId) + 1;
      const multiRoomLabel = isMultiRoom ? ` (Cottage ${roomIndex} of ${b.rooms.length})` : "";
      const guestDesc = `${b.guestName}${multiRoomLabel} · ${b.adults + b.children} Pax`;
      const payDesc = b.balanceDue > 0 ? `Due ₹${b.balanceDue.toLocaleString("en-IN")}` : "Paid Full";

      const turnoverText = departures.length > 0 ? ` · [Turnover: ${departures[0].guestName} departed 10 AM]` : "";

      return {
        isBooked: true,
        isConflict: false,
        booking: b,
        allBookings: occupying,
        status: b.status,
        guest: guestDesc + turnoverText,
        payment: payDesc,
        badgeColor,
        isMultiRoom,
        roomIndex,
        totalRoomsInBooking: b.rooms.length,
      };
    }

    // Departure day morning turnover (room free for tonight)
    if (departures.length > 0) {
      return {
        isBooked: false,
        isConflict: false,
        booking: null,
        allBookings: [],
        status: "Available",
        guest: `Turnover: ${departures[0].guestName} departed 10 AM. Clean and ready for tonight.`,
        payment: "Open for Booking",
        badgeColor: "bg-gray-100 text-gray-700",
      };
    }

    // Room is completely available / unoccupied
    return {
      isBooked: false,
      isConflict: false,
      booking: null,
      allBookings: [],
      status: "Available",
      guest: "Clean and Ready",
      payment: "Open for Booking",
      badgeColor: "bg-gray-100 text-gray-700",
    };
  };

  // Operational Lists for selectedDate
  const operationalRoster = useMemo(() => {
    const active = bookings.filter((b) => b.status !== "Cancelled");

    // Arrivals: Check-In on selectedDate
    const arrivals = active.filter((b) => b.checkIn === selectedDate);

    // In-House: Staying on selectedDate night
    const inHouse = active.filter((b) => {
      if (b.checkIn === b.checkOut) {
        return b.checkIn === selectedDate;
      }
      return b.checkIn <= selectedDate && selectedDate < b.checkOut;
    });

    // Departures: Check-Out on selectedDate (excluding same-day picnics already counted)
    const departures = active.filter(
      (b) => b.checkOut === selectedDate && b.checkIn !== b.checkOut
    );

    // Unsettled balances
    const unsettled = active.filter((b) => b.balanceDue > 0);

    return {
      arrivals,
      inHouse,
      departures,
      unsettled,
    };
  }, [bookings, selectedDate]);

  // Dynamic live KPI calculations for selectedDate
  const dayStats = useMemo(() => {
    const activeBookings = bookings.filter((b) => b.status !== "Cancelled");
    const dayBookings = activeBookings.filter((b) => {
      if (b.checkIn === b.checkOut) {
        return b.checkIn === selectedDate;
      }
      return b.checkIn <= selectedDate && selectedDate < b.checkOut;
    });

    const adults = dayBookings.reduce((sum, b) => sum + (b.adults || 0), 0);
    const children = dayBookings.reduce((sum, b) => sum + (b.children || 0), 0);
    const totalGuests = adults + children;

    // Distinct rooms booked on this day
    const bookedRoomIds = new Set<string>();
    dayBookings.forEach((b) => {
      (b.rooms || []).forEach((r) => bookedRoomIds.add(r));
    });
    const occupiedCount = bookedRoomIds.size;
    const occupancyPercentage = rooms.length > 0 ? Math.round((occupiedCount / rooms.length) * 100) : 0;

    // Balance due for bookings on this day
    const totalDue = dayBookings
      .filter((b) => b.balanceDue > 0)
      .reduce((sum, b) => sum + b.balanceDue, 0);

    const unsettledCount = dayBookings.filter((b) => b.balanceDue > 0).length;

    return {
      dayBookings,
      totalGuests,
      adults,
      children,
      occupiedCount,
      occupancyPercentage,
      totalDue,
      unsettledCount,
    };
  }, [bookings, rooms, selectedDate]);

  // Quick Check-in action
  const handleCheckIn = (id: string, name: string) => {
    updateBookingStatus(id, "Checked-In");
    showToast(`✓ Guest ${name} has been Checked-In. Room assigned!`);
  };

  // Quick Mark as Paid action
  const handleMarkPaid = (b: (typeof bookings)[0]) => {
    updateBooking(b.id, {
      advancePaid: b.totalAmount,
      balanceDue: 0,
      status: b.status === "Pending Advance" ? "Confirmed" : b.status,
    });
    showToast(`✓ Balance for ${b.guestName} marked as Paid in Full.`);
  };

  return (
    <AdminSidebar>
      <div className="space-y-6 sm:space-y-8 max-w-7xl mx-auto pb-12">
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
              Property Overview & Front Desk
            </h1>
          </div>

          {/* Quick Actions & Date Controls */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Interactive Calendar Date Picker & Daily Navigation */}
            <div className="flex items-center bg-white rounded-xl border border-[#E2E7E4] shadow-xs text-xs font-mono p-1">
              <button
                type="button"
                disabled={selectedDate <= getTodayISO()}
                onClick={handlePrevDay}
                className="p-1.5 hover:text-[#1E6F50] hover:bg-[#F3F5F4] rounded-lg transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                title={selectedDate <= getTodayISO() ? "Cannot browse past dates" : "Previous Day"}
                aria-label="Previous day"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Clickable Date Display with native date picker */}
              <label
                className="relative flex items-center gap-1.5 px-2.5 py-1 rounded-lg hover:bg-[#F3F5F4] transition-colors cursor-pointer select-none"
                title="Click to pick date starting from today"
              >
                <Calendar className="w-3.5 h-3.5 text-[#1E6F50]" />
                <span className="font-semibold text-[#161D1A]">{formattedSelectedDate}</span>
                <input
                  type="date"
                  min={getTodayISO()}
                  value={selectedDate}
                  onChange={(e) => {
                    let val = e.target.value;
                    if (!val) return;
                    const today = getTodayISO();
                    if (val < today) val = today;
                    setSelectedDate(val);
                  }}
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

              {selectedDate !== getTodayISO() && (
                <button
                  type="button"
                  onClick={handleToday}
                  className="ml-1 px-2 py-0.5 rounded bg-[#1E6F50]/10 text-[#1E6F50] text-[10px] font-bold hover:bg-[#1E6F50] hover:text-white transition-colors cursor-pointer"
                  title="Jump back to Today"
                >
                  Today
                </button>
              )}
            </div>

            <Link
              href="/admin/bookings?action=new"
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
                {selectedDate === getTodayISO() ? "Today's Guests" : "Day's Guests"}
              </span>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#F4FBF6] flex items-center justify-center text-[#1E6F50] shrink-0">
                <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-baseline gap-1 sm:gap-2">
                <span className="font-mono text-xl sm:text-3xl font-bold text-[#161D1A]">
                  {dayStats.totalGuests}
                </span>
                <span className="text-[10px] sm:text-xs uppercase font-mono text-gray-500">Pax</span>
              </div>
              <div className="flex items-center justify-between pt-1.5 border-t border-gray-100 text-[10px] sm:text-[11px] font-mono text-gray-600">
                <span>{dayStats.adults} Adults · {dayStats.children} Kids</span>
                <span className="text-[#1E6F50] font-semibold hidden sm:inline">
                  {dayStats.dayBookings.length} Active
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Rooms Occupied */}
          <div className="bg-white rounded-2xl p-3.5 sm:p-5 border border-[#E2E7E4] shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-gray-500 truncate">
                Cottage Occupancy
              </span>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#F4FBF6] flex items-center justify-center text-[#1E6F50] shrink-0">
                <Bed className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-baseline justify-between">
                <div className="flex items-baseline gap-1">
                  <span className="font-mono text-xl sm:text-3xl font-bold text-[#161D1A]">
                    {dayStats.occupiedCount}
                  </span>
                  <span className="font-mono text-[10px] sm:text-xs text-gray-500">/ {rooms.length} Cottages</span>
                </div>
                <span className="px-1.5 py-0.5 rounded bg-[#F4FBF6] text-[#1E6F50] font-mono text-[10px] sm:text-xs font-bold">
                  {dayStats.occupancyPercentage}%
                </span>
              </div>
              <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#1E6F50] h-full rounded-full transition-all duration-500"
                  style={{ width: `${dayStats.occupancyPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Card 3: Balance Due Today */}
          <div className="bg-white rounded-2xl p-3.5 sm:p-5 border border-[#E2E7E4] shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-gray-500 truncate">
                Balance Due Today
              </span>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#E06354]/10 flex items-center justify-center text-[#E06354] shrink-0">
                <Wallet className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-baseline gap-1">
                <span className="font-mono text-lg sm:text-2xl font-bold text-[#E06354]">
                  ₹{dayStats.totalDue.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex items-center justify-between pt-1.5 border-t border-gray-100 text-[10px] sm:text-[11px] font-mono">
                <span className="text-[#E06354] font-semibold">{dayStats.unsettledCount} Unsettled</span>
                <span className="text-gray-500 hidden sm:inline">Desk collection</span>
              </div>
            </div>
          </div>

          {/* Card 4: Daily Traffic */}
          <div className="bg-white rounded-2xl p-3.5 sm:p-5 border border-[#E2E7E4] shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-gray-500 truncate">
                Daily Desk Traffic
              </span>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#F4FBF6] flex items-center justify-center text-[#1E6F50] shrink-0">
                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-lg sm:text-2xl font-bold text-[#161D1A]">
                  {operationalRoster.arrivals.length} In / {operationalRoster.departures.length} Out
                </span>
              </div>
              <div className="flex items-center justify-between pt-1.5 border-t border-gray-100 text-[10px] sm:text-[11px] font-mono text-gray-600">
                <span>{operationalRoster.inHouse.length} In-House Tonight</span>
                <span className="text-[#1E6F50] font-semibold hidden sm:inline">Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            7-DAY ROOM AVAILABILITY GRID (Centered strictly on today or future)
           ========================================================================= */}
        <div className="bg-white rounded-2xl border border-[#E2E7E4] shadow-xs overflow-hidden">
          {/* Header Bar */}
          <div className="p-4 sm:p-5 bg-[#F9FAF9] border-b border-[#E2E7E4] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#1E6F50]" />
                <h2 className="text-sm sm:text-base font-bold text-[#161D1A]">
                  Cottage Allocation & 7-Day Availability Grid
                </h2>
              </div>
              <p className="text-xs text-gray-500">
                Live cottage timeline starting from {weekDays[0]?.label} · Click an open slot to allocate immediately
              </p>
            </div>

            {/* Controls & Legend */}
            <div className="flex items-center gap-3 text-[11px] font-mono text-gray-600 flex-wrap">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  disabled={selectedDate <= getTodayISO()}
                  onClick={handlePrevWeek}
                  className="px-2 py-1 rounded border border-gray-200 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer text-xs"
                  title="Previous 7 Days"
                >
                  ‹ Prev Week
                </button>
                <button
                  type="button"
                  onClick={handleNextWeek}
                  className="px-2 py-1 rounded border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer text-xs"
                  title="Next 7 Days"
                >
                  Next Week ›
                </button>
              </div>

              <div className="h-4 w-px bg-gray-200 hidden sm:block" />

              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-[#065F46]"></span>
                  <span>Checked-In</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-[#1E6F50]"></span>
                  <span>Confirmed</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-[#D97706]"></span>
                  <span>Pending</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded border border-dashed border-gray-400 bg-white"></span>
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-red-600 animate-pulse"></span>
                  <span>Conflict</span>
                </div>
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

            {/* Room cards for selected date */}
            <div className="space-y-2">
              {rooms.map((room) => {
                const info = getRoomDayStatus(room.id, selectedDate);
                return (
                  <div
                    key={room.id}
                    className="p-3 rounded-xl border border-[#E2E7E4] bg-white flex items-center justify-between gap-3 shadow-2xs"
                  >
                    <div>
                      <span className="font-bold text-xs text-[#161D1A] block">{room.name}</span>
                      <span className="text-[10px] font-mono text-[#7BA23F]">{room.type}</span>
                    </div>

                    <div>
                      {info.isConflict ? (
                        <Link
                          href="/admin/bookings"
                          className="px-2.5 py-1 rounded bg-red-600 text-white font-mono text-[10px] font-bold block"
                        >
                          ⚠️ Conflict
                        </Link>
                      ) : info.isBooked ? (
                        <div
                          className={`px-2.5 py-1 rounded font-mono text-[10px] font-semibold ${info.badgeColor}`}
                        >
                          {info.booking?.guestName} · {info.status === "Checked-In" ? "In" : "Booked"}
                        </div>
                      ) : (
                        <Link
                          href={`/admin/bookings?action=new&room=${room.id}&date=${selectedDate}`}
                          className="px-2.5 py-1 rounded border border-dashed border-gray-300 text-gray-600 hover:border-[#1E6F50] hover:text-[#1E6F50] font-mono text-[10px] block"
                        >
                          + Available
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* DESKTOP VIEW: Full 7-Day Matrix Table (hidden md:block) */}
          <div className="hidden md:block overflow-x-auto">
            <div className="min-w-[860px]">
              {/* Header row with 7 days starting from today */}
              <div className="grid grid-cols-[220px_repeat(7,1fr)] bg-[#F9FAF9] border-b border-[#E2E7E4] text-[11px] font-mono uppercase tracking-wider text-gray-500 py-3 px-2 font-bold">
                <div className="px-3">Cottage / Suite</div>
                {weekDays.map((d) => (
                  <button
                    key={d.dateStr}
                    type="button"
                    onClick={() => setSelectedDate(d.dateStr)}
                    className={`text-center py-1 rounded transition-colors cursor-pointer ${
                      d.isSelected
                        ? "bg-[#141715] text-[#FAF8F3] font-bold shadow-xs"
                        : d.isToday
                        ? "bg-[#1E6F50]/15 text-[#1E6F50] font-bold"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <span>{d.label}</span>
                    {d.isToday && (
                      <span className="block text-[9px] text-[#1E6F50] font-bold">(Today)</span>
                    )}
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
                    <div className="px-4 flex flex-col justify-center sticky left-0 bg-white z-10 shadow-[2px_0_4px_rgba(0,0,0,0.03)] h-full">
                      <span className="font-bold text-[#161D1A]">{room.name}</span>
                      <span className="text-[10px] font-mono text-[#7BA23F]">
                        {room.type} · Max {room.capacity} Pax
                      </span>
                    </div>

                    {weekDays.map((d) => {
                      const info = getRoomDayStatus(room.id, d.dateStr);
                      return (
                        <div key={`${room.id}-${d.dateStr}`} className="px-1 text-center">
                          {info.isConflict ? (
                            <Link
                              href="/admin/bookings"
                              className="h-9 rounded px-2 flex items-center justify-between font-mono text-[10px] shadow-xs bg-red-600 hover:bg-red-700 text-white font-bold transition-colors cursor-pointer"
                              title={`${info.guest} · Click to resolve in bookings`}
                            >
                              <span className="truncate">⚠️ Conflict</span>
                              <span className="text-[9px] bg-black/30 px-1 py-0.5 rounded shrink-0 ml-1">
                                Resolve
                              </span>
                            </Link>
                          ) : info.isBooked ? (
                            <Link
                              href="/admin/bookings"
                              className={`h-9 rounded px-2 flex items-center justify-between font-mono text-[11px] shadow-xs transition-opacity hover:opacity-90 cursor-pointer ${info.badgeColor}`}
                              title={`${info.guest} · ${info.status} · ${info.payment}`}
                            >
                              <div className="flex items-center gap-1 min-w-0">
                                <span className="truncate font-semibold">{info.booking?.guestName}</span>
                                {info.isMultiRoom && (
                                  <span className="text-[8px] bg-white/25 px-1 py-0.2 rounded font-mono shrink-0">
                                    {info.roomIndex}/{info.totalRoomsInBooking}
                                  </span>
                                )}
                              </div>
                              <span className="text-[9px] bg-black/20 px-1.5 py-0.5 rounded shrink-0 ml-1 font-bold">
                                {info.status === "Checked-In" ? "In" : "Booked"}
                              </span>
                            </Link>
                          ) : (
                            <Link
                              href={`/admin/bookings?action=new&room=${room.id}&date=${d.dateStr}`}
                              className="h-9 rounded border border-dashed border-gray-200 flex items-center justify-center font-mono text-[10px] text-gray-400 hover:border-[#1E6F50] hover:text-[#1E6F50] hover:bg-[#F4FBF6] transition-colors cursor-pointer group"
                              title={`Click to book ${room.name} for ${d.dateStr}`}
                            >
                              <span className="group-hover:hidden">Available</span>
                              <span className="hidden group-hover:inline font-bold text-[#1E6F50]">+ Book</span>
                            </Link>
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
            OWNER OPERATIONS HUB: Today's Front-Desk Roster & Cash Flow Hub
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Left Column (7 cols): Today's Front-Desk Action Roster */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E2E7E4] shadow-xs p-4 sm:p-6 space-y-4">
            {/* Header with Switcher Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E2E7E4]">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-[#161D1A]">
                  Front-Desk Operations Roster
                </h3>
                <span className="text-[11px] font-mono text-gray-500">
                  Real-time guest tracking for {formattedSelectedDate}
                </span>
              </div>

              {/* 3 Operational Tabs */}
              <div className="flex items-center gap-1 bg-[#F3F5F4] p-1 rounded-xl text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setActiveRosterTab("arrivals")}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    activeRosterTab === "arrivals"
                      ? "bg-white text-[#161D1A] font-bold shadow-xs"
                      : "text-gray-600 hover:text-black"
                  }`}
                >
                  Arrivals ({operationalRoster.arrivals.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveRosterTab("inhouse")}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    activeRosterTab === "inhouse"
                      ? "bg-white text-[#161D1A] font-bold shadow-xs"
                      : "text-gray-600 hover:text-black"
                  }`}
                >
                  In-House ({operationalRoster.inHouse.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveRosterTab("departures")}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    activeRosterTab === "departures"
                      ? "bg-white text-[#161D1A] font-bold shadow-xs"
                      : "text-gray-600 hover:text-black"
                  }`}
                >
                  Departures ({operationalRoster.departures.length})
                </button>
              </div>
            </div>

            {/* Tab 1: Arrivals */}
            {activeRosterTab === "arrivals" && (
              <div className="space-y-3">
                {operationalRoster.arrivals.length === 0 ? (
                  <div className="p-8 text-center bg-[#F9FAF9] rounded-xl border border-gray-100 text-gray-500 text-xs">
                    No new guest arrivals scheduled for this date.
                  </div>
                ) : (
                  operationalRoster.arrivals.map((b) => (
                    <div
                      key={b.id}
                      className="p-4 rounded-xl bg-[#F9FAF9] border border-[#E2E7E4] hover:border-[#1E6F50] transition-colors space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-[#161D1A]">{b.guestName}</span>
                            <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#1E6F50]/10 text-[#1E6F50] font-semibold">
                              {b.status}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500 font-mono">
                            {b.phone} · {b.city}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 self-start sm:self-auto">
                          {b.balanceDue > 0 ? (
                            <span className="text-xs font-mono text-[#E06354] font-bold bg-[#E06354]/10 px-2 py-1 rounded">
                              Due: ₹{b.balanceDue.toLocaleString("en-IN")}
                            </span>
                          ) : (
                            <span className="text-xs font-mono text-[#1E6F50] font-bold bg-[#1E6F50]/10 px-2 py-1 rounded">
                              Paid in Full ✓
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Details Strip */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs pt-2 border-t border-gray-100">
                        <div>
                          <span className="text-[10px] text-gray-400 uppercase font-mono block">Allocated Room</span>
                          <span className="font-semibold text-[#161D1A]">{b.rooms.join(", ")}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-gray-400 uppercase font-mono block">Headcount</span>
                          <span className="font-semibold text-[#161D1A]">
                            {b.adults} Adults{b.children > 0 ? `, ${b.children} Children` : ""}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] text-gray-400 uppercase font-mono block">ID Card</span>
                          <span className="font-semibold text-[#161D1A]">
                            {b.idVerified ? "Verified ✓" : "Collect at Desk"}
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center justify-between pt-2 border-t border-gray-100 flex-wrap gap-2">
                        <a
                          href={`https://wa.me/91${b.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
                            `Hello ${b.guestName}, welcome to Pomelo Garden! Your cottage (${b.rooms.join(", ")}) is prepared for your stay. Please let us know your estimated arrival time.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-white text-xs font-semibold text-gray-700 transition-colors"
                        >
                          <MessageSquare className="w-3.5 h-3.5 text-[#1E6F50]" />
                          <span>WhatsApp Welcome</span>
                        </a>

                        <div className="flex items-center gap-2">
                          {b.status !== "Checked-In" ? (
                            <button
                              type="button"
                              onClick={() => handleCheckIn(b.id, b.guestName)}
                              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#1E6F50] hover:bg-[#185e43] text-white text-xs font-semibold transition-colors cursor-pointer"
                            >
                              <LogIn className="w-3.5 h-3.5" />
                              <span>Check-In Guest</span>
                            </button>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#1E6F50]">
                              <CheckCircle className="w-4 h-4" />
                              <span>Checked-In</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Tab 2: In-House Guests */}
            {activeRosterTab === "inhouse" && (
              <div className="space-y-3">
                {operationalRoster.inHouse.length === 0 ? (
                  <div className="p-8 text-center bg-[#F9FAF9] rounded-xl border border-gray-100 text-gray-500 text-xs">
                    No guests staying in-house for this date.
                  </div>
                ) : (
                  operationalRoster.inHouse.map((b) => (
                    <div
                      key={b.id}
                      className="p-4 rounded-xl bg-[#F9FAF9] border border-[#E2E7E4] space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-bold text-sm text-[#161D1A] block">{b.guestName}</span>
                          <span className="text-xs text-gray-500 font-mono">
                            {b.rooms.join(", ")} · {b.adults + b.children} Pax · {b.phone}
                          </span>
                        </div>
                        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#1E6F50]/15 text-[#1E6F50]">
                          In-House
                        </span>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs text-gray-600">
                        <span>Check-Out: {b.checkOut}</span>
                        <a
                          href={`https://wa.me/91${b.phone.replace(/\D/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#1E6F50] hover:underline font-semibold"
                        >
                          Message Guest on WhatsApp →
                        </a>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Tab 3: Departures */}
            {activeRosterTab === "departures" && (
              <div className="space-y-3">
                {operationalRoster.departures.length === 0 ? (
                  <div className="p-8 text-center bg-[#F9FAF9] rounded-xl border border-gray-100 text-gray-500 text-xs">
                    No check-outs scheduled for this morning.
                  </div>
                ) : (
                  operationalRoster.departures.map((b) => (
                    <div
                      key={b.id}
                      className="p-4 rounded-xl bg-[#F9FAF9] border border-[#E2E7E4] space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-bold text-sm text-[#161D1A] block">{b.guestName}</span>
                          <span className="text-xs text-gray-500 font-mono">
                            Cottages: {b.rooms.join(", ")} · 10:00 AM Departure
                          </span>
                        </div>
                        {b.balanceDue > 0 ? (
                          <span className="text-xs font-mono text-[#E06354] font-bold bg-[#E06354]/10 px-2 py-1 rounded">
                            Collect ₹{b.balanceDue.toLocaleString("en-IN")}
                          </span>
                        ) : (
                          <span className="text-xs font-mono text-[#1E6F50] font-bold">Paid Full ✓</span>
                        )}
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
                        <span className="text-gray-500">Ready for Room Turnover & Cleaning</span>
                        <Link
                          href="/admin/bookings"
                          className="text-[#1E6F50] font-semibold hover:underline"
                        >
                          Complete Stay Settlement →
                        </Link>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Right Column (5 cols): Financial Collections & Cottage Readiness */}
          <div className="lg:col-span-5 space-y-6">
            {/* Outstanding Balances Tracker */}
            <div className="bg-white rounded-2xl border border-[#E2E7E4] shadow-xs p-4 sm:p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E2E7E4]">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[#161D1A]">
                    Outstanding Collections
                  </h3>
                  <span className="text-[11px] font-mono text-gray-500">
                    Desk & Advance Payment Tracking
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#E06354]/10 text-[#E06354] font-mono text-xs font-bold">
                  {operationalRoster.unsettled.length} Pending
                </span>
              </div>

              <div className="space-y-2.5">
                {operationalRoster.unsettled.length === 0 ? (
                  <div className="p-4 text-center text-xs text-gray-500 bg-[#F9FAF9] rounded-xl">
                    All current bookings are settled in full.
                  </div>
                ) : (
                  operationalRoster.unsettled.slice(0, 4).map((b) => (
                    <div
                      key={b.id}
                      className="p-3 rounded-xl bg-[#F9FAF9] border border-[#E2E7E4] space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-bold text-xs text-[#161D1A] block">{b.guestName}</span>
                          <span className="text-[10px] font-mono text-gray-500">
                            Check-In: {b.checkIn} · {b.rooms.join(", ")}
                          </span>
                        </div>
                        <span className="font-mono text-xs font-bold text-[#E06354]">
                          ₹{b.balanceDue.toLocaleString("en-IN")}
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-1.5 border-t border-gray-100 text-xs">
                        <a
                          href={`https://wa.me/91${b.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
                            `Hello ${b.guestName}, this is a reminder from Pomelo Garden Saphale regarding your upcoming stay. Your pending balance is ₹${b.balanceDue}. You may settle this on arrival or via UPI.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] text-[#1E6F50] hover:underline font-semibold flex items-center gap-1"
                        >
                          <MessageSquare className="w-3 h-3" />
                          <span>WhatsApp Reminder</span>
                        </a>

                        <button
                          type="button"
                          onClick={() => handleMarkPaid(b)}
                          className="text-[11px] font-semibold px-2 py-0.5 rounded bg-white hover:bg-gray-100 border border-gray-200 text-[#161D1A] transition-colors cursor-pointer"
                        >
                          Mark Paid ✓
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Live Cottage Readiness Summary */}
            <div className="bg-white rounded-2xl border border-[#E2E7E4] shadow-xs p-4 sm:p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E2E7E4]">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[#161D1A]">
                    Cottage Inventory Status
                  </h3>
                  <span className="text-[11px] font-mono text-gray-500">
                    Live Readiness for {formattedSelectedDate}
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#F4FBF6] text-[#1E6F50] font-mono text-xs font-bold">
                  {rooms.length} Units Total
                </span>
              </div>

              <div className="space-y-2">
                {rooms.map((room) => {
                  const info = getRoomDayStatus(room.id, selectedDate);
                  return (
                    <div
                      key={room.id}
                      className="p-2.5 rounded-xl bg-[#F9FAF9] border border-[#E2E7E4] flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-bold text-[#161D1A] block">{room.name}</span>
                        <span className="text-[10px] font-mono text-gray-500">{room.type}</span>
                      </div>

                      <div>
                        {info.isConflict ? (
                          <span className="px-2 py-0.5 rounded bg-red-600 text-white font-mono text-[10px] font-bold">
                            ⚠️ Conflict
                          </span>
                        ) : info.isBooked ? (
                          <span className="px-2 py-0.5 rounded bg-[#1E6F50]/15 text-[#1E6F50] font-mono text-[10px] font-bold">
                            Occupied ({info.booking?.guestName.split(" ")[0]})
                          </span>
                        ) : (
                          <Link
                            href={`/admin/bookings?action=new&room=${room.id}&date=${selectedDate}`}
                            className="px-2 py-0.5 rounded border border-dashed border-[#1E6F50]/40 text-[#1E6F50] hover:bg-[#F4FBF6] font-mono text-[10px] font-bold"
                          >
                            + Open to Book
                          </Link>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2">
                <Link
                  href="/admin/bookings?action=new"
                  className="w-full py-2.5 rounded-xl bg-[#141715] hover:bg-[#28302b] text-white text-xs font-semibold text-center block transition-colors"
                >
                  + Fast Walk-In / Phone Reservation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminSidebar>
  );
}
