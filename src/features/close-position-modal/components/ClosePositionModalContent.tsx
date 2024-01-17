import {
  Container,
  Content,
  Header,
  HeaderContainer,
} from "../../open-position-modal/styles/OpenPositionModal";
import { PositionSide } from "../../queries/types/Position";
import { useTradeModalTitle } from "../../trade-panel/hooks/useTradeModalTitle";
import { PositionActionType } from "../../trade-panel/types/PositionActionType";
import { TabType } from "../../trade-panel/types/TabType";
import { useClosePositionModalState } from "../stores/useClosePositionModalState";

import { ClosePositionModalMainButton } from "./ClosePositionModalMainButton";

export const ClosePositionModalContent = () => {
  const { pairId, side } = useClosePositionModalState();

  const title = useTradeModalTitle(
    PositionActionType.OPEN,
    side === PositionSide.LONG ? TabType.LONG : TabType.SHORT,
    pairId
  );

  const isLong = side === PositionSide.LONG;

  return (
    <Container>
      <HeaderContainer isLong={isLong}>
        <Header isLong={isLong}>{title}</Header>
      </HeaderContainer>
      <Content>
        <ClosePositionModalMainButton />
      </Content>
    </Container>
  );
};
