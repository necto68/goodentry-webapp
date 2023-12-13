import { Player } from "@lottiefiles/react-lottie-player";
import tw from "twin.macro";

export const Container = tw.header`
  flex flex-1 justify-between items-center gap-2
  p-6
`;

export const Wrapper = tw.div`
  flex justify-center items-center
  w-full
  border-b border-bg-secondary
`;

export const Content = tw.div`
  flex items-center gap-6
  lg:flex-1
`;

export const AppLogoIcon = tw(Player)`
  w-28 translate-y-[-16px] max-h-[40px]
  hidden
  md:block
`;

export const ButtonsContainer = tw.div`
  flex justify-end items-center gap-2
`;
