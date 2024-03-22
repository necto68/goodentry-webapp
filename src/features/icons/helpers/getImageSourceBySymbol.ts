import {
  btc,
  eth,
  matic,
  usdc,
  fxs,
  frax,
  arb,
  gmx,
  good,
  esgood,
  avax,
  usdt,
  joe,
  tao,
} from "../coins";

const coinsIcons: { [key: string]: string } = {
  BTC: btc,
  ETH: eth,
  MATIC: matic,
  USDC: usdc,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  "USDC.e": usdc,
  FXS: fxs,
  FRAX: frax,
  GMX: gmx,
  ARB: arb,
  GOOD: good,
  esGOOD: esgood,
  AVAX: avax,
  USDT: usdt,
  USDt: usdt,
  JOE: joe,
  TAO: tao,

  // test tokens
  // eslint-disable-next-line @typescript-eslint/naming-convention
  "tUSDC.e": usdc,
  tG: good,
  BAD: good,
  esBAD: esgood,
};

export const getImageSourceBySymbol = (symbol: string) => {
  if (coinsIcons[symbol]) {
    return coinsIcons[symbol];
  }

  const isWrapped = /^w/iu.test(symbol);

  if (isWrapped) {
    const slicedSymbol = symbol.slice(1);

    if (coinsIcons[slicedSymbol]) {
      return coinsIcons[slicedSymbol];
    }
  }

  return null;
};
