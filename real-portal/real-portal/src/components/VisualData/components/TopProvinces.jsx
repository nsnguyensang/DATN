import React, { useState, useEffect } from "react";
import { allocationByProvince } from "../../../api/realEasteApi";
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
const TopProvinces = ({ top }) => {
  const [labelProvince, setLabelProvince] = useState([]);
  const [valueProvince, setValueProvince] = useState([]);
  useEffect(() => {
    const fetchAllocationByProvince = async () => {
      const result = await allocationByProvince(top);
      console.log("resultProvince", result);
      setLabelProvince(result.labels);
      setValueProvince(result.counts);
    };
    fetchAllocationByProvince();
  }, [top]);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Top tỉnh thành có số lượng chung cư nhiều nhất",
      },
    },
  };

  const labels = labelProvince;
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Số lượng chung cư",
        data: valueProvince,
        fill: false,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ width: "600px" }}>
      <Bar options={options} data={data} />
    </div>
  );
};
export default TopProvinces;
