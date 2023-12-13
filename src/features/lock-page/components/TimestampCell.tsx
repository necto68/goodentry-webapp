import {
  getFormattedShortDate,
  getFormattedShortTime,
} from "../../shared/helpers/baseFormatters";
import { Container } from "../styles/TimestampCell";

import type { FC } from "react";

interface TimestampCellProps {
  readonly timestamp: number;
}

export const TimestampCell: FC<TimestampCellProps> = ({ timestamp }) => {
  const formattedDate = getFormattedShortDate(timestamp);
  const formattedTime = getFormattedShortTime(timestamp);

  return (
    <Container>
      <span>{formattedDate}</span>
      <span>{formattedTime}</span>
    </Container>
  );
};
