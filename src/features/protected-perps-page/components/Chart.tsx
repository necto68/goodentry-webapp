import { AssetChart } from "../../asset-chart/components/AssetChart";
import { getPairConfig } from "../../pair/helpers/getPairConfig";
import { useSelectedPairIdStore } from "../stores/useSelectedPairIdStore";
import { Container } from "../styles/Chart";

export const Chart = () => {
  const { selectedPairId } = useSelectedPairIdStore();

  const pairConfig = getPairConfig(selectedPairId);
  const { chartSymbol } = pairConfig;

  return (
    <Container>
      <AssetChart chartSymbol={chartSymbol} />
    </Container>
  );
};
