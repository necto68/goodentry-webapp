import { Button } from "@chakra-ui/react";
import React, { useCallback } from "react";
import { Link } from "react-router-dom";

import { RoutePathname } from "../../root/types/RoutePathname";
import { useModal } from "../../shared/modal/hooks/useModal";
import { Container } from "../styles/AirdropButtons";

import { AirdropMainButton } from "./AirdropMainButton";

export const AirdropButtons = () => {
  const { hideModal } = useModal();

  const handleLinkClick = useCallback(() => {
    hideModal();
  }, [hideModal]);

  return (
    <Container>
      <AirdropMainButton />
      <Button as={Link} onClick={handleLinkClick} to={RoutePathname.LOCK}>
        Go to Lock
      </Button>
    </Container>
  );
};
