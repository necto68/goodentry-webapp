import { ConnectWalletMainButton } from "../../form-components/components/ConnectWalletMainButton";
import { WrongNetworkMainButton } from "../../form-components/components/WrongNetworkMainButton";
import { getPairConfig } from "../../pair/helpers/getPairConfig";
import { useTradePanelQueries } from "../../trade-panel/hooks/useTradePanelQueries";
import { useWallet } from "../../wallet/hooks/useWallet";
import { isInsufficientTokenAllowanceForOpenPosition } from "../helpers/isInsufficientTokenAllowanceForOpenPosition";
import { useOpenPositionModalState } from "../stores/useOpenPositionModalState";
import { useOpenPositionModalTransactions } from "../stores/useOpenPositionModalTransactions";

import { ApproveMainButton } from "./ApproveMainButton";
import { OpenPositionButton } from "./OpenPositionButton";

export const OpenPositionModalMainButton = () => {
  const { isConnected, chainId: selectedChainId } = useWallet();

  const { pairId, quoteTokenInputState } = useOpenPositionModalState();
  const { tokenApproveTransaction } = useOpenPositionModalTransactions();
  const { quoteTokenQuery } = useTradePanelQueries(pairId);

  const { chainId } = getPairConfig(pairId);

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

  if (isInsufficientAllowance || isTokenApproveMutationLoading) {
    return <ApproveMainButton />;
  }

  return <OpenPositionButton />;
};
