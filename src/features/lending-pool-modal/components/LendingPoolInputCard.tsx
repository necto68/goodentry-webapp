import { InputCard } from "../../input-card/components/InputCard";
import { useLendingPoolModalTokenInputState } from "../hooks/useLendingPoolModalTokenInputState";
import { useLendingPoolModalState } from "../stores/useLendingPoolModalState";
import { TabType } from "../types/TabType";

export const LendingPoolInputCard = () => {
  const { selectedTab } = useLendingPoolModalState();

  const {
    tokenData,
    tokens,
    setTokenDataAddress,
    inputValue,
    setInputValue,
    isError,
  } = useLendingPoolModalTokenInputState();

  const isWithdrawTab = selectedTab === TabType.WITHDRAW;

  return (
    <InputCard
      balanceTitle={isWithdrawTab ? "Available" : undefined}
      inputValue={inputValue}
      isError={isError}
      setInputValue={setInputValue}
      setTokenDataAddress={setTokenDataAddress}
      tokenData={tokenData}
      tokens={tokens}
    />
  );
};
