import {
  Modal as ChakraModal,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";

import { getModalComponent } from "../helpers/getModalComponent";
import { useModal } from "../hooks/useModal";

export const Modal = () => {
  const { modalType, hideModal, modalComponents } = useModal();
  const ModalComponent = getModalComponent(modalType, modalComponents);

  return modalType ? (
    <ChakraModal isOpen onClose={hideModal} size="sm">
      <ModalOverlay />
      <ModalContent minWidth="fit-content">
        <ModalComponent />
      </ModalContent>
    </ChakraModal>
  ) : null;
};
