import { Button } from "@chakra-ui/react";
import React from "react";
import { BiWallet } from "react-icons/bi";

import { useWallet } from "../../wallet/hooks/useWallet";

export const ConnectWalletButton = () => {
  const { isConnecting, connect } = useWallet();

  return (
    <Button
      isLoading={isConnecting}
      leftIcon={<BiWallet size={18} />}
      loadingText="Connecting"
      onClick={() => {
        void connect();
      }}
      variant="border"
    >
      Connect Wallet
    </Button>
  );
};
