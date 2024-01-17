import { usePair } from "../../protected-perps-page/hooks/usePair";
import {
  Container,
  InfoRow,
  InfoTitle,
  InfoValue,
} from "../../shared/modal/styles/ModalInfo";
import { getTabTitle } from "../../trade-panel/helpers/getTabTitle";
import { useOpenPositionModalState } from "../stores/useOpenPositionModalState";

export const PairInfo = () => {
  const { selectedTab, selectedPairId } = useOpenPositionModalState();
  const { title } = usePair(selectedPairId) ?? {};

  const sideTitle = getTabTitle(selectedTab);

  return (
    <Container>
      <InfoRow>
        <InfoTitle>Market</InfoTitle>
        <InfoValue>{title}</InfoValue>
      </InfoRow>
      <InfoRow>
        <InfoTitle>Side</InfoTitle>
        <InfoValue>{sideTitle}</InfoValue>
      </InfoRow>
    </Container>
  );
};
