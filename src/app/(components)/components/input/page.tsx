"use client";
import { Input } from "@/dev/input/input";
import { useState } from "react";

export default function InputPage() {
  const [value, setValue] = useState("");

  return (
    <div className="w-full max-w-full p-4 sm:p-6 lg:p-8 rounded-lg shadow space-y-4">
      <h1 className="text-2xl font-bold">Input Component</h1>
      <Input
        type="text"
        label="Input Text:"
        placeholder="Enter Text here..."
        defaultValue=""
        size="md"
        color="secondary"
        variant="bordered"
        radius="md"
        labelPlacement="outside"
        className="w-full"
        onChange={(e) => setValue(e.target.value)}
      />
      <p className="text-gray-600">Value: {value}</p>
    </div>
  );
}
