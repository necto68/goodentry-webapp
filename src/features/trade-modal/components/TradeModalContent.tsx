import { TabType } from "../../trade-panel/types/TabType";
import { useTradeModalTitle } from "../hooks/useTradeModalTitle";
import { useTradeModalState } from "../stores/useTradeModalState";
import {
  Container,
  Content,
  Header,
  HeaderContainer,
} from "../styles/TradeModal";

import { CollateralInfo } from "./CollateralInfo";
import { PairInfo } from "./PairInfo";
import { PositionInfo } from "./PositionInfo";
import { StrikePriceInfo } from "./StrikePriceInfo";
import { TradeModalMainButton } from "./TradeModalMainButton";

export const TradeModalContent = () => {
  const { selectedTab } = useTradeModalState();
  const title = useTradeModalTitle();

  const isLongTab = selectedTab === TabType.LONG;

  return (
    <Container>
      <HeaderContainer isLongTab={isLongTab}>
        <Header isLongTab={isLongTab}>{title}</Header>
      </HeaderContainer>
      <Content>
        <PairInfo />
        <StrikePriceInfo />
        <PositionInfo />
        <CollateralInfo />
        <TradeModalMainButton />
      </Content>
    </Container>
  );
};
