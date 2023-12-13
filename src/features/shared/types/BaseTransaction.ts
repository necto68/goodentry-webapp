import type { UseQueryResult } from "@tanstack/react-query";

export type DependantQueries = UseQueryResult[];

// eslint-disable-next-line etc/prefer-interface
export type OnTransactionSuccess = (
  transactionHash: string
) => Promise<void> | void;

// eslint-disable-next-line etc/prefer-interface
export type OnTransactionError = (error: Error) => Promise<void> | void;
