import { PublicSaleModal } from "../../public-sale-modal/components/PublicSaleModal";
import {
  Container,
  Content,
  LeftContainer,
  RightContainer,
} from "../styles/PublicSalePage";

import { ClaimInformation } from "./ClaimInformation";
import { Header } from "./Header";
import { Metrics } from "./Metrics";
import { ProgressBar } from "./ProgressBar";
import { SaleDetails } from "./SaleDetails";
import { Timer } from "./Timer";
import { TokenDistribution } from "./TokenDistribution";
import { TokenInformation } from "./TokenInformation";

export const PublicSalePage = () => (
  <Container>
    <Header />
    <Metrics />
    <ProgressBar />
    <Content>
      <LeftContainer>
        <PublicSaleModal />
      </LeftContainer>
      <RightContainer>
        <Timer />
        <SaleDetails />
      </RightContainer>
    </Content>
    <ClaimInformation />
    <Content>
      <LeftContainer>
        <TokenInformation />
      </LeftContainer>
      <RightContainer>
        <TokenDistribution />
      </RightContainer>
    </Content>
  </Container>
);
