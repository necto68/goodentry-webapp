import { Button } from "@chakra-ui/react";
import Big from "big.js";

import { ApproveMainButton } from "../../form-components/components/ApproveMainButton";
import { ConnectWalletMainButton } from "../../form-components/components/ConnectWalletMainButton";
import { SuccessfulMainButton } from "../../form-components/components/SuccessfulMainButton";
import { WrongNetworkMainButton } from "../../form-components/components/WrongNetworkMainButton";
import { isInsufficientTokenAllowance } from "../../input-card/helpers/tokenBalance";
import { getPairConfig } from "../../pair/helpers/getPairConfig";
import { vaultMigrationConfigs } from "../../vault/constants/vaultMigrationConfigs";
import { getVaultConfig } from "../../vault/helpers/getVaultConfig";
import { useVault } from "../../vault-details-page/hooks/useVault";
import { useWallet } from "../../wallet/hooks/useWallet";
import { getChainMetadata } from "../../web3/helpers/getChainMetadata";
import { useVaultModalQueries } from "../hooks/useVaultModalQueries";
import { useVaultModalState } from "../stores/useVaultModalState";
import { useVaultModalTransactions } from "../stores/useVaultModalTransactions";

// eslint-disable-next-line sonarjs/cognitive-complexity,complexity
export const VaultMigrationButton = () => {
  const { isConnected, chainId: selectedChainId } = useWallet();

  const { vaultId } = useVaultModalState();

  const { vaultTokenApproveTransaction, migrateTransaction } =
    useVaultModalTransactions();

  const { migrationVaultTokenQuery } = useVaultModalQueries(vaultId);

  const {
    chainId,
    pairId,
    addresses: { vault: sourceVaultAddress },
  } = getVaultConfig(vaultId);

  const {
    addresses: { baseToken, quoteToken },
  } = getPairConfig(pairId);

  const {
    addresses: { vaultMigrationManager },
  } = getChainMetadata(chainId);

  const { targetVaultId = "" } =
    vaultMigrationConfigs.find(
      ({ sourceVaultId }) => sourceVaultId === vaultId
    ) ?? {};

  const targetVault = useVault(targetVaultId);

  const { data: vaultToken } = migrationVaultTokenQuery;

  const isZeroBalance = vaultToken?.balance?.lte(0) ?? true;

  const isInsufficientAllowance = isInsufficientTokenAllowance(
    new Big(vaultToken?.balance ?? 0),
    vaultToken
  );

  const { mutation, runTransaction } = migrateTransaction;

  const { isLoading: isTokenApproveMutationLoading } =
    vaultTokenApproveTransaction.mutation;

  const { isLoading, isSuccess } = mutation;

  const onClick = () => {
    if (sourceVaultAddress && targetVault) {
      const firstTokenAddress =
        targetVault.fee0 < targetVault.fee1 ? baseToken : quoteToken;
      const secondTokenAddress =
        targetVault.fee0 < targetVault.fee1 ? quoteToken : baseToken;
      const targetVaultAddress = targetVault.address;

      void runTransaction(
        firstTokenAddress,
        secondTokenAddress,
        sourceVaultAddress,
        targetVaultAddress
      );
    }
  };

  if (!isConnected) {
    return <ConnectWalletMainButton />;
  }

  if (selectedChainId && selectedChainId !== chainId) {
    return <WrongNetworkMainButton />;
  }

  if (isSuccess) {
    return <SuccessfulMainButton title="Migration Successful" />;
  }

  if (isLoading) {
    return <Button isLoading loadingText="Migrating..." variant="brand" />;
  }

  if (isZeroBalance) {
    return <Button isDisabled>No funds to Migrate</Button>;
  }

  if (isInsufficientAllowance || isTokenApproveMutationLoading) {
    return (
      <ApproveMainButton
        spenderAddress={vaultMigrationManager}
        tokenApproveTransaction={vaultTokenApproveTransaction}
        tokenData={vaultToken}
      />
    );
  }

  return (
    <Button onClick={onClick} variant="brand">
      Migrate Liquidity
    </Button>
  );
};
