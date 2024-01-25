import { subDigits } from "../constants/formatters";

import { getExp } from "./bigjs";

import type { Big } from "big.js";

export const getFormattedCurrency = (
  value: number | string,
  options?: Partial<Intl.NumberFormatOptions>
) => {
  const { maximumFractionDigits = 0 } = options ?? {};
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits,
    ...options,
  });

  if (Number(Number(value).toFixed(maximumFractionDigits)) === 0) {
    return currencyFormatter.format(0);
  }

  return currencyFormatter.format(Number(value));
};

export const getFormattedFullCurrency = (
  value: number | string,
  options?: Partial<Intl.NumberFormatOptions>
) => {
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
    ...options,
  });

  return currencyFormatter.format(Number(value));
};

export const getFormattedProfitAndLoss = (
  value: number | string,
  options?: Partial<Intl.NumberFormatOptions>
) => {
  const formatterOptions: Intl.NumberFormatOptions = {
    ...options,
    signDisplay: "exceptZero",
  };

  return getFormattedFullCurrency(value, formatterOptions);
};

export const getFormattedAPY = (
  value: number,
  options?: Partial<Intl.NumberFormatOptions>
) => {
  const apyFormatter = new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 2,
    ...options,
  });

  const formattedValue = apyFormatter.format(value);

  return formattedValue === "-0%" ? "0%" : formattedValue;
};

export const getFormattedProfitAndLossPercentage = (
  value: number,
  options?: Partial<Intl.NumberFormatOptions>
) => {
  const formatterOptions: Intl.NumberFormatOptions = {
    signDisplay: "exceptZero",
    ...options,
  };

  return getFormattedAPY(value, formatterOptions);
};

export const getFormattedNumber = (
  value: number,
  options?: Partial<Intl.NumberFormatOptions>
) => {
  const numberFormatter = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
    ...options,
  });

  const formattedValue = numberFormatter.format(value);

  return formattedValue === "-0" ? "0" : formattedValue;
};

export const getFormattedDecimalAmount = (value: string) => {
  const regexResult = /(?<zeros>0{1,20})(?<decimals>\d+)/u.exec(value);

  if (!regexResult?.groups) {
    return value;
  }

  const { zeros, decimals } = regexResult.groups;

  const zerosLength = zeros.length;

  const subZerosLength = zerosLength
    .toString()
    .split("")
    .map((digit) => subDigits[Number(digit)])
    .join("");

  return `0${subZerosLength}${decimals}`;
};

export const getFormattedAmount = (
  value: Big,
  options?: Partial<Intl.NumberFormatOptions>
) => {
  const maximumFractionDigits = 4;
  const formatterOptions: Partial<Intl.NumberFormatOptions> = {
    ...options,
    maximumFractionDigits,
  };

  // minValue equals to 0.0001
  const minValue = getExp(-maximumFractionDigits);

  if (value.gt(0) && value.lt(minValue)) {
    const formattedValue = getFormattedNumber(
      minValue.toNumber(),
      formatterOptions
    );

    return `<${formattedValue}`;
  }

  return getFormattedNumber(value.toNumber(), formatterOptions);
};

export const getFormattedDate = (
  timestamp: number,
  options?: Partial<Intl.DateTimeFormatOptions>
) => {
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    ...options,
  });

  return dateFormatter.format(timestamp);
};

export const getFormattedShortDate = (
  timestamp: number,
  options?: Partial<Intl.DateTimeFormatOptions>
) =>
  getFormattedDate(timestamp, {
    hour: undefined,
    minute: undefined,
    second: undefined,
    ...options,
  });

export const getFormattedShortTime = (
  timestamp: number,
  options?: Partial<Intl.DateTimeFormatOptions>
) =>
  getFormattedDate(timestamp, {
    year: undefined,
    month: undefined,
    day: undefined,
    ...options,
  });

export const getFormattedDurationParts = (
  days: number,
  hours: number,
  minutes: number,
  seconds: number
) =>
  [days, hours, minutes, seconds].map((value) =>
    value.toString().padStart(2, "0")
  );

export const getFormattedLeverage = (leverage: number) => {
  const formattedLeverageValue = getFormattedNumber(leverage);

  return `${formattedLeverageValue}×`;
};
