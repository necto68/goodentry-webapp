import { useModal } from "../../shared/modal/hooks/useModal";
import { VaultMigrationModalRoot } from "../components/VaultMigrationModalRoot";

export const VaultMigrationModal = () => {
  const { modalState } = useModal();
  const vaultId = modalState ? (modalState.vaultId as string) : "";

  return <VaultMigrationModalRoot vaultId={vaultId} />;
};
