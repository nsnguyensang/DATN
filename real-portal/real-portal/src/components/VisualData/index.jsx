import React, { Fragment, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import TopProvinces from "./components/TopProvinces";
import axios from "axios";
import ScatterVisualField from "./components/ScatterVisualField";
import { Select, Row, Col, Button, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import {
  selectTopProvince,
  selectTopProject,
  selectTopBathroom,
  selectTopBedroom,
  selectTopFloor,
  selectScatterFeild,
} from "./const/const";
import { BoxElement, TitleVisual } from "./styles";
import TopProject from "./components/TopProject";
import TopBedroom from "./components/TopBedroom";
import TopBathroom from "./components/TopBathroom";
import TopFloor from "./components/TopFloor";
import PieRangePrice from "./components/PieRangePrice";
import ChartProject from "./components/ChartProject";

const { Option } = Select;
const VisualData = ({ backgroundColor }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [topSelectProvinces, setTopSelectProvinces] = useState(15);
  const [topSelectProject, setTopSelectProject] = useState(15);
  const [topSelectBathroom, setTopSelectBathroom] = useState(10);
  const [topSelectBedroom, setTopSelectBedroom] = useState(10);
  const [topSelectFloor, setTopSelectFloor] = useState(10);
  const [selectFieldVsPrice, setSelectFieldVsPrice] = useState("province");
  const [plotImage, setPlotImage] = useState("");
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedCity, setSelectedCity] = useState("Thành phố Hà Nội");
  const [selectedDistrict, setSelectedDistrict] = useState("Quận Cầu Giấy");
  useEffect(() => {
    callAPI("https://provinces.open-api.vn/api/?depth=1");
  }, []);

  const callAPI = (api) => {
    axios.get(api).then((response) => {
      setCities(response.data);
    });
  };

  const callApiDistrict = (api) => {
    axios.get(api).then((response) => {
      setDistricts(response.data.districts);
    });
  };
  const handleCityChange = (value, option) => {
    if (value !== undefined) {
      setSelectedDistrict("");
      const selectedCityId = value;
      setSelectedCity(option.children);
      callApiDistrict(
        `https://provinces.open-api.vn/api/p/${selectedCityId}?depth=2`
      );
    }
  };
  const handleSubmit = () => {
    let params = {};
    if (selectedCity !== "" && selectedCity) {
      params.province = selectedCity;
    }
    if (selectedDistrict !== "" && selectedDistrict) {
      params.district = selectedDistrict;
    }

    setSearchParams(params);
  };
  const handleDistrictChange = (value, option) => {
    if (value !== undefined) {
      setSelectedDistrict(option.children);
    }
  };
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

  // useEffect(() => {
  //   fetch("http://localhost:5000/api/plot-image") // Đường dẫn API của bạn
  //     .then((response) => response.blob())
  //     .then((blob) => {
  //       const imageURL = URL.createObjectURL(blob);
  //       setPlotImage(imageURL);
  //     });
  // }, []);
  return (
    <div
      style={{
        margin: "16px 16px",
        padding: 16,
        minHeight: 700,
      }}
    >
      <Row gutter={24}>
        <Col span={10}>
          <BoxElement width="600px">
            <TitleVisual>Phân bổ giá</TitleVisual>
            <PieRangePrice />
          </BoxElement>
        </Col>
        <Col span={14}>
          <BoxElement width="900px">
            <TitleVisual>Giá trung bình theo dự án</TitleVisual>
            <Space wrap style={{ float: "right", marginRight: "40px" }}>
              <Select
                placeholder="Tỉnh/TP"
                style={{
                  width: 160,
                }}
                allowClear
                value={selectedCity || undefined}
                onChange={handleCityChange}
                onClear={() => {
                  setSelectedCity("");
                  setSelectedDistrict("");
                }}
              >
                {cities.map((city) => (
                  <Option key={city.code} value={city.code}>
                    {city.name}
                  </Option>
                ))}
              </Select>
              <Select
                placeholder="Quận/Huyện"
                style={{
                  width: 160,
                }}
                allowClear
                value={selectedDistrict || undefined}
                onChange={handleDistrictChange}
                onClear={() => {
                  setSelectedDistrict("");
                }}
              >
                {districts.map((district) => (
                  <Option key={district.code} value={district.code}>
                    {district.name}
                  </Option>
                ))}
              </Select>
              <Button
                type="primary"
                icon={<SearchOutlined />}
                onClick={handleSubmit}
              >
                Lọc
              </Button>
            </Space>
            <ChartProject />
          </BoxElement>
        </Col>
      </Row>
      <BoxElement width="1600px" height="900px" style={{ marginTop: "20px" }}>
        <TitleVisual>Top các trường có số lượng lớn nhất</TitleVisual>
        <Row gutter={24}>
          <Col span={12}>
            <Select
              placeholder="Top Provinces"
              onChange={handleTopProvincesChange}
              defaultValue={15}
              options={selectTopProvince}
              style={{ float: "right", marginRight: "20px" }}
            />
            <TopProvinces top={topSelectProvinces} />
          </Col>
          <Col span={12}>
            <Select
              placeholder="Top Project"
              onChange={handleTopProjectChange}
              defaultValue={15}
              options={selectTopProject}
              style={{ float: "right", marginRight: "20px" }}
            />
            <TopProject top={topSelectProject} />
          </Col>
        </Row>
        <Row gutter={24} style={{ marginTop: "30px" }}>
          <Col span={12}>
            <Select
              placeholder="Top Bedroom"
              onChange={handleTopBedroomChange}
              defaultValue={10}
              options={selectTopBedroom}
              style={{ float: "right", marginRight: "20px" }}
            />
            <TopBedroom top={topSelectBedroom} />
          </Col>
          <Col span={12}>
            <Select
              placeholder="Top Bathroom"
              onChange={handleTopBathroomChange}
              defaultValue={10}
              options={selectTopBathroom}
              style={{ float: "right", marginRight: "20px" }}
            />
            <TopBathroom top={topSelectBathroom} />
          </Col>
        </Row>
      </BoxElement>
      <Row gutter={24}>
        <BoxElement
          width="1900px"
          height="600px"
          style={{ marginLeft: "280px", marginTop: "26px" }}
        >
          <TitleVisual>Mức giá với các thuộc tính còn lại</TitleVisual>
          <Select
            onChange={handleScatterFiledPrice}
            defaultValue={"province"}
            options={selectScatterFeild}
            style={{ float: "right", marginRight: "20px" }}
          />
          <ScatterVisualField field={selectFieldVsPrice} />
        </BoxElement>
      </Row>
    </div>
  );
};

export default VisualData;
