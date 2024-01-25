import { loadingPlaceholder } from "../../shared/constants/placeholders";
import { toBig } from "../../shared/helpers/bigjs";
import { getFormattedTokenAmount } from "../../shared/helpers/formatters";
import { getTruncatedAddress } from "../../web3/helpers/addresses";
import { getExplorerLink } from "../../web3/helpers/getExplorerLink";
import { ExplorerLinkType } from "../../web3/types/ExplorerLinkType";
import { getPublicSaleConfig } from "../helpers/getPublicSaleConfig";
import { usePublicSaleData } from "../hooks/usePublicSaleData";
import { usePublicSaleToken } from "../hooks/usePublicSaleToken";
import { Title, Separator } from "../styles/ClaimInformation";
import {
  Container,
  ItemContainer,
  ItemTitle,
  ItemValue,
  ItemSymbol,
  ItemLink,
} from "../styles/TokenInformation";

// eslint-disable-next-line complexity
export const TokenInformation = () => {
  const { chainId } = getPublicSaleConfig();

  const saleToken = usePublicSaleToken();
  const publicSaleData = usePublicSaleData();

  const { address, symbol } = saleToken ?? {};
  const { saleTokenCap } = publicSaleData ?? {};

  const totalSupply = toBig(1e9);
  const [formattedTotalSupply, formattedSaleTokenCap] = [
    totalSupply,
    saleTokenCap,
  ].map((value) => (value ? getFormattedTokenAmount(value) : null));

  const formattedTokenAddress = address ? getTruncatedAddress(address) : "";
  const tokenAddressLink = address
    ? getExplorerLink(chainId, ExplorerLinkType.TOKEN, address)
    : undefined;

  return (
    <Container>
      <Title>Token Information</Title>
      <ItemContainer>
        <ItemTitle>Token Symbol (Ticker)</ItemTitle>
        {symbol ? (
          <ItemSymbol>{symbol}</ItemSymbol>
        ) : (
          <ItemValue>{loadingPlaceholder}</ItemValue>
        )}
      </ItemContainer>
      <Separator />
      <ItemContainer>
        <ItemTitle>Total Token Supply</ItemTitle>
        {formattedTotalSupply && symbol ? (
          <ItemValue>
            {formattedTotalSupply} <ItemSymbol>{symbol}</ItemSymbol>
          </ItemValue>
        ) : (
          <ItemValue>{loadingPlaceholder}</ItemValue>
        )}
      </ItemContainer>
      <Separator />
      <ItemContainer>
        <ItemTitle>Tokens in Fair Sale</ItemTitle>
        {formattedSaleTokenCap && symbol ? (
          <ItemValue>
            {formattedSaleTokenCap} <ItemSymbol>{symbol}</ItemSymbol>
          </ItemValue>
        ) : (
          <ItemValue>{loadingPlaceholder}</ItemValue>
        )}
      </ItemContainer>
      <Separator />
      <ItemContainer>
        <ItemTitle>Token Address</ItemTitle>
        {tokenAddressLink ? (
          <ItemLink href={tokenAddressLink} target="_blank">
            {formattedTokenAddress}
          </ItemLink>
        ) : (
          <ItemValue>{loadingPlaceholder}</ItemValue>
        )}
      </ItemContainer>
    </Container>
  );
};
