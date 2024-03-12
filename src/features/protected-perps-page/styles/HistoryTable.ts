import tw from "twin.macro";

export const Container = tw.div`flex flex-col gap-2 p-2`;

export const Paginator = tw.div`flex justify-center`;

export const LongText = tw.span`text-brand`;

export const ShortText = tw.span`text-error`;

export const HistoryTx = tw.a`
  underline
`;
