import { Button } from "@chakra-ui/react";
import { useCallback } from "react";

import { SuccessfulMainButton } from "../../form-components/components/SuccessfulMainButton";
import { TransactionErrorMainButton } from "../../form-components/components/TransactionErrorMainButton";
import { useClaimTransaction } from "../hooks/useClaimTransaction";
import { usePublicSaleQueries } from "../hooks/usePublicSaleQueries";

export const ClaimActionButton = () => {
  const claimTransaction = useClaimTransaction();

  const { saleTokenQuery, publicSaleDataQuery } = usePublicSaleQueries();

  const { symbol: saleTokenSymbol = "" } = saleTokenQuery.data ?? {};
  const { isSaleTokenClaimable } = publicSaleDataQuery.data ?? {};

  const { mutation, resetTransaction, runTransaction } = claimTransaction;
  const dependantQueries = [saleTokenQuery, publicSaleDataQuery];

  const [title, loadingTitle] = [`Claim ${saleTokenSymbol}`, "Claiming..."];

  const handleButtonClick = useCallback(() => {
    runTransaction();
  }, [runTransaction]);

  const { isSuccess, isError, isLoading } = mutation;
  const isDisabled =
    !isSaleTokenClaimable || dependantQueries.some((query) => query.isLoading);

  if (isSuccess) {
    return <SuccessfulMainButton title="Claim Successful" />;
  }

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
