import { getZero, toBig } from "../../shared/helpers/bigjs";

export const toInputValueBig = (inputValue: string) =>
  inputValue ? toBig(inputValue) : getZero();
