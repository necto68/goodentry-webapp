import { useCallback } from "react";
import { BiTrendingUp, BiTrendingDown } from "react-icons/bi";

import { Switcher } from "../../form-components/components/Switcher";
import { ComponentContainer } from "../../protected-perps-page/styles/ProtectedPerpsPage";
import { getTabTitle } from "../helpers/getTabTitle";
import { useTradePanelState } from "../stores/useTradePanelState";
import { Container } from "../styles/TradePanel";
import { TabType } from "../types/TabType";

import { LeverageSlider } from "./LeverageSlider";
import { StrikePrice } from "./StrikePrice";
import { TradePanelInfo } from "./TradePanelInfo";
import { TradePanelInputCard } from "./TradePanelInputCard";
import { TradePanelMainButton } from "./TradePanelMainButton";

import type { SwitcherProps } from "../../form-components/types/SwitcherProps";

export const TradePanel = () => {
  const { selectedTab, setSelectedTab } = useTradePanelState();

  const handleTabClick = useCallback(
    (tab: SwitcherProps["selectedTab"]) => {
      setSelectedTab(tab === 0 ? TabType.LONG : TabType.SHORT);
    },
    [setSelectedTab]
  );

  return (
    <ComponentContainer>
      <Container>
        <Switcher
          icon0={<BiTrendingUp size={18} />}
          icon1={<BiTrendingDown size={18} />}
          onTabClick={handleTabClick}
          selectedTab={selectedTab === TabType.LONG ? 0 : 1}
          title0={getTabTitle(TabType.LONG)}
          title1={getTabTitle(TabType.SHORT)}
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
