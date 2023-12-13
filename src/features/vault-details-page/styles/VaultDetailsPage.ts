import tw from "twin.macro";

export const Wrapper = tw.div`flex flex-col justify-center bg-glow shadow-glow
  max-w-full min-w-full 
  py-1`;

export const Container = tw.div`flex flex-col justify-center items-center bg-bg-details
  max-w-full min-w-full min-h-[314px]
  py-2 px-4 md:py-6 md:px-12 gap-2 transition duration-150 shadow-glow`;

export const Content = tw.div`flex flex-col-reverse items-center sm:flex-row max-w-[1024px] w-full justify-between`;

export const VaultBrief = tw.div`flex flex-col justify-between p-2 relative max-w-[478px] w-full gap-3`;

export const PairTitle = tw.div`flex text-4xl text-white items-center gap-2`;

export const TokenIconLeft = tw.img`
    hidden sm:flex max-h-48 w-48 max-w-[50%] translate-x-6 z-10 shadow-xl rounded-full
`;

export const TokenIconRight = tw.img`
    hidden sm:flex max-h-48 w-48 max-w-[50%] -translate-x-6
`;

export const TokenIconLeftMobile = tw.img`
  sm:hidden h-12 translate-x-2 z-10 shadow-xl rounded-full
`;

export const TokenIconRightMobile = tw.img`
   sm:hidden h-12 -translate-x-2
`;

export const VaultDefaultBody = tw.div`flex flex-col-reverse justify-center items-center md:items-start max-w-[1024px] md:flex-row p-4 md:p-8 gap-4`;

export const VaultDescription = tw.div`flex items-start gap-6 flex-col md:w-[calc(100% - 343px)]`;

export const VaultInfo = tw.div`flex flex-col gap-2`;

export const Description = tw.p`
    text-text-gray
`;
