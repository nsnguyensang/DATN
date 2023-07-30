import React, { useState, useEffect } from "react";
import { allocationByBathroom } from "../../../api/realEasteApi";
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
const TopBathroom = ({ top }) => {
  const [labelBathroom, setLabelBathroom] = useState([]);
  const [valueBathroom, setValueBathroom] = useState([]);
  useEffect(() => {
    const fetchAllocationByBathroom = async () => {
      const result = await allocationByBathroom(top);
      console.log("resultBathroom", result);
      setLabelBathroom(result.labels);
      setValueBathroom(result.counts);
    };
    fetchAllocationByBathroom();
  }, [top]);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Top phòng tắm có số lượng chung cư nhiều nhất",
      },
    },
  };

  const labels = labelBathroom;
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Số lượng chung cư",
        data: valueBathroom,
        fill: false,
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ width: "660px" }}>
      <Bar options={options} data={data} />
    </div>
  );
};
export default TopBathroom;