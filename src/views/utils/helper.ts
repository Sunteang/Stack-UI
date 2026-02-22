import { ApiResponse } from "@/types";

export function buildErrorDescription(response: ApiResponse) {
  const parts: string[] = [];
  if (response?.error_code) parts.push(`Code: ${response.error_code}`);
  if (response?.trace_id) parts.push(`Trace ID: ${response.trace_id}`);
  return parts.join(" • ");
}