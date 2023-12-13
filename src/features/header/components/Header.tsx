import { IconButton, Show, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";

import { useWallet } from "../../wallet/hooks/useWallet";
import {
  Container,
  ButtonsContainer,
  Wrapper,
  Content,
} from "../styles/Header";

import { AdditionalNavigationButton } from "./AdditionalNavigationButton";
import { AppLottieLogo } from "./AppLottieLogo";
import { AuthHeader } from "./AuthHeader";
import { ConnectWalletButton } from "./ConnectWalletButton";
import { MobileNavigation } from "./MobileNavigation";
import { Navigation } from "./Navigation";

export const Header = () => {
  const { isConnected } = useWallet();
  const { onOpen, isOpen, onClose } = useDisclosure();

  return (
    <Wrapper>
      <Container>
        <Content>
          <AppLottieLogo />
          <Navigation />
          <MobileNavigation isOpen={isOpen} onClose={onClose} />
        </Content>
        <ButtonsContainer>
          {isConnected ? <AuthHeader /> : <ConnectWalletButton />}
          <Show above="lg">
            <AdditionalNavigationButton />
          </Show>
          <Show below="lg">
            <IconButton
              aria-label="open"
              icon={<RxHamburgerMenu size={18} />}
              onClick={isOpen ? onClose : onOpen}
              variant="border"
            />
          </Show>
        </ButtonsContainer>
      </Container>
    </Wrapper>
  );
};
