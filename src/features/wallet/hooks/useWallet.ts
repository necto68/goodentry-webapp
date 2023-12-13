import { useConnectWallet, useSetChain } from "@web3-onboard/react";
import { ethers } from "ethers";
import { useCallback } from "react";

import type { ChainId } from "../../web3/types/ChainId";
import type { ConnectOptions } from "@web3-onboard/core";

export const useWallet = () => {
  const [{ wallet, connecting }, connectWallet, disconnectWallet] =
    useConnectWallet();

  const [{ chains }, setChain] = useSetChain();

  const provider = wallet
    ? new ethers.providers.Web3Provider(wallet.provider, "any")
    : undefined;

  const connect = useCallback(
    async (options?: ConnectOptions) => {
      await connectWallet(options);
    },
    [connectWallet]
  );

  const disconnect = useCallback(async () => {
    if (wallet) {
      await disconnectWallet(wallet);
    }
  }, [wallet, disconnectWallet]);

  const switchChainId = useCallback(
    async (chainId: ChainId) => {
      const chain = chains.find(({ id }) => Number(id) === chainId);

      if (chain) {
        await setChain({
          chainId: chain.id,
          chainNamespace: chain.namespace,
        });
      }
    },
    [chains, setChain]
  );

  const account = wallet ? wallet.accounts[0].address.toLowerCase() : undefined;
  const chainId = wallet?.chains[0].id
    ? Number(wallet.chains[0].id)
    : undefined;
  const isConnected = Boolean(wallet);
  const isConnecting = connecting;

  return {
    account,
    chainId,
    provider,
    isConnected,
    isConnecting,
    connect,
    disconnect,
    switchChainId,
  };
};
