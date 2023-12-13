import { loadingPlaceholder } from "../../shared/constants/placeholders";
import { getFormattedTotalCollateral } from "../../shared/helpers/formatters";
import {
  InfoRow,
  InfoTitle,
  InfoValue,
} from "../../shared/modal/styles/ModalInfo";
import { useCollateralTokens } from "../hooks/useCollateralTokens";
import { useGeWalletState } from "../stores/useGeWalletState";
import { useIsGeWalletInfoLoadingStore } from "../stores/useIsGeWalletInfoLoadingStore";

export const CollateralInfo = () => {
  const { isGeWalletInfoLoading } = useIsGeWalletInfoLoadingStore();

  const { pairId } = useGeWalletState();
  const { collateralToken0, collateralToken1 } = useCollateralTokens(pairId);

  const formattedCollateral = getFormattedTotalCollateral(
    collateralToken0,
    collateralToken1
  );

  return (
    <InfoRow>
      <InfoTitle>Collateral</InfoTitle>
      <InfoValue>
        {isGeWalletInfoLoading ? loadingPlaceholder : formattedCollateral}
      </InfoValue>
    </InfoRow>
  );
};
