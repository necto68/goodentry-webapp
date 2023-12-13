import { AvailableMarginInfo } from "../../ge-wallet/components/AvailableMarginInfo";
import { CollateralInfo } from "../../ge-wallet/components/CollateralInfo";
import { MarginUsageInfo } from "../../ge-wallet/components/MarginUsageInfo";
import { Container } from "../../shared/modal/styles/ModalInfo";
import { useTradeModalState } from "../stores/useTradeModalState";
import { TradeModalType } from "../types/TradeModalType";

export const GeWalletInfo = () => {
  const { modalType, tickerTokenInputState } = useTradeModalState();
  const { inputValueBig } = tickerTokenInputState;

  const additionalAvailableMargin =
    modalType === TradeModalType.OPEN_POSITION
      ? inputValueBig.neg()
      : inputValueBig;

  const additionalTotalCollateral = additionalAvailableMargin.neg();

  return (
    <Container>
      <CollateralInfo />
      <AvailableMarginInfo
        additionalAvailableMargin={additionalAvailableMargin}
      />
      <MarginUsageInfo
        additionalTotalCollateral={additionalTotalCollateral}
        additionalTotalDebt={additionalTotalCollateral}
      />
    </Container>
  );
};
