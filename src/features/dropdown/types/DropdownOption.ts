import type { TitleCellProps } from "../../table/components/TitleCell";

export interface DropdownOption extends Pick<TitleCellProps, "symbols"> {
  value: string;
  label: string;
}
