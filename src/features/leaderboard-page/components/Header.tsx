import React from "react";

import {
  Link,
  SubTitle,
  Title,
} from "../../referral-page/styles/ReferralHeader";
import { Container } from "../styles/Header";

export const Header = () => (
  <Container>
    <Title>Leaderboard</Title>
    <SubTitle>
      Win rewards by participating in{" "}
      <Link
        href="https://goodentrylabs.medium.com/trading-competition-everyones-a-winner-0975b5d9f1b6"
        target="_blank"
      >
        Trading Competition
      </Link>
    </SubTitle>
  </Container>
);
