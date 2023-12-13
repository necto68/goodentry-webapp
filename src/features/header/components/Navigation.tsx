import { Link } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

import { headerNavigationLinks } from "../constants/navigationLinks";
import { Container } from "../styles/Navigation";

import { BuyTokenButton } from "./BuyTokenButton";

export const Navigation = () => (
  <Container>
    {headerNavigationLinks.map(({ href, name, isExternal, isDisabled }) =>
      isDisabled ? (
        <Link key={name}>{name}</Link>
      ) : (
        <Link
          as={NavLink}
          href={href}
          key={href}
          target={isExternal ? "_blank" : "_self"}
          to={href}
        >
          {name}
        </Link>
      )
    )}
    <BuyTokenButton size="sm" />
  </Container>
);
