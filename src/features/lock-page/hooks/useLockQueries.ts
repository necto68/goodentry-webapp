import { useLockDataQuery } from "../../queries/hooks/useLockDataQuery";
import { useTokenQuery } from "../../queries/hooks/useTokenQuery";
import { getLockConfig } from "../helpers/getLockConfig";

export const useLockQueries = () => {
  const {
    chainId,
    addresses: { lockToken, governanceToken },
  } = getLockConfig();

  const lockTokenQuery = useTokenQuery({
    chainId,
    tokenAddress: lockToken,
  });

  const governanceTokenQuery = useTokenQuery({
    chainId,
    tokenAddress: governanceToken,
  });

  const lockDataQuery = useLockDataQuery();

  return {
    lockTokenQuery,
    governanceTokenQuery,
    lockDataQuery,
  };
};
