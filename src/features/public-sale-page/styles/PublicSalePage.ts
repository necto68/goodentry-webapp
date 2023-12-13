import tw from "twin.macro";

export const Container = tw.div`
  flex flex-col gap-6
`;

export const Content = tw.div`
  flex gap-3 flex-wrap
`;

export const LeftContainer = tw.div`
  flex gap-3
  w-full md:w-[443px]
`;

export const RightContainer = tw(Container)`
  gap-3 flex-1
  max-w-full
`;
