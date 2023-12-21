import { Button } from "@chakra-ui/react";
import { useCallback } from "react";

import { useModal } from "../../shared/modal/hooks/useModal";
import { ModalType } from "../../shared/modal/types/ModalType";
import { getVaultConfig } from "../../vault/helpers/getVaultConfig";
import { VaultStatus } from "../../vault/types/VaultStatus";
import { TabType } from "../../vault-modal/types/TabType";
import { Container } from "../styles/ActionButtons";

import type { VaultTokenAssetRow } from "../types/PairAssetsRow";
import type { FC } from "react";

type ActionButtonsProps = Pick<VaultTokenAssetRow, "type" | "vaultId">;

export const ActionButtons: FC<ActionButtonsProps> = (props) => {
  const { pushModal } = useModal();

  const { vaultId } = props;

  const vaultConfig = vaultId ? getVaultConfig(vaultId) : undefined;
  const status = vaultConfig?.status;

  const handleClick = useCallback(
    (tabType: TabType) => {
      const modalType = ModalType.EZ_VAULT;

      const modalState = { selectedTab: tabType, vaultId };

      pushModal(modalType, modalState);
    },
    [pushModal, vaultId]
  );

  const handleMigrateClick = useCallback(() => {
    const modalState = { vaultId };

    pushModal(ModalType.EZ_VAULT_MIGRATION, modalState);
  }, [pushModal, vaultId]);

  if (status === VaultStatus.DEPRECATED) {
    return (
      <Container>
        <Button
          onClick={() => {
            handleMigrateClick();
          }}
          size="sm"
        >
          Migrate
        </Button>
      </Container>
    );
  }

  return (
    <Container>
      <Button
        onClick={() => {
          handleClick(TabType.DEPOSIT);
        }}
        size="sm"
      >
        Deposit
      </Button>
      <Button
        onClick={() => {
          handleClick(TabType.WITHDRAW);
        }}
        size="sm"
      >
        Withdraw
      </Button>
    </Container>
  );
};
