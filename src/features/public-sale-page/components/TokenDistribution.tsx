import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { tokenDistributionChartOptions } from "../constants/tokenDistributionChartOptions";
import { Container, Title } from "../styles/ClaimInformation";
import { ChartContainer } from "../styles/TokenDistribution";

export const TokenDistribution = () => (
  <Container>
    <Title>Token Distribution</Title>
    <ChartContainer>
      <HighchartsReact
        highcharts={Highcharts}
        options={tokenDistributionChartOptions}
      />
    </ChartContainer>
  </Container>
);
