import { useLocalStorage as useLocalStorageBase } from "usehooks-ts";

export const useLocalStorage = <ValueType>(
  key: string,
  initialValue: ValueType
) => useLocalStorageBase(key, initialValue);
