import { Button } from "@chakra-ui/react";
import { useCallback } from "react";

import { TransactionErrorMainButton } from "./TransactionErrorMainButton";

import type { TokenData } from "../../queries/types/Token";
import type { useTokenApproveTransaction } from "../../transactions/hooks/useTokenApproveTransaction";
import type { FC } from "react";

interface ApproveMainButtonProps {
  readonly tokenApproveTransaction: ReturnType<
    typeof useTokenApproveTransaction
  >;
  readonly spenderAddress: string | undefined;
  readonly tokenData?: TokenData;
}

export const ApproveMainButton: FC<ApproveMainButtonProps> = ({
  tokenApproveTransaction,
  spenderAddress,
  tokenData,
}) => {
  const { mutation, resetTransaction, runTransaction } =
    tokenApproveTransaction;

  const { isError, isLoading } = mutation;

  const handleButtonClick = useCallback(() => {
    if (spenderAddress) {
      runTransaction(spenderAddress);
    }
  }, [runTransaction, spenderAddress]);

  if (isError) {
    return <TransactionErrorMainButton resetTransaction={resetTransaction} />;
  }

  const loadingText = tokenData
    ? `Approving ${tokenData.symbol}...`
    : "Approving";

  const title = tokenData ? `Approve ${tokenData.symbol}` : "Approve";

  return (
    <Button
      isDisabled={!spenderAddress}
      isLoading={isLoading}
      loadingText={loadingText}
      onClick={handleButtonClick}
      variant="brand"
    >
      {title}
    </Button>
  );
};
