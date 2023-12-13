import { useVaults } from "../hooks/useVaults";
import { Container, Content } from "../styles/VaultsPage";

import { HowVaultWorks } from "./HowVaultWorks";
import { VaultCard } from "./VaultCard";

export const VaultsPage = () => {
  const vaults = useVaults();

  return (
    <Container>
      <Content>
        <HowVaultWorks />
        {vaults.map((vault) =>
          vault ? <VaultCard key={vault.id} vaultId={vault.id} /> : null
        )}
      </Content>
    </Container>
  );
};
