import { getPairConfig } from "../../pair/helpers/getPairConfig";
import { useTokenQuery } from "../../queries/hooks/useTokenQuery";

export const useTradePanelQueries = (pairId: string) => {
  const {
    chainId,
    addresses: { baseToken, quoteToken, positionManager },
  } = getPairConfig(pairId);

  const baseTokenQuery = useTokenQuery({
    chainId,
    tokenAddress: baseToken,
  });

  const quoteTokenQuery = useTokenQuery({
    chainId,
    tokenAddress: quoteToken,
    spenderAddress: positionManager,
  });

  return {
    baseTokenQuery,
    quoteTokenQuery,
  };
};
