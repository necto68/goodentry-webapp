import { usePair } from "../../protected-perps-page/hooks/usePair";
import { getFormattedLeverage } from "../../shared/helpers/baseFormatters";
import { getFormattedTokenAmountWithSymbol } from "../../shared/helpers/formatters";
import {
  Container,
  InfoRow,
  InfoTitle,
  InfoValue,
} from "../../shared/modal/styles/ModalInfo";
import { useClosePositionModalState } from "../stores/useClosePositionModalState";

export const PositionInfo = () => {
  const { pairId, initialCollateral, leverage, positionSize } =
    useClosePositionModalState();

  const { quoteTokenSymbol } = usePair(pairId) ?? {};

  const [formattedInitialCollateral, formattedPositionSize] = [
    initialCollateral,
    positionSize,
  ].map((value) => getFormattedTokenAmountWithSymbol(value, quoteTokenSymbol));

  const formattedLeverage = getFormattedLeverage(leverage);

  return (
    <Container>
      <InfoRow>
        <InfoTitle>Wager</InfoTitle>
        <InfoValue>{formattedInitialCollateral}</InfoValue>
      </InfoRow>
      <InfoRow>
        <InfoTitle>Leverage</InfoTitle>
        <InfoValue>{formattedLeverage}</InfoValue>
      </InfoRow>
      <InfoRow>
        <InfoTitle>Position Size</InfoTitle>
        <InfoValue>{formattedPositionSize}</InfoValue>
      </InfoRow>
    </Container>
  );
};
