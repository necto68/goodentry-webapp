import { Button } from "@chakra-ui/react";
import React from "react";
import { BiExit } from "react-icons/bi";

import { useWallet } from "../../wallet/hooks/useWallet";
import { getTruncatedAddress } from "../../web3/helpers/addresses";

export const DisconnectWalletButton = () => {
  const { account, disconnect } = useWallet();
  const truncatedAddress = account ? getTruncatedAddress(account) : null;

  return (
    <Button
      leftIcon={<BiExit size={18} />}
      onClick={() => {
        void disconnect();
      }}
      variant="border"
    >
      {truncatedAddress}
    </Button>
  );
};
