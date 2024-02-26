import { InputCard } from "../../input-card/components/InputCard";
import { loadingPlaceholder } from "../../shared/constants/placeholders";
import { getFormattedNumber } from "../../shared/helpers/baseFormatters";
import { minQuoteTokenAmount } from "../constants/openPosition";
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

  const formattedMinQuoteTokenAmount = getFormattedNumber(minQuoteTokenAmount);
  const subTitle = tokenData
    ? `Min Wager: ${formattedMinQuoteTokenAmount} ${tokenData.symbol}`
    : loadingPlaceholder;

  return (
    <InputCard
      inputValue={inputValue}
      isError={isError}
      setInputValue={setInputValue}
      setTokenDataAddress={setTokenDataAddress}
      subTitle={subTitle}
      title="Wager"
      tokenData={tokenData}
      tokens={tokens}
    />
  );
};
