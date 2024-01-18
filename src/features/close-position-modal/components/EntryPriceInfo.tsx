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
import { useClosePositionModalState } from "../stores/useClosePositionModalState";

export const EntryPriceInfo = () => {
  const { entryPrice, optionHourlyBorrowRate, runwayInSeconds } =
    useClosePositionModalState();

  const formattedEntryPrice = getFormattedPrice(entryPrice);
  const formattedHourlyBorrowRate = getFormattedBorrowRate(
    optionHourlyBorrowRate
  );
  const formattedRunway = getFormattedRunway(runwayInSeconds);

  return (
    <Container>
      <InfoRow>
        <InfoTitle>Entry Price</InfoTitle>
        <InfoValue>{formattedEntryPrice}</InfoValue>
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
