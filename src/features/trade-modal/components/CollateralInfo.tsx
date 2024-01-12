import { loadingPlaceholder } from "../../shared/constants/placeholders";
import { getFormattedAmount } from "../../shared/helpers/baseFormatters";
import {
  Container,
  InfoRow,
  InfoTitle,
  InfoValue,
} from "../../shared/modal/styles/ModalInfo";
import { ExerciseFeeInfo } from "../../trade-panel/components/ExerciseFeeInfo";
import { exerciseFee } from "../../trade-panel/constants/openPosition";
import { useTradeModalState } from "../stores/useTradeModalState";

export const CollateralInfo = () => {
  const { quoteTokenInputState } = useTradeModalState();

  const { tokenData, inputValueBig } = quoteTokenInputState;
  const collateralValue = inputValueBig.add(exerciseFee);

  const formattedCollateralValue = getFormattedAmount(collateralValue);
  const formattedCollateral = tokenData
    ? `${formattedCollateralValue} ${tokenData.symbol}`
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
