"use client";
import { FileInput } from "@/dev/file-input/file-input";

export default function FileInputPage() {
  const handleFileChange = (files: FileList | null) => {
    if (!files) return;
    for (const file of Array.from(files)) {
      console.log("File:", file.name, file.size);
    }
  };

  return (
    <div className="w-full max-w-full p-4 sm:p-6 lg:p-8 rounded-lg shadow space-y-4">
      <h1 className="text-2xl font-bold">FileInput Component</h1>
      <div className="flex flex-col gap-4 w-full">
        <FileInput
          label="Upload files"
          accept="image/*,application/pdf"
          multiple
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}
