import { Input, InputGroup } from "@chakra-ui/react";
import { useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import {
  InputGroupContainer,
  InputTitle,
  InputTitleContainer,
} from "../../input-card/styles/InputCard";
import { useReferralsQuery } from "../../queries/hooks/useReferralsQuery";
import { useWallet } from "../../wallet/hooks/useWallet";
import { useReferrals } from "../hooks/useReferrals";
import { useReferralModalState } from "../stores/useReferralModalState";
import { Container, Content } from "../styles/ReferralInputCard";

import { SubmitMyCodeButton } from "./SubmitMyCodeButton";
import { SubmitReferrerButton } from "./SubmitReferrerButton";

import type { ChangeEvent } from "react";

export const ReferralInputCard = () => {
  const { account } = useWallet();
  const { isLoading } = useReferralsQuery();
  const [searchParameters] = useSearchParams();
  const referralParameter = searchParameters.get("code");
  const { referrerCode = "", myReferralCode = "" } = useReferrals() ?? {};

  const {
    myReferralCodeInputState,
    setMyReferralCodeInputState,
    referralCodeInputState,
    setReferralCodeInputState,
  } = useReferralModalState();

  useEffect(() => {
    if (referrerCode || referralParameter) {
      setReferralCodeInputState(referrerCode || String(referralParameter));
    }
  }, [
    referralCodeInputState,
    referralParameter,
    referrerCode,
    setReferralCodeInputState,
  ]);

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setMyReferralCodeInputState(event.target.value);
    },
    [setMyReferralCodeInputState]
  );

  const handleReferrerInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setReferralCodeInputState(event.target.value);
    },
    [setReferralCodeInputState]
  );

  return (
    <Container>
      <Content>
        <InputTitleContainer>
          <InputTitle>My code</InputTitle>
        </InputTitleContainer>
        <InputGroupContainer isError={false}>
          <InputGroup>
            <Input
              disabled={Boolean(myReferralCode) || isLoading || !account}
              inputMode="text"
              onChange={handleInputChange}
              type="text"
              value={myReferralCodeInputState}
              variant="filled"
            />
          </InputGroup>
        </InputGroupContainer>
        <SubmitMyCodeButton />
      </Content>
      {referralParameter || referrerCode ? (
        <Content>
          <InputTitleContainer>
            <InputTitle>My Referrer</InputTitle>
          </InputTitleContainer>
          <InputGroupContainer isError={false}>
            <InputGroup>
              <Input
                disabled
                inputMode="text"
                onChange={handleReferrerInputChange}
                type="text"
                value={referralCodeInputState}
                variant="filled"
              />
            </InputGroup>
          </InputGroupContainer>
          <SubmitReferrerButton />
        </Content>
      ) : null}
    </Container>
  );
};
