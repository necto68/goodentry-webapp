import { ChainId } from "../../web3/types/ChainId";

import type { LockConfig } from "../types/LockConfig";

export const lockConfig: LockConfig = {
  chainId: ChainId.ARBITRUM,

  addresses: {
    lockToken: "0x17176a9868f321411b15ccb9b934cf95597e89c4",
    governanceToken: "0xf360e073efc1fd4cc2d21551a13781ddefe888de",
    airdrop: "0xa7c8b776a6a7d7f4e0f17d84d4c98b0ed8e1b3ad",
  },
};
