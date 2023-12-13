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
import { useAssetPrices } from "../hooks/useAssetPrices";

import type { Position } from "../../queries/types/Position";
import type { FC } from "react";

interface PositionActionsButtonProps {
  readonly position: Position;
}

export const PositionActionsButton: FC<PositionActionsButtonProps> = ({
  position,
}) => {
  const { pushModal } = useModal();
  const assetPrices = useAssetPrices(position.pairId);
  const { currentPrice } = assetPrices ?? {};

  const handleShareButtonClick = useCallback(() => {
    if (currentPrice) {
      pushModal(ModalType.SOCIAL_SHARE, { position, currentPrice });
    }
  }, [pushModal, position, currentPrice]);

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
