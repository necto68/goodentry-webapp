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
        href="https://degen.goodentry.io/"
        isExternal
        rel="nofollow"
      >
        Trading available in Degen Mode [Open Degen Now]
      </NotificationLink>
    </Content>
  </Container>
);
