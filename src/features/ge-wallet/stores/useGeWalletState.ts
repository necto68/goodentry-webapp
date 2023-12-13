import { useContext } from "react";

import { GeWalletStateContext } from "../providers/GeWalletStateProvider";

export const useGeWalletState = () => useContext(GeWalletStateContext);
