import tw from "twin.macro";

export const Container = tw.div`
  flex gap-4
`;

export const Content = tw.div`
  flex flex-1 flex-col gap-4 justify-center items-center
  p-7
  bg-bg-secondary
  border border-brand rounded
`;

export const Title = tw.span`
  text-sm text-white
  font-medium
`;

export const Value = tw.span`
  text-3xl text-white
  font-semibold
`;

export const BrandValue = tw(Value)`
  text-brand
`;

export const ErrorValue = tw(Value)`
  text-error
`;
