import { LOCK_PERIOD_DAYS_AMOUNT } from "../../lock-page/constants/penaltyChartPoints";
import { useGovernanceToken } from "../../lock-page/hooks/useGovernanceToken";
import { useLockToken } from "../../lock-page/hooks/useLockToken";
import { loadingPlaceholder } from "../../shared/constants/placeholders";
import {
  Container,
  DescriptionTitle,
  DescriptionValue,
} from "../../shared/modal/styles/ModalDescription";
import { useLockModalState } from "../stores/useLockModalState";
import { TabType } from "../types/TabType";

export const LockDescription = () => {
  const { selectedTab } = useLockModalState();

  const { symbol: lockTokenSymbol } = useLockToken() ?? {};
  const { symbol: governanceTokenSymbol } = useGovernanceToken() ?? {};

  const isLockTab = selectedTab === TabType.LOCK;

  if (!lockTokenSymbol || !governanceTokenSymbol) {
    return (
      <Container>
        <DescriptionTitle>{loadingPlaceholder}</DescriptionTitle>
        <DescriptionValue>{loadingPlaceholder}</DescriptionValue>
      </Container>
    );
  }

  const lockTitle = `Locking ${lockTokenSymbol}`;
  const unlockTitle = `Unlocking ${governanceTokenSymbol}`;

  const lockDescription = `Lock your ${lockTokenSymbol} for ${governanceTokenSymbol} to start participating in governance. To unlock ${governanceTokenSymbol} to ${lockTokenSymbol}, you will have to start vesting over ${LOCK_PERIOD_DAYS_AMOUNT} days. Early redemption is possible by paying a withdraw penalty.`;
  const unlockDescription = `Please refer to the Unlock Schedules on the right to withdraw unlocked ${lockTokenSymbol}. Early redemption will incur a proportionate withdraw penalty.`;

  const title = isLockTab ? lockTitle : unlockTitle;
  const description = isLockTab ? lockDescription : unlockDescription;

  return (
    <Container>
      <DescriptionTitle>{title}</DescriptionTitle>
      <DescriptionValue>{description}</DescriptionValue>
    </Container>
  );
};
