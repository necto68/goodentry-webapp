import { Button } from "@chakra-ui/react";
import { useCallback } from "react";

import { useModal } from "../../shared/modal/hooks/useModal";
import { ModalType } from "../../shared/modal/types/ModalType";
import { getVaultConfig } from "../../vault/helpers/getVaultConfig";
import { VaultStatus } from "../../vault/types/VaultStatus";
import { TabType } from "../../vault-modal/types/TabType";
import { Container } from "../styles/ActionButtons";
import { AssetRowType } from "../types/PairAssetsRow";

import type {
  CollateralTokenAssetRow,
  VaultTokenAssetRow,
} from "../types/PairAssetsRow";
import type { FC } from "react";

type ActionButtonsProps =
  | Pick<CollateralTokenAssetRow, "pairId" | "type">
  | Pick<VaultTokenAssetRow, "type" | "vaultId">;

export const ActionButtons: FC<ActionButtonsProps> = (props) => {
  const { pushModal } = useModal();

  const { type } = props;

  const pairId =
    // eslint-disable-next-line react/destructuring-assignment
    type === AssetRowType.COLLATERAL_TOKEN ? props.pairId : undefined;
  // eslint-disable-next-line react/destructuring-assignment
  const vaultId = type === AssetRowType.VAULT_TOKEN ? props.vaultId : undefined;

  const vaultConfig = vaultId ? getVaultConfig(vaultId) : undefined;
  const status = vaultConfig?.status;

  const handleClick = useCallback(
    (tabType: TabType) => {
      const modalType =
        type === AssetRowType.COLLATERAL_TOKEN
          ? ModalType.GE_WALLET
          : ModalType.EZ_VAULT;

      const modalState =
        type === AssetRowType.COLLATERAL_TOKEN
          ? { selectedTab: tabType, pairId }
          : { selectedTab: tabType, vaultId };

      pushModal(modalType, modalState);
    },
    [pushModal, type, pairId, vaultId]
  );

  const handleMigrateClick = useCallback(() => {
    const modalState = { vaultId };

    pushModal(ModalType.EZ_VAULT_MIGRATION, modalState);
  }, [pushModal, vaultId]);

  if (type === AssetRowType.VAULT_TOKEN && status === VaultStatus.DEPRECATED) {
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
