import { useAssetPrices } from "../../protected-perps-page/hooks/useAssetPrices";
import { getFormattedCurrentPrice } from "../../shared/helpers/formatters";
import {
  InfoRow,
  InfoTitle,
  InfoValue,
} from "../../shared/modal/styles/ModalInfo";
import { TabType } from "../types/TabType";

import type { TradePanelState } from "../types/TradePanelState";
import type { FC } from "react";

type EntryPriceProps = Pick<TradePanelState, "selectedPairId" | "selectedTab">;

export const EntryPrice: FC<EntryPriceProps> = ({ selectedTab }) => {
  const prices = useAssetPrices();

  const { currentPrice } = prices ?? {};

  // TODO: v2 update
  const strikePrice = 2000;

  let entryPrice = null;

  if (!currentPrice) {
    entryPrice = null;
  } else if (selectedTab === TabType.LONG && strikePrice < currentPrice) {
    entryPrice = currentPrice;
  } else if (selectedTab === TabType.SHORT && strikePrice > currentPrice) {
    entryPrice = currentPrice;
  } else {
    entryPrice = strikePrice;
  }

  const formattedEntryPrice = getFormattedCurrentPrice(entryPrice);

  return (
    <InfoRow>
      <InfoTitle>Entry Price (Break-Even)</InfoTitle>
      <InfoValue>{formattedEntryPrice}</InfoValue>
    </InfoRow>
  );
};
