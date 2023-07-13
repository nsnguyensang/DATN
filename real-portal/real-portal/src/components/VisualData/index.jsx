import React, { Fragment, useEffect, useState } from "react";
import TopProvinces from "./components/TopProvinces";
import ScatterVisualField from "./components/ScatterVisualField";
import { Select, Row, Col } from "antd";
import { selectTopProvince, selectScatterFeild } from "./const/const";

const VisualData = () => {
  const [topSelectProvinces, setTopSelectProvinces] = useState(10);
  const [selectFieldVsPrice, setSelectFieldVsPrice] = useState("square");
  const handleTopProvincesChange = (value) => {
    setTopSelectProvinces(value);
  };
  const handleScatterFiledPrice = (value) => {
    setSelectFieldVsPrice(value);
  };
  return (
    <Fragment>
      <div>Biểu diễn dữ liệu</div>
      <Row gutter={24}>
        <Col span={12}>
          <Select
            placeholder="Top Provinces"
            onChange={handleTopProvincesChange}
            defaultValue={10}
            options={selectTopProvince}
          />
          <TopProvinces top={topSelectProvinces} />
        </Col>
        <Col span={12}>
          <Select
            placeholder="Top Provinces"
            onChange={handleScatterFiledPrice}
            defaultValue={"square"}
            options={selectScatterFeild}
          />
          <ScatterVisualField feild={selectFieldVsPrice} />
        </Col>
      </Row>
    </Fragment>
  );
};

export default VisualData;
