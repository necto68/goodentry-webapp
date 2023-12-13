import tw from "twin.macro";

import { ComponentContainer } from "../../protected-perps-page/styles/ProtectedPerpsPage";

export const Container = tw(ComponentContainer)`
  justify-between items-center gap-2 flex-wrap
  px-6 py-4
`;

export const Title = tw.span`
  text-xl text-text-white
  font-bold
`;

export const TimerContainer = tw.div`
  flex items-center gap-3
`;

export const TimerItem = tw.div`
  flex flex-col items-center
`;

export const TimerValue = tw(Title)`
  text-brand
`;

export const TimerDescription = tw.span`
  text-sm text-text-gray
  font-medium
`;

export const TimerDelimiter = tw.span`
  text-2xl text-text-white
  font-semibold
`;
