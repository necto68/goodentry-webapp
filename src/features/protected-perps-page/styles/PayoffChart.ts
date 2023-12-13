import styled from "@emotion/styled";
import tw from "twin.macro";

import { InfoValue } from "../../shared/modal/styles/ModalInfo";

import { ComponentContainer } from "./ProtectedPerpsPage";

interface ColorValueProps {
  isPositive: boolean;
}
export const Container = tw(ComponentContainer)`
  flex-col gap-6
`;

export const Title = tw.span`
  text-sm text-text-gray
  font-medium
`;

export const Value = tw(InfoValue)``;

export const ColorValue = styled(Title)<ColorValueProps>`
  ${({ isPositive }) => (isPositive ? tw`text-brand` : tw`text-error`)}
`;
