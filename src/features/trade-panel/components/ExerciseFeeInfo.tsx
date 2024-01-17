import { loadingPlaceholder } from "../../shared/constants/placeholders";
import { getFormattedAmount } from "../../shared/helpers/baseFormatters";
import { toBig } from "../../shared/helpers/bigjs";
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

  const formattedExerciseFeeValue = getFormattedAmount(toBig(exerciseFee));
  const formattedExerciseFee = tokenData
    ? `${formattedExerciseFeeValue} ${tokenData.symbol}`
    : loadingPlaceholder;

  return (
    <InfoRow>
      <InfoTitle>Exercise Fee</InfoTitle>
      <InfoValue>{formattedExerciseFee}</InfoValue>
    </InfoRow>
  );
};
