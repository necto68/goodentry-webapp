import { InputCard } from "../../input-card/components/InputCard";
import { useTickerTokenInputState } from "../hooks/useTickerTokenInputState";

export const TradePanelInputCard = () => {
  const {
    tokenData,
    tokens,
    setTokenDataAddress,
    inputValue,
    setInputValue,
    isError,
  } = useTickerTokenInputState();

  return (
    <InputCard
      balanceTitle="Available Margin"
      inputValue={inputValue}
      isError={isError}
      isShowSlider
      setInputValue={setInputValue}
      setTokenDataAddress={setTokenDataAddress}
      title="Size"
      tokenData={tokenData}
      tokens={tokens}
    />
  );
};
