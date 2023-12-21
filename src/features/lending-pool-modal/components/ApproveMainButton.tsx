import { ApproveMainButton as BaseApproveMainButton } from "../../form-components/components/ApproveMainButton";
import { useLendingPoolModalTokenInputState } from "../hooks/useLendingPoolModalTokenInputState";
import { useLendingPoolModalState } from "../stores/useLendingPoolModalState";
import { useLendingPoolModalTransactions } from "../stores/useLendingPoolModalTransactions";

export const ApproveMainButton = () => {
  const { lendingPoolAddress } = useLendingPoolModalState();

  const { tokenApproveTransaction } = useLendingPoolModalTransactions();
  const { tokenData } = useLendingPoolModalTokenInputState();

  return (
    <BaseApproveMainButton
      spenderAddress={lendingPoolAddress}
      tokenApproveTransaction={tokenApproveTransaction}
      tokenData={tokenData}
    />
  );
};
