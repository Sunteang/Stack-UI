import Icon, { IconProps } from "./Icon";

type ChevronDownIconProps = Omit<IconProps, "children"> & {
  size?: number | string;
};

export const ChevronDownIcon: React.FC<ChevronDownIconProps> = ({
  size,
  ...props
}) => (
  <Icon {...props} size={size} viewBox="0 0 16 16">
    <path d="M8.005 11.5C7.74489 11.5 7.49479 11.3999 7.29471 11.2097L2.29262 6.20433C1.90246 5.81391 1.90246 5.18323 2.29262 4.79281C2.68278 4.4024 3.31305 4.4024 3.70321 4.79281L8.005 9.08741L12.2968 4.79281C12.687 4.4024 13.3172 4.4024 13.7074 4.79281C14.0975 5.18323 14.0975 5.81391 13.7074 6.20433L8.7153 11.2097C8.51521 11.4099 8.26511 11.5 8.005 11.5Z" />
  </Icon>
);
