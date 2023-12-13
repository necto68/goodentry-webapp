import type { TokenInputError } from "./TokenInputError";
import type { TokenData } from "../../queries/types/Token";
import type Big from "big.js";

export interface TokenInputState {
  tokenData: TokenData;
  tokens?: TokenData[];
  setTokenDataAddress?: (nextTokenDataAddress: string) => void;
  inputValue: string;
  setInputValue: (nextInputValue: string) => void;
  inputValueBig: Big;
  isError: boolean;
  error: TokenInputError | undefined;
  resetState: () => void;
}
