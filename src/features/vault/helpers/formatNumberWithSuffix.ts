import Big from "big.js";

export const formatNumberWithSuffix = (number: Big): string => {
  const suffixes = ["", "k", "M", "B", "T", "P", "E", "Z", "Y"];

  let value = new Big(number);
  let suffixIndex = 0;

  while (value.gt(1000) && suffixIndex < suffixes.length - 1) {
    value = value.div(1000);
    suffixIndex += 1;
  }

  return `${value.toFixed(0)}${suffixes[suffixIndex]}`;
};
