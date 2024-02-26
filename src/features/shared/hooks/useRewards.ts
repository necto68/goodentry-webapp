import { useState } from "react";

import { areAddressesEqual } from "../../web3/helpers/addresses";
import { toBig } from "../helpers/bigjs";
import { getApi } from "../helpers/getApi";

export const useRewards = (account: string) => {
  const [rewards, setRewards] = useState(0);
  const { get } = getApi();
  const options = {
    // 5% of 1B supply as airdrop, so 50M / 120d / 24 rounds  = 17361 / round
    goodPerRound: 17_361,
  };

  const getRewards = async () => {
    const response = await get("/stats/arbitrum/total_rewards.json");
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data: { [key: string]: { points: number } } | undefined =
      await response.json();

    const accountDataKey =
      Object.keys(data ?? {}).find((key) => areAddressesEqual(key, account)) ??
      "";

    const { points = 0 } = data?.[accountDataKey] ?? {};

    const tokenRewards = toBig(Number(points))
      .mul(options.goodPerRound)
      .toNumber();

    setRewards(tokenRewards);
  };

  void getRewards();

  return [rewards];
};
