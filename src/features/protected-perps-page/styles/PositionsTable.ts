import styled from "@emotion/styled";
import tw from "twin.macro";

export interface ColorTextProps {
  isPositive: boolean;
}

export const ColorText = styled.span<ColorTextProps>`
  ${({ isPositive }) => (isPositive ? tw`text-long` : tw`text-short`)}
`;

export const ProfitAndLossCell = tw.div`
  flex flex-col gap-1
`;

export const ProfitAndLossRow = tw.div`
  flex gap-1 items-center justify-start
`;

export const ActionsContainer = tw.div`
  flex justify-end items-center gap-2
`;
