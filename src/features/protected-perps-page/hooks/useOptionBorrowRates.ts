import { useDebounce } from "use-debounce";

import { useOptionBorrowRatesQuery } from "../../queries/hooks/useOptionBorrowRatesQuery";

import { usePairPrices } from "./usePairPrices";

import type Big from "big.js";

export const useOptionBorrowRates = (pairId: string, positionSize: Big) => {
  const [debouncedPositionSize, debouncedState] = useDebounce(
    positionSize,
    300,
    {
      equalityFn: (a, b) => a.toString() === b.toString(),
    }
  );

  const pairPrices = usePairPrices(pairId);

  const optionBorrowRates = useOptionBorrowRatesQuery(
    pairId,
    debouncedPositionSize,
    pairPrices
  );

  // return undefined when positionSize has changed
  if (debouncedState.isPending()) {
    return undefined;
  }

  return optionBorrowRates.data;
};
