import { getPairConfig } from "../../pair/helpers/getPairConfig";
import { getExp, toBig } from "../../shared/helpers/bigjs";
import {
  IGoodEntryVault__factory as VaultFactory,
  IGoodEntryStrikePriceManager__factory as StrikePriceManagerFactory,
  IGoodEntryPriceOracle__factory as PriceOracleFactory,
} from "../../smart-contracts/types";
import { getChainMetadata } from "../../web3/helpers/getChainMetadata";
import { getProvider } from "../../web3/helpers/getProvider";

import type { PairPrices } from "../types/PairPrices";

export const pairPricesFetcher = async (
  pairId: string
): Promise<PairPrices> => {
  const {
    chainId,
    addresses: { baseToken, vault },
  } = getPairConfig(pairId);

  const {
    addresses: { priceOracle, strikePriceManager },
  } = getChainMetadata(chainId);

  const provider = getProvider(chainId);

  const vaultContract = VaultFactory.connect(vault, provider);
  const strikePriceManagerContract = StrikePriceManagerFactory.connect(
    strikePriceManager,
    provider
  );
  const priceOracleContract = PriceOracleFactory.connect(priceOracle, provider);

  const [rawBaseTokenPrice] = await Promise.all([vaultContract.getBasePrice()]);

  const [rawFirstLowerStrikePrice, rawFirstUpperStrikePrice, rawVolatility] =
    await Promise.all([
      strikePriceManagerContract.getStrikeBelow(rawBaseTokenPrice),
      strikePriceManagerContract.getStrikeAbove(rawBaseTokenPrice),
      priceOracleContract.getAdjustedVolatility(baseToken, 0),
    ]);

  const [rawSecondLowerStrikePrice, rawSecondUpperStrikePrice] =
    await Promise.all([
      strikePriceManagerContract.getStrikeStrictlyBelow(
        rawFirstLowerStrikePrice
      ),
      strikePriceManagerContract.getStrikeStrictlyAbove(
        rawFirstUpperStrikePrice
      ),
    ]);

  const priceDivisor = getExp(8);
  const [baseTokenPrice, lowerStrikePrice, upperStrikePrice, volatility] = [
    rawBaseTokenPrice,
    rawSecondLowerStrikePrice,
    rawSecondUpperStrikePrice,
    rawVolatility,
  ].map((value) => toBig(value).div(priceDivisor).toNumber());

  return {
    id: pairId,
    baseTokenPrice,
    lowerStrikePrice,
    upperStrikePrice,
    volatility,
  };
};
