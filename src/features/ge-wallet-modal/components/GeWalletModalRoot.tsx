import { GeWalletStateProvider } from "../../ge-wallet/providers/GeWalletStateProvider";
import { LendingPoolModalStateProvider } from "../../lending-pool-modal/providers/LendingPoolModalStateProvider";
import { LendingPoolModalTransactionsProvider } from "../../lending-pool-modal/providers/LendingPoolModalTransactionsProvider";
import { getPairConfig } from "../../pair/helpers/getPairConfig";

import { GeWalletModalContent } from "./GeWalletModalContent";

import type { LendingPoolModalStateProviderProps } from "../../lending-pool-modal/types/LendingPoolModalStateProviderProps";
import type { FC } from "react";

type GeWalletModalRootProps = Pick<
  LendingPoolModalStateProviderProps,
  "defaultTabType" | "pairId"
>;
export const GeWalletModalRoot: FC<GeWalletModalRootProps> = ({
  defaultTabType,
  pairId,
}) => {
  const {
    addresses: { lendingPool },
  } = getPairConfig(pairId);

  return (
    <LendingPoolModalStateProvider
      defaultTabType={defaultTabType}
      lendingPoolAddress={lendingPool}
      pairId={pairId}
    >
      <LendingPoolModalTransactionsProvider>
        <GeWalletStateProvider pairId={pairId}>
          <GeWalletModalContent />
        </GeWalletStateProvider>
      </LendingPoolModalTransactionsProvider>
    </LendingPoolModalStateProvider>
  );
};
