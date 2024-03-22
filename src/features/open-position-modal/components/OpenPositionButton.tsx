import { Button } from "@chakra-ui/react";
import { useCallback } from "react";

import { TransactionErrorMainButton } from "../../form-components/components/TransactionErrorMainButton";
import { toTokenAmount } from "../../input-card/helpers/tokenAmount";
import { usePairPrices } from "../../protected-perps-page/hooks/usePairPrices";
import { getPositionSize } from "../../trade-panel/helpers/getPositionSize";
import { isPositionSideLong } from "../../trade-panel/helpers/isPositionSideLong";
import { useTradePanelQueries } from "../../trade-panel/hooks/useTradePanelQueries";
import { useOpenPositionModalState } from "../stores/useOpenPositionModalState";
import { useOpenPositionModalTransactions } from "../stores/useOpenPositionModalTransactions";

export const OpenPositionButton = () => {
  const { positionSide, pairId, quoteTokenInputState, leverage } =
    useOpenPositionModalState();
  const { baseTokenPrice } = usePairPrices(pairId) ?? {};
  const { baseTokenQuery, quoteTokenQuery } = useTradePanelQueries(pairId);
  const { openPositionTransaction } = useOpenPositionModalTransactions();

  const { mutation, resetTransaction, runTransaction } =
    openPositionTransaction;

  const isLong = isPositionSideLong(positionSide);
  const positionSize = getPositionSize(quoteTokenInputState, leverage);

  const baseToken = baseTokenQuery.data;
  const quoteToken = quoteTokenQuery.data;

  const handleButtonClick = useCallback(() => {
    if (baseTokenPrice && baseToken && quoteToken) {
      const { inputValueBig } = quoteTokenInputState;

      const baseTokenNotionalAmount = toTokenAmount(
        positionSize.div(baseTokenPrice),
        baseToken
      );
      const quoteTokenNotionalAmount = toTokenAmount(positionSize, quoteToken);
      const collateralAmount = toTokenAmount(inputValueBig, quoteToken);

      const notionalAmount = isLong
        ? baseTokenNotionalAmount
        : quoteTokenNotionalAmount;

      runTransaction(
        isLong,
        notionalAmount.toString(),
        collateralAmount.toString()
      );
    }
  }, [
    baseTokenPrice,
    baseToken,
    quoteToken,
    quoteTokenInputState,
    positionSize,
    isLong,
    runTransaction,
  ]);

  const title = "Open Position";
  const loadingTitle = "Opening Position...";

  const { isError, isLoading } = mutation;

  if (isError) {
    return <TransactionErrorMainButton resetTransaction={resetTransaction} />;
  }

  return (
    <Button
      isLoading={isLoading}
      loadingText={loadingTitle}
      onClick={handleButtonClick}
      variant={isLong ? "long" : "short"}
    >
      {title}
    </Button>
  );
};
