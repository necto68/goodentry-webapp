import { fromTokenAmount } from "../../input-card/helpers/tokenAmount";
import { queryClient } from "../../shared/constants/queryClient";
import { toBig } from "../../shared/helpers/bigjs";
import { IGoodEntryRewardTracker__factory as RewardTrackerFactory } from "../../smart-contracts/types";
import { getVaultConfig } from "../../vault/helpers/getVaultConfig";
import { getProvider } from "../../web3/helpers/getProvider";
import { getTokenQueryOptions } from "../query-options-getters/getTokenQueryOptions";
import { getVaultTokenQueryOptions } from "../query-options-getters/getVaultTokenQueryOptions";

import type { RewardTrackerData } from "../types/RewardTrackerData";

export const rewardTrackerDataFetcher = async (
  vaultId: string,
  account?: string
): Promise<RewardTrackerData> => {
  const {
    chainId,
    addresses: { vault, rewardTracker = "" },
  } = getVaultConfig(vaultId);

  const provider = getProvider(chainId);

  const rewardTrackerContract = RewardTrackerFactory.connect(
    rewardTracker,
    provider
  );

  const [
    vaultToken,
    rewardTokenAddress,
    rawStakedBalance,
    rawClaimableBalance,
  ] = await Promise.all([
    queryClient.ensureQueryData(
      getVaultTokenQueryOptions(chainId, vault, rewardTracker, account)
    ),
    rewardTrackerContract.rewardToken(),
    account ? rewardTrackerContract.balanceOf(account).then(toBig) : null,
    account
      ? rewardTrackerContract.callStatic.claim({ from: account }).then(toBig)
      : null,
  ]);

  const [rewardToken] = await Promise.all([
    queryClient.ensureQueryData(
      getTokenQueryOptions(chainId, rewardTokenAddress, undefined, account)
    ),
  ]);

  const stakedBalance = rawStakedBalance
    ? fromTokenAmount(rawStakedBalance, vaultToken)
    : null;

  const claimableBalance = rawClaimableBalance
    ? fromTokenAmount(rawClaimableBalance, rewardToken)
    : null;

  return {
    rewardTokenAddress,
    stakedBalance,
    claimableBalance,
  };
};
