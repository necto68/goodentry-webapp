import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import { useCallback } from "react";

import { InputContainer, InputTitle } from "../../input-card/styles/InputCard";
import { useOptionBorrowRates } from "../../protected-perps-page/hooks/useOptionBorrowRates";
import { getDurationBetweenTimestamps } from "../../public-sale-page/helpers/getDurationBetweenTimestamps";
import {
  loadingPlaceholder,
  notAvailablePlaceholder,
} from "../../shared/constants/placeholders";
import { getFormattedRunway } from "../../shared/helpers/formatters";
import { leverageSteps } from "../constants/leverageSteps";
import { getPositionSize } from "../helpers/getPositionSize";
import { getRunwayInSeconds } from "../helpers/getRunwayInSeconds";
import { useTradePanelState } from "../stores/useTradePanelState";
import { Container, Content, Value } from "../styles/StrikePrice";
import { TabType } from "../types/TabType";

export const LeverageSlider = () => {
  const {
    selectedTab,
    selectedPairId,
    quoteTokenInputState,
    selectedLeverage,
    setSelectedLeverage,
  } = useTradePanelState();

  const positionSize = getPositionSize(quoteTokenInputState, selectedLeverage);

  const { lowerOptionHourlyBorrowRate, upperOptionHourlyBorrowRate } =
    useOptionBorrowRates(selectedPairId, positionSize) ?? {};

  const isLongTab = selectedTab === TabType.LONG;

  const optionHourlyBorrowRate = isLongTab
    ? upperOptionHourlyBorrowRate
    : lowerOptionHourlyBorrowRate;

  let formattedRunway = "";

  if (optionHourlyBorrowRate === undefined) {
    formattedRunway = loadingPlaceholder;
  } else if (optionHourlyBorrowRate === null) {
    formattedRunway = notAvailablePlaceholder;
  } else {
    const runwayInSeconds = getRunwayInSeconds(
      quoteTokenInputState,
      positionSize,
      optionHourlyBorrowRate
    );

    const toTimestamp = runwayInSeconds ? runwayInSeconds * 1000 : 0;

    const runwayDuration = getDurationBetweenTimestamps(0, toTimestamp);

    formattedRunway = getFormattedRunway(runwayDuration);
  }

  const selectedLeverageIndex = leverageSteps.indexOf(selectedLeverage);
  const sliderValue = selectedLeverageIndex < 0 ? 0 : selectedLeverageIndex;

  const handleSliderChange = useCallback(
    (value: number) => {
      setSelectedLeverage(leverageSteps[value]);
    },
    [setSelectedLeverage]
  );

  const formattedSelectedLeverage = `${selectedLeverage}×`;

  return (
    <InputContainer>
      <Content>
        <InputTitle>Leverage</InputTitle>
        <InputTitle>Runway</InputTitle>
      </Content>
      <Container>
        <Content>
          <Value>{formattedSelectedLeverage}</Value>
          <Value>{formattedRunway}</Value>
        </Content>
      </Container>
      <Slider
        max={leverageSteps.length - 1}
        min={0}
        onChange={handleSliderChange}
        step={1}
        value={sliderValue}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </InputContainer>
  );
};
