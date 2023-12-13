import { Button } from "@chakra-ui/react";

import { ConnectWalletMainButton } from "../../form-components/components/ConnectWalletMainButton";
import { ErrorMainButton } from "../../form-components/components/ErrorMainButton";
import { WrongNetworkMainButton } from "../../form-components/components/WrongNetworkMainButton";
import { ZeroBalanceMainButton } from "../../form-components/components/ZeroBalanceMainButton";
import { usePairLendingPool } from "../../ge-wallet/hooks/usePairLendingPool";
import { useIsGeWalletInfoLoadingStore } from "../../ge-wallet/stores/useIsGeWalletInfoLoadingStore";
import { isInsufficientTokenBalance } from "../../input-card/helpers/tokenBalance";
import { usePairChainId } from "../../protected-perps-page/hooks/usePairChainId";
import { loadingPlaceholder } from "../../shared/constants/placeholders";
import { getZero } from "../../shared/helpers/bigjs";
import { getAvailableMargin } from "../../shared/helpers/formatters";
import { useWallet } from "../../wallet/hooks/useWallet";
import { areAddressesEqual } from "../../web3/helpers/addresses";
import { useHasOppositePosition } from "../hooks/useHasOppositePosition";
import { useOpenedPositions } from "../hooks/useOpenedPosition";
import { useTicker } from "../hooks/useTicker";
import { useTickerTokenInputState } from "../hooks/useTickerTokenInputState";
import { useTradePanelState } from "../stores/useTradePanelState";

// import { OpenTradeModalButton } from "./OpenTradeModalButton";

// eslint-disable-next-line complexity, sonarjs/cognitive-complexity
export const TradePanelMainButton = () => {
  const { isConnected, chainId: selectedChainId } = useWallet();
  const chainId = usePairChainId();

  const { isGeWalletInfoLoading } = useIsGeWalletInfoLoadingStore();

  const { selectedTab, selectedPairId, selectedTickerAddress } =
    useTradePanelState();
  const { tokenData, inputValueBig } = useTickerTokenInputState();

  const { symbol = "" } =
    useTicker(selectedPairId, selectedTickerAddress) ?? {};
  const lendingPool = usePairLendingPool();

  const { availableCollateral, maxLeverage } = lendingPool ?? {};

  const isZeroBalance = inputValueBig.lte(0);

  const isInsufficientBorrowableLiquidity = isInsufficientTokenBalance(
    inputValueBig,
    tokenData
  );

  const isInsufficientAvailableMargin =
    availableCollateral && maxLeverage
      ? inputValueBig.gt(getAvailableMargin(availableCollateral, maxLeverage))
      : false;

  const openedPositions = useOpenedPositions(selectedPairId);

  const hasOpenedPosition = openedPositions.some(
    (position) =>
      selectedTickerAddress &&
      !areAddressesEqual(position.ticker.address, selectedTickerAddress)
  );

  const openedPosition = openedPositions.find(
    (position) =>
      selectedTickerAddress &&
      areAddressesEqual(position.ticker.address, selectedTickerAddress)
  );

  const openedPositionSize = openedPosition ? openedPosition.size : getZero();

  const hasOppositePosition = useHasOppositePosition(
    selectedTab,
    selectedTickerAddress
  );

  const isInsufficientSize = inputValueBig.lt(20);
  const isMaxSizeReached = inputValueBig.add(openedPositionSize).gt(2000);

  if (!isConnected) {
    return <ConnectWalletMainButton />;
  }

  if (selectedChainId && selectedChainId !== chainId) {
    return <WrongNetworkMainButton />;
  }

  if (!selectedTickerAddress) {
    return <Button isDisabled>Select Activation Price</Button>;
  }

  if (isZeroBalance) {
    return <ZeroBalanceMainButton />;
  }

  if (isInsufficientBorrowableLiquidity) {
    return <ErrorMainButton title="Insufficient Borrowable Liquidity" />;
  }

  if (isInsufficientAvailableMargin) {
    return <ErrorMainButton title="Insufficient Available Margin" />;
  }

  if (hasOpenedPosition) {
    return <ErrorMainButton title={`Close Existing ${symbol} Position`} />;
  }

  if (hasOppositePosition) {
    return <ErrorMainButton title={"Can't Long/Short same Activation Price"} />;
  }

  if (isInsufficientSize) {
    return <ErrorMainButton title="Min Size: 20 USDC.e" />;
  }

  if (isMaxSizeReached) {
    return <ErrorMainButton title="Max Size: 2000 USDC.e" />;
  }

  if (isGeWalletInfoLoading) {
    return <ErrorMainButton title={loadingPlaceholder} />;
  }

  // TODO: remove after unpause position opening
  // return <OpenTradeModalButton />;

  return <ErrorMainButton title="Position Opening is Paused" />;
};
