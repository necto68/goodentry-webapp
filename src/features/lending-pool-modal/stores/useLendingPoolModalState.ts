import { useContext } from "react";

import { LendingPoolModalStateContext } from "../providers/LendingPoolModalStateProvider";

export const useLendingPoolModalState = () =>
  useContext(LendingPoolModalStateContext);
