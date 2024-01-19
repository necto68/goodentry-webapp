import React from "react";

import { Container } from "../styles/AuthHeader";

import { ChainSelector } from "./ChainSelector";
import { DisconnectWalletButton } from "./DisconnectWalletButton";

export const AuthHeader = () => (
  <Container>
    {/* <AirdropButton /> */}
    {/* <RewardsButton /> */}
    <ChainSelector />
    <DisconnectWalletButton />
  </Container>
);
