import { getTokenIndex } from "../../input-card/helpers/getTokenIndex";
import { loadingPlaceholder } from "../../shared/constants/placeholders";
import { getFormattedAPY } from "../../shared/helpers/baseFormatters";
import {
  InfoRow,
  InfoTitle,
  InfoValue,
} from "../../shared/modal/styles/ModalInfo";
import { useVault } from "../../vault-details-page/hooks/useVault";
import { useVaultModalState } from "../stores/useVaultModalState";
import { TabType } from "../types/TabType";

import type { FC } from "react";

export const FeeInfo: FC = () => {
  const {
    selectedTab,
    vaultId,
    depositTokenInputState,
    withdrawTokenInputState,
  } = useVaultModalState();

  const vault = useVault(vaultId);
  const { fee0 = 0, fee1 = 0 } = vault ?? {};

  const isDepositTab = selectedTab === TabType.DEPOSIT;

  const depositTokenIndex = getTokenIndex(
    depositTokenInputState.tokenData,
    depositTokenInputState.tokens
  );

  const withdrawTokenIndex = getTokenIndex(
    withdrawTokenInputState.tokenData,
    withdrawTokenInputState.tokens
  );

  const isFirstTokenInDepositTab = depositTokenIndex === 0;
  const isSecondTokenInWithdrawTab = withdrawTokenIndex === 1;

  const isShowFee1 =
    (isDepositTab && isFirstTokenInDepositTab) ||
    (!isDepositTab && isSecondTokenInWithdrawTab);

  const fee = isShowFee1 ? fee1 : fee0;
  const formattedFee = getFormattedAPY(fee);
  const isLoading =
    !vault ||
    !depositTokenInputState.tokenData ||
    !withdrawTokenInputState.tokenData;

  return (
    <InfoRow>
      <InfoTitle>Fee</InfoTitle>
      <InfoValue>{isLoading ? loadingPlaceholder : formattedFee}</InfoValue>
    </InfoRow>
  );
};
