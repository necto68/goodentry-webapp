import { InputCard } from "../../input-card/components/InputCard";
import { getFormattedAmount } from "../../shared/helpers/baseFormatters";
import { useTicker } from "../hooks/useTicker";
import { useTickerTokenInputState } from "../hooks/useTickerTokenInputState";
import { useTradePanelState } from "../stores/useTradePanelState";

export const TradePanelInputCard = () => {
  const { selectedPairId, selectedTickerAddress } = useTradePanelState();
  const {
    tokenData,
    tokens,
    setTokenDataAddress,
    inputValue,
    setInputValue,
    isError,
  } = useTickerTokenInputState();

  const ticker = useTicker(selectedPairId, selectedTickerAddress);

  const formattedAvailableLiquidity = ticker
    ? getFormattedAmount(ticker.availableLiquidity)
    : null;
  const subTitle =
    formattedAvailableLiquidity && tokenData
      ? `Available Liquidity: ${formattedAvailableLiquidity} ${tokenData.symbol}`
      : undefined;

  return (
    <InputCard
      balanceTitle="Available Margin"
      inputValue={inputValue}
      isError={isError}
      isShowSlider
      setInputValue={setInputValue}
      setTokenDataAddress={setTokenDataAddress}
      subTitle={subTitle}
      title="Size"
      tokenData={tokenData}
      tokens={tokens}
    />
  );
};
