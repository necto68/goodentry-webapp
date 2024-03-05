import { loadingPlaceholder } from "../../shared/constants/placeholders";
import { getFormattedFullCurrency } from "../../shared/helpers/baseFormatters";
import { getFormattedTokenAmountWithSymbol } from "../../shared/helpers/formatters";
import {
  InfoRow,
  InfoTitle,
  InfoValue,
} from "../../shared/modal/styles/ModalInfo";
import { useRewardTrackerData } from "../../vault-stake-modal/hooks/useRewardTrackerData";
import { useVaultStakeModalQueries } from "../../vault-stake-modal/hooks/useVaultStakeModalQueries";

import type { FC } from "react";

interface StakedBalanceInfoProps {
  readonly vaultId: string;
}

export const StakedBalanceInfo: FC<StakedBalanceInfoProps> = ({ vaultId }) => {
  const { vaultTokenQuery } = useVaultStakeModalQueries(vaultId);
  const { stakedBalance } = useRewardTrackerData(vaultId) ?? {};

  const { isLoading, data } = vaultTokenQuery;
  const { symbol: vaultTokenSymbol, price } = data ?? {};

  const formattedStakedBalance = getFormattedTokenAmountWithSymbol(
    stakedBalance,
    vaultTokenSymbol
  );

  const vaultTokenPrice =
    stakedBalance && price ? stakedBalance.mul(price).toNumber() : 0;
  const formattedVaultTokenPrice = getFormattedFullCurrency(vaultTokenPrice);

  const formattedStakedBalanceWithPriceInfo = `${formattedStakedBalance} (${formattedVaultTokenPrice})`;

  return (
    <InfoRow>
      <InfoTitle>Staked Balance</InfoTitle>
      <InfoValue>
        {isLoading ? loadingPlaceholder : formattedStakedBalanceWithPriceInfo}
      </InfoValue>
    </InfoRow>
  );
};
