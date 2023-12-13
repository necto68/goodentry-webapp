import {
  strategyOverview1,
  strategyOverview2,
  strategyOverview3,
  strategyOverview4,
  strategyOverview5,
} from "../../icons/vault-details-page";

export const strategyOverviewSteps = [
  {
    image: strategyOverview1,
    title: "Users deposits liquidity",

    description:
      "Depending on the asset that is deposited, a one-time fee ranging from 0.1% to 0.3% will be incurred to ensure that the ezVault’s composite assets are balanced.",
  },
  {
    image: strategyOverview2,
    title: "Yield generated from v3 positions",

    description:
      "The liquidity deposited into the ezVault is distributed into four highly concentrated tight ranges in uniswap v3. Each time spot price crosses the tight range, amm swap fees are generated",
  },
  {
    image: strategyOverview3,
    title: "Yield generated from supplying liquidity",

    description:
      "Protected perp traders would pay supply APY to borrow liquidity from the individual v3 positions to take on leveraged long/short position(s).",
  },
  {
    image: strategyOverview4,
    title: "Rebasing token",

    description:
      "GEV tokens represent the pro-rata position of the user’s liquidity in the ezVault. As yield is generated, the user’s GEV position would increase.",
  },
  {
    image: strategyOverview5,
    title: "Withdraw anytime!",

    description:
      "Users can withdraw from the ezVault anytime they want. Depending on the asset type withdrawn, a one-time fee ranging from 0.1% to 0.3% will be incurred to ensure that the ezVault’s composite assets are balanced.",
  },
];
