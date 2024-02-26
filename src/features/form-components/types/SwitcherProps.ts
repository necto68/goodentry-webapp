import type { ButtonProps } from "@chakra-ui/react";

export interface SwitcherProps {
  title0: string;
  title1: string;
  icon0: ButtonProps["leftIcon"];
  icon1: ButtonProps["leftIcon"];
  tab: 0 | 1;
  onTabClick: (tab: 0 | 1) => void;
}
