import { getPairConfig } from "../../pair/helpers/getPairConfig";
import { getExp, toBig } from "../../shared/helpers/bigjs";
import {
  IGoodEntryVault__factory as VaultFactory,
  IGoodEntryStrikePriceManager__factory as StrikePriceManager,
} from "../../smart-contracts/types";
import { getChainMetadata } from "../../web3/helpers/getChainMetadata";
import { getProvider } from "../../web3/helpers/getProvider";

import type { PairPrices } from "../types/PairPrices";

export const pairPricesFetcher = async (
  pairId: string
): Promise<PairPrices> => {
  const {
    chainId,
    addresses: { vault },
  } = getPairConfig(pairId);

  const {
    addresses: { strikePriceManager },
  } = getChainMetadata(chainId);

  const provider = getProvider(chainId);

  const vaultContract = VaultFactory.connect(vault, provider);
  const strikePriceManagerContract = StrikePriceManager.connect(
    strikePriceManager,
    provider
  );

  const [rawBaseTokenPrice] = await Promise.all([vaultContract.getBasePrice()]);

  const [rawLowerStrikePrice, rawUpperStrikePrice] = await Promise.all([
    strikePriceManagerContract.getStrikeBelow(rawBaseTokenPrice),
    strikePriceManagerContract.getStrikeAbove(rawBaseTokenPrice),
  ]);

  const priceDivisor = getExp(8);
  const [baseTokenPrice, lowerStrikePrice, upperStrikePrice] = [
    rawBaseTokenPrice,
    rawUpperStrikePrice,
    rawLowerStrikePrice,
  ].map((value) => toBig(value).div(priceDivisor).toNumber());

  return {
    id: pairId,
    baseTokenPrice,
    lowerStrikePrice,
    upperStrikePrice,
  };
};
