import { useToast } from "../../toast/hooks/useToast";
import { ToastType } from "../../toast/types/ToastType";
import { useCrowdSaleClaimTransaction } from "../../transactions/transaction-hooks/useCrowdSaleClaimTransaction";
import { getPublicSaleConfig } from "../helpers/getPublicSaleConfig";

import { usePublicSaleQueries } from "./usePublicSaleQueries";

export const useClaimTransaction = () => {
  const toast = useToast();

  const {
    chainId,
    addresses: { crowdSale },
  } = getPublicSaleConfig();

  const { saleTokenQuery, publicSaleDataQuery } = usePublicSaleQueries();

  const tokenSymbol = saleTokenQuery.data?.symbol ?? "";

  const claimDependantQueries = [saleTokenQuery, publicSaleDataQuery];

  const onClaimTransactionSuccess = (transactionHash: string) => {
    toast({
      type: ToastType.SUCCESS,
      title: `Claim ${tokenSymbol}`,
      chainId,
      transactionHash,
    });
  };

  const onClaimTransactionError = (error: Error) => {
    toast({
      type: ToastType.ERROR,
      title: `Claim ${tokenSymbol}`,
      description: error.message,
    });
  };

  return useCrowdSaleClaimTransaction(
    crowdSale,
    claimDependantQueries,
    onClaimTransactionSuccess,
    onClaimTransactionError
  );
};
