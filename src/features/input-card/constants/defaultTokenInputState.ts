import { getZero } from "../../shared/helpers/bigjs";

export const defaultTokenInputState = {
  tokenData: undefined,
  inputValue: "",
  setInputValue: () => undefined,
  inputValueBig: getZero(),
  isError: false,
  error: undefined,
  resetState: () => undefined,
};
