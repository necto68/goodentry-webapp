import { useDebounce } from "usehooks-ts";

import { useOptionBorrowRatesQuery } from "../../queries/hooks/useOptionBorrowRatesQuery";

import type Big from "big.js";

export const useOptionBorrowRates = (pairId: string, positionSize: Big) => {
  const debouncedPositionSize = useDebounce(positionSize, 500);

  const optionBorrowRates = useOptionBorrowRatesQuery(
    pairId,
    debouncedPositionSize
  );

  return optionBorrowRates.data;
};
