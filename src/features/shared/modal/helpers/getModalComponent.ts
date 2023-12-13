import type { ModalContextState } from "../types/ModalContextState";

const EmptyComponent = () => null;

export const getModalComponent = (
  modalType: ModalContextState["modalType"],
  modalComponents: ModalContextState["modalComponents"]
) =>
  modalType && modalType in modalComponents
    ? modalComponents[modalType]
    : EmptyComponent;
