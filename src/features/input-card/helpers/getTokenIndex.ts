import type { TokenInputState } from "../types/TokenInputState";

export const getTokenIndex = (
  tokenData: TokenInputState["tokenData"],
  tokens: TokenInputState["tokens"] = []
) =>
  tokens.findIndex(
    (token) => token && tokenData && token.address === tokenData.address
  );
