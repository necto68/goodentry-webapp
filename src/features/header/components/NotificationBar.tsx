import { InfoIcon } from "@chakra-ui/icons";

import {
  Container,
  Content,
  NotificationLink,
} from "../styles/NotificationBar";

export const NotificationBar = () => (
  <Container>
    <Content>
      <InfoIcon color="brand" fontSize={18} />
      <NotificationLink
        href="https://goodentrylabs.medium.com/"
        isExternal
        rel="nofollow"
      >
        Deposits and Position Openings are Paused [Click here to read more]
      </NotificationLink>
    </Content>
  </Container>
);
