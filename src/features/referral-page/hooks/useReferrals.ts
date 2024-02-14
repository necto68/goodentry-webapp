import { useReferralsQuery } from "../../queries/hooks/useReferralsQuery";

export const useReferrals = () => {
  const referralsQuery = useReferralsQuery();

  return referralsQuery.data;
};
