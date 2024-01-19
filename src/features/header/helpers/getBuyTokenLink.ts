import { getPublicSaleConfig } from "../../public-sale-page/helpers/getPublicSaleConfig";

export const getBuyTokenLink = () => {
  const {
    addresses: { collateralToken, saleToken },
  } = getPublicSaleConfig();

  const link = new URL(
    `https://app.camelot.exchange/?token1=${collateralToken}&token2=${saleToken}`
  );

  return link.toString();
};
