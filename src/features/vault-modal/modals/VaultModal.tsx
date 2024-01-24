import { useModal } from "../../shared/modal/hooks/useModal";
import { VaultModalRoot } from "../components/VaultModalRoot";
import { TabType } from "../types/TabType";

export const VaultModal = () => {
  const { modalState } = useModal();

  const vaultId = modalState ? (modalState.vaultId as string) : "";
  const tabType = modalState
    ? (modalState.selectedTab as TabType)
    : TabType.DEPOSIT;

  return <VaultModalRoot defaultTabType={tabType} vaultId={vaultId} />;
};
