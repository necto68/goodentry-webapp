import { useParams } from "react-router-dom";

import { VaultInnerRewardsModalRoot } from "../../vault-stake-modal/components/VaultInnerRewardsModalRoot";
import { VaultStakeModalRoot } from "../../vault-stake-modal/components/VaultStakeModalRoot";
import { Container } from "../styles/VaultModal";

export const VaultStakeModal = () => {
  const { vaultId = "" } = useParams();

  // TODO: Remove this when we have a proper way
  //  to determine which ModalRoot should be rendered
  const isETHVault = vaultId === "ETH-USDC";
  const isARBVault = vaultId === "ARB-USDC";

  return (
    <Container>
      {isETHVault ? <VaultStakeModalRoot vaultId={vaultId} /> : null}
      {isARBVault ? <VaultInnerRewardsModalRoot vaultId={vaultId} /> : null}
    </Container>
  );
};
