import { memo } from "react";
import { theme } from "twin.macro";

import { Container } from "../styles/AssetChart";

import { AdvancedRealTimeChart } from "./AdvancedRealTimeChart";

import type { AssetChartProps } from "../types/AssetChart";

const AssetChart = memo(({ chartSymbol }: AssetChartProps) => {
  if (!chartSymbol) {
    return <Container />;
  }

  const backgroundColor = theme`colors.bg.primary`;

  return (
    <Container>
      <AdvancedRealTimeChart
        allow_symbol_change={false}
        autosize
        backgroundColor={backgroundColor}
        calendar={false}
        disabled_features={[
          "header_compare",
          "create_volume_indicator_by_default",
        ]}
        hide_side_toolbar
        interval="60"
        save_image={false}
        symbol={chartSymbol}
        theme="dark"
        withdateranges={false}
      />
    </Container>
  );
});

AssetChart.displayName = "AssetChart";

export { AssetChart };
