import styled from "@emotion/styled/dist/emotion-styled.cjs";
import tw from "twin.macro";

import { isPositionSideLong } from "../../trade-panel/helpers/isPositionSideLong";
import bg from "../assets/bg.png";

import type { PositionSide } from "../../trade-panel/types/PositionSide";

interface PnlValueProps {
  isPositive: boolean;
}

interface SideValueProps {
  positionSide: PositionSide;
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
  ${tw`text-sm text-black rounded p-1 ml-4`}

  ${({ positionSide }) =>
    isPositionSideLong(positionSide) ? tw`bg-long` : tw`bg-short`}
`;

export const PositionProfitRow = tw.div`flex w-full gap-2 justify-between items-center`;

export const PnlValue = styled.div<PnlValueProps>`
  ${tw`text-xl font-bold p-4 flex w-full justify-around items-center border border-brand bg-bg-primary rounded`}

  ${({ isPositive }) => (isPositive ? tw`text-long` : tw`text-short`)}
`;

export const EntryPriceRow = tw.div`flex w-full gap-2 justify-between items-center`;

export const PriceCol = tw.div`flex flex-col w-full gap-2`;

export const PriceTitle = tw.span`text-text-gray text-sm`;

export const PriceValue = tw.div`inline-block w-full p-3 text-white text-base font-semibold border border-bg-secondary bg-bg-primary rounded`;
