import tw from "twin.macro";

export const Container = tw.div`
  flex flex-col gap-1
`;

export const InfoRow = tw.div`
  flex flex-row
  justify-between
`;

export const InfoTitle = tw.span`
  text-sm text-text-gray
  font-normal
`;

export const InfoValue = tw.span`
  text-sm text-text-white
  font-semibold
  text-right
`;

export const InfoErrorValue = tw(InfoValue)`
  text-error
`;
