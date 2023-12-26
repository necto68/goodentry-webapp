import { usePairPrices } from "../../protected-perps-page/hooks/usePairPrices";
import { getFormattedPrice } from "../../shared/helpers/formatters";
import {
  InfoRow,
  InfoTitle,
  InfoValue,
} from "../../shared/modal/styles/ModalInfo";
import { TabType } from "../types/TabType";

import type { TradePanelState } from "../types/TradePanelState";
import type { FC } from "react";

type EntryPriceProps = Pick<TradePanelState, "selectedPairId" | "selectedTab">;

export const EntryPrice: FC<EntryPriceProps> = ({
  selectedTab,
  selectedPairId,
}) => {
  const { baseTokenPrice } = usePairPrices(selectedPairId) ?? {};

  // TODO: v2 update
  const strikePrice = 2000;

  let entryPrice = null;

  if (!baseTokenPrice) {
    entryPrice = null;
  } else if (selectedTab === TabType.LONG && strikePrice < baseTokenPrice) {
    entryPrice = baseTokenPrice;
  } else if (selectedTab === TabType.SHORT && strikePrice > baseTokenPrice) {
    entryPrice = baseTokenPrice;
  } else {
    entryPrice = strikePrice;
  }

  const formattedEntryPrice = getFormattedPrice(entryPrice);

  return (
    <InfoRow>
      <InfoTitle>Entry Price (Break-Even)</InfoTitle>
      <InfoValue>{formattedEntryPrice}</InfoValue>
    </InfoRow>
  );
};
