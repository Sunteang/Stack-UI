"use client";

import { Button } from "@/dev/button/button";
import { DownloadIcon, InfoIcon, WarningIcon } from "@/dev/icon/icon";
import { Search } from "lucide-react";

export default function ButtonPreview() {
  return (
    <div className="w-full p-4 sm:p-6 lg:p-8 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Button Variants</h1>
      <div className="flex flex-wrap gap-2 w-full">
        <Button variant="danger" size="sm" rightIcon="delete" loading>Delete</Button>

        <Button
          variant="primary"
          size="sm"
          leftIcon={<Search className="w-4 h-4" />}
          onClick={() => {
            console.log("Hello");
          }}
        >
          Search
        </Button>
        <Button
          variant="primary"
          size="md"
          leftIcon={<DownloadIcon />}
          onClick={() => {
            console.log("Download Successful");
          }}
        >
          Download
        </Button>
        <Button
          variant="primary"
          size="md"
          leftIcon={<InfoIcon />}
          onClick={() => {
            console.log("Hello");
          }}
        >
          Info
        </Button>
        <Button
          variant="warning"
          size="md"
          leftIcon={<WarningIcon />}
          onClick={() => {
            console.log("Hello");
          }}
        >
          Warning
        </Button>
        <Button
          variant="transparent"
          size="md"
          className="text-black"
          leftIcon={<DownloadIcon />}
          onClick={() => {
            console.log("Download Successful");
          }}
        >
          Download
        </Button>
      </div>
    </div>
  );
}
