import { createContext, useCallback, useMemo, useState } from "react";

import type { ModalContextState } from "../types/ModalContextState";
import type { ModalHistoryItem } from "../types/ModalHistoryItem";
import type { ReactNode, FC } from "react";

interface ModalProviderProps {
  readonly modalComponents: ModalContextState["modalComponents"];
  readonly children: ReactNode;
}

export const ModalContext = createContext<ModalContextState>({
  pushModal: () => undefined,
  popModal: () => undefined,
  replaceModal: () => undefined,
  hideModal: () => undefined,
  modalType: undefined,
  modalState: undefined,
  modalComponents: {},
});

export const ModalProvider: FC<ModalProviderProps> = ({
  modalComponents,
  children,
}) => {
  const [modalHistory, setModalHistory] = useState<ModalHistoryItem[]>([]);

  const pushModal = useCallback(
    (
      modalType: ModalHistoryItem["modalType"],
      modalState?: ModalHistoryItem["modalState"]
    ) => {
      setModalHistory([...modalHistory, { modalType, modalState }]);
    },
    [modalHistory]
  );

  const popModal = useCallback(() => {
    setModalHistory(modalHistory.slice(0, -1));
  }, [modalHistory]);

  const replaceModal = useCallback(
    (
      modalType: ModalHistoryItem["modalType"],
      modalState?: ModalHistoryItem["modalState"]
    ) => {
      setModalHistory([{ modalType, modalState }]);
    },
    []
  );

  const hideModal = useCallback(() => {
    setModalHistory([]);
  }, []);

  const lastModalHistoryItem =
    modalHistory.length > 0 ? modalHistory[modalHistory.length - 1] : null;

  const modalType = lastModalHistoryItem?.modalType;
  const modalState = lastModalHistoryItem?.modalState;

  const value = useMemo(
    () => ({
      pushModal,
      popModal,
      replaceModal,
      hideModal,
      modalType,
      modalState,
      modalComponents,
    }),
    [
      pushModal,
      popModal,
      replaceModal,
      hideModal,
      modalType,
      modalState,
      modalComponents,
    ]
  );

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};
