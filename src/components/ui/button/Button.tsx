import React from "react";
import { ProgressActivityIcon } from "@/icons";
import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "default"
  | "primary"
  | "wing"
  | "danger"
  | "warning"
  | "success"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  loading?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  default:
    "bg-[#A7B2C4] text-[#FFFFFF] cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
  primary:
    "bg-[#0077FF] text-[#FFFFFF] cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
  wing: "bg-[#66B105] text-[#FFFFFF]  cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
  warning:
    "bg-[#F9A01B] text-[#FFFFFF] cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
  danger:
    "bg-[#E7000B] text-[#FFFFFF] cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
  success:
    "bg-[#18B23C] text-[#FFFFFF] cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
  outline:
    "border border-gray-300 text-gray-700 hover:bg-gray-100 cursor-pointer disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed",
  secondary:
    "bg-gray-200 text-gray-800 cursor-pointer disabled:text-gray-500 disabled:bg-gray-100 disabled:cursor-not-allowed",
  ghost:
    "bg-transparent text-gray-700 hover:bg-gray-100 cursor-pointer disabled:text-gray-400 disabled:cursor-not-allowed",
  link: "text-[#66B105] hover:underline disabled:text-gray-400 disabled:no-underline disabled:cursor-not-allowed",
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "default",
  className,
  startIcon,
  endIcon,
  loading,
  disabled = false,
  ...props
}) => {
  const base = `
    inline-flex items-center gap-1
    py-[13px] px-[12px]
    rounded-[8px]
    font-medium
    justify-center
  `;

  return (
    <button
      className={cn(base, variantClasses[variant], !className && "min-w-20 h-10", className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <ProgressActivityIcon size={18} className="animate-spin" />}
      {!loading && startIcon && (
        <span className="flex items-center">{startIcon}</span>
      )}
      {children}
      {!loading && endIcon && (
        <span className="flex items-center">{endIcon}</span>
      )}
    </button>
  );
};
