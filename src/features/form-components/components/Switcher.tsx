import { Button, ButtonGroup } from "@chakra-ui/react";

import type { SwitcherProps } from "../types/SwitcherProps";
import type { FC } from "react";

export const Switcher: FC<SwitcherProps> = ({
  title0,
  title1,
  icon0,
  icon1,
  selectedTab,
  onTabClick,
}) => (
  <ButtonGroup isAttached size="sm">
    <Button
      leftIcon={icon0}
      onClick={() => {
        onTabClick(0);
      }}
      variant={selectedTab === 0 ? "brand" : "solid"}
      w="full"
    >
      {title0}
    </Button>
    <Button
      leftIcon={icon1}
      onClick={() => {
        onTabClick(1);
      }}
      variant={selectedTab === 1 ? "error" : "solid"}
      w="full"
    >
      {title1}
    </Button>
  </ButtonGroup>
);
