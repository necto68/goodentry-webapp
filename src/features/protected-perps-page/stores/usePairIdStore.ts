import { create } from "zustand";
import { combine } from "zustand/middleware";

import { pairConfigs } from "../../pair/constants/pairConfigs";

const defaultStore = { pairId: pairConfigs[0].id };

export const usePairIdStore = create(
  combine(defaultStore, (set) => ({
    setPairId: (pairId: string) => {
      set({ pairId });
    },
  }))
);
