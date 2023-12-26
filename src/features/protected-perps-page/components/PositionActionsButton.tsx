import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useCallback } from "react";
import { BiShare } from "react-icons/bi";
import { HiOutlineDotsVertical } from "react-icons/hi";

import { useModal } from "../../shared/modal/hooks/useModal";
import { ModalType } from "../../shared/modal/types/ModalType";

import type { Position } from "../../queries/types/Position";
import type { FC } from "react";

interface PositionActionsButtonProps {
  readonly position: Position;
}

export const PositionActionsButton: FC<PositionActionsButtonProps> = ({
  position,
}) => {
  const { pushModal } = useModal();

  const handleShareButtonClick = useCallback(() => {
    pushModal(ModalType.SOCIAL_SHARE, { position });
  }, [pushModal, position]);

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        icon={<HiOutlineDotsVertical size={16} />}
        size="sm"
      />
      <MenuList>
        <MenuItem icon={<BiShare size={20} />} onClick={handleShareButtonClick}>
          Share
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
