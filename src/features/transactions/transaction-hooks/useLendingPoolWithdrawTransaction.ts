import { getDefaultProvider } from "ethers";
import { useCallback, useState } from "react";

import { isWrappedNativeCoinAddress } from "../../queries/helpers/wrappedNativeCoin";
import {
  IAaveLendingPool__factory as LendingPoolFactory,
  IAaveLendingPoolGateway__factory as LendingPoolGatewayFactory,
} from "../../smart-contracts/types";
import { useWallet } from "../../wallet/hooks/useWallet";
import { useBaseTransaction } from "../hooks/useBaseTransaction";

import type {
  DependantQueries,
  OnTransactionSuccess,
  OnTransactionError,
} from "../../shared/types/BaseTransaction";
import type { ChainId } from "../../web3/types/ChainId";

export const useLendingPoolWithdrawTransaction = (
  lendingPoolAddress: string,
  lendingPoolGatewayAddress: string,
  chainId: ChainId,
  dependantQueries?: DependantQueries,
  onTransactionSuccess?: OnTransactionSuccess,
  onTransactionError?: OnTransactionError
) => {
  const [isUseGateway, setIsUseGateway] = useState(false);

  const { account = "" } = useWallet();

  const lendingPoolContract = LendingPoolFactory.connect(
    lendingPoolAddress,
    getDefaultProvider()
  );
  const lendingPoolMethod = "withdraw";

  const gatewayContract = LendingPoolGatewayFactory.connect(
    lendingPoolGatewayAddress,
    getDefaultProvider()
  );
  const gatewayMethod = "withdrawETH";

  const lendingPoolTransaction = useBaseTransaction(
    lendingPoolContract,
    lendingPoolMethod,
    dependantQueries,
    onTransactionSuccess,
    onTransactionError
  );

  const gatewayTransaction = useBaseTransaction(
    gatewayContract,
    gatewayMethod,
    dependantQueries,
    onTransactionSuccess,
    onTransactionError
  );

  const runTransaction = useCallback(
    (tokenAddress: string, amount: string) => {
      const isWrappedNativeCoin = isWrappedNativeCoinAddress(
        tokenAddress,
        chainId
      );

      if (isWrappedNativeCoin) {
        setIsUseGateway(true);

        gatewayTransaction.mutation.mutate([
          lendingPoolAddress,
          amount,
          account,
        ]);
      } else {
        setIsUseGateway(false);

        lendingPoolTransaction.mutation.mutate([tokenAddress, amount, account]);
      }
    },
    [
      chainId,
      gatewayTransaction,
      lendingPoolTransaction,
      lendingPoolAddress,
      account,
    ]
  );

  const transaction = isUseGateway
    ? gatewayTransaction
    : lendingPoolTransaction;

  return {
    ...transaction,
    runTransaction,
  };
};
