"use client";

import { MultiSelectOption } from "@/dev/multi-select-option/multi-select-option";
import { useState } from "react";

export default function MultiSelectPage() {
  const [value, setValue] = useState<Array<{ label: string; value: string }>>([]);

  return (
    <div className="w-full max-w-full p-4 sm:p-6 lg:p-8 rounded-lg shadow space-y-4">
      <h1 className="text-2xl font-bold">Multi Select Component</h1>
      <MultiSelectOption
        label="Input Text:"
        placeholder="Enter Text here..."
        options={[
          { label: "Option 1", value: "option1" },
          { label: "Option 2", value: "option2" },
          { label: "Option 3", value: "option3" },
        ]}
        value={value}
        onChange={(val) => setValue(val)}
      />
      <p className="text-gray-600">Value: {value.map(v => v.label).join(", ")}</p>
    </div>
  );
}
