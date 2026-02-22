"use client";

import * as React from "react";
import { Grid, Label } from "@/components/ui";

type RoleFormProps = Readonly<{
  title: string;
}>;

export const RoleForm = ({
  title,
}: RoleFormProps) => {


  const nameId = React.useId();
  const descId = React.useId();

  return (
    <div className="bg-white rounded-xl p-1.5 space-y-6">
      <div className="bg-[#FAFAFA] rounded-[10px] flex gap-3 items-center p-6">
        <div className="border-2 border-[#66B105] h-[23px]" />
        <p className="font-semibold text-[20px] flex items-center gap-3">
          {title}
        </p>
      </div>

      <div className="space-y-6 px-5">
        <Grid cols={2}>
          <div className="space-y-1.5">
            <Label htmlFor={nameId} required>
              Name
            </Label>
            <input
              id={nameId}
              placeholder="Enter Name"
              className="mt-2 w-full h-11 rounded-xl border border-brand-gray-200 px-4 outline-none focus:ring-1"
            />
          </div>
        </Grid>

        <Grid cols={1}>
          <Label htmlFor={descId} required>
            Description
          </Label>
          <div className="relative mt-2">
            <textarea
              id={descId}
              maxLength={100}
              placeholder="Enter Description"
              className="w-full min-h-[72px] rounded-xl border border-brand-gray-200 px-4 py-3 outline-none focus:ring-1"
            />
            <span className="absolute bottom-2 right-3 text-xs text-brand-gray-400">
              100/100
            </span>
          </div>
        </Grid>
      </div>
    </div>
  );
};
