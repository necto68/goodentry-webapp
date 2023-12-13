import tw from "twin.macro";

export const Container = tw.div`
  flex flex-col items-center
  min-w-full w-screen
  min-h-screen
  bg-black
`;

export const Content = tw.div`
    flex flex-col
    w-screen max-w-[1280px]
    py-6 px-2 xl:px-0
`;
