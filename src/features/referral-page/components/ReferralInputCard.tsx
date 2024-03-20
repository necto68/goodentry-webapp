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
import { getReferralLink } from "../helpers/referralLink";
import { useReferrals } from "../hooks/useReferrals";
import { useReferralModalState } from "../stores/useReferralModalState";
import { Container, Content } from "../styles/ReferralInputCard";

import { SubmitMyCodeButton } from "./SubmitMyCodeButton";

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
      setMyReferralCodeInputState(event.target.value.replace(" ", ""));
    },
    [setMyReferralCodeInputState]
  );

  return (
    <Container>
      <Content>
        {referrerCode ? (
          <>
            <InputTitleContainer>
              <InputTitle>You were referred by</InputTitle>
            </InputTitleContainer>
            <InputGroupContainer isError={false}>
              <Input
                disabled
                inputMode="text"
                type="text"
                value={referrerCode}
                variant="filled"
              />
            </InputGroupContainer>
          </>
        ) : null}
        <InputTitleContainer>
          <InputTitle>My Code</InputTitle>
        </InputTitleContainer>
        <InputGroupContainer isError={false}>
          <InputGroup>
            <Input
              disabled={Boolean(myReferralCode) || isLoading || !account}
              inputMode="text"
              onChange={handleInputChange}
              placeholder="Start typing to generate your link..."
              type="text"
              value={myReferralCodeInputState}
              variant="filled"
            />
          </InputGroup>
        </InputGroupContainer>
        <InputTitleContainer>
          <InputTitle>My Referrer Link</InputTitle>
        </InputTitleContainer>
        <InputGroupContainer isError={false}>
          <Input
            inputMode="text"
            type="text"
            value={getReferralLink(myReferralCodeInputState)}
            variant="filled"
          />
        </InputGroupContainer>
        <SubmitMyCodeButton />
      </Content>
    </Container>
  );
};
