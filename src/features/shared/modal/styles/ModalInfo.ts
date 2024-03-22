import styled from "@emotion/styled";
import tw from "twin.macro";

export interface InfoColorValueProps {
  isPositive: boolean;
}

export const Container = tw.div`
  flex flex-col gap-1
`;

export const InfoRow = tw.div`
  flex flex-row
  justify-between
`;

export const InfoTitle = tw.span`
  text-sm text-text-gray
  font-normal
`;

export const InfoValue = tw.span`
  text-sm text-text-white
  font-semibold
  text-right
`;

export const InfoColorValue = styled(InfoValue)<InfoColorValueProps>`
  ${({ isPositive }) => (isPositive ? tw`text-long` : tw`text-short`)}
`;
