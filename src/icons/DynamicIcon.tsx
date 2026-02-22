import * as React from "react";
import { ArrowDownIcon } from "./ArrowDownIcon";
import { AsteriskIcon } from "./AsteriskIcon";
import { CheckIcon } from "./CheckIcon";
import { ChevronDownIcon } from "./ChevronDownIcon";
import { CloseIcon } from "./CloseIcon";
import { ProgressActivityIcon } from "./ProgressActivityIcon";
import { SearchIcon } from "./SearchIcon";
import { GenericDefaultIcon } from "./GenericDefaultIcon";


export type IconName =
    | "arrow_down"
    | "asterisk"
    | "check"
    | "chevron_down"
    | "close"
    | "progress_activity"
    | "search"

type IconProps = {
  className?: string;
  size?: number;
  fill?: string;
  stroke?: string;
};

const iconMap: Record<IconName, React.FC<IconProps>> = {
  arrow_down: ArrowDownIcon,
  asterisk: AsteriskIcon,
  check: CheckIcon,
  chevron_down: ChevronDownIcon,
  close: CloseIcon,
  progress_activity: ProgressActivityIcon,
  search: SearchIcon,
};

const DefaultIcon = GenericDefaultIcon;

export const DynamicIcon: React.FC<{ name: string } & IconProps> = ({
                                                                      name,
                                                                      ...rest
                                                                    }) => {
  const IconComponent = (iconMap as Record<string, React.FC<IconProps>>)[name] ?? DefaultIcon;
  return <IconComponent {...rest} />;
};
