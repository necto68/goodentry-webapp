import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import { useCallback } from "react";

import { InputContainer, InputTitle } from "../../input-card/styles/InputCard";
import { getFormattedLeverage } from "../../shared/helpers/baseFormatters";
import { getFormattedRunway } from "../../shared/helpers/formatters";
import { leverageSteps } from "../constants/leverageSteps";
import { getRunwayInSeconds } from "../helpers/getRunwayInSeconds";
import { useTradePanelOptionHourlyBorrowRate } from "../hooks/useTradePanelOptionHourlyBorrowRate";
import { useTradePanelState } from "../stores/useTradePanelState";
import { Container, Content, Value } from "../styles/StrikePrice";

export const LeverageSlider = () => {
  const {
    selectedTab,
    selectedPairId,
    quoteTokenInputState,
    selectedLeverage,
    setSelectedLeverage,
  } = useTradePanelState();

  const optionHourlyBorrowRate = useTradePanelOptionHourlyBorrowRate(
    selectedTab,
    selectedPairId,
    quoteTokenInputState,
    selectedLeverage
  );

  const runwayInSeconds = getRunwayInSeconds(
    quoteTokenInputState,
    selectedLeverage,
    optionHourlyBorrowRate
  );

  const formattedRunway = getFormattedRunway(runwayInSeconds);
  const formattedSelectedLeverage = getFormattedLeverage(selectedLeverage);

  const selectedLeverageIndex = leverageSteps.indexOf(selectedLeverage);
  const sliderValue = selectedLeverageIndex < 0 ? 0 : selectedLeverageIndex;

  const handleSliderChange = useCallback(
    (value: number) => {
      setSelectedLeverage(leverageSteps[value]);
    },
    [setSelectedLeverage]
  );

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
