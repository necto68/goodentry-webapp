import { usePublicSaleModalState } from "../stores/usePublicSaleModalState";

export const useSaleTokenInputState = () => {
  const { saleTokenInputState } = usePublicSaleModalState();

  return saleTokenInputState;
};
