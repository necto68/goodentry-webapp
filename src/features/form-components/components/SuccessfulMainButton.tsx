import { Button } from "@chakra-ui/react";
import { useCallback } from "react";

import { useModal } from "../../shared/modal/hooks/useModal";

import type { FC } from "react";

interface SuccessfulMainButtonProps {
  readonly title: string;
}

export const SuccessfulMainButton: FC<SuccessfulMainButtonProps> = ({
  title,
}) => {
  const { hideModal } = useModal();

  const handleButtonClick = useCallback(() => {
    hideModal();
  }, [hideModal]);

  return (
    <Button onClick={handleButtonClick} variant="brand">
      {title}
    </Button>
  );
};
