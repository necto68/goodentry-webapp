import { Link } from "@chakra-ui/react";

import { socialLinks } from "../constants/socialLinks";
import { Container, Icon } from "../styles/Socials";

export const Socials = () => (
  <Container>
    {socialLinks.map(({ name, href, icon }) => (
      <Link href={href} isExternal key={name}>
        {icon ? <Icon src={icon} /> : name}
      </Link>
    ))}
  </Container>
);
