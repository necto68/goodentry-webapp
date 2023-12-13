import { useEffect } from "react";

import { PublicSaleStatus } from "../../queries/types/PublicSaleData";
import { loadingPlaceholder } from "../../shared/constants/placeholders";
import { getFormattedDurationParts } from "../../shared/helpers/baseFormatters";
import { getDurationBetweenTimestamps } from "../helpers/getDurationBetweenTimestamps";
import { getTimerTitle } from "../helpers/getTimerTitle";
import { useCurrentTimestamp } from "../hooks/useCurrentTimestamp";
import { usePublicSaleQueries } from "../hooks/usePublicSaleQueries";
import {
  Container,
  TimerContainer,
  TimerDelimiter,
  TimerDescription,
  TimerItem,
  TimerValue,
  Title,
} from "../styles/Timer";

export const Timer = () => {
  const { publicSaleDataQuery } = usePublicSaleQueries();

  const { data, isLoading } = publicSaleDataQuery;
  const {
    startTimestamp = 0,
    endTimestamp = 0,
    isPaused = false,
    status = PublicSaleStatus.IN_PROGRESS,
  } = data ?? {};

  const timerTitle = getTimerTitle(status, isPaused);

  const currentTimestamp = useCurrentTimestamp();

  const toTimestamp =
    status === PublicSaleStatus.NOT_STARTED ? startTimestamp : endTimestamp;

  // refetch data when public sale changes phases
  useEffect(() => {
    if (
      !isLoading &&
      status !== PublicSaleStatus.ENDED &&
      toTimestamp - currentTimestamp <= 0
    ) {
      void publicSaleDataQuery.refetch();
    }
  }, [isLoading, status, currentTimestamp, toTimestamp, publicSaleDataQuery]);

  const { days, hours, minutes, seconds } = getDurationBetweenTimestamps(
    currentTimestamp,
    toTimestamp
  );

  const [formattedDays, formattedHours, formattedMinutes, formattedSeconds] =
    getFormattedDurationParts(days, hours, minutes, seconds);

  if (isLoading) {
    return (
      <Container>
        <Title>{loadingPlaceholder}</Title>
        <Title>{loadingPlaceholder}</Title>
      </Container>
    );
  }

  return (
    <Container>
      <Title>{timerTitle}</Title>
      {status !== PublicSaleStatus.ENDED ? (
        <TimerContainer>
          <TimerItem>
            <TimerValue>{formattedDays}</TimerValue>
            <TimerDescription>Days</TimerDescription>
          </TimerItem>
          <TimerDelimiter>:</TimerDelimiter>
          <TimerItem>
            <TimerValue>{formattedHours}</TimerValue>
            <TimerDescription>Hours</TimerDescription>
          </TimerItem>
          <TimerDelimiter>:</TimerDelimiter>
          <TimerItem>
            <TimerValue>{formattedMinutes}</TimerValue>
            <TimerDescription>Minutes</TimerDescription>
          </TimerItem>
          <TimerDelimiter>:</TimerDelimiter>
          <TimerItem>
            <TimerValue>{formattedSeconds}</TimerValue>
            <TimerDescription>Seconds</TimerDescription>
          </TimerItem>
        </TimerContainer>
      ) : null}
    </Container>
  );
};
