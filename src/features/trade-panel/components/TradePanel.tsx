import { useCallback } from "react";
import { BiTrendingUp, BiTrendingDown } from "react-icons/bi";

import { Switcher } from "../../form-components/components/Switcher";
import { ComponentContainer } from "../../protected-perps-page/styles/ProtectedPerpsPage";
import { getPositionSideTitle } from "../helpers/getPositionSideTitle";
import { isPositionSideLong } from "../helpers/isPositionSideLong";
import { useTradePanelState } from "../stores/useTradePanelState";
import { Container } from "../styles/TradePanel";
import { PositionSide } from "../types/PositionSide";

import { LeverageSlider } from "./LeverageSlider";
import { StrikePrice } from "./StrikePrice";
import { TradePanelInfo } from "./TradePanelInfo";
import { TradePanelInputCard } from "./TradePanelInputCard";
import { TradePanelMainButton } from "./TradePanelMainButton";

import type { SwitcherProps } from "../../form-components/types/SwitcherProps";

export const TradePanel = () => {
  const { positionSide, setPositionSide } = useTradePanelState();

  const handleTabClick = useCallback(
    (tab: SwitcherProps["tab"]) => {
      setPositionSide(tab === 0 ? PositionSide.LONG : PositionSide.SHORT);
    },
    [setPositionSide]
  );

  return (
    <ComponentContainer>
      <Container>
        <Switcher
          icon0={<BiTrendingUp size={18} />}
          icon1={<BiTrendingDown size={18} />}
          onTabClick={handleTabClick}
          tab={isPositionSideLong(positionSide) ? 0 : 1}
          title0={getPositionSideTitle(PositionSide.LONG)}
          title1={getPositionSideTitle(PositionSide.SHORT)}
        />
        <StrikePrice />
        <TradePanelInputCard />
        <LeverageSlider />
        <TradePanelInfo />
        <TradePanelMainButton />
      </Container>
    </ComponentContainer>
  );
};
