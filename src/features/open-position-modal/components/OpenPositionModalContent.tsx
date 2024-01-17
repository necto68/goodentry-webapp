import { useTradeModalTitle } from "../../trade-panel/hooks/useTradeModalTitle";
import { PositionActionType } from "../../trade-panel/types/PositionActionType";
import { TabType } from "../../trade-panel/types/TabType";
import { useOpenPositionModalState } from "../stores/useOpenPositionModalState";
import {
  Container,
  Content,
  Header,
  HeaderContainer,
} from "../styles/OpenPositionModal";

import { CollateralInfo } from "./CollateralInfo";
import { OpenPositionModalMainButton } from "./OpenPositionModalMainButton";
import { PairInfo } from "./PairInfo";
import { PositionInfo } from "./PositionInfo";
import { StrikePriceInfo } from "./StrikePriceInfo";

export const OpenPositionModalContent = () => {
  const { selectedTab, selectedPairId } = useOpenPositionModalState();

  const title = useTradeModalTitle(
    PositionActionType.OPEN,
    selectedTab,
    selectedPairId
  );

  const isLong = selectedTab === TabType.LONG;

  return (
    <Container>
      <HeaderContainer isLong={isLong}>
        <Header isLong={isLong}>{title}</Header>
      </HeaderContainer>
      <Content>
        <PairInfo />
        <StrikePriceInfo />
        <PositionInfo />
        <CollateralInfo />
        <OpenPositionModalMainButton />
      </Content>
    </Container>
  );
};
