import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { getBuyTokenLink } from "../helpers/getBuyTokenLink";

import type { ButtonProps } from "@chakra-ui/react";
import type { FC } from "react";

export const BuyTokenButton: FC<ButtonProps> = (props) => {
  const link = getBuyTokenLink();

  return (
    <Button as={Link} target="_blank" to={link} variant="brand" {...props}>
      Buy GOOD
    </Button>
  );
};
