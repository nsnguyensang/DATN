import React, { useState, useEffect } from "react";
import { allocationByProject } from "../../../api/realEasteApi";
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
const TopProject = ({ top }) => {
  const [labelProject, setLabelProject] = useState([]);
  const [valueProject, setValueProject] = useState([]);

  useEffect(() => {
    const fetchAllocationByProject = async () => {
      const result = await allocationByProject(top);
      console.log("resultProject", result);

      setLabelProject(result.labels);
      setValueProject(result.counts);
    };
    fetchAllocationByProject();
  }, [top]);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Top dự án có số lượng chung cư nhiều nhất",
      },
    },
  };

  const labels = labelProject;
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Số lượng chung cư",
        data: valueProject,
        fill: false,
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderColor: 'rgba(255, 206, 86, 1)',
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
export default TopProject;
