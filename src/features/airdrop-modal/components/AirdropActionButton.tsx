import { Button } from "@chakra-ui/react";
import { useCallback } from "react";

import { TransactionErrorMainButton } from "../../form-components/components/TransactionErrorMainButton";
import { toTokenAmount } from "../../input-card/helpers/tokenAmount";
import { useLockQueries } from "../../lock-page/hooks/useLockQueries";
import { useAirdropDataQuery } from "../../queries/hooks/useAirdropDataQuery";
import { useClaimTransaction } from "../hooks/useClaimTransaction";

export const AirdropActionButton = () => {
  const claimTransaction = useClaimTransaction();

  const { governanceTokenQuery } = useLockQueries();
  const airdropDataQuery = useAirdropDataQuery();

  const governanceToken = governanceTokenQuery.data;
  const { airdropAmount, airdropProof, isAirdropClaimable } =
    airdropDataQuery.data ?? {};

  const { mutation, resetTransaction, runTransaction } = claimTransaction;
  const dependantQueries = [governanceTokenQuery, airdropDataQuery];

  const title = isAirdropClaimable ? "Claim Airdrop" : "Airdrop Claimed";
  const loadingTitle = "Claiming...";

  const handleButtonClick = useCallback(() => {
    if (airdropAmount && airdropProof && governanceToken) {
      const amount = toTokenAmount(airdropAmount, governanceToken).toString();

      runTransaction(airdropProof, amount);
    }
  }, [airdropAmount, airdropProof, governanceToken, runTransaction]);

  const { isError, isLoading } = mutation;
  const isDisabled =
    !isAirdropClaimable ||
    !airdropAmount ||
    airdropAmount.eq(0) ||
    dependantQueries.some((query) => query.isLoading);

  if (isError) {
    return <TransactionErrorMainButton resetTransaction={resetTransaction} />;
  }

  return (
    <Button
      isDisabled={isDisabled}
      isLoading={isLoading}
      loadingText={loadingTitle}
      onClick={handleButtonClick}
      variant="brand"
    >
      {title}
    </Button>
  );
};
