import { InputCard } from "../../input-card/components/InputCard";
import { useLockModalTokenInputState } from "../hooks/useLockModalTokenInputState";
import { useLockModalState } from "../stores/useLockModalState";
import { TabType } from "../types/TabType";

export const LockInputCard = () => {
  const { selectedTab } = useLockModalState();

  const {
    tokenData,
    tokens,
    setTokenDataAddress,
    inputValue,
    setInputValue,
    isError,
  } = useLockModalTokenInputState();

  const isUnlockTab = selectedTab === TabType.UNLOCK;

  return (
    <InputCard
      balanceTitle={isUnlockTab ? "Available" : undefined}
      inputValue={inputValue}
      isError={isError}
      setInputValue={setInputValue}
      setTokenDataAddress={setTokenDataAddress}
      tokenData={tokenData}
      tokens={tokens}
    />
  );
};
