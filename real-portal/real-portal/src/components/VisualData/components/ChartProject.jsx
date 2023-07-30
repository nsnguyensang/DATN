import React, { useState, useEffect } from "react";
import { lineChartProject } from "../../../api/realEasteApi";
import { useLocation } from "react-router-dom";
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

const ChartProject = () => {
  const location = useLocation();
  const [dataLineChart, setDataLineChart] = useState([]);

  useEffect(() => {
    let province;
    let district;
    const searchParams = new URLSearchParams(location.search);
    const searchProvince = searchParams.get("province") || "Hà Nội";
    const searchDistrict = searchParams.get("district") || "Cầu Giấy";
    if (searchProvince !== "") {
      province = searchProvince.replace(/(Tỉnh|Thành phố)\s*/, "");
    }
    if (searchDistrict !== "") {
      district = searchDistrict.replace(/(Quận|Huyện|Thành phố)\s*/, "");
    }
    console.log(province, district);
    const fetchLineChart = async () => {
      const result = await lineChartProject({ province, district });
      setDataLineChart(result);
    };
    fetchLineChart();
  }, [location]);
  console.log("dataLineChart", dataLineChart);
  const labels = dataLineChart.map((item) => item.project);
  const values = dataLineChart.map((item) => item.average_price_per_m2);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: false,
      },
    },
    indexAxis: "y", // Specify that the labels are on the y-axis
    scales: {
      y: {
        ticks: {
          beginAtZero: true, // Đặt beginAtZero thành true để bắt đầu trục y từ 0
          autoSkip: false, // Tắt tự động bỏ qua label
          maxTicksLimit: dataLineChart.length, // Đặt số lượng tối đa các label trên trục y
          maxRotation: 0, // Không xoay label
          minRotation: 0, // Không xoay label
        },
      },
    },
  };

  const data = {
    labels: labels, // Use the counts as labels since labels are on the y-axis
    datasets: [
      {
        label: "Diện tích trung bình trên m2 ",
        data: values, // Use the labels as data since they are on the y-axis
        fill: false,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ width: "770px", marginTop: "8px" }}>
      <Bar options={options} data={data} type="horizontalBar" />
    </div>
  );
};

export default ChartProject;
