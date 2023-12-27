import { ConnectWalletMainButton } from "../../form-components/components/ConnectWalletMainButton";
import { ErrorMainButton } from "../../form-components/components/ErrorMainButton";
import { WrongNetworkMainButton } from "../../form-components/components/WrongNetworkMainButton";
import { ZeroBalanceMainButton } from "../../form-components/components/ZeroBalanceMainButton";
import { isInsufficientTokenBalance } from "../../input-card/helpers/tokenBalance";
import { usePairChainId } from "../../protected-perps-page/hooks/usePairChainId";
import { useWallet } from "../../wallet/hooks/useWallet";
import { useQuoteTokenInputState } from "../hooks/useQuoteTokenInputState";

// import { OpenTradeModalButton } from "./OpenTradeModalButton";

export const TradePanelMainButton = () => {
  const { isConnected, chainId: selectedChainId } = useWallet();
  const chainId = usePairChainId();

  const { tokenData, inputValueBig } = useQuoteTokenInputState();

  const isZeroBalance = inputValueBig.lte(0);

  const isInsufficientBorrowableLiquidity = isInsufficientTokenBalance(
    inputValueBig,
    tokenData
  );

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

  if (isInsufficientSize) {
    return <ErrorMainButton title="Min Size: 20 USDC.e" />;
  }

  // TODO: remove after unpause position opening
  // return <OpenTradeModalButton />;

  return <ErrorMainButton title="Position Opening is Paused" />;
};
