import { create } from "zustand";
import { combine } from "zustand/middleware";

import { pairConfigs } from "../../pair/constants/pairConfigs";

const defaultStore = { selectedPairId: pairConfigs[0].id };

export const useSelectedPairIdStore = create(
  combine(defaultStore, (set) => ({
    setSelectedPairId: (selectedPairId: string) => {
      set({ selectedPairId });
    },
  }))
);
