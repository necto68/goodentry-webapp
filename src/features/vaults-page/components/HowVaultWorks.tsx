import { CloseButton } from "@chakra-ui/react";

import { howVaultWorks } from "../../icons/vaults-page";
import { useLocalStorage } from "../../shared/hooks/useLocalStorage";
import {
  Container,
  Title,
  TitleContainer,
  EmptySpace,
  Description,
  DescriptionImage,
} from "../styles/HowVaultWorks";

export const HowVaultWorks = () => {
  const [isHide, setIsHide] = useLocalStorage("HowVaultWorksIsHide", false);

  if (isHide) {
    return null;
  }

  return (
    <Container>
      <TitleContainer>
        <EmptySpace />
        <Title>How ezVault Works?</Title>
        <CloseButton
          onClick={() => {
            setIsHide(true);
          }}
        />
      </TitleContainer>
      <Description>
        Earn passive yield with just one click, without any lock-in periods!
        Simply decide into which ezVault you wish to deposit, and start earning
        AMM swap fees, supply APY, and rewards. Happy farming!
      </Description>
      <DescriptionImage src={howVaultWorks} />
    </Container>
  );
};
