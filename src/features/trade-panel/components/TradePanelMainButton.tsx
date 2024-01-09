import { ConnectWalletMainButton } from "../../form-components/components/ConnectWalletMainButton";
import { ErrorMainButton } from "../../form-components/components/ErrorMainButton";
import { TokenErrorMainButton } from "../../form-components/components/TokenErrorMainButton";
import { WrongNetworkMainButton } from "../../form-components/components/WrongNetworkMainButton";
import { ZeroBalanceMainButton } from "../../form-components/components/ZeroBalanceMainButton";
import { isInsufficientTokenBalance } from "../../input-card/helpers/tokenBalance";
import { usePairChainId } from "../../protected-perps-page/hooks/usePairChainId";
import { useWallet } from "../../wallet/hooks/useWallet";
import {
  exerciseFee,
  minPositionSize,
  minQuoteTokenAmount,
} from "../constants/openPosition";
import { getPositionSize } from "../helpers/getPositionSize";
import { useMaxPositionSize } from "../hooks/useMaxPositionSize";
import { useTradePanelState } from "../stores/useTradePanelState";

import { OpenTradeModalButton } from "./OpenTradeModalButton";

// eslint-disable-next-line complexity
export const TradePanelMainButton = () => {
  const { isConnected, chainId: selectedChainId } = useWallet();
  const chainId = usePairChainId();

  const { quoteTokenInputState, selectedLeverage } = useTradePanelState();
  const maxPositionSize = useMaxPositionSize();

  const { tokenData, inputValueBig, isError, error } = quoteTokenInputState;
  const positionSize = getPositionSize(quoteTokenInputState, selectedLeverage);

  const isZeroBalance = inputValueBig.lte(0);
  const isInsufficientQuoteTokenAmount = inputValueBig.lt(minQuoteTokenAmount);
  const isInsufficientPositionSize = positionSize.lt(minPositionSize);
  const isMaxPositionSizeReached = maxPositionSize
    ? positionSize.gt(maxPositionSize)
    : false;
  const isInsufficientQuoteTokenBalanceIncludingExerciseFee =
    isInsufficientTokenBalance(inputValueBig.add(exerciseFee), tokenData);

  if (!isConnected) {
    return <ConnectWalletMainButton />;
  }

  if (selectedChainId && selectedChainId !== chainId) {
    return <WrongNetworkMainButton />;
  }

  if (isZeroBalance) {
    return <ZeroBalanceMainButton />;
  }

  if (isInsufficientQuoteTokenAmount) {
    return <ErrorMainButton title="Insufficient Wager" />;
  }

  if (isInsufficientPositionSize) {
    return <ErrorMainButton title="Insufficient Position Size" />;
  }

  if (isError) {
    return <TokenErrorMainButton error={error} tokenData={tokenData} />;
  }

  if (isInsufficientQuoteTokenBalanceIncludingExerciseFee) {
    return <ErrorMainButton title="Insufficient Balance (Exercise Fee)" />;
  }

  if (isMaxPositionSizeReached) {
    return <ErrorMainButton title="Max Position Size Reached" />;
  }

  return <OpenTradeModalButton />;
};
