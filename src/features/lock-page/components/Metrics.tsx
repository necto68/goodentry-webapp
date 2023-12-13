import { marketCap, amount, price, round } from "../../icons/public-sale";
import { MetricItem } from "../../public-sale-page/components/MetricItem";
import { Container } from "../../public-sale-page/styles/Metrics";

// TODO: use real data
export const Metrics = () => (
  <Container>
    <MetricItem icon={marketCap} title="esGOOD Supply" value="100,000,000" />
    <MetricItem icon={amount} title="Locked GOOD" value="100,000,000" />
    <MetricItem icon={price} title="% Total GOOD Locked" value="50.21%" />
    <MetricItem icon={round} title="Est. Yield Per Week" value="$2,134.54" />
  </Container>
);
