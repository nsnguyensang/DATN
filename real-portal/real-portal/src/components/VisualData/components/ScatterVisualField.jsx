import React, { useState, useEffect } from "react";
import { scatterVisual } from "../../../api/realEasteApi";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Scatter } from "react-chartjs-2";
import VisualData from "..";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const ScatterVisualField = ({ feild }) => {
  const [dataVisual, setDataVisual] = useState([]);
  useEffect(() => {
    const fetchScatterVisual = async () => {
      const result = await scatterVisual(feild);
      console.log("resultProvince", result);
      setDataVisual(result);
    };
    fetchScatterVisual();
  }, [feild]);
  const options = {
    scales: {
      y: {
        title: {
          display: true,
          text: "Giá",
        },
        beginAtZero: true,
        max: 30000,
        min: 0,
      },
      x: {
        title: {
          display: true,
          text: `${feild}`,
        },
        beginAtZero: true,
        // max: 400,
        // min: 0,
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "So sánh phân bổ Giá với Diện tích của chung cư",
      },
    },
  };
  const data = {
    datasets: [
      {
        label: "Chung cư",
        data: dataVisual.map((item) => ({
          x: item?.square || item?.width,
          y: item.price,
        })),
        backgroundColor: "rgb(255, 99, 132)",
      },
    ],
  };

  return (
    <div style={{ width: "450px" , height:"200px"}}>
      <Scatter options={options} data={data} />
    </div>
  );
};
export default ScatterVisualField;
