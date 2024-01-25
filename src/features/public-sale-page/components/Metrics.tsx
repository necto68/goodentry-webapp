import { marketCap, amount, price, round } from "../../icons/public-sale";
import { loadingPlaceholder } from "../../shared/constants/placeholders";
import { getFormattedCurrency } from "../../shared/helpers/baseFormatters";
import { toBig } from "../../shared/helpers/bigjs";
import { getFormattedTokenAmountWithSymbol } from "../../shared/helpers/formatters";
import { usePublicSaleCollateralToken } from "../hooks/usePublicSaleCollateralToken";
import { usePublicSaleData } from "../hooks/usePublicSaleData";
import { Container } from "../styles/Metrics";

import { MetricItem } from "./MetricItem";

export const Metrics = () => {
  const collateralToken = usePublicSaleCollateralToken();
  const publicSaleData = usePublicSaleData();

  const { symbol: collateralTokenSymbol } = collateralToken ?? {};
  const { collateralTokenTotalDeposited, collateralTokenCap, saleTokenPrice } =
    publicSaleData ?? {};

  const saleTokenPriceBig =
    saleTokenPrice !== undefined ? toBig(saleTokenPrice) : undefined;

  const formattedMarketCap = collateralTokenTotalDeposited
    ? getFormattedCurrency(collateralTokenTotalDeposited.round().toNumber())
    : loadingPlaceholder;

  const [formattedCollateralTokenCap, formattedSaleTokenPrice] = [
    collateralTokenCap,
    saleTokenPriceBig,
  ].map((value) =>
    getFormattedTokenAmountWithSymbol(value, collateralTokenSymbol)
  );

  return (
    <Container>
      <MetricItem
        icon={marketCap}
        title="Market Cap"
        value={formattedMarketCap}
      />
      <MetricItem
        icon={amount}
        title="Total Amount Raising"
        value={formattedCollateralTokenCap}
      />
      <MetricItem
        icon={price}
        title="Price per Token"
        value={formattedSaleTokenPrice}
      />
      <MetricItem icon={round} title="Total Rounds" value="1 Round Only" />
    </Container>
  );
};
