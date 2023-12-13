import type { ModalContextState } from "./ModalContextState";

export type ModalHistoryItem = Pick<
  ModalContextState,
  "modalState" | "modalType"
>;
