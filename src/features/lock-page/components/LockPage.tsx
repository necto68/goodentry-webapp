import { LockModal } from "../../lock-modal/components/LockModal";
import {
  Container,
  Content,
  RightContainer,
} from "../../public-sale-page/styles/PublicSalePage";
import { LeftContainer } from "../styles/LockPage";

import { PenaltyChart } from "./PenaltyChart";
import { UnlockSchedulesInfo } from "./UnlockSchedulesInfo";

// import { LockedOverview } from "./LockedOverview";
// import { Metrics } from "./Metrics";

export const LockPage = () => (
  <Container>
    {/* <Metrics /> */}
    <Content>
      <LeftContainer>
        <LockModal />
        <PenaltyChart />
      </LeftContainer>
      <RightContainer>
        {/* <LockedOverview /> */}
        <UnlockSchedulesInfo />
      </RightContainer>
    </Content>
  </Container>
);
