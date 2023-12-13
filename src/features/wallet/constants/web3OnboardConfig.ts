import injectedModule, { ProviderLabel } from "@web3-onboard/injected-wallets";
import { init } from "@web3-onboard/react";

import { favicon, appLogo } from "../../icons/brand";
import { CustomProviderLabel } from "../types/CustomProviderLabel";
import { CustomWalletExternalUrl } from "../types/CustomWalletExternalUrl";

import { oktoWalletModule } from "./oktoWalletModule";
import { walletConnectModule } from "./walletConnectModule";

const supportedWalletsLabels = [
  ProviderLabel.OKXWallet,
  ProviderLabel.MetaMask,
  ProviderLabel.Rabby,
];

const supportedWalletsFilter = Object.fromEntries(
  Object.entries(ProviderLabel).map(([key, value]) => [
    key,
    supportedWalletsLabels.includes(value),
  ])
);

const injectedWalletsModule = injectedModule({
  custom: [oktoWalletModule],
  filter: supportedWalletsFilter,
});

export const web3OnboardConfig = init({
  theme: "dark",
  wallets: [injectedWalletsModule, walletConnectModule],

  chains: [
    {
      id: 42_161,
      token: "ETH",
      label: "Arbitrum One",
      rpcUrl: "https://arb1.arbitrum.io/rpc",
    },
  ],

  connect: {
    iDontHaveAWalletLink: "https://okx.com/web3",
    autoConnectLastWallet: true,
  },

  accountCenter: {
    desktop: {
      enabled: false,
    },

    mobile: {
      enabled: false,
    },
  },

  appMetadata: {
    name: "Good Entry",
    icon: favicon,
    logo: appLogo,
    description: "Good Entry",

    recommendedInjectedWallets: [
      {
        name: "OKX Wallet",
        url: "https://okx.com/web3",
      },
      {
        name: "MetaMask",
        url: "https://metamask.io",
      },
      {
        name: "Rabby",
        url: "https://rabby.io",
      },
      {
        name: CustomProviderLabel.OKTO_WALLET,
        url: CustomWalletExternalUrl.OKTO_WALLET,
      },
    ],
  },

  disableFontDownload: true,
});
