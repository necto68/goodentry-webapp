import tw from "twin.macro";

export const Container = tw.div`
  flex flex-col gap-2
`;

export const Title = tw.span`
  text-3xl text-text-white
  font-semibold
`;

export const TitleSymbol = tw(Title)`
  text-brand
`;

export const SubTitleContainer = tw.div`
  flex gap-1
`;

export const SubTitle = tw.span`
  text-sm text-text-gray
  font-medium
`;
