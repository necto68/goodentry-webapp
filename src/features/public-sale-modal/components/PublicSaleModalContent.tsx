import { SwapContainer } from "../../input-card/components/SwapContainer";
import { SwapSeparator } from "../../input-card/components/SwapSeparator";
import { Container } from "../styles/PublicSaleModalContent";

import { CollateralTokenInputCard } from "./CollateralTokenInputCard";
import { PublicSaleMainButton } from "./PublicSaleMainButton";
import { SaleTokenInputCard } from "./SaleTokenInputCard";

export const PublicSaleModalContent = () => (
  <Container>
    <SwapContainer>
      <CollateralTokenInputCard />
      <SwapSeparator />
      <SaleTokenInputCard />
    </SwapContainer>
    <PublicSaleMainButton />
  </Container>
);
