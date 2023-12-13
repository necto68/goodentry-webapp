import tw from "twin.macro";

export const Container = tw.div`
  flex flex-1 flex-col gap-5
`;

export const Controls = tw.div`
  flex flex-row justify-between items-center
`;

export const Actions = tw.div`
  flex flex-row items-center gap-2
`;

export const Title = tw.span`
  text-white font-bold text-sm font-medium
`;
