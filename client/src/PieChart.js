// src/PieChart.js
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

// A bright, visually distinct color palette
const COLORS = [
  "#3498db", // blue
  "#2ecc71", // green
  "#e74c3c", // red
  "#9b59b6", // purple
  "#f1c40f", // yellow
  "#1abc9c", // teal
  "#e67e22", // orange
  "#34495e", // dark blue-gray
  "#ff6384", // pink
  "#36a2eb", // sky blue
  "#4bc0c0", // aqua
  "#9966ff", // violet
];

const PieChart = ({ labels, data, chartTitle }) => {
  const pieData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: COLORS.slice(0, data.length),
        hoverOffset: 8,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          font: { size: 14 },
          color: "#333",
        },
      },
    },
  };

  return (
    <div style={{ maxWidth: "400px", margin: "2rem auto" }}>
      <h3 style={{ textAlign: "center", marginBottom: "1rem", fontFamily: "Arial" }}>{chartTitle}</h3>
      <Pie data={pieData} options={options} />
    </div>
  );
};

export default PieChart;
