import React, { useState, useEffect } from "react";
import { allocationByBedroom } from "../../../api/realEasteApi";
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
const TopBedroom = ({ top }) => {
  const [labelBedroom, setLabelBedroom] = useState([]);
  const [valueBedroom, setValueBedroom] = useState([]);
  useEffect(() => {
    const fetchAllocationByBedroom = async () => {
      const result = await allocationByBedroom(top);
      console.log("resultBedroom", result);
      setLabelBedroom(result.labels);
      setValueBedroom(result.counts);
    };
    fetchAllocationByBedroom();
  }, [top]);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Top phòng ngủ có số lượng chung cư nhiều nhất",
      },
    },
  };

  const labels = labelBedroom;
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Số lượng chung cư",
        data: valueBedroom,
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
export default TopBedroom;