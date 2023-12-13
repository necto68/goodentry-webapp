import { getFormattedAmount } from "../../shared/helpers/baseFormatters";
import { Table } from "../../table/components/Table";
import { useLockData } from "../hooks/useLockData";

import { OpenLockWithdrawModalButton } from "./OpenLockWithdrawModalButton";
import { TimestampCell } from "./TimestampCell";

import type { UnlockSchedule } from "../../queries/types/LockData";
import type { Column } from "../../table/types/Column";

const columns: Column<UnlockSchedule>[] = [
  {
    key: "startTimestamp",
    title: "Start Time",

    render: ({ startTimestamp }) => (
      <TimestampCell timestamp={startTimestamp} />
    ),
  },
  {
    key: "endTimestamp",
    title: "End Time",

    render: ({ endTimestamp }) => <TimestampCell timestamp={endTimestamp} />,
  },
  {
    key: "governanceTokenInitUnlock",
    title: "Init Unlock",

    render: ({ governanceTokenInitUnlock }) =>
      getFormattedAmount(governanceTokenInitUnlock),
  },
  {
    key: "governanceTokenLocked",
    title: "Locked",

    render: ({ governanceTokenLocked }) =>
      getFormattedAmount(governanceTokenLocked),
  },
  {
    key: "governanceTokenUnlocked",
    title: "Unlocked",

    render: ({ governanceTokenUnlocked }) =>
      getFormattedAmount(governanceTokenUnlocked),
  },
  {
    title: "Actions",
    render: ({ id }) => <OpenLockWithdrawModalButton unlockScheduleId={id} />,
  },
];

const getRowKey = (row: UnlockSchedule) => `${row.id}_${row.startTimestamp}`;

export const UnlockSchedulesTable = () => {
  const { unlockSchedules } = useLockData() ?? {};

  if (!unlockSchedules) {
    return null;
  }

  return (
    <Table columns={columns} getRowKey={getRowKey} rows={unlockSchedules} />
  );
};
