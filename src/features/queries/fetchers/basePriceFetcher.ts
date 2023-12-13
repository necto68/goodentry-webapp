import { getExp, getZero, toBig } from "../../shared/helpers/bigjs";
import { IAaveOracle__factory as AaveOracleFactory } from "../../smart-contracts/types";
import { zeroAddress } from "../../web3/constants/addresses";
import { areAddressesEqual } from "../../web3/helpers/addresses";
import { getChainMetadata } from "../../web3/helpers/getChainMetadata";
import { getProvider } from "../../web3/helpers/getProvider";

import type { ChainId } from "../../web3/types/ChainId";

export const basePriceFetcher = async (
  chainId: ChainId,
  tokenAddress: string
): Promise<number> => {
  const provider = getProvider(chainId);

  const {
    addresses: { priceOracle },
  } = getChainMetadata(chainId);

  const oracleContract = AaveOracleFactory.connect(priceOracle, provider);

  const sourceOfAsset = await oracleContract.getSourceOfAsset(tokenAddress);
  const isTokenPriceExist = !areAddressesEqual(sourceOfAsset, zeroAddress);

  const rawPrice = isTokenPriceExist
    ? await oracleContract.getAssetPrice(tokenAddress).then(toBig)
    : getZero();

  const priceDivisor = getExp(8);
  return rawPrice.div(priceDivisor).toNumber();
};
