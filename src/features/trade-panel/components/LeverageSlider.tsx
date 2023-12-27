import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import { useCallback } from "react";

import { InputContainer, InputTitle } from "../../input-card/styles/InputCard";
import { leverageSteps } from "../constants/leverageSteps";
import { useTradePanelState } from "../stores/useTradePanelState";
import { Container, Content, Value } from "../styles/StrikePrice";

export const LeverageSlider = () => {
  const { selectedLeverage, setSelectedLeverage } = useTradePanelState();

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
          <Value>2h 31m</Value>
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
