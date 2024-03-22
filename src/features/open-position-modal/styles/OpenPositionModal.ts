import styled from "@emotion/styled";
import tw from "twin.macro";

import { InfoValue } from "../../shared/modal/styles/ModalInfo";

interface HeaderContainerProps {
  isLong: boolean;
}

export const Container = tw.div`
    flex flex-col gap-6
`;

export const HeaderContainer = styled.div<HeaderContainerProps>`
  ${tw`flex justify-center`}
  ${tw`p-1.5 border-b`}
  ${({ isLong }) => (isLong ? tw`border-b-long` : tw`border-b-short`)}
`;

export const Header = styled(InfoValue)<HeaderContainerProps>`
  ${({ isLong }) => (isLong ? tw`text-long` : tw`text-short`)}
`;

export const Content = tw.div`
    flex flex-col gap-4
`;
