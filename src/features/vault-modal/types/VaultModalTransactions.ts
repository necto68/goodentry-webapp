import type { useTokenApproveTransaction } from "../../transactions/hooks/useTokenApproveTransaction";
import type { useVaultDepositTransaction } from "../../transactions/transaction-hooks/useVaultDepositTransaction";
import type { useVaultMigrationTransaction } from "../../transactions/transaction-hooks/useVaultMigrationTransaction";
import type { useVaultWithdrawTransaction } from "../../transactions/transaction-hooks/useVaultWithdrawTransaction";

export interface VaultModalTransactions {
  tokenApproveTransaction: ReturnType<typeof useTokenApproveTransaction>;
  vaultTokenApproveTransaction: ReturnType<typeof useTokenApproveTransaction>;
  depositTransaction: ReturnType<typeof useVaultDepositTransaction>;
  withdrawTransaction: ReturnType<typeof useVaultWithdrawTransaction>;
  migrateTransaction: ReturnType<typeof useVaultMigrationTransaction>;
}
