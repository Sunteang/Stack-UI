"use client";

import { MultiSelectOption } from "@/dev/multi-select-option/multi-select-option";
import { Option,  SingleSelect} from "@/dev/select/select";
import { useState } from "react";

const singleOptions: Option[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Rejected", value: "rejected" },
];
const multiOptions: Option[] = [
  { label: "React", value: "react" },
  { label: "Vue", value: "vue" },
  { label: "Angular", value: "angular" },
  { label: "Next", value: "next" },
  { label: "Java", value: "java" },
];

export default function SelectPreview() {
  const [selectSingle, setSelectSingle] = useState<Option | null>(null);
  const [selectMulti, setSelectMulti] = useState<Option[]>([]);

  return (
    <div className="p-8 space-y-4 w-full rounded-lg">
      <h1 className="text-2xl font-bold">Select Component</h1>
      <div className="space-y-6 p-6 rounded-lg">
        <div>
          <SingleSelect
            options={singleOptions}
            value={selectSingle}
            onChange={setSelectSingle}
            placeholder="Pick one"
            label="Single Select:"

          />
        </div>

        <div>
          <MultiSelectOption
            options={multiOptions}
            value={selectMulti}
            onChange={setSelectMulti}
            placeholder="Select items"
            label="Multi Select:"
          />
        </div>
      </div>
    </div>
  );
}
