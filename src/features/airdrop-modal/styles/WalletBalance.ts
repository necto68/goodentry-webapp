import tw from "twin.macro";

import { ComponentContainer } from "../../protected-perps-page/styles/ProtectedPerpsPage";

export const Container = tw(ComponentContainer)`
  justify-center
  w-full
  p-2
`;

export const Content = tw.div`
  flex flex-col items-center gap-2
`;

export const Title = tw.span`
  text-xs text-text-gray
`;

export const BalanceContent = tw.div`
  flex items-center gap-4
  text-text-white
  text-center
`;
