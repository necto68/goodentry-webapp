import { InputRightAddon } from "@chakra-ui/react";
import styled from "@emotion/styled";
import tw, { theme } from "twin.macro";

interface InputGroupContainerProps {
  isError: boolean;
}

export const Container = tw.div`
   flex flex-col gap-1
`;

export const InputsContainer = tw.div`
  flex flex-col gap-4
`;

export const InputContainer = tw.div`
  flex flex-col gap-1
`;

export const InputTitleContainer = tw.div`
  flex justify-between items-center
`;

export const BalanceTitleContainer = tw.div`
  flex gap-1
`;

export const InputTitle = tw.span`
  text-xs text-text-white
  font-medium
`;

export const InputSubTitle = tw(InputTitle)`
  text-text-gray
`;

export const InputGroupContainer = styled.div<InputGroupContainerProps>`
  ${tw`rounded-md overflow-hidden`}

  outline-width: 1px;
  outline-style: solid;
  outline-color: ${({ isError }) =>
    isError ? theme`colors.error` : "transparent"};
`;

export const InputRightAddonContainer = tw(InputRightAddon)`
  flex items-center gap-2
  bg-bg-secondary
  px-3
  border-0
  text-white
`;
