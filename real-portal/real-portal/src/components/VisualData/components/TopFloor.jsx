import React, { useState, useEffect } from "react";
import { allocationByFloor } from "../../../api/realEasteApi";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const TopFloor = ({ top }) => {
  const [labelFloor, setLabelFloor] = useState([]);
  const [valueFloor, setValueFloor] = useState([]);
  useEffect(() => {
    const fetchAllocationByFloor = async () => {
      const result = await allocationByFloor(top);
      console.log("resultFloor", result);
      setLabelFloor(result.labels);
      setValueFloor(result.counts);
    };
    fetchAllocationByFloor();
  }, [top]);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Top tầng có số lượng chung cư nhiều nhất",
      },
    },
  };

  const labels = labelFloor;
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Số lượng chung cư",
        data: valueFloor,
        fill: false,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ width: "450px" }}>
      <Bar options={options} data={data} />
    </div>
  );
};
export default TopFloor;