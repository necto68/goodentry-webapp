import { Container, Title } from "../styles/AirdropModalContent";

import { AirdropAmount } from "./AirdropAmount";
import { AirdropButtons } from "./AirdropButtons";
import { WalletBalance } from "./WalletBalance";

export const AirdropModalContent = () => (
  <Container>
    <Title>Your Airdrop</Title>
    <AirdropAmount />
    <WalletBalance />
    <AirdropButtons />
  </Container>
);
