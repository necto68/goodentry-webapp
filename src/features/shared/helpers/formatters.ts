import { getDurationBetweenTimestamps } from "../../public-sale-page/helpers/getDurationBetweenTimestamps";
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
  runwayInSeconds: number | null | undefined
) => {
  if (runwayInSeconds === undefined) {
    return loadingPlaceholder;
  }

  if (runwayInSeconds === null) {
    return notAvailablePlaceholder;
  }

  const toTimestamp = runwayInSeconds * 1000;
  const runwayDuration = getDurationBetweenTimestamps(0, toTimestamp);

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
