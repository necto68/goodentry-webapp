import { Button } from "@chakra-ui/react";

import type { useBaseTransaction } from "../../transactions/hooks/useBaseTransaction";
import type { FC } from "react";

interface TransactionErrorMainButtonProps {
  readonly resetTransaction: ReturnType<
    typeof useBaseTransaction
  >["resetTransaction"];
}

export const TransactionErrorMainButton: FC<
  TransactionErrorMainButtonProps
> = ({ resetTransaction }) => (
  <Button onClick={resetTransaction}>Transaction Error</Button>
);
