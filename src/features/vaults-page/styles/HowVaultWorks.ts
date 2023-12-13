import tw from "twin.macro";

export const Container = tw.div`
  flex flex-col justify-center items-center gap-8
  max-w-[625px]
  p-4
  bg-bg-primary
  rounded
  border border-bg-secondary hover:(border-brand shadow-glow)
  transition duration-150
`;

export const TitleContainer = tw.div`
  flex w-full justify-between items-center
`;

export const EmptySpace = tw.div`
  w-8
`;

export const Title = tw.span`
  text-2xl text-text-white text-center
  font-medium
`;

export const Description = tw.span`
  text-sm text-text-gray text-center
  font-medium
`;

export const DescriptionImage = tw.img`max-w-[530px] w-full`;
