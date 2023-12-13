import { Button } from "@chakra-ui/react";
import { useCallback } from "react";
import { LiaParachuteBoxSolid } from "react-icons/lia";

import { useModal } from "../../shared/modal/hooks/useModal";
import { ModalType } from "../../shared/modal/types/ModalType";

export const AirdropButton = () => {
  const { pushModal } = useModal();

  const handleClick = useCallback(() => {
    pushModal(ModalType.AIRDROP);
  }, [pushModal]);

  return (
    <Button
      leftIcon={<LiaParachuteBoxSolid size={21} />}
      onClick={handleClick}
      variant="border"
    >
      Airdrop
    </Button>
  );
};
