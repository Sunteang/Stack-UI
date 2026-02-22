import React from "react";

interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: {
    start?: React.ReactNode;
    end?: React.ReactNode;
  };
  children?: React.ReactNode;
  variant?: "filled" | "outline";
  size?: "md" | "sm";
  color?: "primary" | "secondary" | "error" | "info" | "success" | "warning" | "plain";
  label?: string;
  rounded?: "sm" | "md" | "lg" | "full";
}

const colorClasses = {
  filled: {
    primary: "bg-blue-600 text-white",
    secondary: "bg-gray-600 text-white",
    error: "bg-[#FDD0DF] text-[#C20E4D]",
    info: "bg-cyan-600 text-white",
    success: "bg-[hsla(var(--success-muted))] text-[#0E793C]",
    warning: "bg-yellow-400 text-black",
    plain: "bg-gray-200 text-gray-800",
  },
  outline: {
    primary: "border border-blue-600 text-blue-600",
    secondary: "border border-gray-600 text-gray-600",
    error: "border border-red-600 text-red-600",
    info: "border border-cyan-600 text-cyan-600",
    success: "border border-green-600 text-green-600",
    warning: "border border-yellow-400 text-yellow-400",
    plain: "border border-gray-300 text-gray-700",
  },
};

const sizeClasses = {
  md: "text-sm px-3 py-2",
  sm: "text-xs px-2 py-1.5",
};

const roundedClasses = {
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

export const Chip: React.FC<ChipProps> = ({
  className = "",
  variant = "filled",
  size = "md",
  color = "primary",
  icon,
  children,
  label,
  rounded = "full",
  ...props
}) => {
  const baseClasses = "inline-flex items-center select-none font-medium";

  const variantColorClass = colorClasses[variant]?.[color] || colorClasses.filled.primary;
  const sizeClass = sizeClasses[size] || sizeClasses.md;
  const roundedClass = roundedClasses[rounded] || roundedClasses.full;

  return (
    <div
      className={`${baseClasses} ${variantColorClass} ${sizeClass} ${roundedClass} ${className}`}
      {...props}
    >
      {icon?.start && <span className="mr-1 flex items-center">{icon.start}</span>}

      {label || children}

      {icon?.end && <span className="ml-1 flex items-center">{icon.end}</span>}
    </div>
  );
};
