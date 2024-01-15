import { Button } from "@chakra-ui/react";
import { useCallback } from "react";

import { TransactionErrorMainButton } from "../../form-components/components/TransactionErrorMainButton";
import { toTokenAmount } from "../../input-card/helpers/tokenAmount";
import { usePairPrices } from "../../protected-perps-page/hooks/usePairPrices";
import { getPositionSize } from "../../trade-panel/helpers/getPositionSize";
import { useTradePanelQueries } from "../../trade-panel/hooks/useTradePanelQueries";
import { TabType } from "../../trade-panel/types/TabType";
import { useTradeModalState } from "../stores/useTradeModalState";
import { useTradeModalTransactions } from "../stores/useTradeModalTransactions";

export const OpenPositionButton = () => {
  const {
    selectedTab,
    selectedPairId,
    quoteTokenInputState,
    selectedLeverage,
  } = useTradeModalState();
  const { baseTokenPrice } = usePairPrices(selectedPairId) ?? {};
  const { baseTokenQuery, quoteTokenQuery } =
    useTradePanelQueries(selectedPairId);
  const { openPositionTransaction } = useTradeModalTransactions();

  const { mutation, resetTransaction, runTransaction } =
    openPositionTransaction;

  const isLongTab = selectedTab === TabType.LONG;
  const positionSize = getPositionSize(quoteTokenInputState, selectedLeverage);

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

      const notionalAmount = isLongTab
        ? baseTokenNotionalAmount
        : quoteTokenNotionalAmount;

      runTransaction(
        isLongTab,
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
    isLongTab,
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
      variant={isLongTab ? "brand" : "error"}
    >
      {title}
    </Button>
  );
};
