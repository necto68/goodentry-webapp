export interface ReferralModalState {
  referralCodeInputState: string;
  myReferralCodeInputState: string;
  setReferralCodeInputState: (nextReferralCodeInputState: string) => void;
  setMyReferralCodeInputState: (nextMyReferralCodeInputState: string) => void;
}
