import { Button } from "@chakra-ui/react";
import { constants } from "ethers";
import { useCallback } from "react";

import { TransactionErrorMainButton } from "../../form-components/components/TransactionErrorMainButton";
import { useIsGeWalletInfoLoadingStore } from "../../ge-wallet/stores/useIsGeWalletInfoLoadingStore";
import { toTokenAmount } from "../../input-card/helpers/tokenAmount";
import { getPairConfig } from "../../pair/helpers/getPairConfig";
import { usePair } from "../../protected-perps-page/hooks/usePair";
import { getZero } from "../../shared/helpers/bigjs";
import { useTicker } from "../../trade-panel/hooks/useTicker";
import { TabType } from "../../trade-panel/types/TabType";
import { positionPartMultipliers } from "../constants/positionPartMultipliers";
import { useTradeModalState } from "../stores/useTradeModalState";
import { useTradeModalTransactions } from "../stores/useTradeModalTransactions";
import { Container } from "../styles/AdvancedClosePositionButton";
import { PositionPartMultiplier } from "../types/PositionPartMultiplier";

import { AdvancedClosePositionButton } from "./AdvancedClosePositionButton";

export const ClosePositionButton = () => {
  const { setIsGeWalletInfoLoading } = useIsGeWalletInfoLoadingStore();

  const { selectedTab, selectedPairId, selectedTickerAddress } =
    useTradeModalState();
  const ticker = useTicker(selectedPairId, selectedTickerAddress);
  const { closePositionTransaction } = useTradeModalTransactions();

  const { mutation, resetTransaction, runTransaction } =
    closePositionTransaction;

  const isLongTab = selectedTab === TabType.LONG;
  const { pairId, debtToken } = ticker ?? {};
  const poolId = pairId ? getPairConfig(pairId).poolId : undefined;
  const pair = usePair(pairId);
  const { token1Address } = pair ?? {};

  const handleButtonClick = useCallback(
    (positionPartMultiplier: PositionPartMultiplier) => {
      if (poolId && selectedTickerAddress && debtToken && token1Address) {
        // calculate debtTokenAmount if we close part of position
        const multiplier = positionPartMultipliers[positionPartMultiplier];
        const debtTokenAmount =
          positionPartMultiplier !== PositionPartMultiplier.FULL &&
          debtToken.balance
            ? debtToken.balance.mul(multiplier)
            : getZero();
        const amount = toTokenAmount(debtTokenAmount, debtToken).toString();

        // provide USDC address if we close full position
        // otherwise - zero address
        const assetAddress =
          positionPartMultiplier === PositionPartMultiplier.FULL
            ? token1Address
            : constants.AddressZero;

        runTransaction(poolId, selectedTickerAddress, amount, assetAddress);

        // hide wallet info while all queries
        // are refetching after transaction
        setIsGeWalletInfoLoading(true);
      }
    },
    [
      poolId,
      selectedTickerAddress,
      debtToken,
      token1Address,
      runTransaction,
      setIsGeWalletInfoLoading,
    ]
  );

  const title = "Close Position";
  const loadingTitle = "Closing Position...";

  const { isError, isLoading } = mutation;

  if (isError) {
    return <TransactionErrorMainButton resetTransaction={resetTransaction} />;
  }

  return (
    <Container>
      <Button
        isLoading={isLoading}
        loadingText={loadingTitle}
        onClick={() => {
          handleButtonClick(PositionPartMultiplier.FULL);
        }}
        variant={isLongTab ? "brand" : "error"}
      >
        {title}
      </Button>
      {!isLoading ? (
        <AdvancedClosePositionButton handleButtonClick={handleButtonClick} />
      ) : null}
    </Container>
  );
};
