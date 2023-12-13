import { useModal } from "../../shared/modal/hooks/useModal";
import { TabType } from "../../vault-modal/types/TabType";
import { EzVaultModalRoot } from "../components/EzVaultModalRoot";

export const EzVaultModal = () => {
  const { modalState } = useModal();

  const vaultId = modalState ? (modalState.vaultId as string) : "";
  const tabType = modalState
    ? (modalState.selectedTab as TabType)
    : TabType.DEPOSIT;

  return <EzVaultModalRoot defaultTabType={tabType} vaultId={vaultId} />;
};
