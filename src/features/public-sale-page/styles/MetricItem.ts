import tw from "twin.macro";

import { BaseIcon } from "../../shared/components/BaseIcon";

export const Container = tw.div`
  flex items-center gap-4
`;

export const Content = tw.div`
  flex flex-col
`;

export const Icon = tw(BaseIcon)`
  w-10
`;

export const Title = tw.span`
  text-sm text-text-gray
  font-medium
`;

export const Value = tw.span`
  text-text-white
  font-bold
`;

export const SymbolValue = tw(Value)`
  text-brand
`;
