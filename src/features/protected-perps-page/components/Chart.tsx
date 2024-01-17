import { AssetChart } from "../../asset-chart/components/AssetChart";
import { getPairConfig } from "../../pair/helpers/getPairConfig";
import { usePairIdStore } from "../stores/usePairIdStore";
import { Container } from "../styles/Chart";

export const Chart = () => {
  const { pairId } = usePairIdStore();

  const { chartSymbol } = getPairConfig(pairId);

  return (
    <Container>
      <AssetChart chartSymbol={chartSymbol} />
    </Container>
  );
};
