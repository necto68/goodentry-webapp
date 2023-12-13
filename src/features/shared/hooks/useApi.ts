interface Api {
  get: (url: string) => Promise<Response>;
}

export const useApi = function (): Api {
  return {
    get: async (url: string): Promise<Response> =>
      await fetch(`https://roe.nicodeva.xyz/${url}`),
  };
};
