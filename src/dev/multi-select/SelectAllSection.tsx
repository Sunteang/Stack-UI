import { SelectAllSectionProps } from "./types";
import { SelectAllButton } from "./SelectAllButton";

export function SelectAllSection({
  showSelectAll,
  options,
  selectedCount,
  selectAllLabel,
  onToggle,
}: SelectAllSectionProps) {
  if (!showSelectAll) return null;

  const total = options.length;
  const allChecked = total > 0 && selectedCount === total;
  const isIndeterminate =
    selectedCount > 0 && selectedCount < total;

  return (
    <SelectAllButton
      allChecked={allChecked}
      isIndeterminate={isIndeterminate}
      selectAllLabel={selectAllLabel}
      onToggle={onToggle}
    />
  );
}