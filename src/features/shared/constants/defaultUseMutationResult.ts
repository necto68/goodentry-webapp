export const defaultUseMutationResult = {
  mutation: {
    data: undefined,
    error: null,
    isError: false,
    isIdle: false,
    isLoading: false,
    isSuccess: true,
    isPaused: false,
    failureReason: null,
    status: "success",
    mutate: () => undefined,

    mutateAsync: async () => {
      await Promise.resolve();
    },

    reset: () => undefined,
    context: undefined,
    failureCount: 0,
    variables: undefined,
  },

  resetTransaction: () => undefined,
  transactionHash: undefined,

  runTransaction: async () => {
    await Promise.resolve();
  },
} as const;
