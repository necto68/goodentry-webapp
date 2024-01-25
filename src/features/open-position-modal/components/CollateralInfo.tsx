import { getFormattedTokenAmountWithSymbol } from "../../shared/helpers/formatters";
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
  const { symbol } = tokenData ?? {};

  const collateralAmount = getCollateralAmountIncludingFee(inputValueBig);

  const formattedCollateral = getFormattedTokenAmountWithSymbol(
    collateralAmount,
    symbol
  );

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
