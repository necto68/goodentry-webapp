import { Button } from "@chakra-ui/react";
import { useCallback } from "react";

import { good } from "../../icons/coins";
import { useWallet } from "../../wallet/hooks/useWallet";
import { getPublicSaleConfig } from "../helpers/getPublicSaleConfig";
import { usePublicSaleToken } from "../hooks/usePublicSaleToken";

export const AddToWalletButton = () => {
  const { isConnected, chainId: selectedChainId, provider } = useWallet();
  const { chainId } = getPublicSaleConfig();

  const { address, symbol, decimals } = usePublicSaleToken() ?? {};

  const isDisabled = !isConnected || selectedChainId !== chainId;

  const handleButtonClick = useCallback(() => {
    if (!provider) {
      return;
    }

    void provider.send("wallet_watchAsset", {
      // @ts-expect-error web3js types needs array for params
      type: "ERC20",

      options: {
        address,
        symbol,
        decimals,
        image: good,
      },
    });
  }, [provider, address, symbol, decimals]);

  return (
    <Button isDisabled={isDisabled} onClick={handleButtonClick} variant="brand">
      Add to Wallet
    </Button>
  );
};
