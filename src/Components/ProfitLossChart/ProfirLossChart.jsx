import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const ProfitLossChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    // Clean up the previous chart instance if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Check if data is available
    if (data.length > 0) {
      chartInstanceRef.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: data.map((item) => item.date),
          datasets: [
            {
              label: "Income",
              data: data.map((item) => item.income),
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
              hoverBackgroundColor: "rgba(75, 192, 192, 0.8)",
            },
            {
              label: "Expense",
              data: data.map((item) => item.expense),
              backgroundColor: "rgba(255, 99, 132, 0.6)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
              hoverBackgroundColor: "rgba(255, 99, 132, 0.8)",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false, // Allow the chart to fill the container
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Amount',
                font: {
                  size: 14,
                },
              },
            },
            x: {
              title: {
                display: true,
                text: 'Date',
                font: {
                  size: 14,
                },
              },
            },
          },
          plugins: {
            legend: {
              display: true,
              position: 'top',
            },
            title: {
              display: true,
              text: 'Profit and Loss Chart',
              font: {
                size: 18,
                weight: 'bold',
              },
            },
          },
        },
      });
    } else {
      // Handle case when data is empty
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.fillText("No data available", ctx.canvas.width / 2, ctx.canvas.height / 2);
    }

    // Cleanup function to destroy chart on unmount
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data]);

  return (
    <div style={{ position: "relative", height: "400px", width: "100%" }}>
      <canvas ref={chartRef} />
    </div>
  );
};

export default ProfitLossChart;


