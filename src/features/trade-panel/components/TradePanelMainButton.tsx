import { ConnectWalletMainButton } from "../../form-components/components/ConnectWalletMainButton";
import { ErrorMainButton } from "../../form-components/components/ErrorMainButton";
import { TokenErrorMainButton } from "../../form-components/components/TokenErrorMainButton";
import { WrongNetworkMainButton } from "../../form-components/components/WrongNetworkMainButton";
import { ZeroBalanceMainButton } from "../../form-components/components/ZeroBalanceMainButton";
import { isInsufficientTokenBalance } from "../../input-card/helpers/tokenBalance";
import { getPairConfig } from "../../pair/helpers/getPairConfig";
import { useWallet } from "../../wallet/hooks/useWallet";
import {
  minPositionSize,
  minQuoteTokenAmount,
} from "../constants/openPosition";
import { getCollateralAmountIncludingFee } from "../helpers/getCollateralAmountIncludingFee";
import { getPositionSize } from "../helpers/getPositionSize";
import { useMaxPositionSize } from "../hooks/useMaxPositionSize";
import { useTradePanelState } from "../stores/useTradePanelState";

import { OpenTradeModalButton } from "./OpenTradeModalButton";

// eslint-disable-next-line complexity
export const TradePanelMainButton = () => {
  const { isConnected, chainId: selectedChainId } = useWallet();

  const { pairId, quoteTokenInputState, leverage } = useTradePanelState();
  const maxPositionSize = useMaxPositionSize();

  const { chainId } = getPairConfig(pairId);

  const { tokenData, inputValueBig, isError, error } = quoteTokenInputState;
  const positionSize = getPositionSize(quoteTokenInputState, leverage);
  const collateralAmount = getCollateralAmountIncludingFee(inputValueBig);

  const isZeroBalance = inputValueBig.lte(0);
  const isInsufficientQuoteTokenAmount = inputValueBig.lt(minQuoteTokenAmount);
  const isInsufficientPositionSize = positionSize.lt(minPositionSize);
  const isMaxPositionSizeReached = maxPositionSize
    ? positionSize.gt(maxPositionSize)
    : false;
  const isInsufficientQuoteTokenBalanceIncludingFee =
    isInsufficientTokenBalance(collateralAmount, tokenData);

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

  if (isInsufficientQuoteTokenBalanceIncludingFee) {
    return <ErrorMainButton title="Insufficient Balance (Exercise Fee)" />;
  }

  if (isMaxPositionSizeReached) {
    return <ErrorMainButton title="Max Position Size Reached" />;
  }

  return <OpenTradeModalButton />;
};
