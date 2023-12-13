import { Button } from "@chakra-ui/react";

import type { FC } from "react";

interface ErrorMainButtonProps {
  readonly title: string;
}

export const ErrorMainButton: FC<ErrorMainButtonProps> = ({ title }) => (
  <Button isDisabled>{title}</Button>
);
