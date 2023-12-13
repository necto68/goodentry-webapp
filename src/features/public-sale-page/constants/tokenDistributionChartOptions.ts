import { theme } from "twin.macro";

const labelColor = theme`colors.text.gray`;

export const tokenDistributionChartOptions = {
  chart: {
    backgroundColor: "transparent",
    type: "pie",

    style: {
      fontFamily: "Inter",
    },
  },

  title: {
    text: "",
  },

  tooltip: {
    enabled: false,
  },

  credits: {
    enabled: false,
  },

  plotOptions: {
    pie: {
      cursor: "pointer",
      borderColor: null,

      dataLabels: {
        format: "{point.name}: {point.percentage} %",
        color: labelColor,

        style: {
          textOutline: "none",
          fontSize: "0.8rem",
        },
      },
    },
  },

  series: [
    {
      data: [
        {
          name: "Liquidity Mining by Governance",
          y: 23,
        },
        {
          name: "Reserves",
          y: 18,
        },
        {
          name: "Fair Sale",
          y: 15,
        },
        {
          name: "Team Governance",
          y: 11,
        },
        {
          name: "Team Unlock",
          y: 11,
        },
        {
          name: "Partnership by Governance",
          y: 10,
        },
        {
          name: "Partnership Season 1",
          y: 5,
        },
        {
          name: "Community Allocation",
          y: 5,
        },
        {
          name: "Market Making",
          y: 2,
        },
      ],
    },
  ],
};
