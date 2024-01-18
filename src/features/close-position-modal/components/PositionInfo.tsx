import { usePair } from "../../protected-perps-page/hooks/usePair";
import { loadingPlaceholder } from "../../shared/constants/placeholders";
import {
  getFormattedAmount,
  getFormattedLeverage,
} from "../../shared/helpers/baseFormatters";
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

  const formattedInitialCollateralValue = getFormattedAmount(initialCollateral);
  const formattedLeverage = getFormattedLeverage(leverage);
  const formattedPositionSizeValue = getFormattedAmount(positionSize);

  const [formattedInitialCollateral, formattedPositionSize] = [
    formattedInitialCollateralValue,
    formattedPositionSizeValue,
  ].map((value) =>
    quoteTokenSymbol ? `${value} ${quoteTokenSymbol}` : loadingPlaceholder
  );

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
