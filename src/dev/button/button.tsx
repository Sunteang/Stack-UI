import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";
import { Loader } from "lucide-react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "success" | "warning" | "info" | "outline" | "danger" | "dark" | "transparent";
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
};

const getSizeClass = (size: ButtonProps["size"]) => {
  switch (size) {
    case "sm": return "text-sm px-3 py-1";
    case "md": return "text-base px-4 py-2";
    case "lg": return "text-lg px-5 py-2.5";
    case "xl": return "text-xl px-6 py-3";
    case "2xl": return "text-2xl px-8 py-4";
    case "3xl": return "text-3xl px-10 py-5";
    default: return "text-base px-4 py-2";
  }
};

const getRoundedClass = (rounded: ButtonProps["rounded"]) => {
  switch (rounded) {
    case "none": return "rounded-none";
    case "sm": return "rounded-sm";
    case "md": return "rounded-md";
    case "lg": return "rounded-lg";
    case "xl": return "rounded-xl";
    case "2xl": return "rounded-2xl";
    case "full": return "rounded-full";
    default: return "rounded-md";
  }
};


export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      className,
      loading,
      leftIcon,
      rightIcon,
      children,
      rounded,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={loading || props.disabled}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-opacity duration-200",
          getSizeClass(size),
          getRoundedClass(rounded),
          variant === "primary" && "bg-[#1F79FD] text-white hover:bg-[#1864d3]",
          variant === "secondary" && "bg-[#788188] text-white hover:bg-[#5b6064]",
          variant === "success" && "bg-[#66B105] text-white hover:bg-[#60a604]",
          variant === "warning" && "bg-[#FFC927] text-white hover:bg-[#ebb923]",
          variant === "info" && "bg-[#1FCEF1] text-white hover:bg-[#1eaecb]",
          variant === "outline" && "border border-gray-300 text-black bg-transparent",
          variant === "danger" && "bg-[#DE4453] text-white hover:bg-[#b23541]",
          variant === "dark" && "bg-[#2F3337] text-white hover:bg-[#212325]",
          variant === "transparent" && "bg-transparent text-black",
          loading && "opacity-60 cursor-not-allowed",
          className
        )}
        {...props}
      >
        {loading && <Loader className="w-4 h-4 animate-spin" />}
        {!loading && leftIcon}
        {children}
        {!loading && rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";
