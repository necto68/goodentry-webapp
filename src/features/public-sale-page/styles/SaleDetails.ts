import tw from "twin.macro";

import { ComponentContainer } from "../../protected-perps-page/styles/ProtectedPerpsPage";

export const Container = tw(ComponentContainer)`
  flex-col gap-6
  px-6 py-4
`;

export const Content = tw.div`
  flex gap-6 flex-wrap
`;

export const ItemContainer = tw.div`
  flex flex-col flex-1
`;

export const ItemTitle = tw.span`
  text-sm text-text-gray
  font-medium
`;

export const ItemValue = tw.span`
  text-text-white
  font-medium
`;

export const ItemSymbol = tw(ItemValue)`
  text-brand 
`;

export const ItemError = tw(ItemValue)`
  text-error
`;
