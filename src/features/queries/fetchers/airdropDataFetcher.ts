import { getLockConfig } from "../../lock-page/helpers/getLockConfig";
import { queryClient } from "../../shared/constants/queryClient";
import { getExp, getZero, toBig } from "../../shared/helpers/bigjs";
import { IGoodEntryAirdrop__factory as AirdropFactory } from "../../smart-contracts/types";
import { areAddressesEqual } from "../../web3/helpers/addresses";
import { getProvider } from "../../web3/helpers/getProvider";
import { getTokenQueryOptions } from "../query-options-getters/getTokenQueryOptions";

import type { AirdropData } from "../types/AirdropData";
import type { AirdropDataResponse } from "../types/AirdropDataResponse";

const defaultAirdropData: AirdropData = {
  airdropAmount: null,
  airdropProof: null,
  isAirdropClaimable: false,
};

export const airdropDataFetcher = async (
  account?: string
): Promise<AirdropData> => {
  const {
    chainId,
    addresses: { governanceToken: governanceTokenAddress, airdrop },
  } = getLockConfig();

  const provider = getProvider(chainId);

  const airdropDataURL = "https://roe.nicodeva.xyz/stats/arbitrum/proofs.json";
  const airdropContract = AirdropFactory.connect(airdrop, provider);

  const airdropDataResponse = await fetch(airdropDataURL, {
    cache: "no-store",
  }).catch(() => null);

  if (!account || !airdropDataResponse) {
    return defaultAirdropData;
  }

  const rawAirdropData =
    (await airdropDataResponse.json()) as AirdropDataResponse;

  const [, accountDataResponse] =
    Object.entries(rawAirdropData).find(([key]) =>
      areAddressesEqual(key, account)
    ) ?? [];

  if (!accountDataResponse) {
    return {
      airdropAmount: getZero(),
      airdropProof: [],
      isAirdropClaimable: false,
    };
  }

  const [governanceToken, isAirdropClaimable] = await Promise.all([
    queryClient.ensureQueryData(
      getTokenQueryOptions(chainId, governanceTokenAddress, undefined, account)
    ),
    airdropContract.claimed(account).then((isClaimed) => !isClaimed),
  ]);

  const { amount, proof: airdropProof } = accountDataResponse;

  const governanceTokenDivisor = getExp(governanceToken.decimals);

  const airdropAmount = toBig(amount).div(governanceTokenDivisor);

  return {
    airdropAmount,
    airdropProof,
    isAirdropClaimable,
  };
};
