import { Button } from "@chakra-ui/react";
import { useCallback, useState } from "react";

import { strategyOverviewSteps } from "../constants/strategyOverviewSteps";
import {
  Container,
  DescriptionImage,
  Title,
  Description,
  FooterContainer,
  StepsTitle,
  CurrentStepTitle,
  ButtonsContainer,
} from "../styles/StrategyOverview";

export const StrategyOverview = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { image, title, description } = strategyOverviewSteps[currentStep];

  const handleBackButtonClick = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  const handleNextButtonClick = useCallback(() => {
    if (currentStep < strategyOverviewSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  }, [currentStep]);

  return (
    <Container>
      <DescriptionImage src={image} />
      <Title>{title}</Title>
      <Description>{description}</Description>
      <FooterContainer>
        <StepsTitle>
          <CurrentStepTitle>{currentStep + 1}</CurrentStepTitle> /{" "}
          {strategyOverviewSteps.length}
        </StepsTitle>
        <ButtonsContainer>
          {currentStep > 0 ? (
            <Button onClick={handleBackButtonClick} size="sm" variant="brand">
              Back
            </Button>
          ) : null}
          {currentStep < strategyOverviewSteps.length - 1 ? (
            <Button onClick={handleNextButtonClick} size="sm" variant="brand">
              Next
            </Button>
          ) : null}
        </ButtonsContainer>
      </FooterContainer>
    </Container>
  );
};
