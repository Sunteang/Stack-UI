import React from "react";
import { AsteriskIcon } from "@/icons/AsteriskIcon";

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  className?: string;
  required?: boolean;
}

export const Label: React.FC<LabelProps> = ({
  children,
  className = "",
  required = false,
  ...props
}) => {
  return (
    <label
      className={`text-md flex font-medium leading-none ${
        required ? "mr-2.5" : ""
      } ${className}`}
      {...props}
    >
      <div className="relative">
        <p>{children}</p>
        {required && (
          <span className="flex">
            <AsteriskIcon
              size={8}
              fill="#E7000B"
              className="text-red-500 absolute top-0 -right-3"
            />
          </span>
        )}
      </div>
    </label>
  );
};
