import React from "react";
import { Doughnut } from "react-chartjs-2";

const CashFlowChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.type),
    datasets: [
      {
        label: "Cash Flow",
        data: data.map((item) => item.amount),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
        ],
      },
    ],
  };

  return <Doughnut data={chartData} />;
};

export default CashFlowChart;

