import { Dropdown } from "../../dropdown/components/Dropdown";
import { loadingPlaceholder } from "../../shared/constants/placeholders";
import { usePairs } from "../hooks/usePairs";
import { usePairIdStore } from "../stores/usePairIdStore";
import { Container } from "../styles/PairSelector";

export const PairSelector = () => {
  const pairs = usePairs();
  const { pairId, setPairId } = usePairIdStore();

  const options = pairs.map((pair, index) => ({
    label: pair ? pair.title : loadingPlaceholder,

    value: pair?.id ?? index.toString(),

    symbols: pair
      ? ([pair.baseTokenSymbol, pair.quoteTokenSymbol] as [string, string])
      : undefined,
  }));

  return (
    <Container>
      <Dropdown onChange={setPairId} options={options} value={pairId} />
    </Container>
  );
};
