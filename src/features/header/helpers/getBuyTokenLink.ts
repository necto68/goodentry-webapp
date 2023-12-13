import { getPublicSaleConfig } from "../../public-sale-page/helpers/getPublicSaleConfig";

export const getBuyTokenLink = () => {
  const {
    addresses: { collateralToken, saleToken },
  } = getPublicSaleConfig();

  const link = new URL(
    `https://app.1inch.io/#/42161/simple/swap/${collateralToken}/${saleToken}/import-token`
  );

  return link.toString();
};
