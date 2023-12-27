import { constants } from "ethers";

import { getExp, toBig } from "../../shared/helpers/bigjs";
import { IGoodEntryVault__factory as GoodEntryVaultFactory } from "../../smart-contracts/types";
import { areAddressesEqual } from "../../web3/helpers/addresses";
import { getProvider } from "../../web3/helpers/getProvider";

import { tokenFetcher } from "./tokenFetcher";

import type { ChainId } from "../../web3/types/ChainId";
import type { VaultToken } from "../types/VaultToken";

export const vaultTokenFetcher = async (
  chainId: ChainId,
  tokenAddress: string,
  spenderAddress?: string,
  account?: string
): Promise<VaultToken> => {
  const provider = getProvider(chainId);

  const vaultContract = GoodEntryVaultFactory.connect(tokenAddress, provider);

  const [baseToken, rawReserves] = await Promise.all([
    tokenFetcher(chainId, tokenAddress, spenderAddress, account),
    vaultContract.getReserves(),
  ]);

  const totalValueLockedDivisor = getExp(8);

  const rawTotalValueLocked = toBig(rawReserves.valueX8);
  const totalValueLocked = rawTotalValueLocked.div(totalValueLockedDivisor);

  const price = totalValueLocked.div(baseToken.totalSupply).toNumber();

  // if the spender is the vault, we set the allowance to MaxUint256
  // because we don't need to approve the vault to spend vault token
  const allowance =
    spenderAddress && areAddressesEqual(tokenAddress, spenderAddress)
      ? toBig(constants.MaxUint256)
      : baseToken.allowance;

  return {
    ...baseToken,
    allowance,
    price,
  };
};
