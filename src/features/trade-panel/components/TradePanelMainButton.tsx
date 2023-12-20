import { ConnectWalletMainButton } from "../../form-components/components/ConnectWalletMainButton";
import { ErrorMainButton } from "../../form-components/components/ErrorMainButton";
import { WrongNetworkMainButton } from "../../form-components/components/WrongNetworkMainButton";
import { ZeroBalanceMainButton } from "../../form-components/components/ZeroBalanceMainButton";
import { usePairLendingPool } from "../../ge-wallet/hooks/usePairLendingPool";
import { useIsGeWalletInfoLoadingStore } from "../../ge-wallet/stores/useIsGeWalletInfoLoadingStore";
import { isInsufficientTokenBalance } from "../../input-card/helpers/tokenBalance";
import { usePairChainId } from "../../protected-perps-page/hooks/usePairChainId";
import { loadingPlaceholder } from "../../shared/constants/placeholders";
import { getAvailableMargin } from "../../shared/helpers/formatters";
import { useWallet } from "../../wallet/hooks/useWallet";
import { useTickerTokenInputState } from "../hooks/useTickerTokenInputState";

// import { OpenTradeModalButton } from "./OpenTradeModalButton";

// eslint-disable-next-line complexity, sonarjs/cognitive-complexity
export const TradePanelMainButton = () => {
  const { isConnected, chainId: selectedChainId } = useWallet();
  const chainId = usePairChainId();

  const { isGeWalletInfoLoading } = useIsGeWalletInfoLoadingStore();

  const { tokenData, inputValueBig } = useTickerTokenInputState();

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

  const isInsufficientSize = inputValueBig.lt(20);

  if (!isConnected) {
    return <ConnectWalletMainButton />;
  }

  if (selectedChainId && selectedChainId !== chainId) {
    return <WrongNetworkMainButton />;
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

  if (isInsufficientSize) {
    return <ErrorMainButton title="Min Size: 20 USDC.e" />;
  }

  if (isGeWalletInfoLoading) {
    return <ErrorMainButton title={loadingPlaceholder} />;
  }

  // TODO: remove after unpause position opening
  // return <OpenTradeModalButton />;

  return <ErrorMainButton title="Position Opening is Paused" />;
};
