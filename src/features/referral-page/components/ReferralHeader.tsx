import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { useReferrals } from "../hooks/useReferrals";
import { useReferralModalState } from "../stores/useReferralModalState";
import {
  Content,
  GlowContainer,
  Link,
  SubTitle,
  Title,
} from "../styles/ReferralHeader";

import { SubmitReferrerButton } from "./SubmitReferrerButton";

export const ReferralHeader = () => {
  const { referrerCode = "" } = useReferrals() ?? {};
  const [searchParameters, setSearchParameters] = useSearchParams();
  const referralParameter =
    searchParameters.get("code") ?? localStorage.getItem("referralParameter");

  const { referralCodeInputState, setReferralCodeInputState } =
    useReferralModalState();

  useEffect(() => {
    if (referrerCode || referralParameter) {
      setReferralCodeInputState(referrerCode || String(referralParameter));
      if (!referrerCode) {
        localStorage.setItem("referralParameter", referralParameter ?? "");
      } else {
        localStorage.removeItem("referralParameter");
      }
      searchParameters.delete("code");
      setSearchParameters(searchParameters);
    }
  }, [
    referralCodeInputState,
    referralParameter,
    referrerCode,
    searchParameters,
    setReferralCodeInputState,
    setSearchParameters,
  ]);

  return (
    <Content>
      <Title>Referrals</Title>
      <SubTitle>
        Earn rewards with Good Entry{" "}
        <Link href="https://goodentrylabs.medium.com/" target="_blank">
          Referral Program
        </Link>
      </SubTitle>
      {!referrerCode && referralParameter ? (
        <GlowContainer>
          <Title>Activate Your Referral Link</Title>
          <SubTitle>
            You 5% rebate for your trades, and your referrer gets 5%
          </SubTitle>
          <SubmitReferrerButton />
        </GlowContainer>
      ) : null}
    </Content>
  );
};
