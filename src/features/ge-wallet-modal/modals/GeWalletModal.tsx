import { useModal } from "../../shared/modal/hooks/useModal";
import { GeWalletModalRoot } from "../components/GeWalletModalRoot";

import type { TabType } from "../../lending-pool-modal/types/TabType";

export const GeWalletModal = () => {
  const { modalState } = useModal();

  const selectedTab = modalState?.selectedTab as TabType;
  const pairId = modalState?.pairId as string;

  return <GeWalletModalRoot defaultTabType={selectedTab} pairId={pairId} />;
};
