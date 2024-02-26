import {
  getFormattedBorrowRate,
  getFormattedPrice,
  getFormattedRunway,
} from "../../shared/helpers/formatters";
import {
  Container,
  InfoRow,
  InfoTitle,
  InfoValue,
} from "../../shared/modal/styles/ModalInfo";
import { getRunwayInSeconds } from "../../trade-panel/helpers/getRunwayInSeconds";
import { useTradePanelOptionHourlyBorrowRate } from "../../trade-panel/hooks/useTradePanelOptionHourlyBorrowRate";
import { useTradePanelStrikePrice } from "../../trade-panel/hooks/useTradePanelStrikePrice";
import { useOpenPositionModalState } from "../stores/useOpenPositionModalState";

export const StrikePriceInfo = () => {
  const { positionSide, pairId, quoteTokenInputState, leverage } =
    useOpenPositionModalState();

  const strikePrice = useTradePanelStrikePrice(positionSide, pairId);
  const optionHourlyBorrowRate = useTradePanelOptionHourlyBorrowRate(
    positionSide,
    pairId,
    quoteTokenInputState,
    leverage
  );

  const runwayInSeconds = getRunwayInSeconds(
    quoteTokenInputState,
    leverage,
    optionHourlyBorrowRate
  );

  const formattedStrikePrice = getFormattedPrice(strikePrice);
  const formattedHourlyBorrowRate = getFormattedBorrowRate(
    optionHourlyBorrowRate
  );
  const formattedRunway = getFormattedRunway(runwayInSeconds);

  return (
    <Container>
      <InfoRow>
        <InfoTitle>Activation Price</InfoTitle>
        <InfoValue>{formattedStrikePrice}</InfoValue>
      </InfoRow>
      <InfoRow>
        <InfoTitle>Funding / 1h</InfoTitle>
        <InfoValue>{formattedHourlyBorrowRate}</InfoValue>
      </InfoRow>
      <InfoRow>
        <InfoTitle>Runway</InfoTitle>
        <InfoValue>{formattedRunway}</InfoValue>
      </InfoRow>
    </Container>
  );
};
