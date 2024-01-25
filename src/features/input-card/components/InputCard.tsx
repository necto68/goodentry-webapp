import { getFormattedTokenAmountWithSymbol } from "../../shared/helpers/formatters";
import {
  Container,
  InputsContainer,
  BalanceTitleContainer,
  InputTitle,
  InputSubTitle,
} from "../styles/InputCard";

import { InputSlider } from "./InputSlider";
import { TokenInput } from "./TokenInput";
import { TokensDropdown } from "./TokensDropdown";

import type { TokenData } from "../../queries/types/Token";
import type { FC } from "react";

export interface InputCardProps {
  readonly title?: string;
  readonly subTitle?: string;
  readonly balanceTitle?: string;
  readonly tokenData: TokenData;
  readonly tokens?: TokenData[];
  readonly setTokenDataAddress?: (nextTokenDataAddress: string) => void;
  readonly inputValue?: string;
  readonly setInputValue: (nextInputValue: string) => void;
  readonly isError: boolean;
  readonly isShowSlider?: boolean;
  readonly sliderTitle?: string;
  readonly balanceTokenSymbol?: string;
}

export const InputCard: FC<InputCardProps> = ({
  title = "Amount",
  subTitle,
  balanceTitle = "Wallet",
  tokenData,
  tokens,
  setTokenDataAddress,
  inputValue = "0",
  setInputValue,
  isError,
  isShowSlider = false,
  sliderTitle,
  balanceTokenSymbol,
}) => {
  const { symbol: defaultTokenSymbol, balance } = tokenData ?? {};
  const tokenSymbol = balanceTokenSymbol ?? defaultTokenSymbol;

  const formattedTokenBalance = getFormattedTokenAmountWithSymbol(
    balance,
    tokenSymbol
  );

  const isShowTokensDropdown = Array.isArray(tokens) && tokens.length > 1;
  const isShowTokenSymbol = !isShowTokensDropdown && Boolean(tokenSymbol);

  return (
    <Container>
      <InputsContainer>
        {isShowTokensDropdown ? (
          <TokensDropdown
            setInputValue={setInputValue}
            setTokenDataAddress={setTokenDataAddress}
            tokenData={tokenData}
            tokens={tokens}
          />
        ) : null}
        <TokenInput
          inputValue={inputValue}
          isError={isError}
          isShowTokenSymbol={isShowTokenSymbol}
          setInputValue={setInputValue}
          subTitle={subTitle}
          title={title}
          tokenData={tokenData}
        />
      </InputsContainer>
      {isShowSlider ? (
        <InputSlider
          inputValue={inputValue}
          setInputValue={setInputValue}
          sliderTitle={sliderTitle}
          tokenData={tokenData}
        />
      ) : null}
      <BalanceTitleContainer>
        <InputSubTitle>{`${balanceTitle}:`}</InputSubTitle>
        <InputTitle>{formattedTokenBalance}</InputTitle>
      </BalanceTitleContainer>
    </Container>
  );
};
