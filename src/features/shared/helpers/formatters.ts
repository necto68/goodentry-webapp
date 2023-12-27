import {
  loadingPlaceholder,
  notAvailablePlaceholder,
} from "../constants/placeholders";

import {
  getFormattedAmount,
  getFormattedAPY,
  getFormattedFullCurrency,
} from "./baseFormatters";

import type Big from "big.js";

export const getFormattedPrice = (price: number | null | undefined) => {
  if (price === undefined) {
    return loadingPlaceholder;
  }

  if (price === null) {
    return notAvailablePlaceholder;
  }

  return getFormattedFullCurrency(price);
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

export const getFormattedBorrowRate = (borrowRate: number | undefined) => {
  if (borrowRate === undefined) {
    return loadingPlaceholder;
  }

  return getFormattedAPY(borrowRate, {
    minimumFractionDigits: 4,
  });
};
