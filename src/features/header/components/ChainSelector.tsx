import { Button } from "@chakra-ui/react";

import { arb } from "../../icons/coins";
import { useWallet } from "../../wallet/hooks/useWallet";
import { ChainId } from "../../web3/types/ChainId";
import { Icon } from "../styles/ChainSelector";

export const ChainSelector = () => {
  const { switchChainId, chainId } = useWallet();
  const isArbitrum = chainId === ChainId.ARBITRUM;

  return (
    <Button
      leftIcon={isArbitrum ? <Icon src={arb} /> : undefined}
      onClick={() => {
        void switchChainId(ChainId.ARBITRUM);
      }}
      variant="border"
    >
      {isArbitrum ? "Arbitrum" : "Wrong Network"}
    </Button>
  );
};
