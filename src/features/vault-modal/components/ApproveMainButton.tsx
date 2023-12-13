import { ApproveMainButton as BaseApproveMainButton } from "../../form-components/components/ApproveMainButton";
import { useVaultModalTokenInputState } from "../hooks/useVaultModalTokenInputState";
import { useVaultModalState } from "../stores/useVaultModalState";
import { useVaultModalTransactions } from "../stores/useVaultModalTransactions";

export const ApproveMainButton = () => {
  const { vaultAddress } = useVaultModalState();
  const { tokenApproveTransaction } = useVaultModalTransactions();
  const { tokenData } = useVaultModalTokenInputState();

  return (
    <BaseApproveMainButton
      spenderAddress={vaultAddress}
      tokenApproveTransaction={tokenApproveTransaction}
      tokenData={tokenData}
    />
  );
};
