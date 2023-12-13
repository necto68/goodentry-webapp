export interface AccountAirdropDataResponse {
  amount: string;
  proof: string[];
}

export interface AirdropDataResponse {
  [account: string]: AccountAirdropDataResponse;
}
