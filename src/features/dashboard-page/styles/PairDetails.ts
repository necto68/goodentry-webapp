import tw from "twin.macro";

export const Container = tw.div`
  flex flex-col gap-4
`;

export const TitleContainer = tw.div`
  flex flex-col gap-2
`;

export const Title = tw.span`
  font-semibold text-text-white
`;

export const Price = tw.span`
  text-sm text-text-white
  font-semibold
`;

export { Container as TableContainer } from "../../protected-perps-page/styles/Positions";
