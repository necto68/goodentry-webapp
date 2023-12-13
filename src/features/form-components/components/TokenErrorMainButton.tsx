import { TokenInputError } from "../../input-card/types/TokenInputError";

import { ErrorMainButton } from "./ErrorMainButton";

import type { TokenInputState } from "../../input-card/types/TokenInputState";
import type { TokenData } from "../../queries/types/Token";
import type { FC } from "react";

interface TokenErrorMainButtonProps extends Pick<TokenInputState, "error"> {
  readonly tokenData?: TokenData;
}

export const TokenErrorMainButton: FC<TokenErrorMainButtonProps> = ({
  error,
  tokenData,
}) => {
  if (!error) {
    return null;
  }

  let title = "";

  if (error === TokenInputError.INSUFFICIENT_TOKEN_BALANCE) {
    title = tokenData
      ? `Insufficient ${tokenData.symbol} Balance`
      : "Insufficient Balance";
  } else if (error === TokenInputError.INSUFFICIENT_TOKEN_INPUT) {
    title = tokenData
      ? `Insufficient ${tokenData.symbol} Input`
      : "Insufficient Input";
  } else {
    title = "";
  }

  return <ErrorMainButton title={title} />;
};
