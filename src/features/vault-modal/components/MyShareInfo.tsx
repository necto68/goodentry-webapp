import { loadingPlaceholder } from "../../shared/constants/placeholders";
import { getFormattedFullCurrency } from "../../shared/helpers/baseFormatters";
import { getFormattedTokenAmountWithSymbol } from "../../shared/helpers/formatters";
import {
  InfoRow,
  InfoTitle,
  InfoValue,
} from "../../shared/modal/styles/ModalInfo";
import { useVaultToken } from "../../vault-details-page/hooks/useVaultToken";

import type { FC } from "react";

interface MyShareInfoProps {
  readonly vaultId: string;
}

export const MyShareInfo: FC<MyShareInfoProps> = ({ vaultId }) => {
  const vaultToken = useVaultToken(vaultId);

  const { symbol = "", balance, price } = vaultToken ?? {};

  const formattedBalance = getFormattedTokenAmountWithSymbol(balance, symbol);

  const vaultTokenPrice = balance && price ? balance.mul(price).toNumber() : 0;
  const formattedVaultTokenPrice = getFormattedFullCurrency(vaultTokenPrice);

  const formattedShareInfo = `${formattedBalance} (${formattedVaultTokenPrice})`;

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
