import type { DropdownOption } from "./DropdownOption";

export interface DropdownProps {
  value: string;
  onChange: (key: string) => void;
  options: DropdownOption[];
}
