import { Container } from "../../shared/modal/styles/ModalInfo";

import { AvailableMarginInfo } from "./AvailableMarginInfo";
import { CollateralInfo } from "./CollateralInfo";
import { MarginUsageInfo } from "./MarginUsageInfo";

// import { EquityInfo } from "./EquityInfo";

export const GeWalletInfo = () => (
  <Container>
    <CollateralInfo />
    <AvailableMarginInfo />
    {/* <EquityInfo /> */}
    <MarginUsageInfo />
  </Container>
);
