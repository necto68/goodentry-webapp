import { useGovernanceToken } from "../../lock-page/hooks/useGovernanceToken";
import { useLockToken } from "../../lock-page/hooks/useLockToken";
import { getDurationBetweenTimestamps } from "../../public-sale-page/helpers/getDurationBetweenTimestamps";
import { useCurrentTimestamp } from "../../public-sale-page/hooks/useCurrentTimestamp";
import { loadingPlaceholder } from "../../shared/constants/placeholders";
import {
  getFormattedAPY,
  getFormattedDate,
  getFormattedDurationParts,
} from "../../shared/helpers/baseFormatters";
import { getFormattedTokenAmountWithSymbol } from "../../shared/helpers/formatters";
import {
  Container,
  InfoRow,
  InfoTitle,
  InfoValue,
  InfoColorValue,
} from "../../shared/modal/styles/ModalInfo";
import { useLockWithdrawModalState } from "../stores/useLockWithdrawModalState";

export const UnlockScheduleInfo = () => {
  const { selectedUnlockSchedule } = useLockWithdrawModalState();

  const { symbol: lockTokenSymbol } = useLockToken() ?? {};
  const { symbol: governanceTokenSymbol } = useGovernanceToken() ?? {};

  const currentTimestamp = useCurrentTimestamp();

  const {
    governanceTokenInitUnlock,
    governanceTokenLocked,
    governanceTokenUnlocked,
    penalty,
    isPenaltyExist,
    startTimestamp,
    endTimestamp,
  } = selectedUnlockSchedule ?? {};

  const [formattedStartTimestamp, formattedEndTimestamp] = [
    startTimestamp,
    endTimestamp,
  ].map((timestamp) =>
    timestamp ? getFormattedDate(timestamp) : loadingPlaceholder
  );

  let formattedDuration = loadingPlaceholder;

  if (endTimestamp) {
    const { days, hours, minutes, seconds } = getDurationBetweenTimestamps(
      currentTimestamp,
      endTimestamp
    );

    const [formattedDays, formattedHours, formattedMinutes, formattedSeconds] =
      getFormattedDurationParts(days, hours, minutes, seconds);

    formattedDuration = `${formattedDays}:${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

  const formattedInitUnlock = getFormattedTokenAmountWithSymbol(
    governanceTokenInitUnlock,
    governanceTokenSymbol
  );

  const [formattedLocked, formattedUnlocked] = [
    governanceTokenLocked,
    governanceTokenUnlocked,
  ].map((value) => getFormattedTokenAmountWithSymbol(value, lockTokenSymbol));

  const formattedPenalty = penalty
    ? getFormattedAPY(penalty)
    : loadingPlaceholder;

  return (
    <Container>
      <InfoRow>
        <InfoTitle>Start Time</InfoTitle>
        <InfoValue>{formattedStartTimestamp}</InfoValue>
      </InfoRow>
      <InfoRow>
        <InfoTitle>End Time</InfoTitle>
        <InfoValue>{formattedEndTimestamp}</InfoValue>
      </InfoRow>
      <InfoRow>
        <InfoTitle>Time Left</InfoTitle>
        <InfoValue>{formattedDuration}</InfoValue>
      </InfoRow>
      <InfoRow>
        <InfoTitle>Init Unlock</InfoTitle>
        <InfoValue>{formattedInitUnlock}</InfoValue>
      </InfoRow>
      <InfoRow>
        <InfoTitle>Locked</InfoTitle>
        <InfoValue>{formattedLocked}</InfoValue>
      </InfoRow>
      <InfoRow>
        <InfoTitle>Unlocked</InfoTitle>
        <InfoValue>{formattedUnlocked}</InfoValue>
      </InfoRow>
      <InfoRow>
        <InfoTitle>Withdraw Penalty</InfoTitle>
        {isPenaltyExist ? (
          <InfoColorValue isPositive={false}>{formattedPenalty}</InfoColorValue>
        ) : (
          <InfoValue>{formattedPenalty}</InfoValue>
        )}
      </InfoRow>
    </Container>
  );
};
