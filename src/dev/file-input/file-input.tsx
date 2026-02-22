"use client";

import React, { useRef, useState, useEffect } from "react";
import {DragDropZone} from "@/dev/dragdrop/dragdrop";
import { DownloadIcon, DragDropIcon, TrashIcon } from "@/dev/icon/icon";

type FileInputProps = {
  label?: string;
  description?: string;
  accept?: string;
  multiple?: boolean;
  maxFileCount?: number;
  onChange: (files: FileList | null) => void;
};

const FileInput: React.FC<FileInputProps> = ({
  label,
  description,
  accept = "*",
  multiple = false,
  maxFileCount = 1,
  onChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const cappedMax = Math.min(Math.max(maxFileCount, 1), 5);
  const canAddMore = files.length < cappedMax;

  const updateFiles = (newFiles: File[]) => {
    const combined = [...files, ...newFiles].slice(0, cappedMax);
    setFiles(combined);

    const dt = new DataTransfer();
    combined.forEach((file) => dt.items.add(file));
    onChange(dt.files);
  };

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList || !canAddMore) return;
    updateFiles(Array.from(fileList));
  };

  const getFilePreview = (file: File): string => {
    const type = file.type;
    if (["image/jpeg", "image/png", "image/gif", "image/webp"].includes(type)) {
      return URL.createObjectURL(file);
    }

    const ext = file.name.split(".").pop()?.toLowerCase();
    const fallbackIcons: Record<string, string> = {
      pdf: "/icons/pdf.png",
      doc: "/icons/docx.png",
      docx: "/icons/docx.png",
      xls: "/icons/xlsx.png",
      xlsx: "/icons/xlsx.png",
    };

    return fallbackIcons[ext || ""] || "/icons/file-placeholder.png";
  };

  useEffect(() => {
    return () => {
      files.forEach((file) => {
        if (file.type.startsWith("image/")) {
          URL.revokeObjectURL(getFilePreview(file));
        }
      });
    };
  }, [files]);

  const removeFile = (index: number) => {
    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);

    const dt = new DataTransfer();
    updated.forEach((file) => dt.items.add(file));
    onChange(dt.files);
  };

  const downloadFile = (file: File) => {
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = file.name;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block mb-1 text-lg font-medium text-gray-700">
          {label}
        </label>
      )}

      <DragDropZone
        onDrop={(dropped) => handleFiles(dropped)}
        onDragOver={() => setDragging(true)}
        onDragLeave={() => setDragging(false)}
        onClick={() => canAddMore && inputRef.current?.click()}
        className={`border-2 border-dashed rounded-md p-4 text-center cursor-pointer transition ${
          dragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
      >
        {files.length === 0 && (
          <div className="flex flex-col items-center gap-4 min-h-28 sm:px-5">
            <div className="rounded-full border border-dashed border-gray-300 p-3">
              <DragDropIcon className="size-7 text-[#788188]" aria-hidden="true" />
            </div>
            <p className="text-lg text-gray-500">
              Drag and drop files here or{" "}
              <span className="text-[#1F79FD] font-bold">browse</span>
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {files.map((file, idx) => (
            <div
              key={idx}
              className="border border-gray-300 rounded-md pt-2 shadow-sm relative"
            >
              <div className="font-medium text-sm text-center truncate">{file.name}</div>
              <div className="mt-2 h-24 flex items-center justify-center overflow-hidden">
                <img
                  src={getFilePreview(file)}
                  alt={file.name}
                  className="max-h-full max-w-full object-contain rounded-md"
                />
              </div>
              <div className="flex justify-between items-center text-gray-500 text-sm mt-2">
                <button onClick={() => downloadFile(file)} title="Download">
                  <DownloadIcon />
                </button>
                <button onClick={() => removeFile(idx)} title="Remove">
                  <TrashIcon />
                </button>
              </div>
            </div>
          ))}
        </div>
      </DragDropZone>

      {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={(e) => handleFiles(e.target.files)}
        className="hidden"
      />
    </div>
  );
};

export {FileInput};
