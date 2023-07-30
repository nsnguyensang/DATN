import React, { useState, useEffect } from "react";
import { pieRangePrice } from "../../../api/realEasteApi";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

const PieRangePrice = () => {
  const [dataPieChart, setDataPieChart] = useState([]);
  const backgroundColors = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
  ];
  useEffect(() => {
    const fetchPieChart = async () => {
      const result = await pieRangePrice();
      console.log("pieDataChart", result);
      setDataPieChart(result);
    };
    fetchPieChart();
  }, []);
  const data = {
    labels: dataPieChart.labels,
    datasets: [
      {
        data: dataPieChart.values, 
        backgroundColor: backgroundColors,
        borderColor: backgroundColors.map(color => color.replace("0.2", "1")), // Adjust borderColor by replacing alpha value with 1
        borderWidth: 1, // Add a border width to distinguish slices
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.raw || 0;
            const total = dataPieChart.values.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(2);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };
  return (
    <div style={{ width: "560px" , marginTop: "-80px"}}>
      <Pie data={data} options={options} />
    </div>
  );
};
export default PieRangePrice;