import { usePair } from "../../protected-perps-page/hooks/usePair";
import {
  Container,
  InfoRow,
  InfoTitle,
  InfoValue,
} from "../../shared/modal/styles/ModalInfo";
import { getTabTitle } from "../../trade-panel/helpers/getTabTitle";
import { useTradeModalState } from "../stores/useTradeModalState";

export const PairInfo = () => {
  const { selectedTab, selectedPairId } = useTradeModalState();
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
