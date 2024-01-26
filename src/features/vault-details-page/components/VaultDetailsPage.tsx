import { Flex } from "@chakra-ui/react";
import { useParams, Navigate } from "react-router-dom";

import { RoutePathname } from "../../root/types/RoutePathname";
import {
  getVaultConfig,
  vaultConfigsMap,
} from "../../vault/helpers/getVaultConfig";
import { VaultStatus } from "../../vault/types/VaultStatus";
import { Title } from "../../vaults-page/styles/VaultCard";
import {
  Description,
  VaultDefaultBody,
  VaultDescription,
  VaultModalsContainer,
} from "../styles/VaultDetailsPage";

import { StrategyOverview } from "./StrategyOverview";
import { VaultDetailsHeader } from "./VaultDetailsHeader";
import { VaultModal } from "./VaultModal";
import { VaultPerformance } from "./VaultPerformance";
import { VaultStakeModal } from "./VaultStakeModal";

export const VaultDetailsPage = () => {
  const { vaultId = "" } = useParams();
  const { status } = getVaultConfig(vaultId);

  if (!vaultConfigsMap.has(vaultId)) {
    return <Navigate to={RoutePathname.EZ_VAULTS} />;
  }

  return (
    <Flex alignItems="center" direction="column" width="100vw">
      <VaultDetailsHeader />
      <VaultDefaultBody>
        <VaultDescription>
          <Title>Strategy Overview</Title>
          <Description>
            ezVault is designed as a &quot;set and forget&quot; strategy,
            allowing users to generate yield in the form of V3 swap fees and
            supply interest. The vault earns V3 swap fees as liquidity is
            deposited into tightly-defined ranges within the AMM. Additionally,
            the vault earns supply interest by providing liquidity for traders
            to assume leveraged, protected perpetual positions. The vault
            reinvests the earned yield back into the strategy, effectively
            compounding yields for users over time. Users can deposit and
            withdraw from the ezVault(s) at any moment.
          </Description>
          <StrategyOverview />
          {(status === VaultStatus.ACTIVE ||
            status === VaultStatus.ACTIVE_REWARDS) && (
            <>
              <Title>Performance</Title>
              <VaultPerformance />
            </>
          )}
          <Title>Rebalancing & Fee Structure</Title>
          <Description>
            When users deposit or withdraw from ezVaults, they incur a one-time
            fee. This fee ranges from 0.1% to 0.3% and depends on whether the
            liquidity provider&apos;s action improves or reduces the balance of
            assets within the vault. For instance, if the ezVault has a large
            percentage of Token A and a small percentage of Token B, actions
            that increase Token A holdings will incur a higher fee, while
            actions that decrease Token A will have a lower fee.
          </Description>
          <Title>Risks</Title>
          <Description>
            The primary risk associated with using ezVaults is impermanent loss,
            which occurs due to the liquidity deposited into AMMs. However,
            ezVault users do not take on counterparty risks, as traders&apos;
            profits do not come from the vault(s). As with any DeFi protocol,
            there are inherent smart contract risks, such as vulnerabilities or
            exploits. To mitigate these risks, Good Entry undergoes regular
            third-party audits by accredited auditors, ensuring the security and
            integrity of the smart contracts.
          </Description>
        </VaultDescription>
        <VaultModalsContainer>
          <VaultModal />
          {status === VaultStatus.ACTIVE_REWARDS ? <VaultStakeModal /> : null}
        </VaultModalsContainer>
      </VaultDefaultBody>
    </Flex>
  );
};
