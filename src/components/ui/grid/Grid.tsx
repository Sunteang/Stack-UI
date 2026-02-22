import React from "react";

type GridCols = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type GapSize = "none" | "sm" | "md" | "lg" | "xl";

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: GridCols;
  smCols?: GridCols;
  mdCols?: GridCols;
  lgCols?: GridCols;
  xlCols?: GridCols;
  gap?: GapSize;
  rowGap?: GapSize;
  colGap?: GapSize;
  children?: React.ReactNode;
}

const colMap = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
  7: "grid-cols-7",
  8: "grid-cols-8",
  9: "grid-cols-9",
  10: "grid-cols-10",
  11: "grid-cols-11",
  12: "grid-cols-12",
} as const;

const gapMap: Record<GapSize, string> = {
  none: "gap-0",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
};

const rowGapMap: Record<GapSize, string> = {
  none: "gap-y-0",
  sm: "gap-y-2",
  md: "gap-y-4",
  lg: "gap-y-6",
  xl: "gap-y-8",
};

const colGapMap: Record<GapSize, string> = {
  none: "gap-x-0",
  sm: "gap-x-2",
  md: "gap-x-4",
  lg: "gap-x-6",
  xl: "gap-x-8",
};

export const Grid: React.FC<GridProps> = ({
  cols,
  smCols,
  mdCols,
  lgCols,
  xlCols,
  gap,
  rowGap,
  colGap,
  children,
  className = "",
  ...rest
}) => {
  const colClasses = [
    cols ? colMap[cols] : "",
    smCols ? `sm:${colMap[smCols]}` : "",
    mdCols ? `md:${colMap[mdCols]}` : "",
    lgCols ? `lg:${colMap[lgCols]}` : "",
    xlCols ? `xl:${colMap[xlCols]}` : "",
  ];

  const gapClasses = [
    gap ? gapMap[gap] : "",
    rowGap ? rowGapMap[rowGap] : "",
    colGap ? colGapMap[colGap] : "",
  ];

  return (
    <div
      className={`grid ${colClasses.join(" ")} ${gapClasses.join(
        " "
      )} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};
