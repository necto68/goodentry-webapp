import { pairConfigs } from "../constants/pairConfigs";

export const getPairIds = () => pairConfigs.map(({ id }) => id);
