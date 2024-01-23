import { getChainConfig } from "../../web3/helpers/getChainConfig";

import type { ChainId } from "../../web3/types/ChainId";
import type { ChainExplorerResponse } from "../types/ChainExplorerResponse";
import type { EventFilter } from "ethers";

export const chainExplorerDataFetcher = async (
  chainId: ChainId,
  filterAddress: EventFilter["address"] = "",
  filterTopics: EventFilter["topics"] = []
): Promise<ChainExplorerResponse> => {
  const { urls, keys } = getChainConfig(chainId);
  const { explorerApi: explorerApiUrl } = urls;
  const { explorerApi: explorerApiKey } = keys;

  if (!explorerApiUrl) {
    throw new Error("no explorerApiUrl");
  }

  const apiUrl = new URL("/api", explorerApiUrl);

  apiUrl.searchParams.set("module", "logs");
  apiUrl.searchParams.set("action", "getLogs");
  apiUrl.searchParams.set("fromBlock", "0");
  apiUrl.searchParams.set("toBlock", "latest");

  if (filterAddress) {
    apiUrl.searchParams.set("address", filterAddress);
  }

  if (explorerApiKey) {
    apiUrl.searchParams.set("apikey", explorerApiKey);
  }

  filterTopics.forEach((topic, index) => {
    if (topic) {
      apiUrl.searchParams.set(`topic${index}`, topic.toString());
    }
  });

  const response = await fetch(apiUrl.toString());
  const responseData =
    await (response.json() as Promise<ChainExplorerResponse>);

  if (responseData.status !== "1") {
    throw new Error(responseData.message);
  }

  return responseData;
};
