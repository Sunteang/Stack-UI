//V1
// export function cn(...classes: (string | undefined | false)[]) {
  //   return classes.filter(Boolean).join(" ");
  // }
  
  //V2
  import { twMerge } from 'tailwind-merge';
  import { clsx, type ClassValue } from 'clsx';
  import { Option, Column } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function classNames(
  ...args: (string | undefined | null | false | Record<string, boolean>)[]
): string {
  return args
    .flatMap((arg) => {
      if (!arg) return [];
      if (typeof arg === "string") return [arg];
      if (typeof arg === "object") {
        return Object.entries(arg)
          .filter(([_, value]) => value)
          .map(([key]) => key);
      }
      return [];
    })
    .join(" ");
}


export const getDefaultOption = (
  options: Option[],
  defaultValue?: string
): Option | null => {
  if (!defaultValue) return null;
  return options.find(opt => opt.value === defaultValue) || null;
};


export function createColumn<T>(column: Column<T>): Column<T> {
  return column;
}
