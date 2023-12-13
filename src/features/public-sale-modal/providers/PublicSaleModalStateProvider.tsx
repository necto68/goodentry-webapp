import { createContext, useMemo } from "react";

import { defaultTokenInputState } from "../../input-card/constants/defaultTokenInputState";
import { toInputValueBig } from "../../input-card/helpers/toInputValueBig";
import { useTokenInputState } from "../../input-card/hooks/useTokenInputState";
import { usePublicSaleQueries } from "../../public-sale-page/hooks/usePublicSaleQueries";
import { getZero } from "../../shared/helpers/bigjs";

import type { PublicSaleModalState } from "../types/PublicSaleModalState";
import type { FC, ReactNode } from "react";

interface PublicSaleModalStateProviderProps {
  readonly children: ReactNode;
}

export const PublicSaleModalStateContext = createContext<PublicSaleModalState>({
  collateralTokenInputState: defaultTokenInputState,
  saleTokenInputState: defaultTokenInputState,
});

export const PublicSaleModalStateProvider: FC<
  PublicSaleModalStateProviderProps
> = ({ children }) => {
  const { collateralTokenQuery, saleTokenQuery, publicSaleDataQuery } =
    usePublicSaleQueries();

  const collateralTokenData = collateralTokenQuery.data;
  const rawSaleTokenData = saleTokenQuery.data;
  const publicSaleData = publicSaleDataQuery.data;

  const {
    saleTokenPrice = 0,
    saleTokenTotalBought,
    saleTokenCap,
  } = publicSaleData ?? {};

  const saleTokenData =
    rawSaleTokenData && saleTokenTotalBought && saleTokenCap
      ? {
          ...rawSaleTokenData,
          balance: saleTokenCap.sub(saleTokenTotalBought),
        }
      : undefined;

  const rawCollateralTokenInputState = useTokenInputState([
    collateralTokenData,
  ]);
  const rawSaleTokenInputState = useTokenInputState([saleTokenData]);

  // override setInputValue to update saleTokenInputState
  const collateralTokenInputState = useMemo(
    () => ({
      ...rawCollateralTokenInputState,

      setInputValue: (nextInputValue: string) => {
        const saleTokenAmount =
          saleTokenPrice > 0
            ? toInputValueBig(nextInputValue).div(saleTokenPrice)
            : getZero();
        const saleTokenInputValue = saleTokenAmount.toString();

        rawCollateralTokenInputState.setInputValue(nextInputValue);
        rawSaleTokenInputState.setInputValue(saleTokenInputValue);
      },
    }),
    [rawCollateralTokenInputState, rawSaleTokenInputState, saleTokenPrice]
  );

  // override setInputValue to update collateralTokenInputState
  const saleTokenInputState = useMemo(
    () => ({
      ...rawSaleTokenInputState,

      setInputValue: (nextInputValue: string) => {
        const collateralTokenAmount =
          toInputValueBig(nextInputValue).mul(saleTokenPrice);
        const collateralTokenInputValue = collateralTokenAmount.toString();

        rawSaleTokenInputState.setInputValue(nextInputValue);
        rawCollateralTokenInputState.setInputValue(collateralTokenInputValue);
      },
    }),
    [rawSaleTokenInputState, rawCollateralTokenInputState, saleTokenPrice]
  );

  const value = useMemo(
    () => ({
      collateralTokenInputState,
      saleTokenInputState,
    }),
    [collateralTokenInputState, saleTokenInputState]
  );

  return (
    <PublicSaleModalStateContext.Provider value={value}>
      {children}
    </PublicSaleModalStateContext.Provider>
  );
};
