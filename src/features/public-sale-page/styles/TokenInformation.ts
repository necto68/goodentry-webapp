import tw from "twin.macro";

import { Container as ClaimInformationContainer } from "./ClaimInformation";

export const Container = tw(ClaimInformationContainer)`
  w-full
`;

export const ItemContainer = tw.div`
  flex flex-col
`;

export const ItemTitle = tw.span`
  text-text-gray
`;

export const ItemValue = tw.span`
  text-lg text-text-white
  font-semibold
`;

export const ItemSymbol = tw(ItemValue)`
  text-brand
`;

export const ItemLink = tw.a`
  text-lg text-text-white
  font-semibold
  underline
`;
