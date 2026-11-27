"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  DollarSign,
  Image as ImageIcon,
  Save,
  Upload,
  ArrowUp,
  ArrowDown,
  Trash2,
  BadgeCheck,
  Eye,
  EyeOff,
  Plus,
  Minus,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { useResortStore, PackageItem, RoomCategory, MediaItem } from "@/lib/resort-store";

export default function RoomRatesAndMediaPage() {
  const {
    packages,
    roomCategories,
    media,
    updatePackageRate,
    updateRoomCategory,
    updateRatesBatch,
    addMedia,
    updateMedia,
    deleteMedia,
    reorderMedia,
  } = useResortStore();

  // Active filter for media
  const [activeMediaFilter, setActiveMediaFilter] = useState<string>("All Media");

  // Local state for editable package rates before publishing
  const [editingRates, setEditingRates] = useState<{ [id: string]: Partial<PackageItem> }>({});

  // Local state for editable room category rates
  const [editingRoomRates, setEditingRoomRates] = useState<{ [id: string]: Partial<RoomCategory> }>({});

  // Upload modal state
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<MediaItem["category"]>("Hero Banner");
  const [newSlot, setNewSlot] = useState("Hero Banner · Slot #2");
  const [newAlt, setNewAlt] = useState("");
  const [newDataUrl, setNewDataUrl] = useState<string | null>(null);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Handle rate input change
  const handleRateChange = (pkgId: string, field: keyof PackageItem, value: PackageItem[keyof PackageItem]) => {
    setEditingRates((prev) => ({
      ...prev,
      [pkgId]: {
        ...prev[pkgId],
        [field]: value,
      },
    }));
  };

  // Helper to step rates by a delta (+100 or -100)
  const stepRate = (pkgId: string, field: keyof PackageItem, currentVal: number, delta: number) => {
    const newVal = Math.max(0, currentVal + delta);
    handleRateChange(pkgId, field, newVal);
  };

  // Handle room category rate change
  const handleRoomRateChange = (catId: string, field: keyof RoomCategory, value: RoomCategory[keyof RoomCategory]) => {
    setEditingRoomRates((prev) => ({
      ...prev,
      [catId]: {
        ...prev[catId],
        [field]: value,
      },
    }));
  };

  const stepRoomRate = (catId: string, currentVal: number, delta: number) => {
    const newVal = Math.max(0, currentVal + delta);
    handleRoomRateChange(catId, "basePrice", newVal);
  };

  // Pending unsaved edits count (both packages and cottages)
  const pendingEditsCount = Object.keys(editingRates).length + Object.keys(editingRoomRates).length;

  // Publish all rate edits live
  const handlePublishRates = () => {
    updateRatesBatch(editingRates, editingRoomRates);
    setEditingRates({});
    setEditingRoomRates({});
    showToast("✓ All price changes published live! Consumer website updated in realtime.");
  };

  // Image Upload handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewDataUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Save new media
  const handleSaveMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDataUrl) {
      alert("Please select an image file to upload.");
      return;
    }

    addMedia({
      title: newTitle || "Pomelo Garden Scenic View",
      category: newCategory,
      url: newDataUrl,
      alt: newAlt || newTitle,
      slot: newSlot,
      active: true,
      resolution: "1200x896",
      size: "1.5 MB",
    });

    setUploadModalOpen(false);
    setNewTitle("");
    setNewDataUrl(null);
    showToast("✓ New property photo published to public website gallery!");
  };

  // Filtered media
  const filteredMedia = media.filter((m) => {
    if (activeMediaFilter === "All Media") return true;
    return m.category === activeMediaFilter;
  });

  return (
    <AdminSidebar>
      <div className="space-y-10 max-w-7xl mx-auto">
        {/* Toast */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#101814] text-white px-5 py-3 rounded-xl shadow-xl border border-[#1E6F50] flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 text-xs font-semibold">
            <BadgeCheck className="w-4 h-4 text-[#89D6B1]" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E2E7E4]">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-gray-500 mb-1">
              <span>Saphale Orchard Campus</span>
              <span>›</span>
              <span className="text-[#1E6F50] font-semibold">Room Rates & Media Studio</span>
            </div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl sm:text-3xl font-bold tracking-tight text-[#161D1A]">
                Room Rates & Media Studio
              </h1>
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F4FBF6] text-[#1E6F50] font-mono text-xs font-bold border border-[#1E6F50]/20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1E6F50] animate-pulse"></span>
                <span>Realtime Sync Online</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
            <Link
              href="/"
              target="_blank"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-2.5 sm:py-2 rounded-xl bg-white border border-[#E2E7E4] hover:bg-gray-50 text-xs font-semibold text-[#161D1A] transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-gray-500" />
              <span>Preview Live Site</span>
            </Link>

            <button
              type="button"
              onClick={handlePublishRates}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 sm:py-2 rounded-xl bg-[#1E6F50] hover:bg-[#185e43] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-xs"
            >
              <Save className="w-3.5 h-3.5 text-[#89D6B1]" />
              <span>{pendingEditsCount > 0 ? `Publish ${pendingEditsCount} Updates` : "Publish Live Rates"}</span>
            </button>
          </div>
        </div>

        {/* Floating Mobile Save Pill when pending edits exist */}
        {pendingEditsCount > 0 && (
          <div className="md:hidden fixed bottom-20 left-4 right-4 z-40 animate-in slide-in-from-bottom-3 duration-200">
            <button
              type="button"
              onClick={handlePublishRates}
              className="w-full py-3 px-4 rounded-xl bg-[#101814] text-white shadow-2xl border border-[#1E6F50] flex items-center justify-between font-bold text-xs uppercase tracking-wider"
            >
              <span className="flex items-center gap-2">
                <Save className="w-4 h-4 text-[#89D6B1] animate-pulse" />
                <span>Publish {pendingEditsCount} Price Change{pendingEditsCount > 1 ? "s" : ""} Live</span>
              </span>
              <span className="bg-[#1E6F50] text-white px-2.5 py-1 rounded-md text-[10px] font-mono">
                Tap to Sync
              </span>
            </button>
          </div>
        )}

        {/* =========================================================================
            SECTION 1: COTTAGE & SUITE NIGHTLY TARIFFS
           ========================================================================= */}
        <section className="space-y-4">
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E2E7E4] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-[#1E6F50]" />
                <h2 className="text-base font-bold text-[#161D1A]">
                  Cottage & Suite Nightly Tariffs
                </h2>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                Nightly room rates displayed on guest portal and live booking showcase. Adjust and tap Publish to sync immediately.
              </p>
            </div>
            <span className="px-3 py-1 rounded-lg bg-[#F4FBF6] text-[#1E6F50] font-mono text-xs font-bold border border-[#1E6F50]/20 self-start sm:self-auto">
              3 Cottages Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {roomCategories.map((cat) => {
              const localUpdates = editingRoomRates[cat.id] || {};
              const currentPrice =
                localUpdates.basePrice !== undefined ? localUpdates.basePrice : cat.basePrice;
              const hasUnsavedEdit = localUpdates.basePrice !== undefined;

              return (
                <div
                  key={cat.id}
                  className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E2E7E4] shadow-xs flex flex-col justify-between space-y-4 hover:border-[#1E6F50] transition-colors"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#1E6F50] bg-[#F4FBF6] px-2 py-0.5 rounded border border-[#1E6F50]/20">
                        {cat.type}
                      </span>
                      <span className="text-[10px] font-mono text-gray-500">
                        {cat.roomCount} {cat.roomCount === 1 ? "Unit" : "Units"}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-bold text-sm sm:text-base text-[#161D1A]">{cat.name}</h3>
                      <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                        {cat.tagline}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-gray-100 space-y-2">
                      <label className="font-semibold text-gray-600 block text-xs">
                        Base Nightly Rate (₹/night)
                      </label>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => stepRoomRate(cat.id, currentPrice, -100)}
                          className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold flex items-center justify-center shrink-0 active:scale-95 transition-transform"
                        >
                          -
                        </button>
                        <div className="relative flex-1">
                          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 font-mono text-xs">₹</span>
                          <input
                            type="number"
                            value={currentPrice}
                            onChange={(e) =>
                              handleRoomRateChange(cat.id, "basePrice", Number(e.target.value))
                            }
                            className="w-full h-8 pl-6 pr-2 bg-[#F3F5F4] rounded-lg border border-transparent font-mono text-xs font-bold text-[#161D1A] focus:bg-white focus:border-[#1E6F50] focus:outline-none"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => stepRoomRate(cat.id, currentPrice, 100)}
                          className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold flex items-center justify-center shrink-0 active:scale-95 transition-transform"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="font-mono text-[10px] text-gray-400">
                      {hasUnsavedEdit ? "Unsaved Edit" : "Live on Website"}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        if (hasUnsavedEdit) {
                          updateRoomCategory(cat.id, localUpdates);
                          setEditingRoomRates((prev) => {
                            const next = { ...prev };
                            delete next[cat.id];
                            return next;
                          });
                          showToast(`✓ Updated ${cat.name} rate to ₹${currentPrice.toLocaleString("en-IN")}`);
                        } else {
                          showToast(`Rate for ${cat.name} is already live.`);
                        }
                      }}
                      className="px-3 py-1.5 bg-[#1E6F50] text-white rounded-lg font-mono text-xs font-semibold hover:bg-[#185e43] transition-colors"
                    >
                      Publish
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: LIVE TARIFF & PACKAGE CONTROLLER
           ========================================================================= */}
        <section className="space-y-4">
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E2E7E4] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-[#1E6F50]" />
                <h2 className="text-base font-bold text-[#161D1A]">
                  Live Public Pricing & Package Tariffs
                </h2>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                Adjust retreat packages using steppers or direct input. Tap &ldquo;Publish Live Rates&rdquo; to sync with guest portal.
              </p>
            </div>
            <span className="px-3 py-1 rounded-lg bg-[#F4FBF6] text-[#1E6F50] font-mono text-xs font-bold border border-[#1E6F50]/20 self-start sm:self-auto">
              Auto-Sync: Ready
            </span>
          </div>

          {/* Tariffs Responsive Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {packages.map((pkg) => {
              const localUpdates = editingRates[pkg.id] || {};
              const currentNonAc =
                localUpdates.nonAcPrice !== undefined ? localUpdates.nonAcPrice : pkg.nonAcPrice;
              const currentAc =
                localUpdates.acPrice !== undefined ? localUpdates.acPrice : pkg.acPrice;
              const currentCouple =
                localUpdates.couplePrice !== undefined ? localUpdates.couplePrice : pkg.couplePrice || 5000;
              const currentChild =
                localUpdates.childPrice !== undefined ? localUpdates.childPrice : pkg.childPrice;

              return (
                <div
                  key={pkg.id}
                  className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E2E7E4] shadow-xs flex flex-col justify-between space-y-4 hover:border-[#1E6F50] transition-colors"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#1E6F50] bg-[#F4FBF6] px-2 py-0.5 rounded border border-[#1E6F50]/20">
                        {pkg.id}
                      </span>
                      <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-700">
                        <span>Live</span>
                        <input
                          type="checkbox"
                          checked={pkg.active}
                          onChange={(e) => updatePackageRate(pkg.id, { active: e.target.checked })}
                          className="accent-[#1E6F50] w-4 h-4 cursor-pointer"
                        />
                      </label>
                    </div>

                    <div>
                      <h3 className="font-bold text-sm sm:text-base text-[#161D1A]">{pkg.name}</h3>
                      <span className="font-mono text-[10px] text-gray-500 block mt-0.5">
                        {pkg.time}
                      </span>
                    </div>

                    {/* Inputs with Steppers */}
                    <div className="space-y-3 pt-2 border-t border-gray-100 text-xs">
                      {pkg.id === "picnic" ? (
                        <>
                          <div className="space-y-1">
                            <label className="font-semibold text-gray-600 block">
                              Non-AC Tariff (₹/pax)
                            </label>
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => stepRate(pkg.id, "nonAcPrice", currentNonAc, -50)}
                                className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold flex items-center justify-center shrink-0 active:scale-95 transition-transform"
                              >
                                -
                              </button>
                              <div className="relative flex-1">
                                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 font-mono text-xs">₹</span>
                                <input
                                  type="number"
                                  value={currentNonAc}
                                  onChange={(e) =>
                                    handleRateChange(pkg.id, "nonAcPrice", Number(e.target.value))
                                  }
                                  className="w-full h-8 pl-6 pr-2 bg-[#F3F5F4] rounded-lg border border-transparent font-mono text-xs font-bold text-[#161D1A] focus:bg-white focus:border-[#1E6F50] focus:outline-none"
                                />
                              </div>
                              <button
                                type="button"
                                onClick={() => stepRate(pkg.id, "nonAcPrice", currentNonAc, 50)}
                                className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold flex items-center justify-center shrink-0 active:scale-95 transition-transform"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="font-semibold text-gray-600 block">
                              AC Tariff (₹/pax)
                            </label>
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => stepRate(pkg.id, "acPrice", currentAc, -50)}
                                className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold flex items-center justify-center shrink-0 active:scale-95 transition-transform"
                              >
                                -
                              </button>
                              <div className="relative flex-1">
                                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 font-mono text-xs">₹</span>
                                <input
                                  type="number"
                                  value={currentAc}
                                  onChange={(e) =>
                                    handleRateChange(pkg.id, "acPrice", Number(e.target.value))
                                  }
                                  className="w-full h-8 pl-6 pr-2 bg-[#F3F5F4] rounded-lg border border-transparent font-mono text-xs font-bold text-[#161D1A] focus:bg-white focus:border-[#1E6F50] focus:outline-none"
                                />
                              </div>
                              <button
                                type="button"
                                onClick={() => stepRate(pkg.id, "acPrice", currentAc, 50)}
                                className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold flex items-center justify-center shrink-0 active:scale-95 transition-transform"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </>
                      ) : pkg.id === "group-overnight" ? (
                        <>
                          <div className="space-y-1">
                            <label className="font-semibold text-gray-600 block">
                              AC Rate per Pax (₹)
                            </label>
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => stepRate(pkg.id, "acPrice", currentAc, -50)}
                                className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold flex items-center justify-center shrink-0 active:scale-95 transition-transform"
                              >
                                -
                              </button>
                              <div className="relative flex-1">
                                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 font-mono text-xs">₹</span>
                                <input
                                  type="number"
                                  value={currentAc}
                                  onChange={(e) =>
                                    handleRateChange(pkg.id, "acPrice", Number(e.target.value))
                                  }
                                  className="w-full h-8 pl-6 pr-2 bg-[#F3F5F4] rounded-lg border border-transparent font-mono text-xs font-bold text-[#161D1A] focus:bg-white focus:border-[#1E6F50] focus:outline-none"
                                />
                              </div>
                              <button
                                type="button"
                                onClick={() => stepRate(pkg.id, "acPrice", currentAc, 50)}
                                className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold flex items-center justify-center shrink-0 active:scale-95 transition-transform"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <label className="font-semibold text-gray-600 block">
                              Non-AC Rate per Pax (₹)
                            </label>
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => stepRate(pkg.id, "nonAcPrice", currentNonAc, -50)}
                                className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold flex items-center justify-center shrink-0 active:scale-95 transition-transform"
                              >
                                -
                              </button>
                              <div className="relative flex-1">
                                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 font-mono text-xs">₹</span>
                                <input
                                  type="number"
                                  value={currentNonAc}
                                  onChange={(e) =>
                                    handleRateChange(pkg.id, "nonAcPrice", Number(e.target.value))
                                  }
                                  className="w-full h-8 pl-6 pr-2 bg-[#F3F5F4] rounded-lg border border-transparent font-mono text-xs font-bold text-[#161D1A] focus:bg-white focus:border-[#1E6F50] focus:outline-none"
                                />
                              </div>
                              <button
                                type="button"
                                onClick={() => stepRate(pkg.id, "nonAcPrice", currentNonAc, 50)}
                                className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold flex items-center justify-center shrink-0 active:scale-95 transition-transform"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </>
                      ) : pkg.id === "couple-retreat" ? (
                        <>
                          <div className="space-y-1">
                            <label className="font-semibold text-gray-600 block">
                              Couple Base Rate (₹)
                            </label>
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => stepRate(pkg.id, "couplePrice", currentCouple, -100)}
                                className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold flex items-center justify-center shrink-0 active:scale-95 transition-transform"
                              >
                                -
                              </button>
                              <div className="relative flex-1">
                                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 font-mono text-xs">₹</span>
                                <input
                                  type="number"
                                  value={currentCouple}
                                  onChange={(e) =>
                                    handleRateChange(pkg.id, "couplePrice", Number(e.target.value))
                                  }
                                  className="w-full h-8 pl-6 pr-2 bg-[#F3F5F4] rounded-lg border border-transparent font-mono text-xs font-bold text-[#161D1A] focus:bg-white focus:border-[#1E6F50] focus:outline-none"
                                />
                              </div>
                              <button
                                type="button"
                                onClick={() => stepRate(pkg.id, "couplePrice", currentCouple, 100)}
                                className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold flex items-center justify-center shrink-0 active:scale-95 transition-transform"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <label className="font-semibold text-gray-600 block">
                              Extra Guest Rate (₹)
                            </label>
                            {(() => {
                              const currentExtra =
                                localUpdates.extraGuestPrice !== undefined
                                  ? localUpdates.extraGuestPrice
                                  : pkg.extraGuestPrice || 1000;
                              return (
                                <div className="flex items-center gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => stepRate(pkg.id, "extraGuestPrice", currentExtra, -50)}
                                    className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold flex items-center justify-center shrink-0 active:scale-95 transition-transform"
                                  >
                                    -
                                  </button>
                                  <div className="relative flex-1">
                                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 font-mono text-xs">₹</span>
                                    <input
                                      type="number"
                                      value={currentExtra}
                                      onChange={(e) =>
                                        handleRateChange(pkg.id, "extraGuestPrice", Number(e.target.value))
                                      }
                                      className="w-full h-8 pl-6 pr-2 bg-[#F3F5F4] rounded-lg border border-transparent font-mono text-xs font-bold text-[#161D1A] focus:bg-white focus:border-[#1E6F50] focus:outline-none"
                                    />
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => stepRate(pkg.id, "extraGuestPrice", currentExtra, 50)}
                                    className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold flex items-center justify-center shrink-0 active:scale-95 transition-transform"
                                  >
                                    +
                                  </button>
                                </div>
                              );
                            })()}
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="space-y-1">
                            <label className="font-semibold text-gray-600 block">
                              Base Buyout Rate 20p (₹)
                            </label>
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => stepRate(pkg.id, "acPrice", currentAc, -500)}
                                className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold flex items-center justify-center shrink-0 active:scale-95 transition-transform"
                              >
                                -
                              </button>
                              <div className="relative flex-1">
                                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 font-mono text-xs">₹</span>
                                <input
                                  type="number"
                                  value={currentAc}
                                  onChange={(e) =>
                                    handleRateChange(pkg.id, "acPrice", Number(e.target.value))
                                  }
                                  className="w-full h-8 pl-6 pr-2 bg-[#F3F5F4] rounded-lg border border-transparent font-mono text-xs font-bold text-[#161D1A] focus:bg-white focus:border-[#1E6F50] focus:outline-none"
                                />
                              </div>
                              <button
                                type="button"
                                onClick={() => stepRate(pkg.id, "acPrice", currentAc, 500)}
                                className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold flex items-center justify-center shrink-0 active:scale-95 transition-transform"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <label className="font-semibold text-gray-600 block">
                              Additional Pax Rate (₹)
                            </label>
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => stepRate(pkg.id, "nonAcPrice", currentNonAc, -50)}
                                className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold flex items-center justify-center shrink-0 active:scale-95 transition-transform"
                              >
                                -
                              </button>
                              <div className="relative flex-1">
                                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 font-mono text-xs">₹</span>
                                <input
                                  type="number"
                                  value={currentNonAc}
                                  onChange={(e) =>
                                    handleRateChange(pkg.id, "nonAcPrice", Number(e.target.value))
                                  }
                                  className="w-full h-8 pl-6 pr-2 bg-[#F3F5F4] rounded-lg border border-transparent font-mono text-xs font-bold text-[#161D1A] focus:bg-white focus:border-[#1E6F50] focus:outline-none"
                                />
                              </div>
                              <button
                                type="button"
                                onClick={() => stepRate(pkg.id, "nonAcPrice", currentNonAc, 50)}
                                className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold flex items-center justify-center shrink-0 active:scale-95 transition-transform"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </>
                      )}

                      <div className="space-y-1">
                        <label className="font-semibold text-gray-600 block">Child Rate (₹)</label>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => stepRate(pkg.id, "childPrice", currentChild, -50)}
                            className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold flex items-center justify-center shrink-0 active:scale-95 transition-transform"
                          >
                            -
                          </button>
                          <div className="relative flex-1">
                            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 font-mono text-xs">₹</span>
                            <input
                              type="number"
                              value={currentChild}
                              onChange={(e) =>
                                handleRateChange(pkg.id, "childPrice", Number(e.target.value))
                              }
                              className="w-full h-8 pl-6 pr-2 bg-[#F3F5F4] rounded-lg border border-transparent font-mono text-xs font-bold text-[#161D1A] focus:bg-white focus:border-[#1E6F50] focus:outline-none"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => stepRate(pkg.id, "childPrice", currentChild, 50)}
                            className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold flex items-center justify-center shrink-0 active:scale-95 transition-transform"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="font-mono text-[10px] text-gray-400">Status: Active</span>
                    <button
                      type="button"
                      onClick={handlePublishRates}
                      className="px-3 py-1.5 bg-[#1E6F50] text-white rounded-lg font-mono text-xs font-semibold hover:bg-[#185e43] transition-colors"
                    >
                      Publish
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: REALTIME WEBSITE GALLERY MANAGER
           ========================================================================= */}
        <section className="space-y-4">
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E2E7E4] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-[#1E6F50]" />
                <h2 className="text-base font-bold text-[#161D1A]">
                  Realtime Website Gallery Manager
                </h2>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                Upload, reorder, toggle, and manage photo assets rendered on the public landing page.
              </p>
            </div>

            <div className="flex items-center gap-2.5 self-start sm:self-auto flex-wrap sm:flex-nowrap">
              <span className="font-mono text-xs text-gray-500">
                Active: <strong>{media.filter((m) => m.active).length}</strong> / {media.length}
              </span>
              <button
                type="button"
                onClick={() => setUploadModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#101814] hover:bg-black text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
              >
                <Upload className="w-4 h-4 text-[#89D6B1]" />
                <span>+ Upload Photo</span>
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {[
              "All Media",
              "Hero Banner",
              "Swimming Pool",
              "Rooms",
              "Orchard",
              "Food & Bhakri",
            ].map((cat) => {
              const isSelected = activeMediaFilter === cat;
              const count =
                cat === "All Media"
                  ? media.length
                  : media.filter((m) => m.category === cat).length;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveMediaFilter(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-[#1E6F50] text-white"
                      : "bg-white text-gray-600 border border-[#E2E7E4] hover:bg-gray-100"
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`font-mono text-[10px] px-1.5 py-0.2 rounded ${
                      isSelected ? "bg-black/20 text-white" : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Media Bento Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredMedia.map((item, index) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-[#E2E7E4] shadow-xs overflow-hidden flex flex-col justify-between group hover:border-[#1E6F50] transition-all"
              >
                {/* Image Frame */}
                <div className="relative w-full h-44 sm:h-48 bg-gray-100 overflow-hidden">
                  <img
                    src={item.url}
                    alt={item.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Slot pill */}
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2.5 py-0.5 rounded-md bg-black/70 backdrop-blur-xs text-white font-mono text-[10px] font-semibold">
                      {item.slot}
                    </span>
                  </div>
                  {/* Resolution & Size */}
                  <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center px-2.5 py-1 bg-black/60 backdrop-blur-xs rounded-lg text-[10px] font-mono text-white/90">
                    <span>{item.resolution || "1200x896"}</span>
                    <span>{item.size || "1.4 MB"}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-[#161D1A] line-clamp-1">
                        {item.title}
                      </h4>
                      <span className="text-[10px] font-mono text-gray-500 block mt-0.5">
                        Category: {item.category} · Order #{item.order}
                      </span>
                    </div>

                    {/* Active toggle */}
                    <button
                      type="button"
                      onClick={() => {
                        updateMedia(item.id, { active: !item.active });
                        showToast(`Visibility updated for "${item.title}"`);
                      }}
                      className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-colors ${
                        item.active
                          ? "bg-[#F4FBF6] text-[#1E6F50] border-[#1E6F50]/30"
                          : "bg-gray-50 text-gray-400 border-gray-200"
                      }`}
                      title={item.active ? "Visible on website" : "Hidden"}
                    >
                      {item.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Reorder and Delete controls */}
                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 font-mono text-gray-500">
                      <button
                        type="button"
                        onClick={() => reorderMedia(item.id, "up")}
                        disabled={index === 0}
                        title="Move Up"
                        className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center disabled:opacity-30 active:scale-95 transition-transform"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => reorderMedia(item.id, "down")}
                        disabled={index === filteredMedia.length - 1}
                        title="Move Down"
                        className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center disabled:opacity-30 active:scale-95 transition-transform"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-[10px] ml-1">Reorder</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Remove photo "${item.title}"?`)) {
                          deleteMedia(item.id);
                          showToast("Photo removed from gallery.");
                        }
                      }}
                      className="w-8 h-8 rounded-lg hover:bg-red-50 text-gray-400 hover:text-[#E06354] flex items-center justify-center active:scale-95 transition-colors"
                      title="Delete Photo"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            UPLOAD NEW PHOTO MODAL
           ========================================================================= */}
        {uploadModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
              onClick={() => setUploadModalOpen(false)}
            ></div>

            <div className="relative bg-white rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl z-10 space-y-5 animate-in zoom-in-95 duration-200 border border-[#E2E7E4]">
              <div className="flex items-center justify-between pb-3 border-b border-[#E2E7E4]">
                <div className="flex items-center gap-2">
                  <Upload className="w-4 h-4 text-[#1E6F50]" />
                  <h3 className="text-base font-bold text-[#161D1A]">
                    Upload New Property Media
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setUploadModalOpen(false)}
                  className="p-1.5 text-gray-400 hover:text-black rounded-lg"
                >
                  <EyeOff className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveMedia} className="space-y-4 text-xs">
                {/* File Upload Slot */}
                <div className="space-y-1">
                  <label className="font-semibold text-gray-700">Choose Image File *</label>
                  <label className="relative border-2 border-dashed border-[#1E6F50]/40 rounded-xl p-4 bg-[#F4FBF6]/30 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-[#F4FBF6] transition-colors h-36 overflow-hidden">
                    {newDataUrl ? (
                      <img
                        src={newDataUrl}
                        alt="Upload Preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <>
                        <Upload className="w-6 h-6 text-[#1E6F50] mb-2" />
                        <span className="font-medium text-gray-700">
                          Click to browse or drop photo here
                        </span>
                        <span className="text-[10px] text-gray-400 font-mono mt-0.5">
                          PNG, JPG, WebP up to 10MB
                        </span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      required
                      onChange={handleFileUpload}
                      className="sr-only"
                    />
                  </label>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-gray-700">Photo Title / Caption *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sunset Over Citrus Groves"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-[#E2E7E4] focus:border-[#1E6F50] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-semibold text-gray-700">Website Category *</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as MediaItem["category"])}
                      className="w-full h-10 px-3 rounded-xl border border-[#E2E7E4] bg-white font-medium focus:border-[#1E6F50]"
                    >
                      <option value="Hero Banner">Hero Banner</option>
                      <option value="Swimming Pool">Swimming Pool</option>
                      <option value="Rooms">AC & Non-AC Rooms</option>
                      <option value="Orchard">Orchard Groves</option>
                      <option value="Food & Bhakri">Food & Bhakri</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-gray-700">Placement Slot Label</label>
                    <input
                      type="text"
                      value={newSlot}
                      onChange={(e) => setNewSlot(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-[#E2E7E4] font-mono text-[11px] focus:border-[#1E6F50]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-gray-700">SEO Alt Text</label>
                  <input
                    type="text"
                    placeholder="Describe image for search accessibility"
                    value={newAlt}
                    onChange={(e) => setNewAlt(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-[#E2E7E4] focus:border-[#1E6F50] focus:outline-none"
                  />
                </div>

                <div className="pt-3 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setUploadModalOpen(false)}
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-gray-300 hover:bg-gray-100 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-[#1E6F50] hover:bg-[#185e43] text-white font-semibold uppercase tracking-wider text-xs shadow-xs"
                  >
                    Publish to Website
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
