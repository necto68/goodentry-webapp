import { ApproveMainButton as BaseApproveMainButton } from "../../form-components/components/ApproveMainButton";
import { getVaultConfig } from "../../vault/helpers/getVaultConfig";
import { useVaultModalTokenInputState } from "../hooks/useVaultModalTokenInputState";
import { useVaultModalState } from "../stores/useVaultModalState";
import { useVaultModalTransactions } from "../stores/useVaultModalTransactions";

export const ApproveMainButton = () => {
  const { vaultId } = useVaultModalState();
  const { tokenApproveTransaction } = useVaultModalTransactions();
  const { tokenData } = useVaultModalTokenInputState();

  const {
    addresses: { vault },
  } = getVaultConfig(vaultId);

  return (
    <BaseApproveMainButton
      spenderAddress={vault}
      tokenApproveTransaction={tokenApproveTransaction}
      tokenData={tokenData}
    />
  );
};
