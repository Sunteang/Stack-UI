"use client";

import React from "react";
import {cn} from "@/lib/utils";
import {DefaultProps} from "./types";

const FieldWrapper: React.FC<DefaultProps & {children: React.ReactNode}> = ({className, htmlFor, label, description, required, error, children}) => {
  return (
      <div className={cn("w-full", className)}>
        {label
            && <label htmlFor={htmlFor} className="block text-sm/6 font-medium text-gray-900">
              {label} {required && <span className="text-red-600">*</span>}
            </label>
        }
        <div className={cn("relative", label && "mt-1.5")}>{children}</div>
        {description && <p className="mt-1 text-xs text-gray-500">{description}</p>}
        {error && <p className="mt-1 text-xs text-red-600" role="alert">{error}</p>}
      </div>
  );
}

export default FieldWrapper;