import tw from "twin.macro";

import { BaseIcon } from "../../shared/components/BaseIcon";

export const Container = tw.div`
 flex justify-center items-center gap-16
`;

export const Icon = tw(BaseIcon)`
  min-w-[24px] w-[24px]
`;
