export type Orientation = "row" | "column";
export type Placement = 'auto' | 'top' | 'bottom';

export type Option<T> = {
  value: T;
  label: string;
  disabled?: boolean;
};

type OptionsProps<T> = {
  orientation?: Orientation;
  options: ReadonlyArray<Option<T>>;
  asyncOptions?: () => Promise<Option<T>[]>;
  defaultValue?: (T)[];
} & DefaultProps;

export type SingleProps<T> = {
  multiple?: false;
  value: T | null;
  onChange: (value: T | null) => void;
} & OptionsProps<T>;

export type MultiProps<T> = {
  multiple: true;
  value: T[];
  onChange: (value: T[]) => void;
} & OptionsProps<T>;

export type DefaultProps = {
  id?: string;
  name?: string;
  label?: string;
  description?: string;
  className?: string;
  htmlFor?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
}