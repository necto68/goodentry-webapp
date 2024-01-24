import { Container } from "../../shared/modal/styles/ModalInfo";
import { useVaultModalState } from "../stores/useVaultModalState";

import { FeeInfo } from "./FeeInfo";
import { MyShareInfo } from "./MyShareInfo";

export const VaultInfo = () => {
  const { vaultId } = useVaultModalState();

  return (
    <Container>
      <FeeInfo />
      <MyShareInfo vaultId={vaultId} />
    </Container>
  );
};
