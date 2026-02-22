import Icon, { IconProps } from "./Icon";
type AsteriskIconProps = Omit<IconProps, "children">& {
  size?: number | string; 
};

export const AsteriskIcon: React.FC<AsteriskIconProps>  = ({size, ...props}) => (
  <Icon {...props} size={size} viewBox="0 0 6 6">
    <path
      d="M2.24734 5.7271L2.32688 3.53959L0.47745 4.71289L0.000177599 3.87766L1.94904 2.86346L0.000177599 1.84925L0.47745 1.01403L2.32688 2.18732L2.24734 -0.00017786H3.20188L3.12234 2.18732L4.97177 1.01403L5.44904 1.84925L3.50018 2.86346L5.44904 3.87766L4.97177 4.71289L3.12234 3.53959L3.20188 5.7271H2.24734Z"
      fill="#E7000B"
    />
  </Icon>
);
