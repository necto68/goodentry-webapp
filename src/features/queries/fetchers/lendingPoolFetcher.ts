import { getPairConfig } from "../../pair/helpers/getPairConfig";
import { queryClient } from "../../shared/constants/queryClient";
import { getExp, toBig } from "../../shared/helpers/bigjs";
import { IAaveLendingPool__factory as LendingPoolFactory } from "../../smart-contracts/types";
import { getChainMetadata } from "../../web3/helpers/getChainMetadata";
import { getProvider } from "../../web3/helpers/getProvider";
import { getPairQueryOptions } from "../query-options-getters/getPairQueryOptions";

import type { LendingPool } from "../types/LendingPool";

export const lendingPoolFetcher = async (
  pairId: string,
  lendingPoolAddress: string,
  account?: string
): Promise<LendingPool> => {
  const { chainId } = getPairConfig(pairId);
  const {
    addresses: { lendingPoolGateway },
  } = getChainMetadata(chainId);

  const provider = getProvider(chainId);

  const id = pairId;
  const address = lendingPoolAddress;
  const gatewayAddress = lendingPoolGateway;

  const lendingPoolContract = LendingPoolFactory.connect(address, provider);

  const [{ token0Address, token1Address }] = await Promise.all([
    queryClient.ensureQueryData(getPairQueryOptions(pairId)),
  ]);

  const [aToken0Address, aToken1Address] = await Promise.all([
    lendingPoolContract
      .getReserveData(token0Address)
      .then(({ aTokenAddress }) => aTokenAddress),
    lendingPoolContract
      .getReserveData(token1Address)
      .then(({ aTokenAddress }) => aTokenAddress),
  ]);

  if (!account) {
    return {
      id,
      pairId,
      address,
      gatewayAddress,
      aToken0Address,
      aToken1Address,
      availableCollateral: null,
      totalCollateral: null,
      totalDebt: null,
      liquidationThreshold: null,
      loanToValue: null,
      maxLeverage: null,
      availableToWithdraw: null,
    };
  }

  const [userAccountData] = await Promise.all([
    lendingPoolContract.getUserAccountData(account),
  ]);

  const collateralDivisor = getExp(8);
  const loanToValueDivisor = getExp(4);

  const {
    availableBorrowsETH,
    totalCollateralETH,
    totalDebtETH,
    currentLiquidationThreshold,
    ltv,
  } = userAccountData;

  const [availableCollateral, totalCollateral, totalDebt] = [
    availableBorrowsETH,
    totalCollateralETH,
    totalDebtETH,
  ].map((value) => toBig(value).div(collateralDivisor));

  const [liquidationThreshold, loanToValue] = [
    currentLiquidationThreshold,
    ltv,
  ].map((value) => toBig(value).div(loanToValueDivisor).toNumber());

  const maxLeverage = Math.round(1 / (1 - loanToValue) - 1);

  const availableToWithdraw =
    liquidationThreshold > 0
      ? totalCollateral.sub(totalDebt.div(liquidationThreshold - 0.01))
      : totalCollateral.sub(totalDebt);

  return {
    id,
    pairId,
    address,
    gatewayAddress,
    aToken0Address,
    aToken1Address,
    availableCollateral,
    totalCollateral,
    totalDebt,
    liquidationThreshold,
    loanToValue,
    maxLeverage,
    availableToWithdraw,
  };
};
