import { Container } from "../../shared/modal/styles/ModalInfo";
import { BalanceInfo } from "../../vault-modal/components/BalanceInfo";
import { StakedBalanceInfo } from "../../vault-modal/components/StakedBalanceInfo";
import { useVaultStakeModalState } from "../stores/useVaultStakeModalState";

export const BalancesInfo = () => {
  const { vaultId } = useVaultStakeModalState();

  return (
    <Container>
      <BalanceInfo title="Unstaked Balance" vaultId={vaultId} />
      <StakedBalanceInfo vaultId={vaultId} />
    </Container>
  );
};
