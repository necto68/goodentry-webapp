import styled from "@emotion/styled/dist/emotion-styled.cjs";
import tw from "twin.macro";

interface ColorValueProps {
  isPositive: boolean;
}

export const Container = tw.div`
  flex flex-row gap-6 items-center flex-wrap
`;

export const PriceContainer = tw.div`
    flex flex-col
`;

export const Title = tw.span`
    text-xs text-text-gray font-normal
`;

export const Value = tw.span`
    text-base text-white font-medium
`;

export const ColorValue = styled(Value)<ColorValueProps>`
  ${({ isPositive }) => (isPositive ? tw`text-long` : tw`text-short`)}
`;
