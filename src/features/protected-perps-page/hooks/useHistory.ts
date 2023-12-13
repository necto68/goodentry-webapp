import { useHistoryQuery } from "../../queries/hooks/useHistoryQuery";

export const useHistory = () => {
  const historyQuery = useHistoryQuery();

  return historyQuery.data;
};
