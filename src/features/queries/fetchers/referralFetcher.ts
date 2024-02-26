import { defaultAbiCoder, parseBytes32String } from "ethers/lib/utils";

import { queryClient } from "../../shared/constants/queryClient";
import { getExp, toBig } from "../../shared/helpers/bigjs";
import { IGoodEntryReferrals__factory as ReferralsFactory } from "../../smart-contracts/types";
import { getChainMetadata } from "../../web3/helpers/getChainMetadata";
import { getProvider } from "../../web3/helpers/getProvider";
import { getTokenQueryOptions } from "../query-options-getters/getTokenQueryOptions";

import { chainExplorerDataFetcher } from "./chainExplorerDataFetcher";

import type { ReferralHistoryItem, ReferralInfo } from "../types/ReferralInfo";
import type { BigNumber } from "ethers";

export const referralFetcher = async (
  account?: string,
  chainId?: number
): Promise<ReferralInfo> => {
  const response: ReferralInfo = {
    myReferralsCount: 0,
    myReferralCode: "",
    referrerCode: "",
    referralHistory: [],
  };
  if (!account || !chainId) {
    return response;
  }

  const {
    addresses: { referralManager },
  } = getChainMetadata(chainId);

  const provider = getProvider(chainId);

  const referralsContract = ReferralsFactory.connect(referralManager, provider);

  const myReferralInfo = await referralsContract.getReferralParameters(account);

  const referrerInfo = await referralsContract.getReferralParameters(
    // eslint-disable-next-line no-underscore-dangle
    myReferralInfo._referrer
  );

  response.myReferralsCount = toBig(myReferralInfo.referreesLength).toNumber();

  response.myReferralCode = parseBytes32String(myReferralInfo.name);

  response.referrerCode = parseBytes32String(referrerInfo.name);

  const filter = {
    topics: [
      "0x458d770e0a68c707856bbe7bd1ade458af2e0c26c92857d11879a006bc48adef",
      `0x000000000000000000000000${account.slice(2)}`,
    ],

    types: ["address", "uint256"],
  };

  try {
    const { result } = await chainExplorerDataFetcher(
      chainId,
      "",
      filter.topics
    );

    response.referralHistory = await Promise.all(
      result.map(async (log): Promise<ReferralHistoryItem> => {
        const { data, transactionHash, timeStamp } = log;

        const [tokenAddress, amount] = defaultAbiCoder.decode(
          filter.types,
          data
        ) as [string, BigNumber];

        const { decimals, symbol } = await queryClient.ensureQueryData(
          getTokenQueryOptions(chainId, tokenAddress)
        );
        return {
          reward: toBig(amount).div(getExp(decimals)),

          timestamp: toBig(BigInt(timeStamp).toString())
            .mul(getExp(3))
            .toNumber(),

          token: symbol,
          transactionHash,
          chainId,
        };
      })
    );
  } catch {
    return response;
  }

  return response;
};
