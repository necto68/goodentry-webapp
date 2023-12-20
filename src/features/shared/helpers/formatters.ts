import {
  loadingPlaceholder,
  notAvailablePlaceholder,
} from "../constants/placeholders";

import {
  getFormattedAmount,
  getFormattedAPY,
  getFormattedFullCurrency,
} from "./baseFormatters";
import { getZero } from "./bigjs";

import type { TokenData } from "../../queries/types/Token";
import type Big from "big.js";

export const getFormattedTotalCollateral = (
  collateralToken0: TokenData,
  collateralToken1: TokenData
) => {
  if (collateralToken0 === undefined || collateralToken1 === undefined) {
    return loadingPlaceholder;
  }

  const collateralToken0Balance = collateralToken0.balance;
  const collateralToken1Balance = collateralToken1.balance;

  if (collateralToken0Balance === null || collateralToken1Balance === null) {
    return notAvailablePlaceholder;
  }

  const formattedToken0Balance = getFormattedAmount(collateralToken0Balance);
  const formattedToken1Balance = getFormattedAmount(collateralToken1Balance);

  const collateralPrice = collateralToken0Balance
    .mul(collateralToken0.price)
    .add(collateralToken1Balance.mul(collateralToken1.price));

  const formattedCollateralPrice = getFormattedFullCurrency(
    collateralPrice.toNumber()
  );

  const formattedToken0 = `${formattedToken0Balance} ${collateralToken0.symbol}`;
  const formattedToken1 = `${formattedToken1Balance} ${collateralToken1.symbol}`;

  if (collateralToken0Balance.gt(0) && collateralToken1Balance.gt(0)) {
    return `${formattedToken0} + ${formattedToken1} (${formattedCollateralPrice})`;
  }

  if (collateralToken0Balance.gt(0)) {
    return `${formattedToken0} (${formattedCollateralPrice})`;
  }

  // show collateral in USDC, by default
  return `${formattedToken1} (${formattedCollateralPrice})`;
};

export const getAvailableMargin = (
  availableCollateral: Big,
  maxLeverage: number
) => availableCollateral.mul(maxLeverage);

export const getFormattedAvailableMargin = (
  availableCollateral: Big | null | undefined,
  maxLeverage: number | null | undefined,
  isRounded = false
) => {
  if (availableCollateral === undefined || maxLeverage === undefined) {
    return loadingPlaceholder;
  }

  if (availableCollateral === null || maxLeverage === null) {
    return notAvailablePlaceholder;
  }

  const availableMarginValue = getAvailableMargin(
    availableCollateral,
    maxLeverage
  );

  return getFormattedFullCurrency(
    availableMarginValue.toNumber(),
    isRounded ? { maximumFractionDigits: 0 } : undefined
  );
};

export const getFormattedEquity = (totalCollateral: Big | null | undefined) => {
  if (totalCollateral === undefined) {
    return loadingPlaceholder;
  }

  if (totalCollateral === null) {
    return notAvailablePlaceholder;
  }

  return getFormattedFullCurrency(totalCollateral.toNumber());
};

export const getMarginUsage = (
  totalCollateral: Big,
  totalDebt: Big,
  liquidationThreshold: number
) =>
  totalCollateral.gt(0) && liquidationThreshold > 0
    ? totalDebt.div(totalCollateral).div(liquidationThreshold)
    : getZero();

export const getFormattedMarginUsage = (
  totalCollateral: Big | null | undefined,
  totalDebt: Big | null | undefined,
  liquidationThreshold: number | null | undefined,
  isRounded = false
) => {
  if (
    totalCollateral === undefined ||
    totalDebt === undefined ||
    liquidationThreshold === undefined
  ) {
    return loadingPlaceholder;
  }

  if (
    totalCollateral === null ||
    totalDebt === null ||
    liquidationThreshold === null
  ) {
    return notAvailablePlaceholder;
  }

  const marginUsage = getMarginUsage(
    totalCollateral,
    totalDebt,
    liquidationThreshold
  );

  return getFormattedAPY(
    marginUsage.toNumber(),
    isRounded ? { minimumFractionDigits: 0 } : undefined
  );
};

export const getFormattedCurrentPrice = (
  currentPrice: number | null | undefined
) => {
  if (currentPrice === undefined) {
    return loadingPlaceholder;
  }

  if (currentPrice === null) {
    return notAvailablePlaceholder;
  }

  return getFormattedFullCurrency(currentPrice);
};

export const getFormattedTokenAmount = (amount: Big | null | undefined) => {
  if (amount === undefined) {
    return loadingPlaceholder;
  }

  if (amount === null) {
    return notAvailablePlaceholder;
  }

  return getFormattedAmount(amount);
};
