import { getPairConfig } from "../../pair/helpers/getPairConfig";
import { useTokenQuery } from "../../queries/hooks/useTokenQuery";

export const useTradePanelQueries = (pairId: string) => {
  const {
    chainId,
    addresses: { quoteToken, positionManager },
  } = getPairConfig(pairId);

  const quoteTokenQuery = useTokenQuery({
    chainId,
    tokenAddress: quoteToken,
    spenderAddress: positionManager,
  });

  return {
    quoteTokenQuery,
  };
};
