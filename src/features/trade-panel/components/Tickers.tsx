import { useCallback } from "react";

import { InputContainer, InputTitle } from "../../input-card/styles/InputCard";
import { useFilteredTickersByPrice } from "../hooks/useFilteredTickersByPrice";
import { useTradePanelState } from "../stores/useTradePanelState";
import { TitlesContainer, TickersContainer } from "../styles/TickersPanel";

import { TickerButton } from "./TickerButton";

export const Tickers = () => {
  const filteredTickers = useFilteredTickersByPrice();
  const { selectedTickerAddress, setSelectedTickerAddress } =
    useTradePanelState();

  const handleTickerClick = useCallback(
    (tickerAddress: string) => {
      setSelectedTickerAddress(tickerAddress);
    },
    [setSelectedTickerAddress]
  );

  return (
    <InputContainer>
      <TitlesContainer>
        <InputTitle>Select Activation Price</InputTitle>
        <InputTitle>Funding / 1h</InputTitle>
      </TitlesContainer>
      <TickersContainer>
        {filteredTickers.map((ticker, index) =>
          ticker ? (
            <TickerButton
              isSelected={ticker.address === selectedTickerAddress}
              key={ticker.id}
              onClick={handleTickerClick}
              ticker={ticker}
            />
          ) : (
            // eslint-disable-next-line react/no-array-index-key
            <TickerButton key={index} />
          )
        )}
      </TickersContainer>
    </InputContainer>
  );
};
