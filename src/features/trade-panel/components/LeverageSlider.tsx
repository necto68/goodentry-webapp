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
  const { positionSide, pairId, quoteTokenInputState, leverage, setLeverage } =
    useTradePanelState();

  const optionHourlyBorrowRate = useTradePanelOptionHourlyBorrowRate(
    positionSide,
    pairId,
    quoteTokenInputState,
    leverage
  );

  const runwayInSeconds = getRunwayInSeconds(
    quoteTokenInputState,
    leverage,
    optionHourlyBorrowRate
  );

  const formattedRunway = getFormattedRunway(runwayInSeconds);
  const formattedLeverage = getFormattedLeverage(leverage);

  const leverageIndex = leverageSteps.indexOf(leverage);
  const sliderValue = leverageIndex < 0 ? 0 : leverageIndex;

  const handleSliderChange = useCallback(
    (value: number) => {
      setLeverage(leverageSteps[value]);
    },
    [setLeverage]
  );

  return (
    <InputContainer>
      <Content>
        <InputTitle>Leverage</InputTitle>
        <InputTitle>Runway</InputTitle>
      </Content>
      <Container>
        <Content>
          <Value>{formattedLeverage}</Value>
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
