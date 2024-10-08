import { ConnectWalletMainButton } from "../../form-components/components/ConnectWalletMainButton";
import { ErrorMainButton } from "../../form-components/components/ErrorMainButton";
import { TokenErrorMainButton } from "../../form-components/components/TokenErrorMainButton";
import { WrongNetworkMainButton } from "../../form-components/components/WrongNetworkMainButton";
import { ZeroBalanceMainButton } from "../../form-components/components/ZeroBalanceMainButton";
import { isInsufficientTokenAllowance } from "../../input-card/helpers/tokenBalance";
import { getVaultConfig } from "../../vault/helpers/getVaultConfig";
import { useVault } from "../../vault-details-page/hooks/useVault";
import { useWallet } from "../../wallet/hooks/useWallet";
import { useVaultModalTokenInputState } from "../hooks/useVaultModalTokenInputState";
import { useVaultModalState } from "../stores/useVaultModalState";
import { useVaultModalTransactions } from "../stores/useVaultModalTransactions";
import { TabType } from "../types/TabType";

import { ApproveMainButton } from "./ApproveMainButton";
import { VaultActionButton } from "./VaultActionButton";

// eslint-disable-next-line complexity
export const VaultMainButton = () => {
  const { isConnected, chainId: selectedChainId } = useWallet();

  const { selectedTab, vaultId } = useVaultModalState();
  const vault = useVault(vaultId);

  const { chainId } = getVaultConfig(vaultId);
  const { isMaxCapReached = false } = vault ?? {};

  const isDepositTab = selectedTab === TabType.DEPOSIT;

  const { tokenApproveTransaction } = useVaultModalTransactions();

  const { tokenData, inputValueBig, isError, error } =
    useVaultModalTokenInputState();

  const { isLoading: isTokenApproveMutationLoading } =
    tokenApproveTransaction.mutation;

  const isZeroBalance = inputValueBig.lte(0);
  const isInsufficientAllowance = isInsufficientTokenAllowance(
    inputValueBig,
    tokenData
  );

  if (!isConnected) {
    return <ConnectWalletMainButton />;
  }

  if (selectedChainId && selectedChainId !== chainId) {
    return <WrongNetworkMainButton />;
  }

  if (isDepositTab && isMaxCapReached) {
    return <ErrorMainButton title="Max Capacity Reached" />;
  }

  if (isZeroBalance) {
    return <ZeroBalanceMainButton />;
  }

  if (isError) {
    return <TokenErrorMainButton error={error} tokenData={tokenData} />;
  }

  if (isInsufficientAllowance || isTokenApproveMutationLoading) {
    return <ApproveMainButton />;
  }

  return <VaultActionButton />;
};
