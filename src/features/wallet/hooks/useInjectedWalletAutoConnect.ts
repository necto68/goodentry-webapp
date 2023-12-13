import { useEffect } from "react";

import { useWallet } from "./useWallet";

export const useInjectedWalletAutoConnect = (
  providerLabel: string,
  providerIdentityFlag: string
) => {
  const { isConnected, connect } = useWallet();

  const provider = window.ethereum as {
    [identityFlag: string]: boolean | undefined;
  };

  const isInjectedWalletAvailable =
    Boolean(provider) &&
    providerIdentityFlag in provider &&
    Boolean(provider[providerIdentityFlag]);

  useEffect(() => {
    if (!isConnected && isInjectedWalletAvailable) {
      void connect({
        autoSelect: {
          label: providerLabel,
          disableModals: true,
        },
      });
    }
  }, [isConnected, isInjectedWalletAvailable, connect, providerLabel]);
};
