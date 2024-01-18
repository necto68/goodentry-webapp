import { AirdropModal } from "../../../airdrop-modal/modals/AirdropModal";
import { ClosePositionModal } from "../../../close-position-modal/modals/ClosePositionModal";
import { EzVaultMigrationModal } from "../../../ez-vault-modal/modals/EzVaultMigrationModal";
import { EzVaultModal } from "../../../ez-vault-modal/modals/EzVaultModal";
import { LockWithdrawModal } from "../../../lock-withdraw-modal/modals/LockWithdrawModal";
import { OpenPositionModal } from "../../../open-position-modal/modals/OpenPositionModal";
import { SocialShareModal } from "../../../social-share-modal/modals/SocialShareModal";
import { ModalType } from "../types/ModalType";

export const modalComponents = {
  [ModalType.OPEN_POSITION]: OpenPositionModal,
  [ModalType.CLOSE_POSITION]: ClosePositionModal,
  [ModalType.EZ_VAULT]: EzVaultModal,
  [ModalType.EZ_VAULT_MIGRATION]: EzVaultMigrationModal,
  [ModalType.LOCK_WITHDRAW]: LockWithdrawModal,
  [ModalType.AIRDROP]: AirdropModal,
  [ModalType.SOCIAL_SHARE]: SocialShareModal,
};
