import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { useEffect, useRef } from "react";

import { Container } from "../styles/VaultChart";

const convertDataToXrange = (
  data: number[]
): Highcharts.XrangePointOptionsObject[] =>
  data.map((value, index) => ({
    x: index,
    x2: index + 1,
    y: value,
  }));

export const VaultChart: React.FC<{ readonly data: number[] }> = ({ data }) => {
  const chartReference = useRef<Highcharts.Chart | null>(null);

  useEffect(() => {
    if (chartReference.current?.update) {
      chartReference.current.update({
        series: [{ type: "xrange", data: convertDataToXrange(data) }],
      });
    }
  }, [data]);

  const options = {
    chart: {
      backgroundColor: "#121418",
    },

    title: "",

    exporting: {
      buttons: {
        contextButton: {
          enabled: false,
        },

        printButton: {
          enabled: false,
        },
      },
    },

    xAxis: {
      visible: false,
    },

    yAxis: {
      visible: false,
    },

    legend: {
      enabled: false,
    },

    plotOptions: {
      series: {
        states: {
          hover: {
            enabled: false,
          },
        },
      },

      area: {
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },

          stops: [
            [0, Highcharts.color("#0FFD6A").get("rgba")],
            [1, Highcharts.color("#121418").setOpacity(0).get("rgba")],
          ],
        },

        marker: {
          enabled: false,
        },

        lineWidth: 1,

        states: {
          hover: {
            lineWidth: 1,
          },
        },

        threshold: null,
      },

      line: {
        softThreshold: true,

        marker: {
          enabled: false,
        },
      },
    },

    tooltip: {
      formatter(): string {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const { y = 0 } = this;
        return `<div>
            <div>APY: ${Number(y).toFixed(2)}%</div>
          </div>`;
      },
    },

    credits: {
      enabled: false,
    },

    series: [
      {
        type: "area",
        name: "Fees APR",
        data,
        color: "#0FFD6A",
        lineWidth: 2,
      },
    ],
  };

  return (
    <Container>
      <HighchartsReact
        constructorType="chart"
        containerProps={{
          style: { width: "100%", maxWidth: "90vw", height: "200px" },
        }}
        highcharts={Highcharts}
        id="vault-chart"
        options={options}
        ref={chartReference}
      />
    </Container>
  );
};
