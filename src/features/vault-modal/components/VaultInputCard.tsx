import { InputCard } from "../../input-card/components/InputCard";
import { useVaultModalTokenInputState } from "../hooks/useVaultModalTokenInputState";
import { useVaultModalState } from "../stores/useVaultModalState";
import { TabType } from "../types/TabType";

export const VaultInputCard = () => {
  const { selectedTab } = useVaultModalState();
  const isDepositTab = selectedTab === TabType.DEPOSIT;

  const balanceTokenSymbol = isDepositTab ? undefined : "GEV";

  const {
    tokenData,
    tokens,
    setTokenDataAddress,
    inputValue,
    setInputValue,
    isError,
  } = useVaultModalTokenInputState();

  return (
    <InputCard
      balanceTokenSymbol={balanceTokenSymbol}
      inputValue={inputValue}
      isError={isError}
      setInputValue={setInputValue}
      setTokenDataAddress={setTokenDataAddress}
      tokenData={tokenData}
      tokens={tokens}
    />
  );
};
