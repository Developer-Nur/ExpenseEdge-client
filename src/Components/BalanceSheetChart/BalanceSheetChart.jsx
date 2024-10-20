import React from "react";
import { Bar } from "react-chartjs-2";

const BalanceSheetChart = ({ data }) => {
  // Ensure data is always an array
  const chartData = Array.isArray(data) ? data : [];

  if (chartData.length === 0) {
    return <div>No data available for the balance sheet.</div>; // Fallback when no valid data
  }

  const formattedData = {
    labels: chartData.map((item) => item.title),
    datasets: [
      {
        label: "Amount",
        data: chartData.map((item) => item.amount),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Balance Sheet Overview",
        font: {
          size: 18,
          weight: "bold",
        },
      },
    },
  };

  return (
    <div style={{ position: "relative", height: "400px", width: "100%" }}>
      <Bar data={formattedData} options={options} />
    </div>
  );
};

export default BalanceSheetChart;



