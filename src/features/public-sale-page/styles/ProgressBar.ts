import tw from "twin.macro";

export const Container = tw.div`
  flex flex-col gap-5
  py-3
`;

export const TitleContainer = tw.div`
  flex items-center justify-between
`;

export const Title = tw.span`
  text-sm text-text-white
  font-medium
`;

export const Value = tw(Title)`
  text-brand
`;
