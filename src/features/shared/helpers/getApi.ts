interface Api {
  get: (url: string) => Promise<Response>;
}

export const getApi = function (): Api {
  return {
    get: async (url: string): Promise<Response> =>
      await fetch(`https://api.goodentry.io/${url}`),
  };
};
