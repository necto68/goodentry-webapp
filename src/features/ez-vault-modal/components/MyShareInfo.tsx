import { loadingPlaceholder } from "../../shared/constants/placeholders";
import { getFormattedFullCurrency } from "../../shared/helpers/baseFormatters";
import { getFormattedTokenAmount } from "../../shared/helpers/formatters";
import {
  InfoRow,
  InfoTitle,
  InfoValue,
} from "../../shared/modal/styles/ModalInfo";
import { vaultTokenSymbol } from "../../vault-details-page/constants/vaultTokenSymbol";
import { useVaultToken } from "../../vault-details-page/hooks/useVaultToken";

import type { FC } from "react";

interface MyShareInfoProps {
  readonly vaultId: string;
}

export const MyShareInfo: FC<MyShareInfoProps> = ({ vaultId }) => {
  const vaultToken = useVaultToken(vaultId);

  const { balance, price } = vaultToken ?? {};

  const formattedBalance = getFormattedTokenAmount(balance);
  const vaultTokenPrice = balance && price ? balance.mul(price).toNumber() : 0;
  const formattedVaultTokenPrice = getFormattedFullCurrency(vaultTokenPrice);

  const formattedShareInfo = `${formattedBalance} ${vaultTokenSymbol} (${formattedVaultTokenPrice})`;

  const isLoading = !vaultToken;

  return (
    <InfoRow>
      <InfoTitle>My Share</InfoTitle>
      <InfoValue>
        {isLoading ? loadingPlaceholder : formattedShareInfo}
      </InfoValue>
    </InfoRow>
  );
};
