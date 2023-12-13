export interface ModalContextState<
  ModalType extends string = string,
  ModalState extends object | undefined = { [key: string]: unknown }
> {
  pushModal: (modalType: ModalType, modalState?: ModalState) => void;
  popModal: () => void;
  replaceModal: (modalType: ModalType, modalState?: ModalState) => void;
  hideModal: () => void;
  modalType?: ModalType;
  modalState?: ModalState;
  modalComponents: { [key: string]: () => JSX.Element };
}
