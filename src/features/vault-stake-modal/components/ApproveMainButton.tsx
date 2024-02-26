import { ApproveMainButton as BaseApproveMainButton } from "../../form-components/components/ApproveMainButton";
import { getVaultConfig } from "../../vault/helpers/getVaultConfig";
import { useVaultStakeModalQueries } from "../hooks/useVaultStakeModalQueries";
import { useVaultStakeModalState } from "../stores/useVaultStakeModalState";
import { useVaultStakeModalTransactions } from "../stores/useVaultStakeModalTransactions";

export const ApproveMainButton = () => {
  const { vaultId } = useVaultStakeModalState();
  const { tokenApproveTransaction } = useVaultStakeModalTransactions();
  const { vaultTokenQuery } = useVaultStakeModalQueries(vaultId);

  const vaultTokenData = vaultTokenQuery.data;

  const {
    addresses: { rewardTracker },
  } = getVaultConfig(vaultId);

  return (
    <BaseApproveMainButton
      spenderAddress={rewardTracker}
      tokenApproveTransaction={tokenApproveTransaction}
      tokenData={vaultTokenData}
    />
  );
};
