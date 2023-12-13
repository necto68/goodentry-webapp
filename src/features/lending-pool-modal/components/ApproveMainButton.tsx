import { ApproveMainButton as BaseApproveMainButton } from "../../form-components/components/ApproveMainButton";
import { useLendingPool } from "../../ge-wallet/hooks/useLendingPool";
import { getPairConfig } from "../../pair/helpers/getPairConfig";
import { isWrappedNativeCoinAddress } from "../../queries/helpers/wrappedNativeCoin";
import { useLendingPoolModalTokenInputState } from "../hooks/useLendingPoolModalTokenInputState";
import { useLendingPoolModalState } from "../stores/useLendingPoolModalState";
import { useLendingPoolModalTransactions } from "../stores/useLendingPoolModalTransactions";

export const ApproveMainButton = () => {
  const { pairId, lendingPoolAddress } = useLendingPoolModalState();
  const { gatewayAddress } = useLendingPool(pairId, lendingPoolAddress) ?? {};

  const { tokenApproveTransaction } = useLendingPoolModalTransactions();
  const { tokenData } = useLendingPoolModalTokenInputState();

  const { chainId } = getPairConfig(pairId);

  const isWrappedUnderlyingAsset = isWrappedNativeCoinAddress(
    tokenData?.underlyingAssetAddress ?? "",
    chainId
  );

  const spenderAddress = isWrappedUnderlyingAsset
    ? gatewayAddress
    : lendingPoolAddress;

  return (
    <BaseApproveMainButton
      spenderAddress={spenderAddress}
      tokenApproveTransaction={tokenApproveTransaction}
      tokenData={tokenData}
    />
  );
};
