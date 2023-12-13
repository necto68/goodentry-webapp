import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";

import { Container, Content } from "../styles/Toast";

import type { ToastProps } from "@chakra-ui/react";
import type { FC } from "react";

export const Toast: FC<ToastProps> = ({ status, title, description }) => (
  <Container>
    {status === "success" ? (
      <CheckCircleIcon boxSize={6} color="brand" />
    ) : null}
    {status === "error" ? <WarningIcon boxSize={6} color="error" /> : null}
    <Content>
      {title}
      {description}
    </Content>
  </Container>
);
