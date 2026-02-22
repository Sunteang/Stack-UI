export function defaultGetKey<T>(v: T): string | number {
  if (typeof v === "string" || typeof v === "number") return v;
  try {
    return JSON.stringify(v);
  } catch {
    return String(v);
  }
}
