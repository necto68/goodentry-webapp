import tw from "twin.macro";

export const Container = tw.div`
  flex flex-col gap-4
  max-w-[100%] md:min-w-[540px]
`;

export const Content = tw.div`
  flex flex-col gap-1
`;

export const ActionsContainer = tw.div`
  flex justify-center gap-4
`;
