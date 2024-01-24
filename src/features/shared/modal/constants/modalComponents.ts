import { AirdropModal } from "../../../airdrop-modal/modals/AirdropModal";
import { ClosePositionModal } from "../../../close-position-modal/modals/ClosePositionModal";
import { LockWithdrawModal } from "../../../lock-withdraw-modal/modals/LockWithdrawModal";
import { OpenPositionModal } from "../../../open-position-modal/modals/OpenPositionModal";
import { SocialShareModal } from "../../../social-share-modal/modals/SocialShareModal";
import { VaultMigrationModal } from "../../../vault-modal/modals/VaultMigrationModal";
import { VaultModal } from "../../../vault-modal/modals/VaultModal";
import { ModalType } from "../types/ModalType";

export const modalComponents = {
  [ModalType.OPEN_POSITION]: OpenPositionModal,
  [ModalType.CLOSE_POSITION]: ClosePositionModal,
  [ModalType.EZ_VAULT]: VaultModal,
  [ModalType.EZ_VAULT_MIGRATION]: VaultMigrationModal,
  [ModalType.LOCK_WITHDRAW]: LockWithdrawModal,
  [ModalType.AIRDROP]: AirdropModal,
  [ModalType.SOCIAL_SHARE]: SocialShareModal,
};
