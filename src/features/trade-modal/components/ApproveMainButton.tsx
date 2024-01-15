import { ApproveMainButton as BaseApproveMainButton } from "../../form-components/components/ApproveMainButton";
import { getPairConfig } from "../../pair/helpers/getPairConfig";
import { useTradeModalState } from "../stores/useTradeModalState";
import { useTradeModalTransactions } from "../stores/useTradeModalTransactions";

export const ApproveMainButton = () => {
  const { selectedPairId, quoteTokenInputState } = useTradeModalState();
  const { tokenApproveTransaction } = useTradeModalTransactions();

  const {
    addresses: { positionManager },
  } = getPairConfig(selectedPairId);

  const { tokenData } = quoteTokenInputState;

  return (
    <BaseApproveMainButton
      spenderAddress={positionManager}
      tokenApproveTransaction={tokenApproveTransaction}
      tokenData={tokenData}
    />
  );
};
