import { AvailableMarginInfo } from "../../ge-wallet/components/AvailableMarginInfo";
import { CollateralInfo } from "../../ge-wallet/components/CollateralInfo";
import { MarginUsageInfo } from "../../ge-wallet/components/MarginUsageInfo";
import { Container } from "../../shared/modal/styles/ModalInfo";

// import { useLendingPoolModalTokenInputState } from
// "../hooks/useLendingPoolModalTokenInputState";
// import { useLendingPoolModalState } from
// "../stores/useLendingPoolModalState";
// import { TabType } from "../types/TabType";

// import { EquityInfo } from "../../ge-wallet/components/EquityInfo";

// const { selectedTab } = useLendingPoolModalState();
// const isDepositTab = selectedTab === TabType.DEPOSIT;
// const { tokenData, inputValueBig } = useLendingPoolModalTokenInputState();
//
// const { price = 0 } = tokenData ?? {};
// const collateralValue = inputValueBig.mul(price);

// if deposit tab, then additionalAvailableCollateral is positive
// if withdraw tab, then additionalAvailableCollateral is negative

// const additionalAvailableCollateral = isDepositTab
//   ? collateralValue
//   : collateralValue.neg();

export const GeWalletInfo = () => (
  <Container>
    <CollateralInfo />
    <AvailableMarginInfo />
    {/* <EquityInfo /> */}
    <MarginUsageInfo />
  </Container>
);
