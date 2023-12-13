import React from "react";

import {
  Separator,
  Title,
} from "../../public-sale-page/styles/ClaimInformation";
import { DescriptionValue } from "../../shared/modal/styles/ModalDescription";
import { Container, TitleContainer } from "../styles/UnlockSchedulesInfo";

import { UnlockSchedules } from "./UnlockSchedules";

export const UnlockSchedulesInfo = () => (
  <Container>
    <TitleContainer>
      <Title>Unlock Schedules</Title>
      <DescriptionValue>
        You may exit early but there will be a withdraw penalty incurred and
        burnt
      </DescriptionValue>
    </TitleContainer>
    <Separator />
    <UnlockSchedules />
  </Container>
);
