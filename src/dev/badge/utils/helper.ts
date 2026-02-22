
export const BADGE_VARIANT_STYLES = {
  success: {
    rootClass: "bg-[#66B105] text-[#FFFFFF]",
    iconColor: "#FFFFFF",
  },
  neutral: {
    rootClass: "bg-[#F5F5F4] text-[#262626]",
    iconColor: "#262626",
  },
  danger: {
    rootClass: "bg-[#E7000B] text-[#FFFFFF]",
    iconColor: "#FFFFFF",
  },
  warning: {
    rootClass: "bg-[#FE9A00] text-[#FFFFFF]",
    iconColor: "#FFFFFF",
  },
  outline: {
    rootClass:
      "border border-[#E5E5E5] text-[#262626] bg-transparent",
    iconColor: "#262626",
  },
} as const;

export const BADGE_SIZE_STYLES = {
  sm: {
    className: "px-3 py-0.5 text-xs",
    iconSize: 14,
  },
  md: {
    className: "px-4 py-0.5 text-sm font-medium",
    iconSize: 16,
  },
  lg: {
    className: "px-8 py-3 text-2xl",
    iconSize: 28,
  },
} as const;