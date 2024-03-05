import { Container } from "../../shared/modal/styles/ModalInfo";
import { useVaultModalState } from "../stores/useVaultModalState";

import { BalanceInfo } from "./BalanceInfo";
import { FeeInfo } from "./FeeInfo";

export const VaultInfo = () => {
  const { vaultId } = useVaultModalState();

  return (
    <Container>
      <FeeInfo />
      <BalanceInfo vaultId={vaultId} />
    </Container>
  );
};
