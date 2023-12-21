import {
  loadingPlaceholder,
  notAvailablePlaceholder,
} from "../constants/placeholders";

import { getFormattedAmount, getFormattedFullCurrency } from "./baseFormatters";

import type Big from "big.js";

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
