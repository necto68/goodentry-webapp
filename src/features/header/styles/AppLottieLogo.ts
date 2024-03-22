import { Player } from "@lottiefiles/react-lottie-player";
import tw from "twin.macro";

import { BaseIcon } from "../../shared/components/BaseIcon";

export const Container = tw.div`
   max-h-[40px] w-28
`;

export const AppLogoLottieIcon = tw(Player)`
  w-28 translate-y-[-16px]
  hidden
  md:block
`;

export const AppLogoIcon = tw(BaseIcon)`
  w-28
  hidden
  md:block
`;

export const AppMobileLogoIcon = tw(BaseIcon)`
  w-24
  md:hidden
`;
