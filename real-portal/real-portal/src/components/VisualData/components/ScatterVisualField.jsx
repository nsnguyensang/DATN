import React, { useState, useEffect } from "react";
import { scatterVisual, scatterVisualFull } from "../../../api/realEasteApi";
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
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const top_provinces = [
  "Hà Nội",
  "Hồ Chí Minh",
  "Bình Dương",
  "Đà Nẵng",
  "Đồng Nai",
  "Khánh Hòa",
  "Long An",
  "Hưng Yên",
  "Lâm Đồng",
  "Bình Thuận",
  "Bình Phước",
  "Quảng Nam",
  "Bà Rịa Vũng Tàu",
  "Cần Thơ",
  "Hòa Bình",
  "Quảng Ninh",
  "Hải Phòng",
  "Kiên Giang",
  "Vĩnh Long",
  "Quảng Bình",
  "Bắc Ninh",
  "Bình Định",
  "Bà Rịa - Vũng Tàu",
  "Thanh Hóa",
  "Đắk Lắk",
  "Others",
];

const fieldToLabel = {
  square: "Diện tích(m^2)",
  floor: "Số tầng",
  bedroom: "Số phòng ngủ",
  width: "Chiều rộng",
  bathroom: "Số phòng tắm",
  province: "Tỉnh thành",
};

const ScatterVisualField = ({ field }) => {
  const [dataVisual, setDataVisual] = useState([]);

  useEffect(() => {
    const fetchScatterVisual = async () => {
      const result = await scatterVisualFull(field);
      setDataVisual(result);
    };
    fetchScatterVisual();
  }, [field]);

  const handleNameField = (field) => {
    return fieldToLabel[field] || field;
  };

  const options = {
    scales: {
      y: {
        title: {
          display: true,
          text: "Giá (triệu)",
        },
        beginAtZero: true,
        min: 0,
      },
      x: {
        title: {
          display: true,
          text: handleNameField(field),
        },
        beginAtZero: true,
        type: field === "province" ? "category" : "linear",
        labels:
          field === "province"
            ? top_provinces
            : undefined,
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
          x: field === "province" ? item.province : item[field],
          y: item.price,
        })),
        backgroundColor: "rgba(54, 162, 235, 1)",
      },
    ],
  };

  return (
    <div style={{ width: "950px" }}>
      <Scatter options={options} data={data} />
    </div>
  );
};

export default ScatterVisualField;
