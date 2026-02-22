import * as React from "react";

export type IconProps = {
  className?: string;
  size?: number;
  fill?: string;
  stroke?: string;
  viewBox?: string; 
  children: React.ReactNode;
};

const Icon = ({ className = "", size = 24, fill = "", stroke = "", viewBox = "0 0 28 28", children }: IconProps): React.JSX.Element => (
    <svg
        className={className}
        width={size}
        height={size}
        viewBox={viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
      {React.Children.map(children, (child) =>
          React.isValidElement(child)
              ? React.cloneElement(child as React.ReactElement<React.SVGProps<SVGElement>>, {
                fill: fill,
                stroke: stroke,
              })
              : child
      )}
    </svg>
);

export default Icon;