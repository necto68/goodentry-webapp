import { isPositionSideLong } from "../../trade-panel/helpers/isPositionSideLong";
import { useTradeModalTitle } from "../../trade-panel/hooks/useTradeModalTitle";
import { PositionAction } from "../../trade-panel/types/PositionAction";
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
  const { positionSide, pairId } = useOpenPositionModalState();

  const title = useTradeModalTitle(PositionAction.OPEN, positionSide, pairId);
  const isLong = isPositionSideLong(positionSide);

  return (
    <Container>
      <HeaderContainer isLong={isLong}>
        <Header isLong={isLong}>{title}</Header>
      </HeaderContainer>
      <Content>
        <PairInfo pairId={pairId} positionSide={positionSide} />
        <StrikePriceInfo />
        <PositionInfo />
        <CollateralInfo />
        <OpenPositionModalMainButton />
      </Content>
    </Container>
  );
};
