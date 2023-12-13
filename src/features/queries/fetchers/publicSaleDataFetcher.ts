import { getPublicSaleConfig } from "../../public-sale-page/helpers/getPublicSaleConfig";
import { queryClient } from "../../shared/constants/queryClient";
import { getExp, getZero, toBig } from "../../shared/helpers/bigjs";
import { IGoodEntryCrowdSale__factory as CrowdSaleFactory } from "../../smart-contracts/types";
import { getProvider } from "../../web3/helpers/getProvider";
import { getTokenQueryOptions } from "../query-options-getters/getTokenQueryOptions";
import { PublicSaleStatus } from "../types/PublicSaleData";

import type { PublicSaleData } from "../types/PublicSaleData";

const getPublicSaleStatus = (
  startTimestamp: number,
  endTimestamp: number
): PublicSaleStatus => {
  const currentTimestamp = Date.now();

  if (currentTimestamp < startTimestamp) {
    return PublicSaleStatus.NOT_STARTED;
  }

  if (currentTimestamp < endTimestamp) {
    return PublicSaleStatus.IN_PROGRESS;
  }

  if (currentTimestamp >= endTimestamp) {
    return PublicSaleStatus.ENDED;
  }

  return PublicSaleStatus.NOT_STARTED;
};

export const publicSaleDataFetcher = async (
  account?: string
): Promise<PublicSaleData> => {
  const {
    chainId,
    addresses: {
      collateralToken: collateralTokenAddress,
      saleToken: saleTokenAddress,
      crowdSale,
    },
  } = getPublicSaleConfig();

  const provider = getProvider(chainId);

  const crowdSaleContract = CrowdSaleFactory.connect(crowdSale, provider);

  const [
    collateralToken,
    saleToken,
    rawCollateralTokenDeposited,
    rawCollateralTokenTotalDeposited,
    rawCollateralTokenCap,
    rawSaleTokenCap,
    rawSaleTokenClaimable,
    startDate,
    endDate,
    isPaused,
  ] = await Promise.all([
    queryClient.ensureQueryData(
      getTokenQueryOptions(chainId, collateralTokenAddress, crowdSale, account)
    ),
    queryClient.ensureQueryData(
      getTokenQueryOptions(chainId, saleTokenAddress, undefined, account)
    ),
    account ? crowdSaleContract.contributions(account).then(toBig) : null,
    crowdSaleContract.totalContributions().then(toBig),
    crowdSaleContract.hardcap().then(toBig),
    crowdSaleContract.crowdsaleTokenCap().then(toBig),
    account ? crowdSaleContract.claimable(account).then(toBig) : getZero(),
    crowdSaleContract.startDate().then(toBig),
    crowdSaleContract.endDate().then(toBig),
    crowdSaleContract.isPaused(),
  ]);

  const collateralTokenDivisor = getExp(collateralToken.decimals);
  const saleTokenDivisor = getExp(saleToken.decimals);

  const collateralTokenDeposited = rawCollateralTokenDeposited
    ? rawCollateralTokenDeposited.div(collateralTokenDivisor)
    : null;
  const [collateralTokenTotalDeposited, collateralTokenCap] = [
    rawCollateralTokenTotalDeposited,
    rawCollateralTokenCap,
  ].map((value) => value.div(collateralTokenDivisor));

  const [saleTokenCap] = [rawSaleTokenCap].map((value) =>
    value.div(saleTokenDivisor)
  );

  const saleTokenPrice = saleTokenCap.gt(0)
    ? collateralTokenCap.div(saleTokenCap).toNumber()
    : 0;

  let saleTokenBought = null;

  if (collateralTokenDeposited === null) {
    saleTokenBought = null;
  } else if (saleTokenPrice === 0) {
    saleTokenBought = getZero();
  } else {
    saleTokenBought = collateralTokenDeposited.div(saleTokenPrice);
  }

  const saleTokenTotalBought = collateralTokenCap.gt(0)
    ? collateralTokenTotalDeposited.div(collateralTokenCap).mul(saleTokenCap)
    : getZero();

  const isSaleTokenClaimable = rawSaleTokenClaimable.gt(0);

  const [startTimestamp, endTimestamp] = [startDate, endDate].map((date) =>
    date.mul(1000).toNumber()
  );

  const status = getPublicSaleStatus(startTimestamp, endTimestamp);

  return {
    collateralTokenDeposited,
    collateralTokenTotalDeposited,
    collateralTokenCap,
    saleTokenPrice,
    saleTokenBought,
    saleTokenTotalBought,
    saleTokenCap,
    isSaleTokenClaimable,
    startTimestamp,
    endTimestamp,
    isPaused,
    status,
  };
};
