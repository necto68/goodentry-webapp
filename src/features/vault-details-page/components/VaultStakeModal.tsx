import { useParams } from "react-router-dom";

import { VaultStakeModalRoot } from "../../vault-stake-modal/components/VaultStakeModalRoot";
import { Container } from "../styles/VaultModal";

export const VaultStakeModal = () => {
  const { vaultId = "" } = useParams();

  return (
    <Container>
      <VaultStakeModalRoot vaultId={vaultId} />
    </Container>
  );
};
