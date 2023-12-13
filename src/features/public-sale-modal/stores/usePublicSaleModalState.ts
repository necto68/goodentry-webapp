import { useContext } from "react";

import { PublicSaleModalStateContext } from "../providers/PublicSaleModalStateProvider";

export const usePublicSaleModalState = () =>
  useContext(PublicSaleModalStateContext);
