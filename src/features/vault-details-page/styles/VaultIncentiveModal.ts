import { Button } from "@chakra-ui/react";
import tw from "twin.macro";

import { ComponentContainer } from "../../protected-perps-page/styles/ProtectedPerpsPage";
import { InfoValue } from "../../shared/modal/styles/ModalInfo";

export const Container = tw(ComponentContainer)`
  flex-col
  max-w-[343px]
  gap-2
`;

export const Title = tw.h2`text-white`;
export const Description = tw.p`text-white/60 text-sm`;
export const TokenIcon = tw.img`h-4 w-4`;
export const InfoValueRow = tw(InfoValue)`flex items-center`;
export const Actions = tw.div`flex justify-between items-center gap-2`;
export const Action = tw(Button)`w-full`;
