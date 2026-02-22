import { classNames } from "@/lib/utils";
import { FC, ReactNode, useState } from "react";
import { EyeClosedIcon, EyeOpenIcon } from "@/dev/icon/icon";

export interface InputProps {
  type?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  size?: "sm" | "md" | "lg";
  color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
  variant?: "flat" | "bordered" | "underlined" | "faded";
  radius?: "none" | "sm" | "md" | "lg" | "2xl" | "full";
  labelPlacement?: "inside" | "outside" | "outside-left";
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  isIconLeft?: ReactNode;
  isIconRight?: ReactNode;
  className?: string;
  description?: string;
}

export const Input: FC<InputProps> = ({
  type = "text",
  label,
  placeholder = "",
  value,
  defaultValue = "",
  onChange,
  size = "md",
  color = "default",
  variant = "flat",
  radius = "md",
  labelPlacement = "outside",
  isDisabled = false,
  isReadOnly = false,
  isRequired = false,
  isIconLeft,
  isIconRight,
  className = "",
  description = "",
  ...props
}) => {
  // State for showing/hiding password
  const [showPassword, setShowPassword] = useState(false);

  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const radiusClasses = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    "2xl": "rounded-[10px]",
    full: "rounded-full",
  };

  const colorClasses = {
    default: "border-gray-300 focus:border-gray-500",
    primary: "border-[#1F79FD] focus:border-[#1864d3]",
    secondary: "border-[#788188] focus:border-[#5b6064]",
    success: "border-[#319366] focus:border-[#598772]",
    warning: "border-[#FFC927] focus:border-[#ebb923]",
    danger: "border-[#DE4453] focus:border-[#b23541]",
  };

  const variantClasses = {
    flat: "",
    bordered: "border",
    underlined: "border-b-2",
    faded: "bg-gray-100 border border-gray-200",
  };

  const labelInside = labelPlacement === "inside";
  const labelOutsideLeft = labelPlacement === "outside-left";

  // Determine actual input type:
  const inputType = type === "password" && showPassword ? "text" : type;

  // Handle toggle password visibility
  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div
      className={classNames(
        "flex",
        { "flex-col": !labelOutsideLeft, "flex-row items-center": labelOutsideLeft },
        className
      )}
    >
      {/* Label outside input */}
      {label && labelPlacement !== "inside" && (
        <label
          className={classNames(
            "mb-1",
            { "mr-2": labelOutsideLeft },
            {
              "text-sm": size === "sm",
              "text-base": size === "md",
              "text-lg": size === "lg",
            }
          )}
        >
          {label}
          {isRequired && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Input wrapper */}
      <div
        className={classNames(
          "relative flex items-center w-full",
          variantClasses[variant],
          radiusClasses[radius],
          colorClasses[color],
          {
            "opacity-50 cursor-not-allowed": isDisabled,
            "bg-gray-100": isReadOnly,
          }
        )}
      >
        {/* Left icon */}
        {isIconLeft && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 w-5 h-5 flex items-center justify-center">
            {isIconLeft}
          </div>
        )}

        {/* Input element */}
        <input
          type={inputType}
          placeholder={labelInside ? label : placeholder}
          onChange={onChange}
          disabled={isDisabled}
          readOnly={isReadOnly}
          required={isRequired}
          {...(value !== undefined ? { value } : { defaultValue })}
          className={classNames(
            "w-full outline-none bg-transparent py-2 px-4",
            {
              "pl-10": !!isIconLeft,
              "pr-10": type === "password" ? true : !!isIconRight,
            },
            sizeClasses[size]
          )}
          {...props}
        />

        {/* Right icon(s) */}
        {type === "password" ? (
          <button
            type="button"
            onClick={toggleShowPassword}
            tabIndex={-1}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
          </button>
        ) : (
          isIconRight && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 w-5 h-5 flex items-center justify-center">
              {isIconRight}
            </div>
          )
        )}
      </div>

      {/* Label inside input */}
      {label && labelInside && (
        <label
          className={classNames(
            "absolute inset-y-0 left-4 flex items-center pointer-events-none",
            {
              "text-sm": size === "sm",
              "text-base": size === "md",
              "text-lg": size === "lg",
            }
          )}
        >
          {label}
        </label>
      )}

      {/* Description below input */}
      {description && (
        <span className="mt-1 text-xs text-gray-500">{description}</span>
      )}
    </div>
  );
};
