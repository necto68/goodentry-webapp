import { Button } from "@chakra-ui/react";
import { useCallback } from "react";

import { loadingPlaceholder } from "../../shared/constants/placeholders";
import { useModal } from "../../shared/modal/hooks/useModal";
import { ModalType } from "../../shared/modal/types/ModalType";
import { getPositionSideTitle } from "../helpers/getPositionSideTitle";
import { isPositionSideLong } from "../helpers/isPositionSideLong";
import { useTradePanelQueries } from "../hooks/useTradePanelQueries";
import { useTradePanelState } from "../stores/useTradePanelState";

export const OpenTradeModalButton = () => {
  const { pushModal } = useModal();
  const { positionSide, pairId, quoteTokenInputState, leverage } =
    useTradePanelState();

  const { baseTokenQuery } = useTradePanelQueries(pairId);
  const baseTokenData = baseTokenQuery.data;

  const positionSideTitle = getPositionSideTitle(positionSide);
  const symbol = baseTokenData ? baseTokenData.symbol : loadingPlaceholder;

  const isLong = isPositionSideLong(positionSide);

  const handleButtonClick = useCallback(() => {
    const modalState = {
      positionSide,
      pairId,
      quoteTokenInputState,
      leverage,
    };

    pushModal(ModalType.OPEN_POSITION, modalState);
  }, [pushModal, positionSide, pairId, quoteTokenInputState, leverage]);

  return (
    <Button
      onClick={handleButtonClick}
      variant={isLong ? "brand" : "error"}
    >{`${positionSideTitle} ${symbol}`}</Button>
  );
};
