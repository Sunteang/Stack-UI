import Icon, { IconProps } from "./Icon";

type CheckIconProps = Omit<IconProps, "children">;
export const CheckIcon:React.FC<CheckIconProps> = (props) => (
  <Icon {...props} viewBox="0 0 16 16">
    <path d="M2.66675 8.40707L5.9488 11.6663L13.3334 4.33301"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
    />
  </Icon>
);
