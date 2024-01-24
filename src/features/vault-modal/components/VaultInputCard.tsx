import { InputCard } from "../../input-card/components/InputCard";
import { useVaultModalQueries } from "../hooks/useVaultModalQueries";
import { useVaultModalTokenInputState } from "../hooks/useVaultModalTokenInputState";
import { useVaultModalState } from "../stores/useVaultModalState";
import { TabType } from "../types/TabType";

export const VaultInputCard = () => {
  const { selectedTab, vaultId } = useVaultModalState();
  const { vaultTokenQuery } = useVaultModalQueries(vaultId);

  const isDepositTab = selectedTab === TabType.DEPOSIT;
  const vaultTokenData = vaultTokenQuery.data;

  const balanceTokenSymbol = isDepositTab ? undefined : vaultTokenData?.symbol;

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
