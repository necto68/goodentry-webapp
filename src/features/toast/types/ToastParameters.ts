import type { ToastType } from "./ToastType";
import type { ChainId } from "../../web3/types/ChainId";

export interface ToastParameters {
  type: ToastType;
  title: string;
  description?: string;
  chainId?: ChainId;
  transactionHash?: string;
}
