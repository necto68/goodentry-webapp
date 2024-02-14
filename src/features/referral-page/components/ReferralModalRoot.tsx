import { ReferralModalStateProvider } from "../providers/ReferralModalStateProvider";
import { ReferralModalTransactionsProvider } from "../providers/ReferralModalTransactionsProvider";

import { ReferralModalContent } from "./ReferralModalContent";

export const ReferralModalRoot = () => (
  <ReferralModalStateProvider>
    <ReferralModalTransactionsProvider>
      <ReferralModalContent />
    </ReferralModalTransactionsProvider>
  </ReferralModalStateProvider>
);
