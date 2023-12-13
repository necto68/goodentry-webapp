import { useCallback } from "react";

import { Dropdown } from "../../dropdown/components/Dropdown";
import { loadingPlaceholder } from "../../shared/constants/placeholders";
import { InputContainer, InputTitle } from "../styles/InputCard";

import type { InputCardProps } from "./InputCard";
import type { TokenData } from "../../queries/types/Token";
import type { FC } from "react";

type TokensDropdownProps = Pick<
  InputCardProps,
  "setInputValue" | "setTokenDataAddress" | "tokenData" | "tokens"
>;

const defaultTokensProperty: TokenData[] = [];
const defaultSetTokenDataAddressProperty = () => undefined;

export const TokensDropdown: FC<TokensDropdownProps> = ({
  tokenData,
  tokens = defaultTokensProperty,
  setTokenDataAddress = defaultSetTokenDataAddressProperty,
  setInputValue,
}) => {
  const handleSelectChange = useCallback(
    (tokenDataAddress: string) => {
      setInputValue("");
      setTokenDataAddress(tokenDataAddress);
    },
    [setInputValue, setTokenDataAddress]
  );

  const value = tokenData?.address ?? "";

  const options = tokens.map((token, index) => ({
    label: token ? token.symbol : loadingPlaceholder,
    value: token?.address ?? index.toString(),
    symbols: token ? ([token.symbol] as [string]) : undefined,
  }));

  return (
    <InputContainer>
      <InputTitle>Asset</InputTitle>
      <Dropdown onChange={handleSelectChange} options={options} value={value} />
    </InputContainer>
  );
};
