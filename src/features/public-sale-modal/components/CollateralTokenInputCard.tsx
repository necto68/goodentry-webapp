import { InputCard } from "../../input-card/components/InputCard";
import { useCollateralTokenInputState } from "../hooks/useCollateralTokenInputState";

export const CollateralTokenInputCard = () => {
  const { tokenData, tokens, inputValue, setInputValue, isError } =
    useCollateralTokenInputState();

  return (
    <InputCard
      inputValue={inputValue}
      isError={isError}
      setInputValue={setInputValue}
      tokenData={tokenData}
      tokens={tokens}
    />
  );
};
