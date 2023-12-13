import tw from "twin.macro";

export const Container = tw.div`
  flex flex-col gap-4
  p-3
  bg-bg-primary
  border border-bg-secondary rounded
`;

export const DescriptionImage = tw.img``;

export const Title = tw.span`
  text-brand
  font-semibold
`;

export const Description = tw.span`
  text-text-gray
  font-medium
`;

export const StepsTitle = tw.span`
  text-sm text-text-gray
  font-semibold
`;

export const CurrentStepTitle = tw(StepsTitle)`
  text-text-white
`;

export const FooterContainer = tw.div`
  flex justify-between items-center
`;

export const ButtonsContainer = tw.div`
  flex items-center gap-1
`;
