import { InjectedNameSpace } from "@web3-onboard/injected-wallets/dist/types";

import { oktoWalletLogo } from "../../icons/wallet";
import { CustomProviderIdentityFlag } from "../types/CustomProviderIdentityFlag";
import { CustomProviderLabel } from "../types/CustomProviderLabel";
import { CustomWalletExternalUrl } from "../types/CustomWalletExternalUrl";

import type { EIP1193Provider } from "@web3-onboard/core";
import type { InjectedWalletModule } from "@web3-onboard/injected-wallets/dist/types";

export const oktoWalletModule: InjectedWalletModule = {
  label: CustomProviderLabel.OKTO_WALLET,

  injectedNamespace: InjectedNameSpace.Ethereum,

  checkProviderIdentity: (helpers) => {
    const provider = helpers.provider as {
      [identityFlag: string]: boolean | undefined;
    };

    const identityFlag = CustomProviderIdentityFlag.OKTO_WALLET;

    return (
      Boolean(provider) &&
      identityFlag in provider &&
      Boolean(provider[identityFlag])
    );
  },

  getIcon: async () => await Promise.resolve(oktoWalletLogo),

  getInterface: async () => {
    const provider = window.ethereum as EIP1193Provider;
    const walletInterface = { provider };

    return await Promise.resolve(walletInterface);
  },

  platforms: ["mobile"],

  externalUrl: CustomWalletExternalUrl.OKTO_WALLET,
};
