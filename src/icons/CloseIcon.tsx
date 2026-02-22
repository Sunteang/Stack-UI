import Icon, { IconProps } from "./Icon";

type CloseIconProps = Omit<IconProps, "children">;

export const CloseIcon: React.FC<CloseIconProps> = (props) => (
    <Icon {...props} viewBox="0 0 14 14">
      <path d="M11.1998 11.2L6.9998 7.35M6.9998 7.35L2.7998 3.5M6.9998 7.35L11.1998 3.5M6.9998 7.35L2.7998 11.2" stroke="#919191" strokeLinecap="round" strokeLinejoin="round"/>
    </Icon>
);
 