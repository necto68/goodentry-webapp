import { InputCard } from "../../input-card/components/InputCard";
import { useSaleTokenInputState } from "../hooks/useSaleTokenInputState";

export const SaleTokenInputCard = () => {
  const { tokenData, tokens, inputValue, setInputValue, isError } =
    useSaleTokenInputState();

  return (
    <InputCard
      balanceTitle="Available"
      inputValue={inputValue}
      isError={isError}
      setInputValue={setInputValue}
      title="Allocation"
      tokenData={tokenData}
      tokens={tokens}
    />
  );
};
