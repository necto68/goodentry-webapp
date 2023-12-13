import { usePublicSaleModalState } from "../stores/usePublicSaleModalState";

export const useCollateralTokenInputState = () => {
  const { collateralTokenInputState } = usePublicSaleModalState();

  return collateralTokenInputState;
};
