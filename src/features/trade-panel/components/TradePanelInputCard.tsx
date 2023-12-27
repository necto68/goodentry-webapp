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
      inputValue={inputValue}
      isError={isError}
      setInputValue={setInputValue}
      setTokenDataAddress={setTokenDataAddress}
      title="Wager"
      tokenData={tokenData}
      tokens={tokens}
    />
  );
};
