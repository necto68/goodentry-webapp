import { usePositionsQuery } from "../../queries/hooks/usePositionsQuery";

export const usePositions = () => {
  const positionsQuery = usePositionsQuery();

  return positionsQuery.data;
};
