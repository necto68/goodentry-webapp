import tw from "twin.macro";

import { InfoTitle, InfoValue } from "../../shared/modal/styles/ModalInfo";

export const Container = tw.div`flex flex-col justify-center bg-bg-primary sm:min-w-[302px] w-[25%] sm:max-w-[24%]
  hover:border-brand max-w-full min-w-full min-h-[400px]
  rounded border border-bg-secondary p-2 gap-4 transition duration-150 hover:shadow-glow`;

export const TagContainer = tw.div`
  flex
`;

export const TokenIconLeft = tw.img`
    flex h-32 max-w-[50%] translate-x-6 z-10 shadow-xl rounded-full
`;

export const TokenIconRight = tw.img`
    flex h-32 max-w-[50%] -translate-x-6
`;

export const Tokens = tw.div`
  flex justify-center
`;

export const Title = tw.h2`
    flex text-2xl text-white justify-center
`;

export const VaultInfo = tw.div`
    flex flex-col gap-4
`;

export const InfoDescription = tw(InfoTitle)`
   flex items-center gap-2 text-text-blueGray
`;

export const InfoValueBold = tw(InfoValue)`
    text-xl font-bold
`;

export const InfoValueBrand = tw.h3`
    flex flex-col text-brand text-xl
`;

export const Separator = tw.div`
  flex border-b border-bg-secondary
`;

export const NoTag = tw.div`h-7`;
