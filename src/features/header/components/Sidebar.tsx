import { Box } from "@chakra-ui/react";
import React from "react";

import type { BoxProps } from "@chakra-ui/react";
import type { ReactNode } from "react";

interface SidebarProps extends BoxProps {
  readonly children: ReactNode;
}

export const SidebarContent = ({ children, ...rest }: SidebarProps) => (
  <Box bg="bg" h="full" {...rest}>
    {children}
  </Box>
);
