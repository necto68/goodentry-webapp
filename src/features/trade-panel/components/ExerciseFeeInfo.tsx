import { toBig } from "../../shared/helpers/bigjs";
import { getFormattedTokenAmountWithSymbol } from "../../shared/helpers/formatters";
import {
  InfoRow,
  InfoTitle,
  InfoValue,
} from "../../shared/modal/styles/ModalInfo";
import { exerciseFee } from "../constants/openPosition";

import type { TradePanelState } from "../types/TradePanelState";
import type { FC } from "react";

type ExerciseFeeInfoProps = Pick<TradePanelState, "quoteTokenInputState">;

export const ExerciseFeeInfo: FC<ExerciseFeeInfoProps> = ({
  quoteTokenInputState,
}) => {
  const { tokenData } = quoteTokenInputState;
  const { symbol } = tokenData ?? {};

  const formattedExerciseFee = getFormattedTokenAmountWithSymbol(
    toBig(exerciseFee),
    symbol
  );

  return (
    <InfoRow>
      <InfoTitle>Exercise Fee</InfoTitle>
      <InfoValue>{formattedExerciseFee}</InfoValue>
    </InfoRow>
  );
};
