import { getLockConfig } from "../../lock-page/helpers/getLockConfig";
import { queryClient } from "../../shared/constants/queryClient";
import { getExp, toBig } from "../../shared/helpers/bigjs";
import { IGoodEntryGovernanceToken__factory as GovernanceTokenFactory } from "../../smart-contracts/types";
import { getProvider } from "../../web3/helpers/getProvider";
import { getTokenQueryOptions } from "../query-options-getters/getTokenQueryOptions";

import { unlockScheduleFetcher } from "./unlockScheduleFetcher";

import type { LockData, UnlockSchedule } from "../types/LockData";

export const lockDataFetcher = async (account?: string): Promise<LockData> => {
  const {
    chainId,
    addresses: { governanceToken: governanceTokenAddress },
  } = getLockConfig();

  const provider = getProvider(chainId);

  const governanceTokenContract = GovernanceTokenFactory.connect(
    governanceTokenAddress,
    provider
  );

  if (!account) {
    return {
      unlockBalance: null,
      unlockSchedules: null,
    };
  }

  const [governanceToken, rawUnlockBalance, rawUnlockSchedulesLength] =
    await Promise.all([
      queryClient.ensureQueryData(
        getTokenQueryOptions(
          chainId,
          governanceTokenAddress,
          undefined,
          account
        )
      ),
      governanceTokenContract.vestingBalanceOf(account),
      governanceTokenContract.getVestingLength(account),
    ]);

  const governanceTokenDivisor = getExp(governanceToken.decimals);
  const unlockBalance = toBig(rawUnlockBalance).div(governanceTokenDivisor);
  const unlockSchedulesLength = toBig(rawUnlockSchedulesLength).toNumber();

  const unlockSchedules: UnlockSchedule[] = await Promise.all(
    Array.from(
      { length: unlockSchedulesLength },
      async (item, index) => await unlockScheduleFetcher(account, index)
    )
  );

  return {
    unlockBalance,
    unlockSchedules,
  };
};
