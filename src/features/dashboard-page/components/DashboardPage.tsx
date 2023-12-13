import { usePairs } from "../../protected-perps-page/hooks/usePairs";
import { Container } from "../styles/DashboardPage";

import { PairDetails } from "./PairDetails";

export const DashboardPage = () => {
  const pairs = usePairs();

  return (
    <Container>
      {pairs.map((pair) =>
        pair ? <PairDetails key={pair.id} pairId={pair.id} /> : null
      )}
    </Container>
  );
};
