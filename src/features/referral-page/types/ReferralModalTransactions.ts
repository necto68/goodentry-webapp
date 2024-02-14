import type { useSetMyReferralCodeTransaction } from "../../transactions/transaction-hooks/useSetMyReferralCodeTransaction";
import type { useSetReferrerTransaction } from "../../transactions/transaction-hooks/useSetReferrerTransaction";

export interface ReferralModalTransactions {
  setReferrer: ReturnType<typeof useSetReferrerTransaction>;
  setMyRefCode: ReturnType<typeof useSetMyReferralCodeTransaction>;
}
