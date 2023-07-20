import React, { Fragment, useEffect, useState } from "react";
import TopProvinces from "./components/TopProvinces";
import ScatterVisualField from "./components/ScatterVisualField";
import { Select, Row, Col } from "antd";
import {
  selectTopProvince,
  selectTopProject,
  selectTopBathroom,
  selectTopBedroom,
  selectTopFloor,
  selectScatterFeild,
} from "./const/const";
import TopProject from "./components/TopProject";
import TopBedroom from "./components/TopBedroom";
import TopBathroom from "./components/TopBathroom";
import TopFloor from "./components/TopFloor";

const VisualData = () => {
  const [topSelectProvinces, setTopSelectProvinces] = useState(10);
  const [topSelectProject, setTopSelectProject] = useState(5);
  const [topSelectBathroom, setTopSelectBathroom] = useState(10);
  const [topSelectBedroom, setTopSelectBedroom] = useState(10);
  const [topSelectFloor, setTopSelectFloor] = useState(10);
  const [selectFieldVsPrice, setSelectFieldVsPrice] = useState("square");
  const [plotImage, setPlotImage] = useState("");
  const handleTopProvincesChange = (value) => {
    setTopSelectProvinces(value);
  };
  const handleTopProjectChange = (value) => {
    setTopSelectProject(value);
  };
  const handleTopBathroomChange = (value) => {
    setTopSelectBathroom(value);
  };
  const handleTopBedroomChange = (value) => {
    setTopSelectBedroom(value);
  };
  const handleTopFloorChange = (value) => {
    setTopSelectFloor(value);
  };
  const handleScatterFiledPrice = (value) => {
    setSelectFieldVsPrice(value);
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/plot-image") // Đường dẫn API của bạn
      .then((response) => response.blob())
      .then((blob) => {
        const imageURL = URL.createObjectURL(blob);
        setPlotImage(imageURL);
      });
  }, []);
  return (
    <Fragment>
      <div>Biểu diễn dữ liệu</div>
      <Row gutter={24}>
        <Col span={8}>
          <Select
            placeholder="Top Provinces"
            onChange={handleTopProvincesChange}
            defaultValue={10}
            options={selectTopProvince}
          />
          <TopProvinces top={topSelectProvinces} />
        </Col>
        <Col span={8}>
          <Select
            placeholder="Top Project"
            onChange={handleTopProjectChange}
            defaultValue={5}
            options={selectTopProject}
          />
          <TopProject top={topSelectProject} />
        </Col>
        <Col span={8}>
          <Select
            placeholder="Top Provinces"
            onChange={handleScatterFiledPrice}
            defaultValue={"square"}
            options={selectScatterFeild}
          />
          <ScatterVisualField feild={selectFieldVsPrice} />
        </Col>
        {/* {plotImage && <img src={plotImage} alt="Plot" />} */}
      </Row>
      <Row gutter={24} style={{marginTop: "30px"}}>
        <Col span={8}>
          <Select
            placeholder="Top Bedroom"
            onChange={handleTopBedroomChange}
            defaultValue={10}
            options={selectTopBedroom}
          />
          <TopBedroom top={topSelectBedroom} />
        </Col>
        <Col span={8}>
          <Select
            placeholder="Top Bathroom"
            onChange={handleTopBathroomChange}
            defaultValue={10}
            options={selectTopBathroom}
          />
          <TopBathroom top={topSelectBathroom} />
        </Col>
        <Col span={8}>
          <Select
            placeholder="Top Floor"
            onChange={handleTopFloorChange}
            defaultValue={10}
            options={selectTopFloor}
          />
          <TopFloor top={topSelectFloor} />
        </Col>
      </Row>
    </Fragment>
  );
};

export default VisualData;
