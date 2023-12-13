import { AirdropModal } from "../../../airdrop-modal/modals/AirdropModal";
import { EzVaultMigrationModal } from "../../../ez-vault-modal/modals/EzVaultMigrationModal";
import { EzVaultModal } from "../../../ez-vault-modal/modals/EzVaultModal";
import { GeWalletModal } from "../../../ge-wallet-modal/modals/GeWalletModal";
import { LockWithdrawModal } from "../../../lock-withdraw-modal/modals/LockWithdrawModal";
import { SocialShareModal } from "../../../social-share-modal/modals/SocialShareModal";
import { TradeModal } from "../../../trade-modal/modals/TradeModal";
import { ModalType } from "../types/ModalType";

export const modalComponents = {
  [ModalType.TRADE]: TradeModal,
  [ModalType.GE_WALLET]: GeWalletModal,
  [ModalType.EZ_VAULT]: EzVaultModal,
  [ModalType.EZ_VAULT_MIGRATION]: EzVaultMigrationModal,
  [ModalType.LOCK_WITHDRAW]: LockWithdrawModal,
  [ModalType.AIRDROP]: AirdropModal,
  [ModalType.SOCIAL_SHARE]: SocialShareModal,
};
