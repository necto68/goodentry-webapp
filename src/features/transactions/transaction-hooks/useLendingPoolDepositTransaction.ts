import { getDefaultProvider } from "ethers";
import { useCallback, useState } from "react";

import { isNativeCoinAddress } from "../../queries/helpers/nativeCoin";
import {
  IAaveLendingPool__factory as LendingPoolFactory,
  IAaveLendingPoolGateway__factory as LendingPoolGatewayFactory,
} from "../../smart-contracts/types";
import { useWallet } from "../../wallet/hooks/useWallet";
import { useBaseTransaction } from "../hooks/useBaseTransaction";

import type {
  DependantQueries,
  OnTransactionError,
  OnTransactionSuccess,
} from "../../shared/types/BaseTransaction";

export const useLendingPoolDepositTransaction = (
  lendingPoolAddress: string,
  lendingPoolGatewayAddress: string,
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
  const lendingPoolMethod = "deposit";

  const gatewayContract = LendingPoolGatewayFactory.connect(
    lendingPoolGatewayAddress,
    getDefaultProvider()
  );
  const gatewayMethod = "depositETH";

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
      const isNativeCoin = isNativeCoinAddress(tokenAddress);

      if (isNativeCoin) {
        setIsUseGateway(true);

        gatewayTransaction.mutation.mutate([
          lendingPoolAddress,
          account,
          0,
          { value: amount },
        ]);
      } else {
        setIsUseGateway(false);

        lendingPoolTransaction.mutation.mutate([
          tokenAddress,
          amount,
          account,
          0,
        ]);
      }
    },
    [gatewayTransaction, lendingPoolTransaction, lendingPoolAddress, account]
  );

  const transaction = isUseGateway
    ? gatewayTransaction
    : lendingPoolTransaction;

  return {
    ...transaction,
    runTransaction,
  };
};
