"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { DynamicIcon } from "@/icons/DynamicIcon";
import { BADGE_SIZE_STYLES, BADGE_VARIANT_STYLES } from "./utils/helper";
import { IconPlacement } from "./types";


export type BadgeVariant = keyof typeof BADGE_VARIANT_STYLES;
export type BadgeSize = keyof typeof BADGE_SIZE_STYLES;


export interface BadgeProps {
  children: React.ReactNode;

  variant?: BadgeVariant;
  size?: BadgeSize;

  iconName?: string;
  iconPlacement?: IconPlacement;

  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "neutral",
  size = "md",
  iconName,
  iconPlacement = "start",
  className,
}) => {
  const variantConfig =
    BADGE_VARIANT_STYLES[variant] ?? BADGE_VARIANT_STYLES.neutral;
  const sizeConfig =
    BADGE_SIZE_STYLES[size] ?? BADGE_SIZE_STYLES.md;

  const { rootClass, iconColor } = variantConfig;
  const { className: sizeClass, iconSize } = sizeConfig;

  const renderIcon = () =>
    iconName ? (
      <DynamicIcon name={iconName} size={iconSize} stroke={iconColor} />
    ) : null;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-lg font-semibold whitespace-nowrap",
        rootClass,
        sizeClass,
        className,
      )}
    >
      {iconName && iconPlacement === "start" && renderIcon()}
      <span>{children}</span>
      {iconName && iconPlacement === "end" && renderIcon()}
    </span>
  );
};
