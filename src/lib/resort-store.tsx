"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";

export interface PackageItem {
  id: string;
  name: string;
  tagline: string;
  time: string;
  nonAcPrice: number;
  acPrice: number;
  childPrice: number;
  couplePrice?: number;
  extraGuestPrice?: number;
  tierRates?: { minPax: number; label: string; rate: number }[];
  minPax: number;
  inclusions: string[];
  active: boolean;
  weekendSurchargePercent: number;
}

export interface RoomCategory {
  id: "deluxe-cottage" | "pool-suite" | "heritage-loft";
  name: string;
  tagline: string;
  type: "AC" | "Non-AC";
  basePrice: number;
  capacityText: string;
  roomCount: number;
  amenities: string[];
  imageUrl: string;
  accentColor: string;
}

export interface RoomItem {
  id: string;
  name: string;
  category: "Deluxe Citrus Cottage (AC)" | "Plunge Pool Orchard Suite (AC)" | "Heritage Farmstead Loft (Non-AC)";
  categoryId: "deluxe-cottage" | "pool-suite" | "heritage-loft";
  type: "AC" | "Non-AC";
  subTitle: string;
  capacity: number;
  price: number;
  currentStatus: "Available" | "Occupied" | "Cleaning" | "Blocked";
  amenities?: string[];
  imageUrl?: string;
}

export interface RoomCategoryAvailability {
  category: RoomCategory;
  totalRooms: number;
  availableRooms: number;
  bookedRooms: number;
  heldRooms: number;
  status: "Available" | "Few Left" | "Sold Out";
  rooms: {
    room: RoomItem;
    status: "Available" | "Booked" | "Held";
    bookingGuest?: string;
  }[];
}

export interface DayAvailability {
  date: string;
  totalRooms: number;
  totalAvailable: number;
  totalBooked: number;
  totalHeld: number;
  isFullyBooked: boolean;
  categories: RoomCategoryAvailability[];
}

export interface BookingItem {
  id: string;
  guestName: string;
  phone: string;
  city: string;
  adults: number;
  children: number;
  mealPreference: "Veg" | "Non-Veg" | "Mixed";
  vegCount: number;
  nonVegCount: number;
  packageId: string;
  packageName: string;
  rooms: string[];
  checkIn: string;
  checkOut: string;
  status: "Confirmed" | "Pending Advance" | "Checked-In" | "Completed" | "Cancelled";
  totalAmount: number;
  advancePaid: number;
  balanceDue: number;
  paymentMode: "UPI" | "Cash" | "Card" | "Bank Transfer" | "Pending";
  idType?: "Aadhaar" | "PAN" | "Driving License" | "Passport" | "Voter ID";
  idLast4?: string;
  idFrontUrl?: string;
  idBackUrl?: string;
  idVerified: boolean;
  createdAt: string;
  notes?: string;
}

export interface MediaItem {
  id: string;
  title: string;
  category: "Hero Banner" | "Swimming Pool" | "Rooms" | "Orchard" | "Food & Bhakri";
  url: string;
  alt: string;
  slot: string;
  active: boolean;
  order: number;
  resolution?: string;
  size?: string;
}

interface ResortStoreData {
  packages: PackageItem[];
  rooms: RoomItem[];
  roomCategories?: RoomCategory[];
  bookings: BookingItem[];
  media: MediaItem[];
  lastUpdated: string;
}

interface ResortStoreContextType {
  packages: PackageItem[];
  rooms: RoomItem[];
  roomCategories: RoomCategory[];
  bookings: BookingItem[];
  media: MediaItem[];
  isLoaded: boolean;
  getAvailabilityForDate: (dateStr: string) => DayAvailability;
  getAvailabilityForDateRange: (startDate: string, endDate: string) => DayAvailability;
  updatePackageRate: (id: string, updates: Partial<PackageItem>) => void;
  updateRoomCategory: (id: string, updates: Partial<RoomCategory>) => void;
  updateRatesBatch: (
    packageUpdates: { [id: string]: Partial<PackageItem> },
    roomCategoryUpdates: { [id: string]: Partial<RoomCategory> }
  ) => void;
  updateRoom: (id: string, updates: Partial<RoomItem>) => void;
  addBooking: (booking: Omit<BookingItem, "id" | "createdAt">) => BookingItem;
  updateBookingStatus: (id: string, status: BookingItem["status"]) => void;
  updateBooking: (id: string, updates: Partial<BookingItem>) => void;
  deleteBooking: (id: string) => void;
  addMedia: (media: Omit<MediaItem, "id" | "order">) => MediaItem;
  updateMedia: (id: string, updates: Partial<MediaItem>) => void;
  deleteMedia: (id: string) => void;
  reorderMedia: (id: string, direction: "up" | "down") => void;
  resetToDefaults: () => void;
}

const DEFAULT_PACKAGES: PackageItem[] = [
  {
    id: "picnic",
    name: "One-Day Picnic (9 AM to 5 PM)",
    tagline: "Day Retreat in Saphale Groves",
    time: "9:00 AM to 5:00 PM",
    nonAcPrice: 900,
    acPrice: 1000,
    childPrice: 600,
    minPax: 1,
    inclusions: [
      "Shared changing room facility",
      "Welcome tea/coffee & breakfast (Poha, Misal Pav)",
      "Mid-day refreshing kokum & pomelo juice",
      "Grand Agri & Coastal buffet lunch (Veg & Non-Veg)",
      "Full swimming pool & rain dance access",
      "Evening lemongrass chai & hot snacks",
      "Guided orchard harvest trail",
    ],
    active: true,
    weekendSurchargePercent: 0,
  },
  {
    id: "group-overnight",
    name: "Overnight Group Stay (23 Hrs)",
    tagline: "Immersive 24h Orchard Sanctuary",
    time: "12:00 PM to 11:00 AM (Next Day)",
    nonAcPrice: 1800,
    acPrice: 2100,
    childPrice: 1200,
    minPax: 4,
    tierRates: [
      { minPax: 4, label: "4-5 Pax", rate: 2300 },
      { minPax: 6, label: "6-7 Pax", rate: 2100 },
      { minPax: 8, label: "8+ Pax", rate: 2000 },
    ],
    inclusions: [
      "AC room sharing accommodation",
      "Welcome citrus refreshments upon arrival",
      "1 Farm Breakfast + 3 Tea/Coffee services",
      "1 Buffet Lunch + 1 Evening Chulha BBQ & Dinner",
      "Evening bonfire gathering with mountain acoustic music",
      "Unlimited swimming pool access",
      "Morning guided orchard birdwatching walk",
    ],
    active: true,
    weekendSurchargePercent: 15,
  },
  {
    id: "couple-retreat",
    name: "Overnight Couple Retreat (23 Hrs)",
    tagline: "Intimate Plunge Villa Sanctuary",
    time: "12:00 PM to 11:00 AM",
    nonAcPrice: 4200,
    acPrice: 5000,
    couplePrice: 5000,
    extraGuestPrice: 1000,
    childPrice: 800,
    minPax: 2,
    inclusions: [
      "Private AC Room with attached terrace/plunge view",
      "Complimentary floral welcome & chilled pomelo wine",
      "All 4 seasonal meals (Breakfast, Lunch, High Tea, Dinner)",
      "Romantic candlelit al-fresco dinner table setup",
      "Unlimited pool & orchard lawn access",
      "Late checkout subject to availability",
    ],
    active: true,
    weekendSurchargePercent: 20,
  },
  {
    id: "private-buyout",
    name: "Private Property Buyout (20+ Guests)",
    tagline: "Exclusive 12-Acre Campus Buyout",
    time: "24 Hours (Custom Flexible Check-In)",
    nonAcPrice: 1600,
    acPrice: 1800,
    childPrice: 900,
    minPax: 20,
    tierRates: [
      { minPax: 20, label: "Base Package (up to 20 Guests)", rate: 45000 },
      { minPax: 21, label: "Additional Pax Rate", rate: 1800 },
    ],
    inclusions: [
      "Entire 12-acre resort campus exclusive buyout",
      "All 6 AC and Heritage guest rooms & suites reserved",
      "Dedicated culinary chef team & custom Agri banquet menu",
      "Full private access to pool, orchard lawns, & gazebo pavillion",
      "Campfire, high-output outdoor sound setup, & evening lights",
      "Perfect for milestone birthdays, family reunions & corporate offsites",
    ],
    active: true,
    weekendSurchargePercent: 10,
  },
];

export const ROOM_CATEGORIES: RoomCategory[] = [
  {
    id: "deluxe-cottage",
    name: "Deluxe Citrus Cottage (AC)",
    tagline: "Spacious garden cottage surrounded by fragrant pomelo and chikoo trees",
    type: "AC",
    basePrice: 3500,
    capacityText: "Max 4 Guests (2 Adults + 2 Kids)",
    roomCount: 2,
    amenities: ["Air Conditioning", "Private Swimming Pool Access", "Private Garden", "Free WiFi", "Private Parking", "Pets Allowed", "Children's Play Area"],
    imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    accentColor: "#7BA23F",
  },
  {
    id: "pool-suite",
    name: "Plunge Pool Orchard Suite (AC)",
    tagline: "Private plunge pool terrace with uninterrupted Western Ghats mountain views",
    type: "AC",
    basePrice: 4500,
    capacityText: "Max 4 Guests (2 Adults + 2 Kids)",
    roomCount: 2,
    amenities: ["Private Swimming Pool", "Air Conditioning", "Private Garden", "Free WiFi", "Private Parking & EV", "Pets Allowed", "Children's Play Area"],
    imageUrl: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80",
    accentColor: "#E06354",
  },
  {
    id: "heritage-loft",
    name: "Heritage Farmstead Loft (Non-AC)",
    tagline: "High timber sloping ceiling & soothing natural mountain cross-breeze",
    type: "Non-AC",
    basePrice: 2400,
    capacityText: "Max 4 Guests (Family Loft Setup)",
    roomCount: 1,
    amenities: ["Private Swimming Pool Access", "Private Garden", "Free WiFi", "Private Parking", "Pets Allowed", "Children's Play Area", "Natural Cross-Breeze"],
    imageUrl: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
    accentColor: "#8B8258",
  },
];

const DEFAULT_ROOMS: RoomItem[] = [
  {
    id: "AC-101",
    name: "AC Room 101",
    category: "Deluxe Citrus Cottage (AC)",
    categoryId: "deluxe-cottage",
    type: "AC",
    subTitle: "Pith & Petal · King Bed · Private Garden Porch",
    capacity: 4,
    price: 3500,
    currentStatus: "Available",
    amenities: ["Split AC", "King Teakwood Bed", "Garden Porch"],
  },
  {
    id: "AC-102",
    name: "AC Room 102",
    category: "Deluxe Citrus Cottage (AC)",
    categoryId: "deluxe-cottage",
    type: "AC",
    subTitle: "Citrus Rind · Twin Queen Canopy · Mountain Breeze",
    capacity: 4,
    price: 3500,
    currentStatus: "Available",
    amenities: ["Split AC", "Twin Queens", "Mountain Breeze"],
  },
  {
    id: "AC-103",
    name: "AC Room 103",
    category: "Plunge Pool Orchard Suite (AC)",
    categoryId: "pool-suite",
    type: "AC",
    subTitle: "Ghats Horizon · Master Suite · Direct Pool Terrace",
    capacity: 4,
    price: 4500,
    currentStatus: "Occupied",
    amenities: ["Pool Terrace", "King Bed", "Rain Shower"],
  },
  {
    id: "AC-104",
    name: "AC Room 104",
    category: "Plunge Pool Orchard Suite (AC)",
    categoryId: "pool-suite",
    type: "AC",
    subTitle: "Blossom Villa · Honeymoon Plunge · Sunset Deck",
    capacity: 3,
    price: 4500,
    currentStatus: "Occupied",
    amenities: ["Plunge Access", "Sunset Hammock", "Terrace Lounge"],
  },
  {
    id: "NONAC-201",
    name: "Non-AC Room 201",
    category: "Heritage Farmstead Loft (Non-AC)",
    categoryId: "heritage-loft",
    type: "Non-AC",
    subTitle: "Attic Canopy · High Timber Roof · Natural Cross-Breeze",
    capacity: 4,
    price: 2400,
    currentStatus: "Available",
    amenities: ["Timber Ceilings", "Terracotta Tiles", "Cross Breeze"],
  },
];

export function getTodayISO(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function addDaysToISO(iso: string, days: number): string {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d + days));
  const ny = date.getUTCFullYear();
  const nm = String(date.getUTCMonth() + 1).padStart(2, "0");
  const nd = String(date.getUTCDate()).padStart(2, "0");
  return `${ny}-${nm}-${nd}`;
}

export function generateInitialBookings(baseToday: string = getTodayISO()): BookingItem[] {
  return [
    {
      id: "#PG-2601",
      guestName: "Farhan Merchant",
      phone: "+91 98190 32415",
      city: "South Mumbai",
      adults: 4,
      children: 0,
      mealPreference: "Mixed",
      vegCount: 2,
      nonVegCount: 2,
      packageId: "group-overnight",
      packageName: "Overnight Group Stay",
      rooms: ["AC-103"],
      checkIn: addDaysToISO(baseToday, -1),
      checkOut: addDaysToISO(baseToday, 1),
      status: "Checked-In",
      totalAmount: 16200,
      advancePaid: 16200,
      balanceDue: 0,
      paymentMode: "Bank Transfer",
      idType: "Passport",
      idLast4: "9921",
      idVerified: true,
      createdAt: new Date().toISOString(),
      notes: "Checked-in yesterday. Requested late dinner in orchard. 2 Veg, 2 Non-Veg thalis.",
    },
    {
      id: "#PG-2602",
      guestName: "Kapadia Group",
      phone: "+91 98211 77341",
      city: "Borivali, Mumbai",
      adults: 8,
      children: 0,
      mealPreference: "Mixed",
      vegCount: 4,
      nonVegCount: 4,
      packageId: "group-overnight",
      packageName: "Overnight Group Stay",
      rooms: ["AC-101", "AC-104"],
      checkIn: addDaysToISO(baseToday, 1),
      checkOut: addDaysToISO(baseToday, 3),
      status: "Confirmed",
      totalAmount: 16000,
      advancePaid: 16000,
      balanceDue: 0,
      paymentMode: "UPI",
      idType: "PAN",
      idLast4: "1044",
      idVerified: true,
      createdAt: new Date().toISOString(),
      notes: "College alumni reunion. Inquiring about bonfire and acoustic music permission.",
    },
    {
      id: "#PG-2603",
      guestName: "Ananya & Rohan M.",
      phone: "+91 97692 11094",
      city: "Kothrud, Pune",
      adults: 2,
      children: 0,
      mealPreference: "Veg",
      vegCount: 2,
      nonVegCount: 0,
      packageId: "couple-retreat",
      packageName: "Overnight Couple Retreat (23 Hrs)",
      rooms: ["AC-102"],
      checkIn: addDaysToISO(baseToday, 3),
      checkOut: addDaysToISO(baseToday, 5),
      status: "Confirmed",
      totalAmount: 7800,
      advancePaid: 7800,
      balanceDue: 0,
      paymentMode: "UPI",
      idType: "Driving License",
      idLast4: "8103",
      idVerified: true,
      createdAt: new Date().toISOString(),
      notes: "Anniversary celebration. Complimentary floral pool requested.",
    },
    {
      id: "#PG-2604",
      guestName: "Mehta Family Reunion",
      phone: "+91 98220 89120",
      city: "Ghodbunder, Thane",
      adults: 10,
      children: 2,
      mealPreference: "Veg",
      vegCount: 12,
      nonVegCount: 0,
      packageId: "picnic",
      packageName: "One-Day Picnic (9 AM to 5 PM)",
      rooms: ["NONAC-201"],
      checkIn: addDaysToISO(baseToday, 5),
      checkOut: addDaysToISO(baseToday, 5),
      status: "Pending Advance",
      totalAmount: 14400,
      advancePaid: 5000,
      balanceDue: 9400,
      paymentMode: "Pending",
      idType: "Aadhaar",
      idLast4: "3109",
      idVerified: false,
      createdAt: new Date().toISOString(),
      notes: "Strict Jain food requirement (no onion, garlic, or root vegetables).",
    },
    {
      id: "#PG-2605",
      guestName: "Dr. Vikram Deshmukh",
      phone: "+91 98201 44582",
      city: "Bandra West, Mumbai",
      adults: 4,
      children: 2,
      mealPreference: "Non-Veg",
      vegCount: 2,
      nonVegCount: 4,
      packageId: "group-overnight",
      packageName: "Overnight Group Stay",
      rooms: ["AC-101"],
      checkIn: addDaysToISO(baseToday, 8),
      checkOut: addDaysToISO(baseToday, 10),
      status: "Confirmed",
      totalAmount: 12600,
      advancePaid: 6000,
      balanceDue: 6600,
      paymentMode: "UPI",
      idType: "Aadhaar",
      idLast4: "4892",
      idVerified: true,
      createdAt: new Date().toISOString(),
      notes: "Elderly guests traveling. Require ground floor cottage.",
    },
    {
      id: "#PG-2606",
      guestName: "Jog Family",
      phone: "+91 98600 55123",
      city: "Dadar, Mumbai",
      adults: 4,
      children: 0,
      mealPreference: "Veg",
      vegCount: 4,
      nonVegCount: 0,
      packageId: "picnic",
      packageName: "One-Day Picnic (9 AM to 5 PM)",
      rooms: ["NONAC-201"],
      checkIn: addDaysToISO(baseToday, -3),
      checkOut: addDaysToISO(baseToday, -3),
      status: "Completed",
      totalAmount: 3600,
      advancePaid: 3600,
      balanceDue: 0,
      paymentMode: "UPI",
      idType: "Aadhaar",
      idLast4: "6712",
      idVerified: true,
      createdAt: new Date().toISOString(),
      notes: "Regular guests. Loved the fresh bhakri and pitla.",
    },
  ];
}

const DEFAULT_BOOKINGS: BookingItem[] = generateInitialBookings();

const DEFAULT_MEDIA: MediaItem[] = [
  {
    id: "med-1",
    title: "Kōhā Pool Villa & Ghats Mountain Horizon",
    category: "Hero Banner",
    url: "https://lh3.googleusercontent.com/aida/ALJJyrCfFlOovo7A6SzUC2ocw0QnDqOFM32X614OidAqjDKvJcyn1K_d8Hz3R2-a6r_Ek8pM3a3Efv2x4GfAst-j3aSLLcRw12h78Zum0xJJWMJboL66Wh6LbSiVjW3kaNwp7r_SbYQ_XO_trokWcM1_mYF-fRdiAEnwkWV3KUU62aAjD-1EnZyHKimFRQUDE6mvLHl8W-ErDYwOYAmRW66iaFmgi_tdz2fbn3MSEWtHgOEn",
    alt: "Stone terrace of luxury pool villa nestled in lush green pomelo orchards with Western Ghats misty hills in background",
    slot: "Hero Banner · Slot #1",
    active: true,
    order: 1,
    resolution: "1200x896",
    size: "1.4 MB",
  },
  {
    id: "med-2",
    title: "Crystal-Clear Mountain Spring Swimming Pool",
    category: "Swimming Pool",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCi7vPw3FOLyDW6B-ZolyBkozWBkQORJidKhQUInUCmLJbZBMNYYTlcb-fvd56JmIMz36GDKdTJeXXFMDkERLMFGw7WtXfDkkiG6eFYDUNi7wOURNLCbk2JD6Hzu6tK52p71CZOE9f0rolm6lkdkkqvaSZtbclpQB5w4SXxSNPjHfsyBBYKSu3_9bGEofouHsFB52_d8x_CV69zmZieu2YKPPovgoY_z94If2FofMM",
    alt: "Sparkling natural water pool surrounded by limestone sundecks, sunloungers, and coconut palms",
    slot: "Swimming Pool · Slot #1",
    active: true,
    order: 2,
    resolution: "1200x896",
    size: "1.6 MB",
  },
  {
    id: "med-3",
    title: "Open-Air Farm-to-Table Dining Pavilion",
    category: "Food & Bhakri",
    url: "https://lh3.googleusercontent.com/aida/ALJJyrC9r8kQQ7SYzIGhHkRbVX-Z-loZinHR33fcjezwDIspyzsdf53uFzru_Eb3ItkS3xCaCi-TgRz3UXoCSkx36gnuuk5XG6dPK-KYDQObX77vH3lC2dsINGJHI_RhaEQDhge4cqv8s3vd0theacHElpS0430YooJHbGXWhYHJeP50P7UFX-HtqHWS3bXx8i10zmrpEe603izl3Q9s8mCiGWVJ8ZfrK_9uijfjcoFOmGIK",
    alt: "Guests seated around a long timber table enjoying rustic organic coastal cuisine, chulha flatbreads and fresh pomelo drinks",
    slot: "Food & Dining · Slot #1",
    active: true,
    order: 3,
    resolution: "1200x896",
    size: "1.8 MB",
  },
  {
    id: "med-4",
    title: "AC King Orchard Suite Bedroom",
    category: "Rooms",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBOjh8-j6UsoNkdi753No8weUULmBnSpNfwUTFG2JyJGn4eA50C-aZtWUVoLX5qvnv_KVSHRMpNxJboP1PLSvfYDgzhMoD9DhrM9GUXLS59boEXYht-L1YXKgCasSa0CFkDrzYCyWp_L9_oifMig9RmA8AM1KsQ7rkAZ2SQr5JtT0hUcDN3vLicRY4MoDlaN1az4MZz3m7QZpK93ILCNSenZ21-n5kRZLgp-TxW-xw",
    alt: "Minimalist teak wood bedroom suite with panoramic glass sliding doors opening to pomelo grove garden",
    slot: "Rooms · Slot #1",
    active: true,
    order: 4,
    resolution: "1200x896",
    size: "1.2 MB",
  },
  {
    id: "med-5",
    title: "12-Acre Pomelo & Mango Groves",
    category: "Orchard",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuC0BFb_TtjuugqlLCRyoCMFwMzIrnaIBqpH5gUUr-tFVieMrkb7rYHAEjs8hSeigzrabwNEWtAg9pQ4fRDk_lqseeU6KYUMazmawvtYhsuahjQSbIK8pUl3m4Wwep2WuVR9x1UIZOK45haQLy2OvQULp1VqrjBzAAQ3Ex1YI0f7XeRV4VRc_tJhFGuHUrSC3XEz2R8BbXz_bVxHJzAWU7KEE0IvR8tu6fj0iESVnws",
    alt: "Lush botanical orchard walk with sunbeams cutting through fragrant citrus trees and wildflowers",
    slot: "Orchard · Slot #1",
    active: true,
    order: 5,
    resolution: "1200x896",
    size: "1.5 MB",
  },
  {
    id: "med-6",
    title: "Chulha Hearth Agri Kitchen with Fresh Bhakri",
    category: "Food & Bhakri",
    url: "https://lh3.googleusercontent.com/aida/ALJJyrDarXMc6cDDixix8bnWTwSk4FpzngWnyJ_vACcd3gohnyhqp47ZCBKR-FxUIf0LVpwC14edWyVngGc6ADlfCsGGQBagH6bOnnbQd5F11ldaRRomKV3aMCSeu__F2-YR8VoBZTsqndEJRAnGxbo-VS0KmVUqdZWJYXu40z8iBNRdeEXxsyzy8dQauF-iTJ9NeFaT6uCMD1oP6Zv_V-oRuHK9Wr1ytYUhqpO0FrksHgIidfC8AuaMR3UzvmI",
    alt: "Traditional clay wood-fired stove cooking fresh rice bhakri and authentic Konkan chicken thali",
    slot: "Food & Dining · Slot #2",
    active: true,
    order: 6,
    resolution: "1080x1080",
    size: "850 KB",
  },
];

const STORAGE_KEY = "pomelo_resort_store_v3";
const BROADCAST_CHANNEL_NAME = "pomelo-realtime";

export function checkRoomOccupied(
  roomId: string,
  start: string,
  end: string,
  bookings: BookingItem[],
  excludeBookingId?: string
): { isOccupied: boolean; conflictBooking?: BookingItem } {
  if (!start || !end) return { isOccupied: false };
  const active = bookings.filter(
    (b) => b.id !== excludeBookingId && b.status !== "Cancelled"
  );
  const conflict = active.find((b) => {
    if (!b.rooms.includes(roomId)) return false;
    const bStart = b.checkIn;
    const bEnd = b.checkIn === b.checkOut ? b.checkIn : b.checkOut;
    const reqStart = start;
    const reqEnd = start === end ? start : end;

    if (reqStart === reqEnd || bStart === bEnd) {
      return reqStart <= bEnd && reqEnd >= bStart;
    }
    return reqStart < bEnd && reqEnd > bStart;
  });
  return { isOccupied: Boolean(conflict), conflictBooking: conflict };
}

const ResortStoreContext = createContext<ResortStoreContextType | null>(null);

export function calculateAvailabilityForDate(
  dateStr: string,
  rooms: RoomItem[],
  bookings: BookingItem[],
  roomCategories: RoomCategory[] = ROOM_CATEGORIES
): DayAvailability {
  const activeBookings = bookings.filter((b) => b.status !== "Cancelled");

  const roomStatusMap: Record<
    string,
    { status: "Available" | "Booked" | "Held"; guest?: string }
  > = {};

  rooms.forEach((r) => {
    roomStatusMap[r.id] = { status: "Available" };
  });

  activeBookings.forEach((b) => {
    let dateMatches = false;
    if (b.checkIn === b.checkOut) {
      dateMatches = dateStr === b.checkIn;
    } else {
      dateMatches = b.checkIn <= dateStr && dateStr < b.checkOut;
    }

    if (dateMatches) {
      b.rooms.forEach((roomId) => {
        if (roomStatusMap[roomId]) {
          const isHold = b.status === "Pending Advance";
          roomStatusMap[roomId] = {
            status: isHold ? "Held" : "Booked",
            guest: b.guestName,
          };
        }
      });
    }
  });

  let totalAvailable = 0;
  let totalBooked = 0;
  let totalHeld = 0;

  const categoriesAvailability: RoomCategoryAvailability[] = roomCategories.map((cat) => {
    const catRooms = rooms.filter((r) => r.categoryId === cat.id);
    let catAvailable = 0;
    let catBooked = 0;
    let catHeld = 0;

    const roomDetails = catRooms.map((r) => {
      const state = roomStatusMap[r.id] || { status: "Available" as const };
      if (state.status === "Available") {
        catAvailable++;
        totalAvailable++;
      } else if (state.status === "Held") {
        catHeld++;
        totalHeld++;
      } else {
        catBooked++;
        totalBooked++;
      }
      return {
        room: r,
        status: state.status,
        bookingGuest: state.guest,
      };
    });

    let catStatus: "Available" | "Few Left" | "Sold Out" = "Available";
    if (catAvailable === 0) {
      catStatus = "Sold Out";
    } else if (catAvailable <= 1) {
      catStatus = "Few Left";
    }

    return {
      category: cat,
      totalRooms: catRooms.length,
      availableRooms: catAvailable,
      bookedRooms: catBooked,
      heldRooms: catHeld,
      status: catStatus,
      rooms: roomDetails,
    };
  });

  return {
    date: dateStr,
    totalRooms: rooms.length,
    totalAvailable,
    totalBooked,
    totalHeld,
    isFullyBooked: totalAvailable === 0,
    categories: categoriesAvailability,
  };
}

export function calculateAvailabilityForDateRange(
  startDate: string,
  endDate: string,
  rooms: RoomItem[],
  bookings: BookingItem[],
  roomCategories: RoomCategory[] = ROOM_CATEGORIES
): DayAvailability {
  if (!endDate || startDate === endDate) {
    return calculateAvailabilityForDate(startDate, rooms, bookings, roomCategories);
  }

  const activeBookings = bookings.filter((b) => b.status !== "Cancelled");

  const roomStatusMap: Record<
    string,
    { status: "Available" | "Booked" | "Held"; guest?: string }
  > = {};

  rooms.forEach((r) => {
    roomStatusMap[r.id] = { status: "Available" };
  });

  activeBookings.forEach((b) => {
    const bStart = b.checkIn;
    const bEnd = b.checkIn === b.checkOut ? b.checkIn : b.checkOut;

    const overlaps =
      b.checkIn === b.checkOut
        ? bStart >= startDate && bStart < endDate
        : Math.max(new Date(bStart).getTime(), new Date(startDate).getTime()) <
          Math.min(new Date(bEnd).getTime(), new Date(endDate).getTime());

    if (overlaps) {
      b.rooms.forEach((roomId) => {
        if (roomStatusMap[roomId]) {
          const isHold = b.status === "Pending Advance";
          if (roomStatusMap[roomId].status !== "Booked") {
            roomStatusMap[roomId] = {
              status: isHold ? "Held" : "Booked",
              guest: b.guestName,
            };
          }
        }
      });
    }
  });

  let totalAvailable = 0;
  let totalBooked = 0;
  let totalHeld = 0;

  const categoriesAvailability: RoomCategoryAvailability[] = roomCategories.map((cat) => {
    const catRooms = rooms.filter((r) => r.categoryId === cat.id);
    let catAvailable = 0;
    let catBooked = 0;
    let catHeld = 0;

    const roomDetails = catRooms.map((r) => {
      const state = roomStatusMap[r.id] || { status: "Available" as const };
      if (state.status === "Available") {
        catAvailable++;
        totalAvailable++;
      } else if (state.status === "Held") {
        catHeld++;
        totalHeld++;
      } else {
        catBooked++;
        totalBooked++;
      }
      return {
        room: r,
        status: state.status,
        bookingGuest: state.guest,
      };
    });

    let catStatus: "Available" | "Few Left" | "Sold Out" = "Available";
    if (catAvailable === 0) {
      catStatus = "Sold Out";
    } else if (catAvailable <= 1) {
      catStatus = "Few Left";
    }

    return {
      category: cat,
      totalRooms: catRooms.length,
      availableRooms: catAvailable,
      bookedRooms: catBooked,
      heldRooms: catHeld,
      status: catStatus,
      rooms: roomDetails,
    };
  });

  return {
    date: `${startDate} to ${endDate}`,
    totalRooms: rooms.length,
    totalAvailable,
    totalBooked,
    totalHeld,
    isFullyBooked: totalAvailable === 0,
    categories: categoriesAvailability,
  };
}

export function ResortStoreProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<ResortStoreData>(() => ({
    packages: DEFAULT_PACKAGES,
    rooms: DEFAULT_ROOMS,
    roomCategories: ROOM_CATEGORIES,
    bookings: generateInitialBookings(),
    media: DEFAULT_MEDIA,
    lastUpdated: new Date().toISOString(),
  }));
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize from LocalStorage and connect BroadcastChannel
  useEffect(() => {
    try {
      // Clean up legacy stale storage keys from previous builds
      try {
        localStorage.removeItem("pomelo_resort_store_v1");
        localStorage.removeItem("pomelo_resort_store_v2");
      } catch {
        // ignore
      }

      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.packages && parsed.bookings) {
          // Ensure all bookings have clean, deduplicated room arrays
          parsed.bookings = parsed.bookings.map((b: BookingItem) => ({
            ...b,
            rooms: Array.from(
              new Set(
                (b.rooms || []).map((r: string) => (r === "NONAC-202" ? "NONAC-201" : r))
              )
            ),
          }));

          // If all stored bookings are in the past, re-anchor relative to today
          const todayISO = getTodayISO();
          const hasActiveOrUpcoming = parsed.bookings.some(
            (b: BookingItem) => b.checkOut >= todayISO
          );
          if (!hasActiveOrUpcoming) {
            parsed.bookings = generateInitialBookings(todayISO);
          }

          // If stored room categories are missing, initialize them cleanly
          if (!parsed.roomCategories || parsed.roomCategories.length !== ROOM_CATEGORIES.length) {
            parsed.roomCategories = ROOM_CATEGORIES;
          }

          // If stored rooms are outdated (e.g. 6 rooms or missing categoryId), upgrade cleanly to 5 rooms
          if (!parsed.rooms || parsed.rooms.length !== 5 || !parsed.rooms[0]?.categoryId) {
            parsed.rooms = DEFAULT_ROOMS;
          }

          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
          } catch {
            // ignore
          }
          setData(parsed);
          setIsLoaded(true);
        } else {
          setIsLoaded(true);
        }
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        setIsLoaded(true);
      }
    } catch (e) {
      console.warn("Storage access restricted or unavailable:", e);
      setIsLoaded(true);
    }

    let channel: BroadcastChannel | null = null;
    if (typeof window !== "undefined" && "BroadcastChannel" in window) {
      channel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
      channel.onmessage = (event) => {
        if (event.data?.type === "STORE_UPDATE" && event.data?.payload) {
          setData(event.data.payload);
        }
      };
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const updated = JSON.parse(e.newValue);
          setData(updated);
        } catch {
          // ignore
        }
      }
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      if (channel) channel.close();
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const saveAndBroadcast = (newData: ResortStoreData) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
      if (typeof window !== "undefined" && "BroadcastChannel" in window) {
        const channel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
        channel.postMessage({ type: "STORE_UPDATE", payload: newData });
        channel.close();
      }
    } catch (err) {
      console.error("Failed to broadcast and save state:", err);
    }
  };

  const updateRatesBatch = (
    packageUpdates: { [id: string]: Partial<PackageItem> },
    roomCategoryUpdates: { [id: string]: Partial<RoomCategory> }
  ) => {
    setData((prev) => {
      let newPackages = prev.packages;
      let newCategories = prev.roomCategories || ROOM_CATEGORIES;
      let newRooms = prev.rooms;

      if (Object.keys(packageUpdates).length > 0) {
        newPackages = prev.packages.map((pkg) =>
          packageUpdates[pkg.id] ? { ...pkg, ...packageUpdates[pkg.id] } : pkg
        );
      }

      if (Object.keys(roomCategoryUpdates).length > 0) {
        newCategories = newCategories.map((cat) =>
          roomCategoryUpdates[cat.id] ? { ...cat, ...roomCategoryUpdates[cat.id] } : cat
        );
        newRooms = prev.rooms.map((r) => {
          const catUpdate = roomCategoryUpdates[r.categoryId];
          if (catUpdate && catUpdate.basePrice !== undefined) {
            return { ...r, price: catUpdate.basePrice };
          }
          return r;
        });
      }

      const nextData: ResortStoreData = {
        ...prev,
        packages: newPackages,
        roomCategories: newCategories,
        rooms: newRooms,
        lastUpdated: new Date().toISOString(),
      };
      saveAndBroadcast(nextData);
      return nextData;
    });
  };

  const updatePackageRate = (id: string, updates: Partial<PackageItem>) => {
    setData((prev) => {
      const updated = prev.packages.map((pkg) => (pkg.id === id ? { ...pkg, ...updates } : pkg));
      const nextData: ResortStoreData = {
        ...prev,
        packages: updated,
        lastUpdated: new Date().toISOString(),
      };
      saveAndBroadcast(nextData);
      return nextData;
    });
  };

  const updateRoomCategory = (id: string, updates: Partial<RoomCategory>) => {
    setData((prev) => {
      const currentCategories = prev.roomCategories || ROOM_CATEGORIES;
      const updatedCategories = currentCategories.map((cat) =>
        cat.id === id ? { ...cat, ...updates } : cat
      );
      const updatedRooms = updates.basePrice !== undefined
        ? prev.rooms.map((r) => (r.categoryId === id ? { ...r, price: updates.basePrice! } : r))
        : prev.rooms;

      const nextData: ResortStoreData = {
        ...prev,
        roomCategories: updatedCategories,
        rooms: updatedRooms,
        lastUpdated: new Date().toISOString(),
      };
      saveAndBroadcast(nextData);
      return nextData;
    });
  };

  const updateRoom = (id: string, updates: Partial<RoomItem>) => {
    setData((prev) => {
      const updatedRooms = prev.rooms.map((r) => (r.id === id ? { ...r, ...updates } : r));
      const nextData: ResortStoreData = {
        ...prev,
        rooms: updatedRooms,
        lastUpdated: new Date().toISOString(),
      };
      saveAndBroadcast(nextData);
      return nextData;
    });
  };

  const addBooking = (bookingData: Omit<BookingItem, "id" | "createdAt">): BookingItem => {
    const newId = `#PG-${Math.floor(2600 + data.bookings.length + 1)}`;
    const newBooking: BookingItem = {
      ...bookingData,
      id: newId,
      createdAt: new Date().toISOString(),
    };
    setData((prev) => {
      const updated = [newBooking, ...prev.bookings];
      const nextData: ResortStoreData = {
        ...prev,
        bookings: updated,
        lastUpdated: new Date().toISOString(),
      };
      saveAndBroadcast(nextData);
      return nextData;
    });
    return newBooking;
  };

  const updateBookingStatus = (id: string, status: BookingItem["status"]) => {
    setData((prev) => {
      const updated = prev.bookings.map((b) => (b.id === id ? { ...b, status } : b));
      const nextData: ResortStoreData = {
        ...prev,
        bookings: updated,
        lastUpdated: new Date().toISOString(),
      };
      saveAndBroadcast(nextData);
      return nextData;
    });
  };

  const updateBooking = (id: string, updates: Partial<BookingItem>) => {
    setData((prev) => {
      const updated = prev.bookings.map((b) => (b.id === id ? { ...b, ...updates } : b));
      const nextData: ResortStoreData = {
        ...prev,
        bookings: updated,
        lastUpdated: new Date().toISOString(),
      };
      saveAndBroadcast(nextData);
      return nextData;
    });
  };

  const deleteBooking = (id: string) => {
    setData((prev) => {
      const updated = prev.bookings.filter((b) => b.id !== id);
      const nextData: ResortStoreData = {
        ...prev,
        bookings: updated,
        lastUpdated: new Date().toISOString(),
      };
      saveAndBroadcast(nextData);
      return nextData;
    });
  };

  const addMedia = (mediaData: Omit<MediaItem, "id" | "order">): MediaItem => {
    const newId = `med-${Date.now()}`;
    const newMedia: MediaItem = {
      ...mediaData,
      id: newId,
      order: data.media.length + 1,
    };
    setData((prev) => {
      const updated = [...prev.media, newMedia];
      const nextData: ResortStoreData = {
        ...prev,
        media: updated,
        lastUpdated: new Date().toISOString(),
      };
      saveAndBroadcast(nextData);
      return nextData;
    });
    return newMedia;
  };

  const updateMedia = (id: string, updates: Partial<MediaItem>) => {
    setData((prev) => {
      const updated = prev.media.map((m) => (m.id === id ? { ...m, ...updates } : m));
      const nextData: ResortStoreData = {
        ...prev,
        media: updated,
        lastUpdated: new Date().toISOString(),
      };
      saveAndBroadcast(nextData);
      return nextData;
    });
  };

  const deleteMedia = (id: string) => {
    setData((prev) => {
      const updated = prev.media.filter((m) => m.id !== id);
      const nextData: ResortStoreData = {
        ...prev,
        media: updated,
        lastUpdated: new Date().toISOString(),
      };
      saveAndBroadcast(nextData);
      return nextData;
    });
  };

  const reorderMedia = (id: string, direction: "up" | "down") => {
    setData((prev) => {
      const index = prev.media.findIndex((m) => m.id === id);
      if (index === -1) return prev;
      if (direction === "up" && index === 0) return prev;
      if (direction === "down" && index === prev.media.length - 1) return prev;

      const targetIndex = direction === "up" ? index - 1 : index + 1;
      const mediaCopy = [...prev.media];
      const [moved] = mediaCopy.splice(index, 1);
      mediaCopy.splice(targetIndex, 0, moved);

      const reordered = mediaCopy.map((m, idx) => ({ ...m, order: idx + 1 }));
      const nextData: ResortStoreData = {
        ...prev,
        media: reordered,
        lastUpdated: new Date().toISOString(),
      };
      saveAndBroadcast(nextData);
      return nextData;
    });
  };

  const resetToDefaults = () => {
    const freshData: ResortStoreData = {
      packages: DEFAULT_PACKAGES,
      rooms: DEFAULT_ROOMS,
      roomCategories: ROOM_CATEGORIES,
      bookings: DEFAULT_BOOKINGS,
      media: DEFAULT_MEDIA,
      lastUpdated: new Date().toISOString(),
    };
    saveAndBroadcast(freshData);
    setData(freshData);
  };

  const getAvailabilityForDate = (dateStr: string) => {
    return calculateAvailabilityForDate(
      dateStr,
      data.rooms,
      data.bookings,
      data.roomCategories || ROOM_CATEGORIES
    );
  };

  const getAvailabilityForDateRange = (startDate: string, endDate: string) => {
    return calculateAvailabilityForDateRange(
      startDate,
      endDate,
      data.rooms,
      data.bookings,
      data.roomCategories || ROOM_CATEGORIES
    );
  };

  const contextValue = useMemo(
    () => ({
      packages: data.packages,
      rooms: data.rooms,
      roomCategories: data.roomCategories || ROOM_CATEGORIES,
      bookings: data.bookings,
      media: data.media,
      isLoaded,
      getAvailabilityForDate,
      getAvailabilityForDateRange,
      updatePackageRate,
      updateRoomCategory,
      updateRatesBatch,
      updateRoom,
      addBooking,
      updateBookingStatus,
      updateBooking,
      deleteBooking,
      addMedia,
      updateMedia,
      deleteMedia,
      reorderMedia,
      resetToDefaults,
    }),
    [data, isLoaded]
  );

  return (
    <ResortStoreContext.Provider value={contextValue}>
      {children}
    </ResortStoreContext.Provider>
  );
}

export function useResortStore() {
  const context = useContext(ResortStoreContext);
  if (!context) {
    throw new Error("useResortStore must be used within a ResortStoreProvider");
  }
  return context;
}
