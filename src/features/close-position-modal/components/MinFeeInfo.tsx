import { usePair } from "../../protected-perps-page/hooks/usePair";
import { getFormattedTokenAmountWithSymbol } from "../../shared/helpers/formatters";
import {
  Container,
  InfoRow,
  InfoTitle,
  InfoValue,
} from "../../shared/modal/styles/ModalInfo";
import { useClosePositionModalState } from "../stores/useClosePositionModalState";
import { TitleContainer } from "../styles/MinFeeInfo";

export const MinFeeInfo = () => {
  const { pairId, minFee } = useClosePositionModalState();
  const { quoteTokenSymbol } = usePair(pairId) ?? {};

  const formattedMinFee = getFormattedTokenAmountWithSymbol(
    minFee,
    quoteTokenSymbol
  );

  return (
    <Container>
      <InfoRow>
        <InfoTitle>Min Fee</InfoTitle>
        <InfoValue>{formattedMinFee}</InfoValue>
      </InfoRow>
      <TitleContainer>
        <InfoTitle>The minimum fee perceived is 1h 30m of funding.</InfoTitle>
        <InfoTitle>Your total funding fees will be equal to Min Fee.</InfoTitle>
      </TitleContainer>
    </Container>
  );
};
