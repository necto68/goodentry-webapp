import { ApproveMainButton as BaseApproveMainButton } from "../../form-components/components/ApproveMainButton";
import { getPublicSaleConfig } from "../../public-sale-page/helpers/getPublicSaleConfig";
import { useCollateralTokenInputState } from "../hooks/useCollateralTokenInputState";
import { usePublicSaleModalTransactions } from "../stores/usePublicSaleModalTransactions";

export const ApproveMainButton = () => {
  const {
    addresses: { crowdSale },
  } = getPublicSaleConfig();
  const { tokenApproveTransaction } = usePublicSaleModalTransactions();
  const { tokenData } = useCollateralTokenInputState();

  return (
    <BaseApproveMainButton
      spenderAddress={crowdSale}
      tokenApproveTransaction={tokenApproveTransaction}
      tokenData={tokenData}
    />
  );
};
