import { Button } from "@chakra-ui/react";
import { useCallback } from "react";

import { SuccessfulMainButton } from "../../form-components/components/SuccessfulMainButton";
import { TransactionErrorMainButton } from "../../form-components/components/TransactionErrorMainButton";
import { toTokenAmount } from "../../input-card/helpers/tokenAmount";
import { usePublicSaleQueries } from "../../public-sale-page/hooks/usePublicSaleQueries";
import { getZero } from "../../shared/helpers/bigjs";
import { useCollateralTokenInputState } from "../hooks/useCollateralTokenInputState";
import { usePublicSaleModalTransactions } from "../stores/usePublicSaleModalTransactions";

export const PublicSaleActionButton = () => {
  const { depositTransaction } = usePublicSaleModalTransactions();

  const { collateralTokenQuery, saleTokenQuery, publicSaleDataQuery } =
    usePublicSaleQueries();

  const { tokenData, inputValueBig } = useCollateralTokenInputState();

  const { mutation, resetTransaction, runTransaction } = depositTransaction;
  const dependantQueries = [
    collateralTokenQuery,
    saleTokenQuery,
    publicSaleDataQuery,
  ];

  const [title, loadingTitle] = ["Deposit", "Depositing..."];

  const handleButtonClick = useCallback(() => {
    if (tokenData) {
      const amount = toTokenAmount(inputValueBig, tokenData).toString();

      runTransaction(amount);
    }
  }, [tokenData, inputValueBig, runTransaction]);

  const { isSuccess, isError, isLoading } = mutation;
  const isDisabled =
    inputValueBig.lte(getZero()) ||
    dependantQueries.some((query) => query.isLoading);

  if (isSuccess) {
    return <SuccessfulMainButton title="Deposit Successful" />;
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
