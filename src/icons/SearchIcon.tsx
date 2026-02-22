import Icon, { IconProps } from "./Icon";

type SearchIconProps = Omit<IconProps, "children">;

export const SearchIcon: React.FC<SearchIconProps> = (props) => (
    <Icon {...props}>
      <path d="M27.8495 27.8493L21.4524 21.4522M24.9083 13.1434C24.9083 19.6408 19.6411 24.9081 13.1436 24.9081C6.64614 24.9081 1.37891 19.6408 1.37891 13.1434C1.37891 6.6459 6.64614 1.37866 13.1436 1.37866C19.6411 1.37866 24.9083 6.6459 24.9083 13.1434Z" fill="none" stroke="#B3B6BB" strokeWidth="2.75735" strokeLinecap="round" strokeLinejoin="round"/>
    </Icon>
);