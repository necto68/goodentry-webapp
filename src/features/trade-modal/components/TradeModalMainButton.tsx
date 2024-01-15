import { ConnectWalletMainButton } from "../../form-components/components/ConnectWalletMainButton";
import { WrongNetworkMainButton } from "../../form-components/components/WrongNetworkMainButton";
import { getPairConfig } from "../../pair/helpers/getPairConfig";
import { useTradePanelQueries } from "../../trade-panel/hooks/useTradePanelQueries";
import { useWallet } from "../../wallet/hooks/useWallet";
import { isInsufficientTokenAllowanceForOpenPosition } from "../helpers/isInsufficientTokenAllowanceForOpenPosition";
import { useTradeModalState } from "../stores/useTradeModalState";
import { useTradeModalTransactions } from "../stores/useTradeModalTransactions";
import { TradeModalType } from "../types/TradeModalType";

import { ApproveMainButton } from "./ApproveMainButton";
import { ClosePositionButton } from "./ClosePositionButton";
import { OpenPositionButton } from "./OpenPositionButton";

export const TradeModalMainButton = () => {
  const { isConnected, chainId: selectedChainId } = useWallet();

  const { selectedPairId, quoteTokenInputState, modalType } =
    useTradeModalState();

  const { tokenApproveTransaction } = useTradeModalTransactions();
  const { quoteTokenQuery } = useTradePanelQueries(selectedPairId);

  const { chainId } = getPairConfig(selectedPairId);

  const isOpenPositionModalType = modalType === TradeModalType.OPEN_POSITION;
  const { isLoading: isTokenApproveMutationLoading } =
    tokenApproveTransaction.mutation;

  const isInsufficientAllowance = isInsufficientTokenAllowanceForOpenPosition(
    quoteTokenInputState,
    quoteTokenQuery
  );

  if (!isConnected) {
    return <ConnectWalletMainButton />;
  }

  if (selectedChainId && selectedChainId !== chainId) {
    return <WrongNetworkMainButton />;
  }

  if (
    isOpenPositionModalType &&
    (isInsufficientAllowance || isTokenApproveMutationLoading)
  ) {
    return <ApproveMainButton />;
  }

  return isOpenPositionModalType ? (
    <OpenPositionButton />
  ) : (
    <ClosePositionButton />
  );
};
