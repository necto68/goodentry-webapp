import { usePair } from "../../protected-perps-page/hooks/usePair";
import {
  Container,
  InfoRow,
  InfoTitle,
  InfoValue,
} from "../../shared/modal/styles/ModalInfo";
import { getPositionSideTitle } from "../../trade-panel/helpers/getPositionSideTitle";
import { useOpenPositionModalState } from "../stores/useOpenPositionModalState";

export const PairInfo = () => {
  const { positionSide, pairId } = useOpenPositionModalState();
  const { title } = usePair(pairId) ?? {};

  const positionSideTitle = getPositionSideTitle(positionSide);

  return (
    <Container>
      <InfoRow>
        <InfoTitle>Market</InfoTitle>
        <InfoValue>{title}</InfoValue>
      </InfoRow>
      <InfoRow>
        <InfoTitle>Side</InfoTitle>
        <InfoValue>{positionSideTitle}</InfoValue>
      </InfoRow>
    </Container>
  );
};
