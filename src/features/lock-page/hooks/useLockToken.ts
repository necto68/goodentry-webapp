import { useLockQueries } from "./useLockQueries";

export const useLockToken = () => {
  const { lockTokenQuery } = useLockQueries();

  return lockTokenQuery.data;
};
