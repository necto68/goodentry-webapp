import { Container, Title } from "../styles/Header";

import type { FC } from "react";

interface HeaderProps {
  readonly title: string;
}

export const Header: FC<HeaderProps> = ({ title }) => (
  <Container>
    <Title>{title}</Title>
  </Container>
);
