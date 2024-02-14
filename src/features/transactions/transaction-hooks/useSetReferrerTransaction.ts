import { getDefaultProvider } from "ethers";
import { formatBytes32String } from "ethers/lib/utils";
import { useCallback } from "react";

import { IGoodEntryReferrals__factory as ReferralsFactory } from "../../smart-contracts/types";
import { getChainMetadata } from "../../web3/helpers/getChainMetadata";
import { useBaseTransaction } from "../hooks/useBaseTransaction";

import type {
  DependantQueries,
  OnTransactionError,
  OnTransactionSuccess,
} from "../../shared/types/BaseTransaction";
import type { ChainId } from "../../web3/types/ChainId";

export const useSetReferrerTransaction = (
  referrerCode: string,
  chainId: ChainId,
  dependantQueries?: DependantQueries,
  onTransactionSuccess?: OnTransactionSuccess,
  onTransactionError?: OnTransactionError
) => {
  const {
    addresses: { referralManager },
  } = getChainMetadata(chainId);

  const referralsContract = ReferralsFactory.connect(
    referralManager,
    getDefaultProvider()
  );

  const method = "registerReferrer";

  const { mutation, resetTransaction, transactionHash } = useBaseTransaction(
    referralsContract,
    method,
    dependantQueries,
    onTransactionSuccess,
    onTransactionError
  );

  const runTransaction = useCallback(
    (code: string) => {
      mutation.mutate([formatBytes32String(code)]);
    },
    [mutation]
  );

  return {
    mutation,
    resetTransaction,
    transactionHash,
    runTransaction,
  };
};
