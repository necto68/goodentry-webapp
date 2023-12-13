import { Drawer, DrawerContent, Link } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";

import { Socials } from "../../footer/components/Socials";
import { mobileNavigationLinks } from "../constants/navigationLinks";
import {
  ChevronIcon,
  LinkContent,
  MobileContainer,
  NavigationContainer,
  MobileLinkContent,
  SocialContainer,
  PublicSaleButtonMobileContainer,
} from "../styles/Navigation";

import { BuyTokenButton } from "./BuyTokenButton";
import { SidebarContent } from "./Sidebar";

interface MobileNavigationProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export const MobileNavigation = ({
  isOpen,
  onClose,
}: MobileNavigationProps) => (
  <Drawer
    isOpen={isOpen}
    onClose={onClose}
    onOverlayClick={onClose}
    placement="left"
    returnFocusOnClose={false}
    size="full"
  >
    <DrawerContent>
      <SidebarContent>
        <MobileContainer>
          <NavigationContainer>
            {mobileNavigationLinks.map(
              ({ href, name, isExternal, isDisabled }) =>
                isDisabled ? (
                  <Link key={name} width="100%">
                    <MobileLinkContent>
                      {name}
                      <ChevronIcon />
                    </MobileLinkContent>
                  </Link>
                ) : (
                  <Link
                    as={NavLink}
                    href={href}
                    key={href}
                    onClick={onClose}
                    target={isExternal ? "_blank" : "_self"}
                    to={href}
                    width="100%"
                  >
                    <LinkContent>
                      <MobileLinkContent>
                        {name}
                        <ChevronIcon />
                      </MobileLinkContent>
                    </LinkContent>
                  </Link>
                )
            )}
          </NavigationContainer>
          <PublicSaleButtonMobileContainer>
            <BuyTokenButton w="full" />
          </PublicSaleButtonMobileContainer>
          <SocialContainer>
            <Socials />
          </SocialContainer>
        </MobileContainer>
      </SidebarContent>
    </DrawerContent>
  </Drawer>
);
