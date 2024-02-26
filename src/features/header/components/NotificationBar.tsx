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
        href="https://goodentrylabs.medium.com/good-expansion-on-arbitrum-b1490f19758f"
        isExternal
        rel="nofollow"
      >
        Introducing the new &quot;Welcome Bonus&quot; feature [Click Here to
        Learn More]
      </NotificationLink>
    </Content>
  </Container>
);
