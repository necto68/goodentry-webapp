import { Button } from "@chakra-ui/react";
import { useCallback } from "react";

import { TabType } from "../../lending-pool-modal/types/TabType";
import { useSelectedPairIdStore } from "../../protected-perps-page/stores/useSelectedPairIdStore";
import { ComponentContainer } from "../../protected-perps-page/styles/ProtectedPerpsPage";
import { useModal } from "../../shared/modal/hooks/useModal";
import { ModalType } from "../../shared/modal/types/ModalType";
import { Actions, Container, Controls, Title } from "../styles/GeWallet";

import { GeWalletInfo } from "./GeWalletInfo";

export const GeWalletContent = () => {
  const { pushModal } = useModal();
  const { selectedPairId } = useSelectedPairIdStore();

  const openGeWalletModal = useCallback(
    (selectedTab: TabType) => {
      pushModal(ModalType.GE_WALLET, {
        selectedTab,
        pairId: selectedPairId,
      });
    },
    [pushModal, selectedPairId]
  );

  return (
    <ComponentContainer>
      <Container>
        <Controls>
          <Title>geWallet</Title>
          <Actions>
            <Button
              onClick={() => {
                openGeWalletModal(TabType.DEPOSIT);
              }}
              size="xs"
              variant="brand"
            >
              Deposit
            </Button>
            <Button
              onClick={() => {
                openGeWalletModal(TabType.WITHDRAW);
              }}
              size="xs"
            >
              Withdraw
            </Button>
          </Actions>
        </Controls>
        <GeWalletInfo />
      </Container>
    </ComponentContainer>
  );
};
