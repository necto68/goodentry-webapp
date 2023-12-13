import { Button, Input, InputGroup } from "@chakra-ui/react";
import { useCallback } from "react";

import { getZero } from "../../shared/helpers/bigjs";
import { TitleCell } from "../../table/components/TitleCell";
import { toInputValueBig } from "../helpers/toInputValueBig";
import {
  InputContainer,
  InputTitle,
  InputTitleContainer,
  InputGroupContainer,
  InputRightAddonContainer,
} from "../styles/InputCard";

import type { InputCardProps } from "./InputCard";
import type { FC, ChangeEvent } from "react";

interface TokenInputProps
  extends Pick<
    InputCardProps,
    | "inputValue"
    | "isError"
    | "setInputValue"
    | "subTitle"
    | "title"
    | "tokenData"
  > {
  readonly isShowTokenSymbol: boolean;
}

export const TokenInput: FC<TokenInputProps> = ({
  title,
  subTitle,
  tokenData,
  inputValue = "0",
  setInputValue,
  isError,
  isShowTokenSymbol,
  // eslint-disable-next-line sonarjs/cognitive-complexity
}) => {
  const tokenSymbol = tokenData?.symbol;
  const tokenBalance = tokenData?.balance ?? getZero();

  const inputValueBig = toInputValueBig(inputValue);

  const isShowMaxButton =
    !tokenBalance.eq(inputValueBig) && tokenBalance.gt(getZero());
  const isShowRightAddon = isShowMaxButton || isShowTokenSymbol;

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
    },
    [setInputValue]
  );

  const handleMaxButtonClick = useCallback(() => {
    setInputValue(tokenBalance.toString());
  }, [setInputValue, tokenBalance]);

  return (
    <InputContainer>
      <InputTitleContainer>
        <InputTitle>{title}</InputTitle>
        {subTitle ? <InputTitle>{subTitle}</InputTitle> : null}
      </InputTitleContainer>
      <InputGroupContainer isError={isError}>
        <InputGroup>
          <Input
            inputMode="decimal"
            onChange={handleInputChange}
            type="number"
            value={inputValue}
            variant={isError ? "error" : "filled"}
          />
          {isShowRightAddon ? (
            <InputRightAddonContainer>
              {isShowMaxButton ? (
                <Button onClick={handleMaxButtonClick} size="xs">
                  MAX
                </Button>
              ) : null}
              {isShowTokenSymbol && tokenSymbol ? (
                <TitleCell symbols={[tokenSymbol]} title={tokenSymbol} />
              ) : null}
            </InputRightAddonContainer>
          ) : null}
        </InputGroup>
      </InputGroupContainer>
    </InputContainer>
  );
};
