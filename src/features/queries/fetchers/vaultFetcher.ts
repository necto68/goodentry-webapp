import { getExp, toBig } from "../../shared/helpers/bigjs";
import { IGoodEntryVault__factory as GoodEntryVaultFactory } from "../../smart-contracts/types";
import { getVaultConfig } from "../../vault/helpers/getVaultConfig";
import { getProvider } from "../../web3/helpers/getProvider";

import type { Vault } from "../types/Vault";

export const vaultFetcher = async (vaultId: string): Promise<Vault> => {
  const {
    chainId,
    addresses: { vault },
  } = getVaultConfig(vaultId);
  const vaultAddress = vault;

  const provider = getProvider(chainId);

  const vaultContract = GoodEntryVaultFactory.connect(vaultAddress, provider);

  const [rawReserves, rawTotalValueLockedCap, rawFee0, rawFee1] =
    await Promise.all([
      vaultContract.getReserves(),
      vaultContract.tvlCapX8().then(toBig),
      vaultContract.getAdjustedBaseFee(true).then(toBig),
      vaultContract.getAdjustedBaseFee(false).then(toBig),
    ]);

  const totalValueLockedDivisor = getExp(8);

  const rawTotalValueLocked = toBig(rawReserves.valueX8);
  const totalValueLocked = rawTotalValueLocked.div(totalValueLockedDivisor);
  const totalValueLockedCap = rawTotalValueLockedCap.div(
    totalValueLockedDivisor
  );
  const isMaxCapReached =
    totalValueLocked.gte(totalValueLockedCap) && totalValueLockedCap.gt(0);

  const [fee0, fee1] = [rawFee0, rawFee1].map((value) =>
    value.div(getExp(4)).toNumber()
  );

  return {
    id: vaultId,
    address: vaultAddress,
    chainId,
    totalValueLocked,
    totalValueLockedCap,
    isMaxCapReached,
    fee0,
    fee1,
  };
};
