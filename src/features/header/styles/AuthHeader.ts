import tw from "twin.macro";

import { BaseIcon } from "../../shared/components/BaseIcon";

export const Container = tw.div`
  flex gap-2 flex-wrap
`;

export const Icon = tw(BaseIcon)`
  min-w-[16px] w-4
`;
