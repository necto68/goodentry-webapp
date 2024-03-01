import { Button } from "@chakra-ui/react";

import { getImageSourceByChainId } from "../../icons/helpers/getImageSourceByChainId";
import { useWallet } from "../../wallet/hooks/useWallet";
import { getChainConfig } from "../../web3/helpers/getChainConfig";
import { ChainId } from "../../web3/types/ChainId";
import { Icon } from "../styles/ChainSelector";

const appChain = ChainId.ARBITRUM;

export const ChainSelector = () => {
  const { switchChainId, chainId } = useWallet();

  const { title } = getChainConfig(appChain);
  const chainLogo = getImageSourceByChainId(appChain);

  const isAppChain = chainId === appChain;

  return (
    <Button
      leftIcon={isAppChain && chainLogo ? <Icon src={chainLogo} /> : undefined}
      onClick={() => {
        void switchChainId(appChain);
      }}
      variant="border"
    >
      {isAppChain ? title : "Wrong Network"}
    </Button>
  );
};
