import { InputCard } from "../../input-card/components/InputCard";
import { useQuoteTokenInputState } from "../hooks/useQuoteTokenInputState";

export const TradePanelInputCard = () => {
  const {
    tokenData,
    tokens,
    setTokenDataAddress,
    inputValue,
    setInputValue,
    isError,
  } = useQuoteTokenInputState();

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
