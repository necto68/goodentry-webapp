import {
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";
import { useCallback } from "react";

import { getFormattedAPY } from "../../shared/helpers/baseFormatters";
import { getZero } from "../../shared/helpers/bigjs";
import { toInputValueBig } from "../helpers/toInputValueBig";
import {
  InputContainer,
  InputSubTitle,
  InputTitleContainer,
} from "../styles/InputCard";

import type { InputCardProps } from "./InputCard";
import type { FC } from "react";

type InputSliderProps = Pick<
  InputCardProps,
  "inputValue" | "setInputValue" | "sliderTitle" | "tokenData"
>;

export const InputSlider: FC<InputSliderProps> = ({
  tokenData,
  inputValue = "0",
  setInputValue,
  sliderTitle,
}) => {
  const tokenBalance = tokenData?.balance ?? getZero();

  const inputValueBig = toInputValueBig(inputValue);

  const sliderValue = tokenBalance.gt(getZero())
    ? inputValueBig.div(tokenBalance).toNumber()
    : 0;

  const formattedSliderValue = getFormattedAPY(sliderValue);

  const handleSliderChange = useCallback(
    (nextSliderValue: number) => {
      setInputValue(tokenBalance.mul(nextSliderValue).toString());
    },
    [setInputValue, tokenBalance]
  );

  return (
    <InputContainer>
      {sliderTitle ? (
        <InputTitleContainer>
          <InputSubTitle>{sliderTitle}</InputSubTitle>
          <InputSubTitle>{formattedSliderValue}</InputSubTitle>
        </InputTitleContainer>
      ) : null}
      <Slider
        focusThumbOnChange={false}
        max={1}
        min={0}
        onChange={handleSliderChange}
        step={0.05}
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
