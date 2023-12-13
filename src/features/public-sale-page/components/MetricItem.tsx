import { Container, Content, Icon, Title, Value } from "../styles/MetricItem";

import type { FC, ReactNode } from "react";

interface MetricItemProps {
  readonly icon: string;
  readonly title: string;
  readonly value: ReactNode;
}

export const MetricItem: FC<MetricItemProps> = ({ icon, title, value }) => (
  <Container>
    <Icon src={icon} />
    <Content>
      <Title>{title}</Title>
      <Value>{value}</Value>
    </Content>
  </Container>
);
