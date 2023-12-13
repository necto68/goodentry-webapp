import { getLockConfig } from "../../lock-page/helpers/getLockConfig";
import { useLockQueries } from "../../lock-page/hooks/useLockQueries";
import { useAirdropDataQuery } from "../../queries/hooks/useAirdropDataQuery";
import { useToast } from "../../toast/hooks/useToast";
import { ToastType } from "../../toast/types/ToastType";
import { useAirdropClaimTransaction } from "../../transactions/transaction-hooks/useAirdropClaimTransaction";

export const useClaimTransaction = () => {
  const toast = useToast();

  const {
    chainId,
    addresses: { airdrop },
  } = getLockConfig();

  const { governanceTokenQuery } = useLockQueries();
  const airdropDataQuery = useAirdropDataQuery();

  const tokenSymbol = governanceTokenQuery.data?.symbol ?? "";

  const airdropDependantQueries = [governanceTokenQuery, airdropDataQuery];

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

  return useAirdropClaimTransaction(
    airdrop,
    airdropDependantQueries,
    onClaimTransactionSuccess,
    onClaimTransactionError
  );
};
