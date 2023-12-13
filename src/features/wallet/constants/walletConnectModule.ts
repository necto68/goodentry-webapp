import walletConnect from "@web3-onboard/walletconnect";

import type { WalletConnectOptions } from "@web3-onboard/walletconnect/dist/types";

const options: WalletConnectOptions = {
  projectId: "75a7a573eea2e5c561a9e613c37af020",
  requiredChains: [42_161],
  dappUrl: "https://app.goodentry.io",
};

export const walletConnectModule = walletConnect(options);
