"use client";

import * as React from "react";

type Variant = "user" | "role" | "editUser";

type Props = Readonly<{
  variant: Variant;
  className?: string;
}>;

export function PageSkeleton({ variant, className }: Props) {
  if (variant === "user") return <UserSkeleton className={className} />;
  if (variant === "role") return <RoleSkeleton className={className} />;
  return <EditSkeleton className={className} />;
}

/** ---------- shared building blocks ---------- */

type TWSize =
  | number
  | "full"
  | "screen"
  | "min"
  | "max"
  | "fit"
  | `${number}/${number}`;

function twSize(prefix: "w" | "h", v: TWSize): string {
  return `${prefix}-${v}`;
}

export function SkLine({ w, h }: { readonly w: TWSize; readonly h: TWSize }) {
  return <div className={`${twSize("h", h)} ${twSize("w", w)} rounded bg-brand-gray-200`} />;
}

export function SkChip({ w = 28 }: { readonly w?: TWSize }) {
  return <div className={`h-8 ${twSize("w", w)} rounded-xl bg-brand-gray-200`} />;
}

export function SkInput() {
  return <div className="mt-2 h-11 w-full rounded-xl bg-brand-gray-200" />;
}

export function FieldSkeleton() {
  return (
    <div className="space-y-2">
      <SkLine w={24} h={3} />
      <SkLine w={48} h={5} />
    </div>
  );
}

/** ---------- user detail layout ---------- */

export function UserSkeleton({ className }: { readonly className?: string }) {
  return (
    <div className={["bg-brand-white rounded-[20px] p-6 animate-pulse", className].join(" ")}>
      <div className="mb-5 grid grid-cols-2">
        <div className="flex gap-5 items-center">
          <div className="size-20 rounded-full bg-brand-gray-200" />
          <div className="space-y-3">
            <SkLine w={64} h={7} />
            <SkLine w={40} h={4} />
          </div>
        </div>

        <div className="flex items-center justify-around">
          <div className="space-y-2">
            <SkLine w={16} h={3} />
            <SkLine w={56} h={5} />
          </div>
        </div>
      </div>

      <div className="bg-brand-gray-100 rounded-[20px] p-5 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <FieldSkeleton />
          <FieldSkeleton />
          <FieldSkeleton />
          <FieldSkeleton />
        </div>

        <div className="space-y-2">
          <SkLine w={16} h={3} />
          <SkLine w={72} h={5} />
        </div>

        <PermissionsSkeleton />
      </div>
    </div>
  );
}

/** ---------- role detail layout ---------- */

export function RoleSkeleton({ className }: { readonly className?: string }) {
  return (
    <div className={["bg-brand-white rounded-[20px] p-6 animate-pulse", className].join(" ")}>
      <div className="grid grid-cols-2 gap-x-12 gap-y-6">
        <div className="space-y-2">
          <SkLine w={16} h={3} />
          <SkLine w={56} h={5} />
        </div>

        <div className="space-y-2">
          <SkLine w={20} h={3} />
          <SkLine w={28} h={5} />
        </div>

        <div className="col-span-2 space-y-2">
          <SkLine w={24} h={3} />
          <SkLine w="full" h={5} />
          <SkLine w="5/6" h={5} />
        </div>
      </div>

      <div className="mt-6">
        <PermissionsSkeleton />
      </div>
    </div>
  );
}

/** ---------- edit user layout ---------- */

export function EditSkeleton({ className }: { readonly className?: string }) {
  return (
    <div className={["bg-brand-white rounded-[20px] p-6 animate-pulse", className].join(" ")}>
      <div className="mb-5 grid grid-cols-2">
        <div className="flex gap-5 items-center">
          <div className="size-20 rounded-full bg-brand-gray-200" />

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <SkLine w={64} h={7} />
              <div className="h-6 w-16 rounded-full bg-brand-gray-200" />
            </div>
            <SkLine w={40} h={4} />
          </div>
        </div>

        <div className="flex items-center justify-around">
          <div className="space-y-2">
            <SkLine w={16} h={3} />
            <SkLine w={56} h={5} />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-12 gap-6 items-start">
          <div className="col-span-6 space-y-2">
            <SkLine w={24} h={3} />
            <SkInput />
          </div>
          <div className="col-span-6 space-y-2">
            <SkLine w={16} h={3} />
            <SkInput />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6 items-start">
          <div className="col-span-6 space-y-2">
            <SkLine w={40} h={3} />
            <SkInput />
          </div>
          <div className="col-span-6 space-y-2">
            <SkLine w={28} h={3} />
            <SkInput />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6 items-start">
          <div className="col-span-6 space-y-2">
            <SkLine w={12} h={3} />
            <div className="mt-2 h-12 w-full rounded-xl bg-brand-gray-200" />
          </div>

          <div className="col-span-6 space-y-3">
            <SkLine w={28} h={3} />
            <PermissionsSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
}

/** ---------- shared permissions skeleton ---------- */

export function PermissionsSkeleton() {
  return (
    <div className="space-y-3">
      <SkLine w={24} h={3} />

      <div className="space-y-2">
        <SkLine w={64} h={4} />
        <div className="flex flex-wrap gap-2 pl-4">
          <SkChip />
          <SkChip w={32} />
          <SkChip w={24} />
          <SkChip />
        </div>
      </div>

      <div className="space-y-2">
        <SkLine w={56} h={4} />
        <div className="flex flex-wrap gap-2 pl-4">
          <SkChip />
          <SkChip w={36} />
          <SkChip />
        </div>
      </div>
    </div>
  );
}
