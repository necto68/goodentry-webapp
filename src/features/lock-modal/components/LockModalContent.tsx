import { Container } from "../../public-sale-modal/styles/PublicSaleModalContent";

import { LockDescription } from "./LockDescription";
import { LockInputCard } from "./LockInputCard";
import { LockMainButton } from "./LockMainButton";
import { LockSwitcher } from "./LockSwitcher";

export const LockModalContent = () => (
  <Container>
    <LockSwitcher />
    <LockInputCard />
    <LockDescription />
    <LockMainButton />
  </Container>
);
