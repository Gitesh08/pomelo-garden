import React from "react";

interface BotanicalCornerSprigProps {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
  size?: number;
}

export const BotanicalCornerSprig: React.FC<BotanicalCornerSprigProps> = ({
  position = "top-left",
  className = "",
  size = 180,
}) => {
  const getTransform = () => {
    switch (position) {
      case "top-right":
        return "scaleX(-1)";
      case "bottom-left":
        return "scaleY(-1)";
      case "bottom-right":
        return "scale(-1, -1)";
      default:
        return "none";
    }
  };

  const getPositionClasses = () => {
    switch (position) {
      case "top-right":
        return "top-0 right-0";
      case "bottom-left":
        return "bottom-0 left-0";
      case "bottom-right":
        return "bottom-0 right-0";
      default:
        return "top-0 left-0";
    }
  };

  return (
    <div
      className={`absolute pointer-events-none select-none z-0 opacity-40 mix-blend-multiply ${getPositionClasses()} ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        transform: getTransform(),
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Curving Eucalyptus Stem */}
        <path
          d="M10 10 C40 30, 70 80, 110 140 C130 170, 150 185, 185 190"
          stroke="#8B8258"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.6"
        />

        {/* Watercolor Sage Leaf Sprigs */}
        <g opacity="0.85">
          {/* Leaf 1 */}
          <path
            d="M35 35 C50 20, 75 25, 70 45 C65 65, 45 55, 35 35 Z"
            fill="#788E73"
            opacity="0.8"
          />
          <path d="M35 35 Q 52 38, 70 45" stroke="#FAF8F3" strokeWidth="0.75" opacity="0.6" />

          {/* Leaf 2 */}
          <path
            d="M55 70 C75 55, 100 65, 92 88 C84 105, 65 95, 55 70 Z"
            fill="#9EB097"
            opacity="0.85"
          />
          <path d="M55 70 Q 75 76, 92 88" stroke="#FAF8F3" strokeWidth="0.75" opacity="0.6" />

          {/* Leaf 3 */}
          <path
            d="M80 110 C105 95, 130 110, 120 135 C110 155, 90 140, 80 110 Z"
            fill="#788E73"
            opacity="0.75"
          />
          <path d="M80 110 Q 100 120, 120 135" stroke="#FAF8F3" strokeWidth="0.75" opacity="0.6" />

          {/* Leaf 4 (Smaller terminal leaf) */}
          <path
            d="M120 150 C140 140, 160 150, 155 170 C150 185, 135 175, 120 150 Z"
            fill="#9EB097"
            opacity="0.9"
          />

          {/* Delicate Botanical Citrus Berries / Buds */}
          <circle cx="48" cy="48" r="3.5" fill="#E06354" opacity="0.7" />
          <circle cx="82" cy="85" r="3" fill="#7BA23F" opacity="0.8" />
          <circle cx="115" cy="125" r="2.5" fill="#E06354" opacity="0.65" />
        </g>
      </svg>
    </div>
  );
};
