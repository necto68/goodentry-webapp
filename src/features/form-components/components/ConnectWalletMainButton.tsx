import { Button } from "@chakra-ui/react";
import { useCallback } from "react";

import { useModal } from "../../shared/modal/hooks/useModal";
import { useWallet } from "../../wallet/hooks/useWallet";

export const ConnectWalletMainButton = () => {
  const { connect } = useWallet();
  const { hideModal } = useModal();

  const handleButtonClick = useCallback(() => {
    hideModal();
    void connect();
  }, [connect, hideModal]);

  return <Button onClick={handleButtonClick}>Connect Wallet</Button>;
};
