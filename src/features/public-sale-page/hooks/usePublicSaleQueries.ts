import { usePublicSaleDataQuery } from "../../queries/hooks/usePublicSaleDataQuery";
import { useTokenQuery } from "../../queries/hooks/useTokenQuery";
import { getPublicSaleConfig } from "../helpers/getPublicSaleConfig";

export const usePublicSaleQueries = () => {
  const {
    chainId,
    addresses: { collateralToken, saleToken, crowdSale },
  } = getPublicSaleConfig();

  const collateralTokenQuery = useTokenQuery({
    chainId,
    tokenAddress: collateralToken,
    spenderAddress: crowdSale,
  });

  const saleTokenQuery = useTokenQuery({
    chainId,
    tokenAddress: saleToken,
  });

  const publicSaleDataQuery = usePublicSaleDataQuery();

  return {
    collateralTokenQuery,
    saleTokenQuery,
    publicSaleDataQuery,
  };
};
