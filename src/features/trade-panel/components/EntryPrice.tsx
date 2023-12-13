import { useAssetPrices } from "../../protected-perps-page/hooks/useAssetPrices";
import { getFormattedCurrentPrice } from "../../shared/helpers/formatters";
import {
  InfoRow,
  InfoTitle,
  InfoValue,
} from "../../shared/modal/styles/ModalInfo";
import { useTicker } from "../hooks/useTicker";
import { TabType } from "../types/TabType";

import type { TradePanelState } from "../types/TradePanelState";
import type { FC } from "react";

type EntryPriceProps = Pick<
  TradePanelState,
  "selectedPairId" | "selectedTab" | "selectedTickerAddress"
>;

export const EntryPrice: FC<EntryPriceProps> = ({
  selectedTab,
  selectedPairId,
  selectedTickerAddress,
}) => {
  const prices = useAssetPrices();
  const ticker = useTicker(selectedPairId, selectedTickerAddress);

  const { currentPrice } = prices ?? {};
  const { strikePrice } = ticker ?? {};

  let entryPrice = null;

  if (!strikePrice || !currentPrice) {
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
