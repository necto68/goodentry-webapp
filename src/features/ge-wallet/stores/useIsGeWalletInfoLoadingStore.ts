import { create } from "zustand";
import { combine } from "zustand/middleware";

const defaultStore = { isGeWalletInfoLoading: false };

export const useIsGeWalletInfoLoadingStore = create(
  combine(defaultStore, (set) => ({
    setIsGeWalletInfoLoading: (isGeWalletInfoLoading: boolean) => {
      set({ isGeWalletInfoLoading });
    },
  }))
);
