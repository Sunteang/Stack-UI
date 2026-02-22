"use client";

import * as React from "react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs/Breadcrumbs";

export type PageBreadcrumbItem = {
  label: string;
  onClick?: () => void;
};

type PageHeaderProps = Readonly<{
  breadcrumbs: PageBreadcrumbItem[];
  title: React.ReactNode;
  actions?: string | React.ReactNode;
  subtitle?: React.ReactNode;

  className?: string;

  sticky?: boolean;
}>;

export function PageHeader({
  breadcrumbs,
  title,
  actions,
  subtitle,
  className,
  sticky = false,
}: PageHeaderProps) {
  return (
    <div
      className={[
        sticky ? "sticky top-0 z-10" : "",
        "-mx-6 -mt-6 px-6 pt-8 pb-4",
        "bg-brand-white border-b border-brand-gray-100",
          "mb-5",
        className ?? "",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2.5">
          <Breadcrumbs className="text-[#171717]" items={breadcrumbs} />
          <div className="space-y-1">
            <h1 className="text-xl font-semibold">{title}</h1>
            {subtitle ? <div className="text-sm text-[#6B7280]">{subtitle}</div> : null}
          </div>
        </div>

        {actions ? <div className="shrink-0">{actions}</div> : null}
      </div>
    </div>
  );
}
