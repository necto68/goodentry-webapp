import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";

import { loadingPlaceholder } from "../../shared/constants/placeholders";
import { TitleCell } from "../../table/components/TitleCell";
import { MainButtonContent } from "../styles/Dropdown";

import type { DropdownProps } from "../types/DropdownProps";
import type { FC } from "react";

export const Dropdown: FC<DropdownProps> = ({ value, options, onChange }) => {
  const selectedOption = options.find((option) => option.value === value);
  const selectedLabel = selectedOption?.label ?? loadingPlaceholder;
  const selectedSymbols = selectedOption?.symbols ?? undefined;

  const filteredOptions = options.filter((option) => option.value !== value);

  return (
    <Menu>
      <MenuButton as={Button} fontWeight="normal" px={3}>
        <MainButtonContent>
          <TitleCell symbols={selectedSymbols} title={selectedLabel} />
          <ChevronDownIcon />
        </MainButtonContent>
      </MenuButton>
      <MenuList>
        {filteredOptions.map((option) => (
          <MenuItem
            key={option.value}
            onClick={() => {
              onChange(option.value);
            }}
          >
            <TitleCell symbols={option.symbols} title={option.label} />
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};
