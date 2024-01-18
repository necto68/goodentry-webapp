import {
  getFormattedProfitAndLoss,
  getFormattedProfitAndLossPercentage,
} from "../../shared/helpers/baseFormatters";
import {
  Container,
  InfoBrandValue,
  InfoErrorValue,
  InfoRow,
  InfoTitle,
} from "../../shared/modal/styles/ModalInfo";
import { useClosePositionModalState } from "../stores/useClosePositionModalState";

export const ProfitAndLossInfo = () => {
  const { profitAndLoss, profitAndLossPercentage } =
    useClosePositionModalState();

  const isPositive = profitAndLoss > 0;

  const formattedProfitAndLoss = getFormattedProfitAndLoss(profitAndLoss);
  const formattedProfitAndLossPercentage = getFormattedProfitAndLossPercentage(
    profitAndLossPercentage
  );

  const formattedValue = `${formattedProfitAndLoss} (${formattedProfitAndLossPercentage})`;

  return (
    <Container>
      <InfoRow>
        <InfoTitle>PNL</InfoTitle>
        {isPositive ? (
          <InfoBrandValue>{formattedValue}</InfoBrandValue>
        ) : (
          <InfoErrorValue>{formattedValue}</InfoErrorValue>
        )}
      </InfoRow>
    </Container>
  );
};
