import { ApproveMainButton as BaseApproveMainButton } from "../../form-components/components/ApproveMainButton";
import { getPairConfig } from "../../pair/helpers/getPairConfig";
import { useOpenPositionModalState } from "../stores/useOpenPositionModalState";
import { useOpenPositionModalTransactions } from "../stores/useOpenPositionModalTransactions";

export const ApproveMainButton = () => {
  const { pairId, quoteTokenInputState } = useOpenPositionModalState();
  const { tokenApproveTransaction } = useOpenPositionModalTransactions();

  const {
    addresses: { positionManager },
  } = getPairConfig(pairId);

  const { tokenData } = quoteTokenInputState;

  return (
    <BaseApproveMainButton
      spenderAddress={positionManager}
      tokenApproveTransaction={tokenApproveTransaction}
      tokenData={tokenData}
    />
  );
};
