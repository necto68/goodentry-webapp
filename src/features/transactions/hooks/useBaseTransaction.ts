/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable lines-around-comment */
import { useMutation } from "@tanstack/react-query";
import { useCallback, useRef, useState } from "react";

import { getTransactionErrorMessage } from "../../shared/helpers/getTransactionErrorMessage";
import { delay } from "../../shared/helpers/utils";
import { useWallet } from "../../wallet/hooks/useWallet";

import type {
  DependantQueries,
  OnTransactionSuccess,
  OnTransactionError,
} from "../../shared/types/BaseTransaction";
import type { Contract, ContractTransaction } from "ethers";

export const useBaseTransaction = <
  TContract extends Contract,
  TMethod extends keyof TContract["functions"]
>(
  contract: TContract,
  method: TMethod,
  dependantQueries: DependantQueries = [],
  onTransactionSuccess: OnTransactionSuccess = () => undefined,
  onTransactionError: OnTransactionError = () => undefined
) => {
  const [transactionHash, setTransactionHash] = useState<string>();
  const { provider } = useWallet();

  const mutationResetTimeoutIdReference = useRef<NodeJS.Timeout | null>(null);

  const mutationFunction = useCallback(
    async (methodParameters: Parameters<TContract["functions"][TMethod]>) => {
      if (!provider) {
        throw new Error("No provider");
      }

      const signer = provider.getSigner();
      const connectedContract = contract.connect(signer);

      try {
        // @ts-expect-error typings
        await connectedContract.callStatic[method](...methodParameters);
      } catch (error) {
        const message = getTransactionErrorMessage(error);

        throw new Error(message);
      }

      let transaction: ContractTransaction | null = null;
      let hash: string | null = null;

      try {
        transaction =
          // @ts-expect-error typings
          await connectedContract.functions[method](...methodParameters);
      } catch (error) {
        const message = getTransactionErrorMessage(error);

        throw new Error(message);
      }

      if (transaction) {
        ({ hash } = transaction);
        setTransactionHash(hash);

        await transaction.wait();
      }

      await delay(3200);

      await Promise.all(
        dependantQueries.map(async (query) => await query.refetch())
      );

      if (hash) {
        await onTransactionSuccess(hash);
      }
    },
    [contract, method, provider, dependantQueries, onTransactionSuccess]
  );

  const mutation = useMutation<
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    void,
    Error,
    Parameters<TContract["functions"][TMethod]>
  >(mutationFunction, {
    onMutate: () => {
      const timeoutId = mutationResetTimeoutIdReference.current;

      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    },

    onSettled: () => {
      mutationResetTimeoutIdReference.current = setTimeout(() => {
        mutation.reset();
      }, 5000);
    },

    onError: async (error) => {
      await onTransactionError(error);
    },
  });

  const resetTransaction = useCallback(() => {
    setTransactionHash(undefined);
    mutation.reset();
  }, [mutation]);

  return {
    mutation,
    resetTransaction,
    transactionHash,
  };
};
