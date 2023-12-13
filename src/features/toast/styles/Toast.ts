import styled from "@emotion/styled";
import tw from "twin.macro";

export const Container = tw.div`
  flex items-center gap-4
  px-5 py-3 rounded
  bg-bg-secondary
`;

export const Content = tw.div`
  flex flex-col gap-2
`;

export const Title = tw.span`
  text-sm text-text-white
  font-semibold
`;

export const Description = styled(Title)`
  ${tw`font-medium`}

  word-break: break-word;
`;

export const TransactionLink = tw.a`
  text-sm text-text-white
  font-medium
  underline
`;
