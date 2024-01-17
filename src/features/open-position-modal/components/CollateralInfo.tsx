import { loadingPlaceholder } from "../../shared/constants/placeholders";
import { getFormattedAmount } from "../../shared/helpers/baseFormatters";
import {
  Container,
  InfoRow,
  InfoTitle,
  InfoValue,
} from "../../shared/modal/styles/ModalInfo";
import { ExerciseFeeInfo } from "../../trade-panel/components/ExerciseFeeInfo";
import { getCollateralAmountIncludingFee } from "../../trade-panel/helpers/getCollateralAmountIncludingFee";
import { useOpenPositionModalState } from "../stores/useOpenPositionModalState";

export const CollateralInfo = () => {
  const { quoteTokenInputState } = useOpenPositionModalState();

  const { tokenData, inputValueBig } = quoteTokenInputState;

  const collateralAmount = getCollateralAmountIncludingFee(inputValueBig);

  const formattedCollateralAmount = getFormattedAmount(collateralAmount);
  const formattedCollateral = tokenData
    ? `${formattedCollateralAmount} ${tokenData.symbol}`
    : loadingPlaceholder;

  return (
    <Container>
      <ExerciseFeeInfo quoteTokenInputState={quoteTokenInputState} />
      <InfoRow>
        <InfoTitle>Collateral (Wager + Exercise Fee)</InfoTitle>
        <InfoValue>{formattedCollateral}</InfoValue>
      </InfoRow>
    </Container>
  );
};
