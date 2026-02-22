import Icon, { IconProps } from "./Icon";

type ArrowDownIconProps = Omit<IconProps, "children">& {
  size?: number | string; 
};

export const ArrowDownIcon: React.FC<ArrowDownIconProps> = ({size,...props}) => (
  <Icon {...props} size={size} viewBox="0 0 14 8">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L7 5.58579L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893C14.0976 0.683417 14.0976 1.31658 13.7071 1.70711L7.70711 7.70711C7.31658 8.09763 6.68342 8.09763 6.29289 7.70711L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z"
      fill="#A1A1A1"
    />
    <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
  </Icon>
);