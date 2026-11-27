import React from "react";

interface GhatsContourBadgeProps {
  className?: string;
}

export const GhatsContourBadge: React.FC<GhatsContourBadgeProps> = ({ className = "" }) => {
  return (
    <div
      className={`inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#F2EDE2] border border-[rgba(139,130,88,0.22)] shadow-sm text-[#56635A] select-none ${className}`}
    >
      {/* Mountain Contour Line Icon */}
      <span className="flex items-center justify-center w-5 h-5 text-[#788E73]">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Western Ghats Mountain Peaks & Contours */}
          <path d="M2 19L8.5 7L13 14L16.5 9L22 19H2Z" />
          <path d="M6 19L9.5 13L12 17" opacity="0.6" strokeDasharray="1 1.5" />
          <path d="M14.5 19L17.5 14L20 19" opacity="0.6" />
        </svg>
      </span>

      {/* Verified Rating & Location Typography */}
      <span className="font-sans text-[11px] sm:text-xs tracking-wider uppercase font-semibold text-[#141715]">
        Resort By The Ghats{" "}
        <span className="text-[#8B8258] font-normal mx-0.5">·</span>{" "}
        <span className="text-[#E06354] font-bold">4.8 ★</span>{" "}
        <span className="text-[#56635A] font-normal">(103+ Reviews)</span>{" "}
        <span className="text-[#8B8258] font-normal mx-0.5">·</span>{" "}
        <span className="text-[#56635A]">Saphale, Palghar</span>
      </span>
    </div>
  );
};
