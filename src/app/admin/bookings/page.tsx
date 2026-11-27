"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  BadgeCheck,
  Search,
  Filter,
  Plus,
  Printer,
  FileDown,
  Lock,
  CheckCircle2,
  AlertCircle,
  X,
  Upload,
  Eye,
  FileText,
  Phone,
  MessageSquare,
  MoreVertical,
  ShieldAlert,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Calendar,
  UserCheck,
  CreditCard,
  Send,
  LayoutGrid,
  Table as TableIcon,
  Edit3,
  Save,
} from "lucide-react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { useResortStore, BookingItem } from "@/lib/resort-store";

export default function BookingsAndIdVaultPage() {
  const { bookings, packages, rooms, addBooking, updateBookingStatus, updateBooking } = useResortStore();

  // Search & Filter state
  const [activeTab, setActiveTab] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterRoom, setFilterRoom] = useState<string>("All");
  const [filterIdStatus, setFilterIdStatus] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Slide-over drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Quick ID Collection Modal state (for collecting ID at check-in)
  const [collectIdBooking, setCollectIdBooking] = useState<BookingItem | null>(null);
  const [collectIdType, setCollectIdType] = useState<BookingItem["idType"]>("Aadhaar");
  const [collectIdLast4, setCollectIdLast4] = useState<string>("");

  // View ID modal state
  const [selectedKycBooking, setSelectedKycBooking] = useState<BookingItem | null>(null);

  // Safe Edit Booking State
  const [editingBooking, setEditingBooking] = useState<BookingItem | null>(null);
  const [editGuestName, setEditGuestName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editCity, setEditCity] = useState("Mumbai");
  const [editAdults, setEditAdults] = useState(2);
  const [editChildren, setEditChildren] = useState(0);
  const [editMealPreference, setEditMealPreference] = useState<"Veg" | "Non-Veg" | "Mixed">("Non-Veg");
  const [editVegCount, setEditVegCount] = useState<number>(0);
  const [editNonVegCount, setEditNonVegCount] = useState<number>(2);
  const [editPackageId, setEditPackageId] = useState("picnic");
  const [editRooms, setEditRooms] = useState<string[]>(["AC-101"]);
  const [editCheckIn, setEditCheckIn] = useState("2026-11-26");
  const [editCheckOut, setEditCheckOut] = useState("2026-11-27");
  const [editStatus, setEditStatus] = useState<BookingItem["status"]>("Confirmed");
  const [editTotalAmount, setEditTotalAmount] = useState<number>(0);
  const [editAdvancePaid, setEditAdvancePaid] = useState<number>(0);
  const [editPaymentMode, setEditPaymentMode] = useState<BookingItem["paymentMode"]>("UPI");
  const [editNotes, setEditNotes] = useState("");

  // New Booking Form State
  const [guestName, setGuestName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("Mumbai");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [mealPreference, setMealPreference] = useState<"Veg" | "Non-Veg" | "Mixed">("Non-Veg");
  const [vegCount, setVegCount] = useState<number>(0);
  const [nonVegCount, setNonVegCount] = useState<number>(2);
  const [packageId, setPackageId] = useState("picnic");
  const [selectedRooms, setSelectedRooms] = useState<string[]>(["AC-101"]);
  const [checkIn, setCheckIn] = useState("2026-11-26");
  const [checkOut, setCheckOut] = useState("2026-11-27");
  const [collectIdNow, setCollectIdNow] = useState(false);
  const [idType, setIdType] = useState<BookingItem["idType"]>("Aadhaar");
  const [idLast4, setIdLast4] = useState("");
  const [advancePaid, setAdvancePaid] = useState<number>(3000);
  const [customTotal, setCustomTotal] = useState<number | null>(null);
  const [paymentMode, setPaymentMode] = useState<BookingItem["paymentMode"]>("UPI");
  const [notes, setNotes] = useState("");

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filtered Bookings
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      // Tab filter
      if (activeTab === "Confirmed" && b.status !== "Confirmed") return false;
      if (activeTab === "Pending Advance" && b.status !== "Pending Advance") return false;
      if (activeTab === "Checked-In" && b.status !== "Checked-In") return false;
      if (activeTab === "Completed" && b.status !== "Completed") return false;

      // Room filter
      if (filterRoom !== "All" && !b.rooms.includes(filterRoom)) return false;

      // ID Status filter
      if (filterIdStatus === "Verified" && !b.idVerified) return false;
      if (filterIdStatus === "Pending" && b.idVerified) return false;

      // Search query
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matchName = b.guestName.toLowerCase().includes(q);
        const matchPhone = b.phone.toLowerCase().includes(q);
        const matchId = b.id.toLowerCase().includes(q);
        const matchCity = b.city.toLowerCase().includes(q);
        if (!matchName && !matchPhone && !matchId && !matchCity) return false;
      }

      return true;
    });
  }, [bookings, activeTab, filterRoom, filterIdStatus, searchQuery]);

  // Calculated package total in drawer
  const autoTotal = useMemo(() => {
    const pkg = packages.find((p) => p.id === packageId) || packages[0];
    let rate = pkg.acPrice;
    if (pkg.id === "picnic") {
      rate = pkg.acPrice;
      return adults * rate + children * pkg.childPrice;
    }
    if (pkg.id === "group-overnight") {
      rate = adults >= 8 ? 2000 : adults >= 6 ? 2100 : 2300;
      return adults * rate + children * pkg.childPrice;
    }
    if (pkg.id === "couple-retreat") {
      return (pkg.couplePrice || 5000) + Math.max(0, adults - 2) * 1000;
    }
    return 45000;
  }, [packageId, adults, children, packages]);

  const finalTotal = customTotal !== null ? customTotal : autoTotal;
  const balanceDue = Math.max(0, finalTotal - advancePaid);

  // Save Quick Collected ID at check-in
  const handleSaveCollectedId = (e: React.FormEvent) => {
    e.preventDefault();
    if (!collectIdBooking) return;
    updateBooking(collectIdBooking.id, {
      idVerified: true,
      idType: collectIdType,
      idLast4: collectIdLast4 || "4892",
    });
    showToast(`âœ“ ID recorded for ${collectIdBooking.guestName}!`);
    setCollectIdBooking(null);
  };

  // Save Manual Booking
  const handleSaveBooking = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedPkg = packages.find((p) => p.id === packageId) || packages[0];

    const totalPax = adults + children;
    const finalVeg = mealPreference === "Veg" ? totalPax : mealPreference === "Non-Veg" ? 0 : vegCount;
    const finalNonVeg = mealPreference === "Non-Veg" ? totalPax : mealPreference === "Veg" ? 0 : nonVegCount;

    const newBooking = addBooking({
      guestName,
      phone,
      city: city || "Mumbai",
      adults,
      children,
      mealPreference,
      vegCount: finalVeg,
      nonVegCount: finalNonVeg,
      packageId,
      packageName: selectedPkg.name,
      rooms: selectedRooms.length > 0 ? selectedRooms : ["AC-101"],
      checkIn,
      checkOut,
      status: advancePaid >= finalTotal ? "Confirmed" : advancePaid > 0 ? "Confirmed" : "Pending Advance",
      totalAmount: finalTotal,
      advancePaid,
      balanceDue,
      paymentMode,
      idType: collectIdNow ? idType : undefined,
      idLast4: collectIdNow && idLast4 ? idLast4 : undefined,
      idVerified: Boolean(collectIdNow && idLast4 && idLast4.length === 4),
      notes,
    });

    setDrawerOpen(false);
    // Reset form
    setGuestName("");
    setPhone("");
    setCustomTotal(null);
    setCollectIdNow(false);
    setIdLast4("");
    showToast(`âœ“ Booking ${newBooking.id} created for ${newBooking.guestName}!`);
  };

  // Open Safe Edit Drawer
  const handleOpenEdit = (b: BookingItem) => {
    setEditingBooking(b);
    setEditGuestName(b.guestName);
    setEditPhone(b.phone);
    setEditCity(b.city);
    setEditAdults(b.adults);
    setEditChildren(b.children);
    setEditMealPreference(b.mealPreference);
    setEditVegCount(b.vegCount || 0);
    setEditNonVegCount(b.nonVegCount || b.adults + b.children);
    setEditPackageId(b.packageId);
    setEditRooms(Array.from(new Set(b.rooms)));
    setEditCheckIn(b.checkIn);
    setEditCheckOut(b.checkOut);
    setEditStatus(b.status);
    setEditTotalAmount(b.totalAmount);
    setEditAdvancePaid(b.advancePaid);
    setEditPaymentMode(b.paymentMode);
    setEditNotes(b.notes || "");
  };

  // Toggle Room in Edit Drawer (Minimum 1 room enforced safely)
  const handleToggleEditRoom = (roomId: string) => {
    setEditRooms((prev) => {
      if (prev.includes(roomId)) {
        if (prev.length <= 1) {
          showToast("A reservation must have at least one room allocated.");
          return prev;
        }
        return prev.filter((r) => r !== roomId);
      } else {
        return [...prev, roomId];
      }
    });
  };

  // Save Safely
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBooking) return;

    if (!editGuestName.trim()) {
      showToast("Please provide guest full name");
      return;
    }
    if (!editPhone.trim()) {
      showToast("Please provide guest contact phone");
      return;
    }
    if (editRooms.length === 0) {
      showToast("Please allocate at least 1 room unit");
      return;
    }

    const pkg = packages.find((p) => p.id === editPackageId) || packages[0];
    const balanceDue = Math.max(0, editTotalAmount - editAdvancePaid);

    updateBooking(editingBooking.id, {
      guestName: editGuestName.trim(),
      phone: editPhone.trim(),
      city: editCity.trim(),
      adults: editAdults,
      children: editChildren,
      mealPreference: editMealPreference,
      vegCount: editMealPreference === "Mixed" ? editVegCount : editMealPreference === "Veg" ? editAdults + editChildren : 0,
      nonVegCount: editMealPreference === "Mixed" ? editNonVegCount : editMealPreference === "Non-Veg" ? editAdults + editChildren : 0,
      packageId: editPackageId,
      packageName: pkg.name.split("(")[0].trim(),
      rooms: Array.from(new Set(editRooms)),
      checkIn: editCheckIn,
      checkOut: editCheckOut,
      status: editStatus,
      totalAmount: editTotalAmount,
      advancePaid: editAdvancePaid,
      balanceDue: balanceDue,
      paymentMode: editPaymentMode,
      notes: editNotes.trim(),
    });

    showToast(`âœ“ Reservation ${editingBooking.id} updated safely!`);
    setEditingBooking(null);
  };

  return (
    <AdminSidebar>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Toast */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#101814] text-white px-5 py-3 rounded-xl shadow-xl border border-[#1E6F50] flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 text-xs font-semibold">
            <BadgeCheck className="w-4 h-4 text-[#89D6B1]" />
            <span>{toastMessage}</span>
          </div>
        )}



        {/* =========================================================================
            SLIDE-OVER DRAWER: SAFE RESERVATION EDITOR (editingBooking)
           ========================================================================= */}
        {editingBooking && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
              onClick={() => setEditingBooking(null)}
            ></div>

            {/* Drawer Body */}
            <div className="relative w-full max-w-xl bg-white h-full shadow-2xl z-10 flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300">
              {/* Drawer Header */}
              <div className="p-5 sm:p-6 bg-[#101814] text-white flex items-center justify-between border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] text-[#89D6B1] uppercase tracking-wider block">
                      Folio Editor
                    </span>
                    <span className="px-2 py-0.2 rounded bg-white/10 text-white font-mono text-[10px]">
                      {editingBooking.id}
                    </span>
                  </div>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-white mt-0.5">
                    Update Reservation
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingBooking(null)}
                  className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                  title="Close without saving"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Content - Clean, Structured & Safe */}
              <form onSubmit={handleSaveEdit} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 text-xs text-[#161D1A]">
                {/* Safe Banner */}
                <div className="p-3 rounded-xl bg-[#F4FBF6] border border-[#1E6F50]/20 flex items-center gap-2.5 text-xs text-[#1E6F50]">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-[#1E6F50]" />
                  <span>
                    Editing live record for <strong>{editingBooking.guestName}</strong>. All updates are logged safely.
                  </span>
                </div>

                {/* 1. Guest Information */}
                <div className="space-y-3">
                  <h3 className="font-bold uppercase tracking-wider text-gray-700 text-[11px]">
                    Guest Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="sm:col-span-2 space-y-1">
                      <label className="font-semibold text-gray-600">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={editGuestName}
                        onChange={(e) => setEditGuestName(e.target.value)}
                        className="w-full h-10 px-3 rounded-xl border border-[#E2E7E4] focus:border-[#1E6F50] focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-gray-600">WhatsApp Mobile *</label>
                      <input
                        type="tel"
                        required
                        value={editPhone}
                        onChange={(e) => setEditPhone(e.target.value)}
                        className="w-full h-10 px-3 rounded-xl border border-[#E2E7E4] font-mono focus:border-[#1E6F50] focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-gray-600">City / Origin</label>
                      <input
                        type="text"
                        value={editCity}
                        onChange={(e) => setEditCity(e.target.value)}
                        className="w-full h-10 px-3 rounded-xl border border-[#E2E7E4] focus:border-[#1E6F50] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Stay Dates & Package */}
                <div className="space-y-3 pt-3 border-t border-gray-100">
                  <h3 className="font-bold uppercase tracking-wider text-gray-700 text-[11px]">
                    Stay Dates & Package
                  </h3>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-semibold text-gray-600">Check-In Date *</label>
                      <input
                        type="date"
                        required
                        value={editCheckIn}
                        onChange={(e) => setEditCheckIn(e.target.value)}
                        className="w-full h-10 px-3 rounded-xl border border-[#E2E7E4] font-mono focus:border-[#1E6F50]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-gray-600">Check-Out Date *</label>
                      <input
                        type="date"
                        required
                        value={editCheckOut}
                        onChange={(e) => setEditCheckOut(e.target.value)}
                        className="w-full h-10 px-3 rounded-xl border border-[#E2E7E4] font-mono focus:border-[#1E6F50]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-gray-600">Package Experience</label>
                    <select
                      value={editPackageId}
                      onChange={(e) => setEditPackageId(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-[#E2E7E4] bg-white font-medium focus:border-[#1E6F50]"
                    >
                      {packages.map((pkg) => (
                        <option key={pkg.id} value={pkg.id}>
                          {pkg.name} ({pkg.time})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 3. Headcount Steppers */}
                <div className="space-y-3 pt-3 border-t border-gray-100">
                  <h3 className="font-bold uppercase tracking-wider text-gray-700 text-[11px]">
                    Guest Headcount
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {/* Adults Stepper */}
                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between">
                      <div>
                        <span className="font-semibold block text-gray-700">Adults</span>
                        <span className="text-[10px] text-gray-500">Age 12+</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setEditAdults(Math.max(1, editAdults - 1))}
                          className="w-7 h-7 rounded-lg border border-gray-300 flex items-center justify-center font-bold hover:bg-gray-200 cursor-pointer"
                        >
                          -
                        </button>
                        <span className="w-5 text-center font-mono font-bold">{editAdults}</span>
                        <button
                          type="button"
                          onClick={() => setEditAdults(editAdults + 1)}
                          className="w-7 h-7 rounded-lg border border-gray-300 flex items-center justify-center font-bold hover:bg-gray-200 cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Children Stepper */}
                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between">
                      <div>
                        <span className="font-semibold block text-gray-700">Children</span>
                        <span className="text-[10px] text-gray-500">Age 5 to 11</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setEditChildren(Math.max(0, editChildren - 1))}
                          className="w-7 h-7 rounded-lg border border-gray-300 flex items-center justify-center font-bold hover:bg-gray-200 cursor-pointer"
                        >
                          -
                        </button>
                        <span className="w-5 text-center font-mono font-bold">{editChildren}</span>
                        <button
                          type="button"
                          onClick={() => setEditChildren(editChildren + 1)}
                          className="w-7 h-7 rounded-lg border border-gray-300 flex items-center justify-center font-bold hover:bg-gray-200 cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. Meal Preference with Exact Breakdown */}
                <div className="space-y-3 pt-3 border-t border-gray-100">
                  <h3 className="font-bold uppercase tracking-wider text-gray-700 text-[11px]">
                    Kitchen Food Preference
                  </h3>

                  <div className="grid grid-cols-3 gap-2">
                    {(["Non-Veg", "Veg", "Mixed"] as const).map((pref) => (
                      <button
                        key={pref}
                        type="button"
                        onClick={() => {
                          setEditMealPreference(pref);
                          if (pref === "Mixed" && editVegCount === 0 && editNonVegCount === 0) {
                            setEditVegCount(Math.ceil((editAdults + editChildren) / 2));
                            setEditNonVegCount(Math.floor((editAdults + editChildren) / 2));
                          }
                        }}
                        className={`py-2 rounded-xl border text-xs font-semibold cursor-pointer transition-colors ${
                          editMealPreference === pref
                            ? "bg-[#1E6F50] text-white border-[#1E6F50] shadow-xs"
                            : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        {pref}
                      </button>
                    ))}
                  </div>

                  {editMealPreference === "Mixed" && (
                    <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/80 space-y-2 animate-in fade-in">
                      <div className="flex items-center justify-between text-xs text-amber-900 font-semibold">
                        <span>Specify Meal Counts:</span>
                        <span className="font-mono text-[11px]">
                          Total: {editVegCount + editNonVegCount} of {editAdults + editChildren} Guests
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 pt-1">
                        <div className="flex items-center justify-between bg-white p-2 rounded-lg border border-amber-200">
                          <span className="font-bold text-gray-700">Veg Pax:</span>
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => setEditVegCount(Math.max(0, editVegCount - 1))}
                              className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center font-bold hover:bg-gray-100"
                            >
                              -
                            </button>
                            <span className="w-5 text-center font-mono font-bold">{editVegCount}</span>
                            <button
                              type="button"
                              onClick={() => setEditVegCount(editVegCount + 1)}
                              className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center font-bold hover:bg-gray-100"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between bg-white p-2 rounded-lg border border-amber-200">
                          <span className="font-bold text-gray-700">Non-Veg:</span>
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => setEditNonVegCount(Math.max(0, editNonVegCount - 1))}
                              className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center font-bold hover:bg-gray-100"
                            >
                              -
                            </button>
                            <span className="w-5 text-center font-mono font-bold">{editNonVegCount}</span>
                            <button
                              type="button"
                              onClick={() => setEditNonVegCount(editNonVegCount + 1)}
                              className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center font-bold hover:bg-gray-100"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 5. Room Allocation Chips */}
                <div className="space-y-3 pt-3 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold uppercase tracking-wider text-gray-700 text-[11px]">
                      Allocated Accommodation Units *
                    </h3>
                    <span className="font-mono text-[10px] text-gray-500">
                      {editRooms.length} {editRooms.length === 1 ? "Room" : "Rooms"} Selected
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {rooms.map((room) => {
                      const isSelected = editRooms.includes(room.id);
                      return (
                        <button
                          key={room.id}
                          type="button"
                          onClick={() => handleToggleEditRoom(room.id)}
                          className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                            isSelected
                              ? "bg-[#101814] text-white border-[#101814] shadow-xs"
                              : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                          }`}
                        >
                          <span className="font-bold block text-xs">{room.name}</span>
                          <span className={`text-[10px] block truncate ${isSelected ? "text-gray-300" : "text-gray-500"}`}>
                            {room.type}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 6. Financial Ledger & Status */}
                <div className="space-y-3 pt-3 border-t border-gray-100">
                  <h3 className="font-bold uppercase tracking-wider text-gray-700 text-[11px]">
                    Folio Status & Payment Ledger
                  </h3>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-semibold text-gray-600">Folio Status</label>
                      <select
                        value={editStatus}
                        onChange={(e) => setEditStatus(e.target.value as any)}
                        className="w-full h-10 px-3 rounded-xl border border-[#E2E7E4] bg-white font-medium focus:border-[#1E6F50]"
                      >
                        <option value="Confirmed">Confirmed</option>
                        <option value="Pending Advance">Pending Advance</option>
                        <option value="Checked-In">Checked-In</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-gray-600">Payment Mode</label>
                      <select
                        value={editPaymentMode}
                        onChange={(e) => setEditPaymentMode(e.target.value as any)}
                        className="w-full h-10 px-3 rounded-xl border border-[#E2E7E4] bg-white font-medium focus:border-[#1E6F50]"
                      >
                        <option value="UPI">UPI (GPay / PhonePe)</option>
                        <option value="Cash">Cash at Desk</option>
                        <option value="Card">Debit / Credit Card</option>
                        <option value="Bank Transfer">NEFT / IMPS</option>
                        <option value="Pending">Payment Pending</option>
                      </select>
                    </div>
                  </div>

                  <div className="p-3.5 bg-gray-50 rounded-xl space-y-3 border border-gray-200">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="font-semibold text-gray-600">Total Tariff (â‚¹)</label>
                        <input
                          type="number"
                          value={editTotalAmount}
                          onChange={(e) => setEditTotalAmount(Number(e.target.value))}
                          className="w-full h-10 px-3 rounded-xl border border-gray-300 font-mono font-bold text-[#161D1A] bg-white focus:border-[#1E6F50]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-semibold text-gray-600">Advance Received (â‚¹)</label>
                        <input
                          type="number"
                          value={editAdvancePaid}
                          onChange={(e) => setEditAdvancePaid(Number(e.target.value))}
                          className="w-full h-10 px-3 rounded-xl border border-gray-300 font-mono font-bold text-[#1E6F50] bg-white focus:border-[#1E6F50]"
                        />
                      </div>
                    </div>

                    <div className="pt-2 border-t border-gray-200 flex items-center justify-between text-xs">
                      <span className="font-bold text-gray-700">Calculated Balance Due:</span>
                      <span className={`font-mono font-bold text-sm ${editTotalAmount - editAdvancePaid > 0 ? "text-[#E06354]" : "text-[#1E6F50]"}`}>
                        â‚¹{Math.max(0, editTotalAmount - editAdvancePaid).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 7. Special Notes */}
                <div className="space-y-1 pt-2 border-t border-gray-100">
                  <label className="font-semibold text-gray-600">Special Notes / Requests</label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Early check-in requested, Jain meals, birthday celebration"
                    value={editNotes}
                    onChange={(e) => setEditNotes(e.target.value)}
                    className="w-full p-3 rounded-xl border border-[#E2E7E4] focus:border-[#1E6F50] focus:outline-none resize-none"
                  />
                </div>

                {/* Sticky Action Footer */}
                <div className="sticky bottom-0 bg-white/95 backdrop-blur-xs pt-3 pb-4 border-t border-gray-200 flex items-center justify-end gap-2.5 -mx-5 sm:-mx-6 px-5 sm:px-6 shadow-sm">
                  <button
                    type="button"
                    onClick={() => setEditingBooking(null)}
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-gray-300 hover:bg-gray-100 font-semibold text-xs transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-[#101814] hover:bg-black text-white font-semibold text-xs uppercase tracking-wider shadow-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Save className="w-4 h-4 text-[#89D6B1]" />
                    <span>Update Folio Safely</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Top Breadcrumb & Actions Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E2E7E4]">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-gray-500 mb-1">
              <span>Saphale Orchard Campus</span>
              <span>â€º</span>
              <span className="text-[#1E6F50] font-semibold">Bookings & Guest ID Vault</span>
            </div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl sm:text-3xl font-bold tracking-tight text-[#161D1A]">
                Bookings & KYC Vault
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-[#F4FBF6] text-[#1E6F50] font-mono text-xs font-bold border border-[#1E6F50]/20">
                {bookings.length} Bookings
              </span>
            </div>
          </div>

          {/* Action Cluster - Mobile & Desktop Optimized */}
          <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 rounded-xl bg-[#101814] hover:bg-black text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-xs cursor-pointer active:scale-98"
            >
              <Plus className="w-4 h-4 text-[#89D6B1]" />
              <span>New Reservation</span>
            </button>

            <button
              type="button"
              onClick={() => showToast("Printing Palghar Police Lodging Report...")}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 sm:py-2 rounded-xl bg-white border border-[#E2E7E4] hover:bg-gray-50 text-xs font-semibold text-[#161D1A] transition-colors"
              title="Print Police Lodging Report"
            >
              <Printer className="w-3.5 h-3.5 text-gray-500" />
              <span className="hidden sm:inline">Print Police KYC</span>
              <span className="sm:hidden">KYC Print</span>
            </button>

            <button
              type="button"
              onClick={() => showToast("Exporting ledger to CSV...")}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 sm:py-2 rounded-xl bg-white border border-[#E2E7E4] hover:bg-gray-50 text-xs font-semibold text-[#161D1A] transition-colors"
              title="Export CSV Ledger"
            >
              <FileDown className="w-3.5 h-3.5 text-gray-500" />
              <span className="hidden sm:inline">Export CSV</span>
              <span className="sm:hidden">CSV</span>
            </button>
          </div>
        </div>

        {/* Filter Pipeline & Search Bar */}
        <div className="bg-white rounded-2xl p-3 sm:p-3.5 border border-[#E2E7E4] shadow-xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            {["All", "Confirmed", "Pending Advance", "Checked-In", "Completed"].map((tab) => {
              const isSelected = activeTab === tab;
              const count =
                tab === "All"
                  ? bookings.length
                  : bookings.filter((b) => b.status === tab).length;

              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-[#1E6F50] text-white"
                      : "text-gray-600 hover:bg-[#F3F5F4] hover:text-black"
                  }`}
                >
                  <span>{tab}</span>
                  <span
                    className={`font-mono text-[10px] px-1.5 py-0.2 rounded ${
                      isSelected ? "bg-black/20 text-white" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search & Select dropdowns */}
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            <div className="relative flex-1 w-full sm:w-60">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search guest, phone, folio..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 sm:h-8 pl-9 pr-3 bg-[#F3F5F4] text-xs font-mono rounded-xl sm:rounded-lg border border-transparent focus:border-[#1E6F50] focus:bg-white focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 sm:flex items-center gap-2 w-full sm:w-auto">
              <select
                value={filterIdStatus}
                onChange={(e) => setFilterIdStatus(e.target.value)}
                className="h-10 sm:h-8 px-2.5 bg-[#F3F5F4] text-xs font-mono rounded-xl sm:rounded-lg border border-transparent focus:border-[#1E6F50] focus:outline-none"
              >
                <option value="All">All ID Status</option>
                <option value="Verified">ID on File</option>
                <option value="Pending">To Collect at Check-In</option>
              </select>

              <select
                value={filterRoom}
                onChange={(e) => setFilterRoom(e.target.value)}
                className="h-10 sm:h-8 px-2.5 bg-[#F3F5F4] text-xs font-mono rounded-xl sm:rounded-lg border border-transparent focus:border-[#1E6F50] focus:outline-none"
              >
                <option value="All">All Rooms</option>
                {rooms.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>

            {/* View Mode Switcher Pill */}
            <div className="flex items-center bg-[#F3F5F4] p-0.5 rounded-xl border border-[#E2E7E4] shrink-0">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-white text-[#161D1A] shadow-xs"
                    : "text-gray-500 hover:text-black"
                }`}
                title="Cards Grid View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Cards</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("table")}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === "table"
                    ? "bg-white text-[#161D1A] shadow-xs"
                    : "text-gray-500 hover:text-black"
                }`}
                title="Master Ledger Table View"
              >
                <TableIcon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Table</span>
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================================
            VIEW 1: RESPONSIVE RESERVATIONS CARDS DECK (viewMode === "grid")
           ========================================================================= */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5">
          {filteredBookings.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 border border-[#E2E7E4] text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto text-gray-400">
                <Search className="w-5 h-5" />
              </div>
              <p className="text-sm font-medium text-gray-600">No matching reservations found</p>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("All");
                  setSearchQuery("");
                  setFilterIdStatus("All");
                  setFilterRoom("All");
                }}
                className="text-xs text-[#1E6F50] font-semibold underline"
              >
                Reset all filters
              </button>
            </div>
          ) : (
            filteredBookings.map((b) => (
              <div
                key={b.id}
                className="bg-white rounded-2xl border border-[#E2E7E4] shadow-xs p-4 space-y-3.5 transition-all"
              >
                {/* Folio ID & Status Top Bar */}
                <div className="flex items-center justify-between pb-2.5 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm text-[#1E6F50]">{b.id}</span>
                    <span className="text-[10px] font-mono text-gray-400">
                      {b.createdAt.split("T")[0]}
                    </span>
                  </div>

                  {b.status === "Confirmed" && (
                    <span className="px-2.5 py-0.5 rounded-full bg-[#F4FBF6] border border-[#1E6F50]/20 text-[#1E6F50] font-mono text-[10px] font-bold">
                      Confirmed
                    </span>
                  )}
                  {b.status === "Checked-In" && (
                    <span className="px-2.5 py-0.5 rounded-full bg-[#1E6F50] text-white font-mono text-[10px] font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Checked-In
                    </span>
                  )}
                  {b.status === "Pending Advance" && (
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 font-mono text-[10px] font-bold">
                      Pending Advance
                    </span>
                  )}
                  {b.status === "Completed" && (
                    <span className="px-2.5 py-0.5 rounded-full bg-gray-100 border border-gray-200 text-gray-700 font-mono text-[10px] font-bold">
                      Completed
                    </span>
                  )}
                </div>

                {/* Guest Profile & 1-Tap Direct Contact */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-serif font-bold text-base text-[#161D1A]">
                      {b.guestName}
                    </h3>
                    <div className="text-xs text-gray-500 mt-0.5 flex items-center gap-1.5">
                      <span>{b.city}</span>
                      <span>â€¢</span>
                      <span className="font-mono text-[11px]">{b.phone}</span>
                    </div>
                  </div>

                  {/* 1-Tap Action Pill Buttons */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <a
                      href={`tel:${b.phone}`}
                      className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-colors"
                      title="Direct Call"
                    >
                      <Phone className="w-4 h-4 text-[#1E6F50]" />
                    </a>
                    <a
                      href={`https://wa.me/${b.phone.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-xl bg-[#F4FBF6] hover:bg-[#e7f6ed] text-[#1E6F50] border border-[#1E6F50]/20 flex items-center justify-center transition-colors"
                      title="Chat on WhatsApp"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Stay & Room Details */}
                <div className="bg-[#F9FAF9] rounded-xl p-3 space-y-2 border border-[#E2E7E4]/60">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#161D1A]">{b.packageName}</span>
                    <span className="font-mono text-[11px] text-gray-500">
                      {b.adults} Adults{b.children > 0 ? `, ${b.children} Kids` : ""}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-gray-500 font-mono">
                    <span className="flex items-center gap-1 text-gray-700">
                      <Calendar className="w-3 h-3 text-[#1E6F50]" />
                      <span>{b.checkIn} to {b.checkOut}</span>
                    </span>
                    <span className="text-[#1E6F50] uppercase font-bold text-[10px]">
                      {b.mealPreference === "Mixed"
                        ? `Mixed (${b.vegCount || 0} Veg Â· ${b.nonVegCount || 0} Non-Veg)`
                        : b.mealPreference === "Veg"
                        ? `All Veg (${b.adults + b.children} Pax)`
                        : `All Non-Veg (${b.adults + b.children} Pax)`}
                    </span>
                  </div>

                  {/* Room Tags - Deduplicated with unique keys */}
                  <div className="flex flex-wrap gap-1 pt-1 border-t border-gray-200/60">
                    {Array.from(new Set(b.rooms)).map((room, rIdx) => (
                      <span
                        key={`${b.id}-${room}-${rIdx}`}
                        className="px-2 py-0.5 rounded-md bg-white border border-[#1E6F50]/30 text-[#1E6F50] font-mono text-[10px] font-semibold"
                      >
                        {room}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Financial Ledger Micro Grid */}
                <div className="grid grid-cols-3 gap-2 p-2.5 bg-gray-50 rounded-xl font-mono text-center border border-gray-200/80">
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-gray-500 block uppercase">Total</span>
                    <span className="text-xs font-bold text-[#161D1A]">
                      â‚¹{b.totalAmount.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="space-y-0.5 border-x border-gray-200">
                    <span className="text-[10px] text-gray-500 block uppercase">Adv ({b.paymentMode})</span>
                    <span className="text-xs font-semibold text-gray-700">
                      â‚¹{b.advancePaid.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-gray-500 block uppercase">Balance</span>
                    {b.balanceDue > 0 ? (
                      <span className="text-xs font-bold text-[#E06354]">
                        â‚¹{b.balanceDue.toLocaleString("en-IN")}
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-[#1E6F50]">
                        Settled
                      </span>
                    )}
                  </div>
                </div>

                {/* ID Status & Operational Actions */}
                <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {b.idVerified ? (
                      <button
                        type="button"
                        onClick={() => setSelectedKycBooking(b)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#F4FBF6] border border-[#1E6F50]/30 text-[#1E6F50] font-mono text-[11px] font-bold active:scale-95 transition-transform cursor-pointer"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#1E6F50]" />
                        <span>ID on File ({b.idType})</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setCollectIdBooking(b);
                          setCollectIdType(b.idType || "Aadhaar");
                          setCollectIdLast4(b.idLast4 || "");
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-gray-100 hover:bg-[#F4FBF6] text-gray-700 hover:text-[#1E6F50] border border-gray-200 font-mono text-[10px] font-semibold active:scale-95 transition-all cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5 text-[#1E6F50]" />
                        <span>Collect ID at Check-In</span>
                      </button>
                    )}

                    {/* Safe Edit Button */}
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(b)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#FAF8F3] hover:bg-[#E2E7E4] text-[#161D1A] border border-[rgba(139,130,88,0.25)] font-mono text-[11px] font-semibold transition-colors cursor-pointer"
                      title="Update Booking Details Safely"
                    >
                      <Edit3 className="w-3 h-3 text-[#1E6F50]" />
                      <span>Edit</span>
                    </button>
                  </div>

                  {/* Status update buttons */}
                  <div className="flex items-center gap-1.5">
                    {b.status === "Confirmed" && (
                      <button
                        type="button"
                        onClick={() => {
                          updateBookingStatus(b.id, "Checked-In");
                          showToast(`âœ“ Folio ${b.id} marked as Checked-In!`);
                        }}
                        className="px-3 py-1.5 bg-[#1E6F50] hover:bg-[#185e43] text-white rounded-lg font-mono text-xs font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Check-In</span>
                      </button>
                    )}

                    {b.status === "Checked-In" && (
                      <button
                        type="button"
                        onClick={() => {
                          updateBookingStatus(b.id, "Completed");
                          showToast(`âœ“ Folio ${b.id} marked as Completed & Checked-Out!`);
                        }}
                        className="px-3 py-1.5 bg-gray-800 text-white rounded-lg font-mono text-xs font-bold cursor-pointer"
                      >
                        Check-Out
                      </button>
                    )}

                    {b.status === "Pending Advance" && (
                      <button
                        type="button"
                        onClick={() => {
                          updateBookingStatus(b.id, "Confirmed");
                          showToast(`âœ“ Folio ${b.id} confirmed with advance!`);
                        }}
                        className="px-3 py-1.5 bg-[#1E6F50] text-white rounded-lg font-mono text-xs font-bold cursor-pointer"
                      >
                        Confirm
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        )}

        {/* =========================================================================
            VIEW 2: MASTER BOOKINGS & KYC VAULT LEDGER TABLE (viewMode === "table")
           ========================================================================= */}
        {viewMode === "table" && (
        <div className="bg-white rounded-2xl border border-[#E2E7E4] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[840px] text-left border-collapse">
              <thead>
                <tr className="bg-[#F9FAF9] text-gray-500 font-mono text-[11px] uppercase tracking-wider border-b border-[#E2E7E4] h-10">
                  <th className="px-5 py-2 font-semibold">Folio ID</th>
                  <th className="px-5 py-2 font-semibold">Guest & Contact</th>
                  <th className="px-5 py-2 font-semibold">Package & Headcount</th>
                  <th className="px-5 py-2 font-semibold">Rooms Allocated</th>
                  <th className="px-5 py-2 font-semibold">ID Card (Check-In)</th>
                  <th className="px-5 py-2 font-semibold text-right">Payment Ledger</th>
                  <th className="px-5 py-2 font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E7E4] text-xs font-sans text-[#161D1A]">
                {filteredBookings.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-gray-500 font-mono">
                      No matching reservations found.
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-[#F9FAF9] transition-colors">
                      {/* Booking ID */}
                      <td className="px-5 py-3.5 align-top">
                        <span className="font-mono font-bold text-[#1E6F50]">{b.id}</span>
                        <div className="text-[10px] font-mono text-gray-400 mt-0.5">
                          {b.createdAt.split("T")[0]}
                        </div>
                      </td>

                      {/* Guest info */}
                      <td className="px-5 py-3.5 align-top">
                        <div className="font-bold text-[#161D1A]">{b.guestName}</div>
                        <div className="font-mono text-[11px] text-gray-600 flex items-center gap-1 mt-0.5">
                          <Phone className="w-3 h-3 text-[#1E6F50]" />
                          <span>{b.phone}</span>
                        </div>
                        <div className="text-[11px] text-gray-500">{b.city}</div>
                      </td>

                      {/* Package details */}
                      <td className="px-5 py-3.5 align-top">
                        <div className="font-semibold text-[#161D1A]">{b.packageName}</div>
                        <div className="font-mono text-[11px] text-gray-500 mt-0.5">
                          {b.adults} Adults{b.children > 0 ? `, ${b.children} Kids` : ""}
                        </div>
                        <div className="text-[10px] font-mono text-[#1E6F50] uppercase mt-0.5 font-semibold">
                          {b.mealPreference === "Mixed"
                            ? `Mixed: ${b.vegCount || 0} Veg Â· ${b.nonVegCount || 0} Non-Veg`
                            : `${b.mealPreference} Preference`}
                        </div>
                      </td>

                      {/* Room pills - Deduplicated with unique keys */}
                      <td className="px-5 py-3.5 align-top">
                        <div className="flex flex-wrap gap-1">
                          {Array.from(new Set(b.rooms)).map((room, rIdx) => (
                            <span
                              key={`${b.id}-${room}-${rIdx}`}
                              className="px-2 py-0.5 rounded bg-[#F4FBF6] border border-[#1E6F50]/20 text-[#1E6F50] font-mono text-[10px] font-semibold"
                            >
                              {room}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* ID Status */}
                      <td className="px-5 py-3.5 align-top">
                        {b.idVerified ? (
                          <div className="space-y-1">
                            <button
                              type="button"
                              onClick={() => setSelectedKycBooking(b)}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#F4FBF6] border border-[#1E6F50]/30 text-[#1E6F50] font-mono text-[11px] font-bold hover:bg-[#1E6F50] hover:text-white transition-colors cursor-pointer"
                              title="Click to view ID card details"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#1E6F50]" />
                              <span>
                                {b.idType} â€¢â€¢â€¢â€¢ {b.idLast4}
                              </span>
                              <Eye className="w-3 h-3" />
                            </button>
                            <span className="text-[10px] text-gray-500 block">
                              ID on File
                            </span>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <button
                              type="button"
                              onClick={() => {
                                setCollectIdBooking(b);
                                setCollectIdType(b.idType || "Aadhaar");
                                setCollectIdLast4(b.idLast4 || "");
                              }}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-[#F4FBF6] hover:text-[#1E6F50] text-gray-700 font-mono text-[11px] font-semibold transition-colors cursor-pointer"
                            >
                              <Plus className="w-3 h-3 text-[#1E6F50]" />
                              <span>Collect at check-in</span>
                            </button>
                            <span className="text-[10px] text-gray-400 block">
                              To verify at desk
                            </span>
                          </div>
                        )}
                      </td>

                      {/* Payment Ledger */}
                      <td className="px-5 py-3.5 align-top text-right">
                        <div className="font-mono font-bold text-sm text-[#161D1A]">
                          â‚¹{b.totalAmount.toLocaleString("en-IN")}
                        </div>
                        <div className="font-mono text-[11px] text-gray-500">
                          Adv: â‚¹{b.advancePaid.toLocaleString("en-IN")} ({b.paymentMode})
                        </div>
                        {b.balanceDue > 0 ? (
                          <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#E06354]/10 text-[#E06354] inline-block mt-0.5">
                            â‚¹{b.balanceDue.toLocaleString("en-IN")} Due
                          </span>
                        ) : (
                          <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#1E6F50]/10 text-[#1E6F50] inline-block mt-0.5">
                            Settled Full
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-3.5 align-top text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          {/* Safe Edit Button */}
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(b)}
                            title="Edit Reservation Safely"
                            className="p-1.5 rounded-lg text-gray-500 hover:text-[#1E6F50] hover:bg-[#F4FBF6] transition-colors cursor-pointer"
                          >
                            <Edit3 className="w-4 h-4 text-[#1E6F50]" />
                          </button>

                          {b.idVerified && (
                            <button
                              type="button"
                              onClick={() => setSelectedKycBooking(b)}
                              title="Inspect ID Card"
                              className="p-1.5 rounded-lg text-gray-500 hover:text-[#1E6F50] hover:bg-[#F4FBF6] transition-colors cursor-pointer"
                            >
                              <BadgeCheck className="w-4 h-4 text-[#1E6F50]" />
                            </button>
                          )}
                          <a
                            href={`https://wa.me/${b.phone.replace(/[^0-9]/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Chat on WhatsApp"
                            className="p-1.5 rounded-lg text-gray-500 hover:text-[#1E6F50] hover:bg-[#F4FBF6] transition-colors"
                          >
                            <MessageSquare className="w-4 h-4" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer Security Notice */}
          <div className="p-4 bg-[#F9FAF9] border-t border-[#E2E7E4] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-gray-500">
            <div className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-[#1E6F50]" />
              <span>
                All guest government identification cards are encrypted & logged per Palghar Police
                lodging regulations.
              </span>
            </div>
            <span>Total Shown: {filteredBookings.length} records</span>
          </div>
        </div>
        )}

        {/* =========================================================================
            SLIDE-OVER DRAWER: + Add Manual Booking (540px width)
           ========================================================================= */}
        {drawerOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
              onClick={() => setDrawerOpen(false)}
            ></div>

            {/* Drawer Body */}
            <div className="relative w-full max-w-xl bg-white h-full shadow-2xl z-10 flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300">
              {/* Drawer Header */}
              <div className="p-5 sm:p-6 bg-[#101814] text-white flex items-center justify-between border-b border-white/10">
                <div>
                  <span className="font-mono text-[11px] text-[#89D6B1] uppercase tracking-wider block">
                    Boutique Desk Entry
                  </span>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-white mt-0.5">
                    New Reservation
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Content - Clean & Streamlined */}
              <form onSubmit={handleSaveBooking} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 text-xs text-[#161D1A]">
                {/* 1. Guest Information */}
                <div className="space-y-3">
                  <h3 className="font-bold uppercase tracking-wider text-gray-700 text-[11px]">
                    Guest Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="sm:col-span-2 space-y-1">
                      <label className="font-semibold text-gray-600">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rajesh Patil"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        className="w-full h-10 px-3 rounded-xl border border-[#E2E7E4] focus:border-[#1E6F50] focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-gray-600">WhatsApp Mobile *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98XXX XXXXX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full h-10 px-3 rounded-xl border border-[#E2E7E4] font-mono focus:border-[#1E6F50] focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-gray-600">City / Origin</label>
                      <input
                        type="text"
                        placeholder="e.g. Borivali, Mumbai"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full h-10 px-3 rounded-xl border border-[#E2E7E4] focus:border-[#1E6F50] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Stay & Room Allocation */}
                <div className="space-y-3 pt-3 border-t border-gray-100">
                  <h3 className="font-bold uppercase tracking-wider text-gray-700 text-[11px]">
                    Stay & Rooms
                  </h3>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-semibold text-gray-600">Check-In</label>
                      <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full h-10 px-3 rounded-xl border border-[#E2E7E4] font-mono focus:border-[#1E6F50]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-gray-600">Check-Out</label>
                      <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full h-10 px-3 rounded-xl border border-[#E2E7E4] font-mono focus:border-[#1E6F50]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-gray-600">Package</label>
                    <select
                      value={packageId}
                      onChange={(e) => setPackageId(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-[#E2E7E4] bg-white font-medium focus:border-[#1E6F50]"
                    >
                      {packages.map((pkg) => (
                        <option key={pkg.id} value={pkg.id}>
                          {pkg.name} ({pkg.time})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Room Selection Chips */}
                  <div className="space-y-1.5">
                    <label className="font-semibold text-gray-600 block">
                      Select Rooms (Tap to select)
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {rooms.map((r) => {
                        const isChecked = selectedRooms.includes(r.id);
                        return (
                          <button
                            key={r.id}
                            type="button"
                            onClick={() => {
                              if (isChecked) {
                                setSelectedRooms(selectedRooms.filter((id) => id !== r.id));
                              } else {
                                setSelectedRooms([...selectedRooms, r.id]);
                              }
                            }}
                            className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                              isChecked
                                ? "bg-[#F4FBF6] border-[#1E6F50] text-[#1E6F50] font-bold shadow-2xs"
                                : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                            }`}
                          >
                            <span className="font-mono text-xs block">{r.name}</span>
                            <span className="text-[10px] text-gray-500 font-normal truncate block">
                              {r.category.split(" ")[0]} {r.type}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Headcount Steppers & Meal Preference */}
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div className="p-3 bg-[#F9FAF9] rounded-xl flex items-center justify-between border border-gray-100">
                      <div>
                        <span className="font-bold text-[#161D1A] block">Adults</span>
                        <span className="font-mono text-[10px] text-gray-500">Age 12+</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setAdults(Math.max(1, adults - 1))}
                          className="w-7 h-7 bg-white border border-gray-200 rounded-lg flex items-center justify-center font-bold"
                        >
                          -
                        </button>
                        <span className="font-mono font-bold text-sm w-5 text-center">{adults}</span>
                        <button
                          type="button"
                          onClick={() => setAdults(adults + 1)}
                          className="w-7 h-7 bg-white border border-gray-200 rounded-lg flex items-center justify-center font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="p-3 bg-[#F9FAF9] rounded-xl flex items-center justify-between border border-gray-100">
                      <div>
                        <span className="font-bold text-[#161D1A] block">Kids</span>
                        <span className="font-mono text-[10px] text-gray-500">5-11 yrs</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setChildren(Math.max(0, children - 1))}
                          className="w-7 h-7 bg-white border border-gray-200 rounded-lg flex items-center justify-center font-bold"
                        >
                          -
                        </button>
                        <span className="font-mono font-bold text-sm w-5 text-center">{children}</span>
                        <button
                          type="button"
                          onClick={() => setChildren(children + 1)}
                          className="w-7 h-7 bg-white border border-gray-200 rounded-lg flex items-center justify-center font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Meal Preference */}
                  <div className="space-y-2.5">
                    <label className="font-semibold text-gray-600 block">Food Preference</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(["Veg", "Non-Veg", "Mixed"] as const).map((mode) => (
                        <button
                          key={mode}
                          type="button"
                          onClick={() => {
                            setMealPreference(mode);
                            const totalPax = adults + children;
                            if (mode === "Veg") {
                              setVegCount(totalPax);
                              setNonVegCount(0);
                            } else if (mode === "Non-Veg") {
                              setNonVegCount(totalPax);
                              setVegCount(0);
                            } else {
                              const half = Math.ceil(totalPax / 2);
                              setVegCount(half);
                              setNonVegCount(Math.max(0, totalPax - half));
                            }
                          }}
                          className={`py-2 rounded-xl font-semibold text-center uppercase tracking-wider text-[11px] border transition-colors cursor-pointer ${
                            mealPreference === mode
                              ? "bg-[#1E6F50] text-white border-[#1E6F50]"
                              : "bg-[#F3F5F4] text-gray-600 border-transparent hover:bg-gray-200"
                          }`}
                        >
                          {mode}
                        </button>
                      ))}
                    </div>

                    {/* Exact Meal Count Steppers when Mixed is selected */}
                    {mealPreference === "Mixed" && (
                      <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 space-y-2 animate-in fade-in duration-200">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-semibold text-gray-700">Kitchen Headcount Split</span>
                          <span className="font-mono text-gray-500">
                            Total: {vegCount + nonVegCount} of {adults + children} Guests
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          {/* Veg Thalis */}
                          <div className="p-2.5 bg-white rounded-lg border border-gray-200 flex items-center justify-between">
                            <div>
                              <span className="font-bold text-[#1E6F50] block text-xs">Veg Meals</span>
                              <span className="text-[10px] text-gray-500 font-mono">Thalis</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => setVegCount(Math.max(0, vegCount - 1))}
                                className="w-7 h-7 bg-gray-100 hover:bg-gray-200 rounded flex items-center justify-center font-bold text-gray-700 cursor-pointer"
                              >
                                -
                              </button>
                              <span className="font-mono font-bold text-xs w-5 text-center">{vegCount}</span>
                              <button
                                type="button"
                                onClick={() => setVegCount(vegCount + 1)}
                                className="w-7 h-7 bg-gray-100 hover:bg-gray-200 rounded flex items-center justify-center font-bold text-gray-700 cursor-pointer"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          {/* Non-Veg Thalis */}
                          <div className="p-2.5 bg-white rounded-lg border border-gray-200 flex items-center justify-between">
                            <div>
                              <span className="font-bold text-[#E06354] block text-xs">Non-Veg</span>
                              <span className="text-[10px] text-gray-500 font-mono">Agri Chicken</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => setNonVegCount(Math.max(0, nonVegCount - 1))}
                                className="w-7 h-7 bg-gray-100 hover:bg-gray-200 rounded flex items-center justify-center font-bold text-gray-700 cursor-pointer"
                              >
                                -
                              </button>
                              <span className="font-mono font-bold text-xs w-5 text-center">{nonVegCount}</span>
                              <button
                                type="button"
                                onClick={() => setNonVegCount(nonVegCount + 1)}
                                className="w-7 h-7 bg-gray-100 hover:bg-gray-200 rounded flex items-center justify-center font-bold text-gray-700 cursor-pointer"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 3. Payment & Settlement */}
                <div className="space-y-3 pt-3 border-t border-gray-100">
                  <h3 className="font-bold uppercase tracking-wider text-gray-700 text-[11px]">
                    Payment & Advance
                  </h3>

                  <div className="p-3.5 bg-gray-50 rounded-xl space-y-3 border border-gray-200">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="font-semibold text-gray-600">Total Tariff (â‚¹)</label>
                        <input
                          type="number"
                          value={finalTotal}
                          onChange={(e) => setCustomTotal(Number(e.target.value))}
                          className="w-full h-10 px-3 rounded-xl border border-gray-300 font-mono font-bold text-[#161D1A] bg-white focus:border-[#1E6F50]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-semibold text-gray-600">Advance Received (â‚¹)</label>
                        <input
                          type="number"
                          value={advancePaid}
                          onChange={(e) => setAdvancePaid(Number(e.target.value))}
                          className="w-full h-10 px-3 rounded-xl border border-gray-300 font-mono font-bold text-[#1E6F50] bg-white focus:border-[#1E6F50]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 items-center pt-2 border-t border-gray-200">
                      <div className="space-y-1">
                        <label className="font-semibold text-gray-600">Payment Mode</label>
                        <select
                          value={paymentMode}
                          onChange={(e) => setPaymentMode(e.target.value as any)}
                          className="w-full h-10 px-3 rounded-xl border border-gray-300 bg-white font-medium focus:border-[#1E6F50]"
                        >
                          <option value="UPI">UPI (GPay / PhonePe)</option>
                          <option value="Cash">Cash at Desk</option>
                          <option value="Card">Debit / Credit Card</option>
                          <option value="Bank Transfer">Bank Transfer</option>
                        </select>
                      </div>

                      <div className="font-mono text-right">
                        <span className="text-[10px] text-gray-500 block uppercase">Remaining Due</span>
                        <span className={`text-sm font-bold ${balanceDue > 0 ? "text-[#E06354]" : "text-[#1E6F50]"}`}>
                          â‚¹{balanceDue.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. Simple ID Collection Option */}
                <div className="space-y-3 pt-3 border-t border-gray-100">
                  <label className="flex items-center gap-2.5 cursor-pointer p-3 rounded-xl bg-[#F4FBF6] border border-[#1E6F50]/20 hover:bg-[#e7f6ed] transition-colors">
                    <input
                      type="checkbox"
                      checked={collectIdNow}
                      onChange={(e) => setCollectIdNow(e.target.checked)}
                      className="accent-[#1E6F50] w-4 h-4 cursor-pointer"
                    />
                    <div className="flex-1">
                      <span className="font-semibold text-xs text-[#161D1A] block">
                        Record Govt ID now
                      </span>
                      <span className="text-[10px] text-gray-500 block">
                        Guest is at the desk with their ID card
                      </span>
                    </div>
                  </label>

                  {collectIdNow ? (
                    <div className="grid grid-cols-2 gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200 animate-in fade-in">
                      <div className="space-y-1">
                        <label className="font-semibold text-gray-600">ID Type</label>
                        <select
                          value={idType}
                          onChange={(e) => setIdType(e.target.value as any)}
                          className="w-full h-10 px-3 rounded-xl border border-gray-300 bg-white font-medium focus:border-[#1E6F50]"
                        >
                          <option value="Aadhaar">Aadhaar Card</option>
                          <option value="Driving License">Driving License</option>
                          <option value="Passport">Passport</option>
                          <option value="PAN">PAN Card</option>
                          <option value="Voter ID">Voter ID</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="font-semibold text-gray-600">Last 4 Digits</label>
                        <input
                          type="text"
                          maxLength={4}
                          placeholder="e.g. 4892"
                          value={idLast4}
                          onChange={(e) => setIdLast4(e.target.value)}
                          className="w-full h-10 px-3 rounded-xl border border-gray-300 font-mono text-center tracking-widest font-bold bg-white focus:border-[#1E6F50]"
                        />
                      </div>
                    </div>
                  ) : (
                    <p className="text-[11px] text-gray-500 italic px-1">
                      Note: You can collect and record the guest&apos;s ID card when they arrive for check-in.
                    </p>
                  )}
                </div>

                {/* Optional Notes */}
                <div className="space-y-1 pt-2">
                  <label className="font-semibold text-gray-600">Special Notes / Requests</label>
                  <input
                    type="text"
                    placeholder="e.g. Jain food, bonfire request, extra bedding"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-[#E2E7E4] focus:border-[#1E6F50] focus:outline-none"
                  />
                </div>

                {/* Sticky Submit Action Footer for Mobile & Desktop */}
                <div className="sticky bottom-0 bg-white/95 backdrop-blur-xs pt-3 pb-4 border-t border-gray-200 flex items-center justify-end gap-2.5 -mx-5 sm:-mx-6 px-5 sm:px-6 shadow-sm">
                  <button
                    type="button"
                    onClick={() => setDrawerOpen(false)}
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-gray-300 hover:bg-gray-100 font-semibold text-xs transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-[#101814] hover:bg-black text-white font-semibold text-xs uppercase tracking-wider shadow-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#89D6B1]" />
                    <span>Save Reservation</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminSidebar>
  );
}
