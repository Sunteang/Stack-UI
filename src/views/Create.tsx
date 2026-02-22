"use client";

import * as React from "react";
import { Button } from "@/components/ui/button/Button";
import { PageHeader } from "@/components/ui/page-header/PageHeader";
import { Grid, Label } from "@/components/ui";
import { MultiSelect, MultiSelectOption } from "@/dev/multi-select/MultiSelect";
import { useForm } from "react-hook-form";
import { SelectedItemsSummary } from "@/components/ui/selected-items-summary/SelectedItemsSummary";

type FormValues = {
  roles: number[];
  services: number[];
  payerGroups: string[];
};

function CreateSystemGroupRole() {
  const { control, handleSubmit, watch, setValue } = useForm<FormValues>({
    defaultValues: {
      roles: [],
      services: [],
      payerGroups: [],
    },
  });

  const serviceOptions: MultiSelectOption<number>[] = [
    {
      value: 101,
      label: (
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-medium">Send Money To WING</span>
            <span className="text-gray-400">• Service Code</span>
          </div>
          <span className="text-xs text-gray-500">10 Jan 2026 - Present</span>
        </div>
      ),
      displayText: "Send Money To WING",
      searchText: "send money to wing smw001 10 jan 2026 present",
    },
    {
      value: 102,
      label: (
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-medium">Bill Payment - Retail Payment</span>
            <span className="text-gray-400">• Service Code</span>
          </div>
          <span className="text-xs text-gray-500">15 Feb 2025 - Present</span>
        </div>
      ),
      displayText: "Bill Payment - Retail Payment",
      searchText: "bill payment retail payment bprp001 15 feb 2025 present",
    },
    {
      value: 103,
      label: (
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-medium">Cash Withdrawal ATM</span>
            <span className="text-gray-400">• Service Code</span>
          </div>
          <span className="text-xs text-gray-500">20 Mar 2024 - Present</span>
        </div>
      ),
      displayText: "Cash Withdrawal ATM",
      searchText: "cash withdrawal atm cwa001 20 mar 2024 present",
    },
    {
      value: 104,
      label: (
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-medium">Home Delivery</span>
            <span className="text-gray-400">• Service Code</span>
          </div>
          <span className="text-xs text-gray-500">5 Apr 2023 - Present</span>
        </div>
      ),
      displayText: "Home Delivery",
      searchText: "home delivery hd001 5 apr 2023 present",
    },
  ];

  // 🔹 Payer Control Group Options
  const payerOptions: MultiSelectOption<string>[] = [
    { value: "retail", label: "Bill Payment - Retail Payment" },
    { value: "atm", label: "Cash Withdrawal ATM" },
    { value: "home_delivery", label: "Home Delivery" },
    { value: "outbound", label: "Intl Remittance - Outbound Merchant" },
    { value: "ang_pao", label: "Ang Pao" },
    { value: "cash_pickup", label: "International Remittance - Cash Pickup" },
  ];

  function onSubmit(data: FormValues) {
    console.log("Form Data:", data);
  }

  const breadcrumbItems = [
    { label: "System" },
    {
      label: "System Role",
    },
    { label: "Create" },
  ];

  const selectedServices = watch("services");
  const selectedPayerGroups = watch("payerGroups");

  const selectedServiceItems = serviceOptions
    .filter((opt) => selectedServices?.includes(opt.value))
    .map((opt) => ({
      id: opt.value,
      label: opt.displayText,
    }));

  const selectedPayerItems = payerOptions
    .filter((opt) => selectedPayerGroups.includes(opt.value))
    .map((opt) => ({
      id: opt.value,
      label: opt.label,
    }));

  const hasService = selectedServiceItems.length > 0;
  const hasPayer = selectedPayerItems.length > 0;

  return (
    <>
      <PageHeader
        breadcrumbs={breadcrumbItems}
        title="New System Roles"
        actions={
          <div className="flex gap-2.5">
            <Button
              variant="outline"
              className="flex gap-2 h-10"
              onClick={() => console.log("Discard")}
            >
              Discard
            </Button>

            <Button
              variant="wing"
              className="flex gap-2 h-10"
              onClick={handleSubmit(onSubmit)}
            >
              {"Submit"}
            </Button>
          </div>
        }
      />

      <div className="bg-white rounded-xl p-1.5 space-y-6">
        <div className="bg-brand-gray-50 rounded-[10px] flex gap-3 items-center p-6">
          <div className="border-2 border-[#66B105] h-[23px]" />
          <p className="font-semibold text-[20px] flex items-center gap-3">
            Create System Role
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 items-start">
          {!hasService && (
            <>
              <MultiSelect
                control={control}
                name="services"
                label="Service"
                required
                placeholder="Select Service"
                options={serviceOptions}
                searchable
                searchPlacement="inline"
                showSelectAll
                selectAllLabel="Select All Services"
              />

              <MultiSelect
                control={control}
                name="payerGroups"
                label="Payer Control Group"
                required
                placeholder="Select Payer Control Group"
                options={payerOptions}
                searchable
                searchPlacement="inline"
                showSelectAll
                selectAllLabel="Select All Payer Groups"
              />
            </>
          )}

          {hasService && (
            <>
              <MultiSelect
                control={control}
                name="services"
                label="Service"
                required
                placeholder="Select Service"
                options={serviceOptions}
                searchable
                searchPlacement="inline"
                showSelectAll
                selectAllLabel="Select All Services"
              />
              <div className="pt-10">
                <SelectedItemsSummary
                  title={
                    <>
                      Selected Services:{" "}
                      <span>{selectedServiceItems.length}</span>
                    </>
                  }
                  items={selectedServiceItems}
                  onRemove={(id) =>
                    setValue(
                      "services",
                      selectedServices.filter((v) => v !== id),
                    )
                  }
                  onClearAll={() => setValue("services", [])}
                />
              </div>

              <MultiSelect
                control={control}
                name="payerGroups"
                label="Payer Control Group"
                required
                placeholder="Select Payer Control Group"
                options={payerOptions}
                searchable
                searchPlacement="inline"
                showSelectAll
                selectAllLabel="Select All Payer Groups"
              />

              {hasPayer ? (
                <div className="pt-10">
                  <SelectedItemsSummary
                    title={
                      <>
                        Selected Payer Groups:{" "}
                        <span>{selectedPayerItems.length}</span>
                      </>
                    }
                    items={selectedPayerItems}
                    onRemove={(id) =>
                      setValue(
                        "payerGroups",
                        selectedPayerGroups.filter((v) => v !== id),
                      )
                    }
                    onClearAll={() => setValue("payerGroups", [])}
                  />
                </div>
              ) : (
                <div />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default CreateSystemGroupRole;
