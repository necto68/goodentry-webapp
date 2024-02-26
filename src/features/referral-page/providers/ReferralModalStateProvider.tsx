import { createContext, useEffect, useMemo, useState } from "react";

import { useReferrals } from "../hooks/useReferrals";

import type { ReferralModalState } from "../types/ReferralModalState";
import type { FC, ReactNode } from "react";

export const ReferralModalStateContext = createContext<ReferralModalState>({
  referralCodeInputState: "",
  myReferralCodeInputState: "",
  setReferralCodeInputState: () => undefined,
  setMyReferralCodeInputState: () => undefined,
});

export const ReferralModalStateProvider: FC<{
  readonly children: ReactNode;
}> = ({ children }) => {
  const { myReferralCode, referrerCode } = useReferrals() ?? {};
  const [referralCodeInputState, setReferralCodeInputState] = useState("");
  const [myReferralCodeInputState, setMyReferralCodeInputState] = useState("");

  useEffect(() => {
    if (referrerCode && !referralCodeInputState) {
      setReferralCodeInputState(referrerCode);
    }

    if (myReferralCode && !myReferralCodeInputState) {
      setMyReferralCodeInputState(myReferralCode);
    }
  }, [
    referrerCode,
    referralCodeInputState,
    myReferralCode,
    myReferralCodeInputState,
  ]);

  const value = useMemo(
    () => ({
      referralCodeInputState,
      myReferralCodeInputState,
      setReferralCodeInputState,
      setMyReferralCodeInputState,
    }),
    [
      referralCodeInputState,
      myReferralCodeInputState,
      setReferralCodeInputState,
      setMyReferralCodeInputState,
    ]
  );

  return (
    <ReferralModalStateContext.Provider value={value}>
      {children}
    </ReferralModalStateContext.Provider>
  );
};
