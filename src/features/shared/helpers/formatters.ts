import {
  loadingPlaceholder,
  notAvailablePlaceholder,
} from "../constants/placeholders";

import {
  getFormattedAmount,
  getFormattedAPY,
  getFormattedDurationParts,
  getFormattedFullCurrency,
} from "./baseFormatters";

import type { getDurationBetweenTimestamps } from "../../public-sale-page/helpers/getDurationBetweenTimestamps";
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

export const getFormattedBorrowRate = (
  borrowRate: number | null | undefined
) => {
  if (borrowRate === undefined) {
    return loadingPlaceholder;
  }

  if (borrowRate === null) {
    return notAvailablePlaceholder;
  }

  return getFormattedAPY(borrowRate, {
    minimumFractionDigits: 4,
  });
};

export const getFormattedRunway = (
  runwayDuration:
    | ReturnType<typeof getDurationBetweenTimestamps>
    | null
    | undefined
) => {
  if (runwayDuration === undefined) {
    return loadingPlaceholder;
  }

  if (runwayDuration === null) {
    return notAvailablePlaceholder;
  }

  const { days, hours, minutes, seconds } = runwayDuration;

  const [formattedDays, formattedHours, formattedMinutes] =
    getFormattedDurationParts(days, hours, minutes, seconds);

  const parts = [
    days > 0 ? `${formattedDays}d` : null,
    hours > 0 ? `${formattedHours}h` : null,
    minutes > 0 ? `${formattedMinutes}m` : null,
  ];

  return parts.filter(Boolean).join(" ");
};
