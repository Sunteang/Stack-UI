"use client";

import React from "react";

type DragDropZoneProps = {
  onDrop: (files: FileList) => void;
  onDragOver?: () => void;
  onDragLeave?: () => void;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
};

const DragDropZone: React.FC<DragDropZoneProps> = ({
  onDrop,
  onDragOver,
  onDragLeave,
  onClick,
  className = '',
  children,
}) => {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    onDragLeave?.();
    if (e.dataTransfer.files?.length) {
      onDrop(e.dataTransfer.files);
    }
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        onDragOver?.();
      }}
      onDragLeave={onDragLeave}
      onDrop={handleDrop}
      onClick={onClick}
      className={className}
    >
      {children}
    </div>
  );
};

export {DragDropZone};
