import tw from "twin.macro";

import { ComponentContainer } from "../../protected-perps-page/styles/ProtectedPerpsPage";

export const Container = tw(ComponentContainer)`
  flex-col gap-6
  px-6 py-4
`;

export const Title = tw.span`
  text-xl text-text-white
  font-medium
`;

export const Separator = tw.hr`
  flex
  w-full
  bg-bg-secondary
`;

export const Content = tw.div`
  flex justify-between items-center gap-6 flex-wrap
`;

export const InfoContent = tw(Content)`
  gap-4
`;

export const InfoContainer = tw.div`
  flex items-center gap-2
`;

export const ButtonsContent = tw.div`
  flex items-center gap-4 flex-wrap
`;
