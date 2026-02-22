import React, {isValidElement} from "react";
import { CloseIcon } from "@/icons/CloseIcon";
import { cn } from "@/lib/utils";
import FieldWrapper from "@/dev/form/field-wrapper";
import { DefaultProps } from "./types";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & DefaultProps & {
  suffixIcon?: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  allowClear?: boolean;
  clearIcon?: React.ReactNode;
  variant?: "default" | "outlined";
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        {
          error,
          label,
          description,
          className = "",
          icon,
          suffixIcon,
          allowClear = false,
          clearIcon,
          type,
          required = false,
          iconPosition = "left",
          value,
          onChange,
          variant = "default",
          disabled,
          ...props
        },
        ref
    ) => {
    const handleClear = () => {
      onChange?.({
        target: {value: "" },
      } as React.ChangeEvent<HTMLInputElement>);
    };

    const variantClass =`w-full h-[42px] py-[13px] rounded-[8px] border border-[#CBD5E1]  ${className}`
        
    const leftPadClass = icon && iconPosition === "left" ? "pl-10" : "pr-10";

    const renderClearIcon = () => {
      if (isValidElement(clearIcon) && value) {
        return clearIcon;
      } else if (allowClear && value) {
        return (
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 space-x-2">
              <button
                  type="button"
                  onClick={handleClear}
                  className={"p-1 text-gray-500 hover:text-gray-700"}
              >
                <CloseIcon stroke="#B3B6BB" size={16} />
              </button>
            </div>
        )
      }
      return null;
    };

      return (
        <FieldWrapper
          label={variant === "default" ? label : undefined}
          description={description}
          required={required}
          error={error}
          className={className}>
          <div className="relative">
            <input
              ref={ref}
              type={type}
              value={value}
              onChange={onChange}
              disabled={disabled}
              placeholder={variant === "outlined" ? " " : props.placeholder}
              className={cn(
                "px-[12px] peer w-full min-h-10 bg-white rounded-md focus:outline-none",
                disabled
                  ? "cursor-not-allowed bg-gray-100 text-gray-400"
                  : "cursor-pointer",
                leftPadClass,
                variantClass,
                error && "border-red-500 focus:border-red-500"
              )}
              {...props}
            />

            {variant === "outlined" && label && (
              <label
                className={cn(
                  "absolute left-3 px-1 bg-white text-gray-500 transition-all duration-200",
                  icon ? "px-7" : "px-1",
                  "peer-placeholder-shown:top-2 peer-placeholder-shown:text-center peer-placeholder-shown:text-base",
                  "peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-500",
                  "peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-sm"
                )}
              >
                {label}
                {required && <span className="ml-0.5 text-red-500">*</span>}
              </label>
            )}

            {icon && iconPosition === "left" && (
              <div className="absolute inset-y-0 left-0 p-3 flex items-center pointer-events-none text-gray-400">
                {icon}
              </div>
            )}

            {icon && iconPosition === "right" && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                {icon}
              </div>
            )}
            {renderClearIcon()}
            {suffixIcon && (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center pr-3 pl-3">
                <div className="h-5 border-l border-gray-300 mr-2" />
                <span className="text-sm text-gray-600">{suffixIcon}</span>
              </div>
            )}
          </div>
        </FieldWrapper>
      );
    }
);

Input.displayName = "Input";
