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
import { useTradePanelState } from "../stores/useTradePanelState";

import { OpenTradeModalButton } from "./OpenTradeModalButton";

// eslint-disable-next-line complexity,sonarjs/cognitive-complexity
export const TradePanelMainButton = () => {
  const { isConnected, chainId: selectedChainId } = useWallet();
  const chainId = usePairChainId();

  const { quoteTokenInputState, selectedLeverage } = useTradePanelState();
  const { tokenData, inputValueBig, isError, error } = quoteTokenInputState;

  const positionSize = getPositionSize(quoteTokenInputState, selectedLeverage);

  const isZeroBalance = inputValueBig.lte(0);
  const isInsufficientQuoteTokenAmount = inputValueBig.lt(minQuoteTokenAmount);
  const isInsufficientPositionSize = positionSize.lt(minPositionSize);
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

  if (isInsufficientQuoteTokenAmount && tokenData) {
    return (
      <ErrorMainButton
        title={`Min Wager Size: ${minQuoteTokenAmount} ${tokenData.symbol}`}
      />
    );
  }

  if (isInsufficientPositionSize && tokenData) {
    return (
      <ErrorMainButton
        title={`Min Position Size: ${minPositionSize} ${tokenData.symbol}`}
      />
    );
  }

  if (isError) {
    return <TokenErrorMainButton error={error} tokenData={tokenData} />;
  }

  if (isInsufficientQuoteTokenBalanceIncludingExerciseFee && tokenData) {
    return (
      <ErrorMainButton
        title={`Exercise Fee: ${exerciseFee} ${tokenData.symbol}`}
      />
    );
  }

  return <OpenTradeModalButton />;
};
