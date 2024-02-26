import { PairInfo } from "../../open-position-modal/components/PairInfo";
import {
  Container,
  Content,
  Header,
  HeaderContainer,
} from "../../open-position-modal/styles/OpenPositionModal";
import { isPositionSideLong } from "../../trade-panel/helpers/isPositionSideLong";
import { useTradeModalTitle } from "../../trade-panel/hooks/useTradeModalTitle";
import { PositionAction } from "../../trade-panel/types/PositionAction";
import { useClosePositionModalState } from "../stores/useClosePositionModalState";

import { ClosePositionModalMainButton } from "./ClosePositionModalMainButton";
import { EntryPriceInfo } from "./EntryPriceInfo";
import { PositionInfo } from "./PositionInfo";
import { ProfitAndLossInfo } from "./ProfitAndLossInfo";

export const ClosePositionModalContent = () => {
  const { pairId, positionSide } = useClosePositionModalState();
  const title = useTradeModalTitle(PositionAction.CLOSE, positionSide, pairId);

  const isLong = isPositionSideLong(positionSide);

  return (
    <Container>
      <HeaderContainer isLong={isLong}>
        <Header isLong={isLong}>{title}</Header>
      </HeaderContainer>
      <Content>
        <PairInfo pairId={pairId} positionSide={positionSide} />
        <EntryPriceInfo />
        <PositionInfo />
        <ProfitAndLossInfo />
        <ClosePositionModalMainButton />
      </Content>
    </Container>
  );
};
