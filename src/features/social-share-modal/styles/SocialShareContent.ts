import styled from "@emotion/styled/dist/emotion-styled.cjs";
import tw from "twin.macro";

import { PositionSide } from "../../queries/types/Position";
import bg from "../assets/bg.png";

interface PnlValueProps {
  isPositive: boolean;
}

interface SideValueProps {
  side: PositionSide;
}

export const Container = styled.div`
  ${tw`flex w-full md:pr-[20%] flex-col z-10 p-6 gap-4 bg-cover bg-right bg-no-repeat`}

  background-image: url(${bg});
`;

export const Logo = tw.img`w-[140px]`;

export const PairName = tw.div`text-white text-xl font-bold p-4 flex justify-between items-center border border-bg-secondary bg-bg-primary rounded`;

export const Leverage = tw.span`text-sm text-white border border-bg-secondaryDark bg-bg-secondary rounded p-1 ml-2`;

export const Long = tw.span`text-sm text-white bg-interactions-green rounded p-1 ml-4`;

export const SideValue = styled.div<SideValueProps>`
  ${tw`text-sm text-white rounded p-1 ml-4`}

  ${({ side }) =>
    side === PositionSide.LONG ? tw`bg-interactions-green` : tw`bg-error`}
`;

export const PositionProfitRow = tw.div`flex w-full gap-2 justify-between items-center`;

export const PnlValue = styled.div<PnlValueProps>`
  ${tw`text-brand text-xl font-bold p-4 flex w-full justify-around items-center border border-brand bg-bg-primary rounded`}

  ${({ isPositive }) => (isPositive ? tw`text-brand` : tw`text-error`)}
`;

export const EntryPriceRow = tw.div`flex w-full gap-2 justify-between items-center`;

export const PriceCol = tw.div`flex flex-col w-full gap-2`;

export const PriceTitle = tw.span`text-text-gray text-sm`;

export const PriceValue = tw.div`inline-block w-full p-3 text-white text-base font-semibold border border-bg-secondary bg-bg-primary rounded`;
