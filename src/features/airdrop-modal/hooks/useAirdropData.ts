import { useAirdropDataQuery } from "../../queries/hooks/useAirdropDataQuery";

export const useAirdropData = () => {
  const airdropDataQuery = useAirdropDataQuery();

  return airdropDataQuery.data;
};
