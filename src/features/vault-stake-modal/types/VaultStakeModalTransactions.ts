import type { useTokenApproveTransaction } from "../../transactions/hooks/useTokenApproveTransaction";
import type { useRewardTrackerClaimTransaction } from "../../transactions/transaction-hooks/useRewardTrackerClaimTransaction";
import type { useRewardTrackerStakeTransaction } from "../../transactions/transaction-hooks/useRewardTrackerStakeTransaction";
import type { useRewardTrackerUnstakeTransaction } from "../../transactions/transaction-hooks/useRewardTrackerUnstakeTransaction";

export interface VaultStakeModalTransactions {
  tokenApproveTransaction: ReturnType<typeof useTokenApproveTransaction>;
  stakeTransaction: ReturnType<typeof useRewardTrackerStakeTransaction>;
  unstakeTransaction: ReturnType<typeof useRewardTrackerUnstakeTransaction>;
  claimTransaction: ReturnType<typeof useRewardTrackerClaimTransaction>;
}
