import { getLockConfig } from "../../lock-page/helpers/getLockConfig";
import { queryClient } from "../../shared/constants/queryClient";
import { getExp, toBig } from "../../shared/helpers/bigjs";
import { IGoodEntryGovernanceToken__factory as GovernanceTokenFactory } from "../../smart-contracts/types";
import { getProvider } from "../../web3/helpers/getProvider";
import { getTokenQueryOptions } from "../query-options-getters/getTokenQueryOptions";

import type { UnlockSchedule } from "../types/LockData";

export const unlockScheduleFetcher = async (
  account: string,
  unlockScheduleIndex: number
): Promise<UnlockSchedule> => {
  const {
    chainId,
    addresses: { governanceToken: governanceTokenAddress },
  } = getLockConfig();

  const provider = getProvider(chainId);

  const governanceTokenContract = GovernanceTokenFactory.connect(
    governanceTokenAddress,
    provider
  );

  const [governanceToken, rawUnlockSchedule, rawUnlockDuration] =
    await Promise.all([
      queryClient.ensureQueryData(
        getTokenQueryOptions(
          chainId,
          governanceTokenAddress,
          undefined,
          account
        )
      ),
      governanceTokenContract.getUserVestingSchedule(
        account,
        unlockScheduleIndex
      ),
      governanceTokenContract.vestingDuration(),
    ]);

  const governanceTokenDivisor = getExp(governanceToken.decimals);

  const { vestedAmount, unlockedAmount, lockedAmount, startTime } =
    rawUnlockSchedule;

  const [
    governanceTokenInitUnlock,
    governanceTokenLocked,
    governanceTokenUnlocked,
  ] = [vestedAmount, lockedAmount, unlockedAmount].map((value) =>
    toBig(value).div(governanceTokenDivisor)
  );

  const penalty = governanceTokenLocked
    .div(governanceTokenInitUnlock)
    .neg()
    .toNumber();

  const isPenaltyExist = penalty < 0;

  const rawStartTimestamp = toBig(startTime);
  const rawEndTimestamp = rawStartTimestamp.add(toBig(rawUnlockDuration));
  const [startTimestamp, endTimestamp] = [
    rawStartTimestamp,
    rawEndTimestamp,
  ].map((value) => value.mul(1000).toNumber());

  const id = `${unlockScheduleIndex}_${startTimestamp}`;

  return {
    id,
    unlockScheduleIndex,
    governanceTokenInitUnlock,
    governanceTokenLocked,
    governanceTokenUnlocked,
    penalty,
    isPenaltyExist,
    startTimestamp,
    endTimestamp,
  };
};
