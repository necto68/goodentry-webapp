import { useContext } from "react";

import { ReferralModalStateContext } from "../providers/ReferralModalStateProvider";

export const useReferralModalState = () =>
  useContext(ReferralModalStateContext);
