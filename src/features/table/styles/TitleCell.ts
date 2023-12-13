import tw from "twin.macro";

import { BaseIcon } from "../../shared/components/BaseIcon";

export const Container = tw.div`
  flex items-center gap-2
`;

export const TokensContainer = tw.div`
  flex
  min-w-max
`;

export const TokenIcon = tw(BaseIcon)`
  w-6
`;

export const SecondTokenIcon = tw(TokenIcon)`
  -translate-x-1.5
`;

export const TitleContainer = tw.div`
  flex flex-col items-start gap-2
`;
