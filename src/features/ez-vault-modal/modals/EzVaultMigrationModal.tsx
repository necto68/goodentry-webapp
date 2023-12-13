import { useModal } from "../../shared/modal/hooks/useModal";
import { EzVaultMigrationModalRoot } from "../components/EzVaultMigrationModalRoot";

export const EzVaultMigrationModal = () => {
  const { modalState } = useModal();
  const vaultId = modalState ? (modalState.vaultId as string) : "";

  return <EzVaultMigrationModalRoot vaultId={vaultId} />;
};
