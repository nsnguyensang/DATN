import React, { Fragment, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  SearchOutlined,
  ReloadOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import {
  priceDataSelect,
  bedroomDataSelect,
  directionDataSelect,
  squareDataSelect,
} from "./const/const";
import { Input, Select, Space, Button } from "antd";
import { SearchBox, HomeFilter, ButtomRefresh, TitleBottom } from "./style";

const SearchAndFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedBed, setSelectedBed] = useState("");
  const [selectedDirection, setSelectedDirection] = useState("");
  const [selectedSquare, setSelectedSquare] = useState("");
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleSubmit = () => {
    let params = {};
    if (selectedPrice !== "" && selectedPrice) {
      params.searchPrice = selectedPrice;
    }
    if (inputValue !== "" && inputValue) {
      params.searchText = inputValue;
    }
    if (selectedBed !== "" && selectedBed) {
      params.searchBedroom = selectedBed;
    }
    if (selectedDirection !== "" && selectedDirection) {
      params.searchDirection = selectedDirection;
    }
    if (selectedSquare !== "" && selectedSquare) {
      params.searchSquare = selectedSquare;
    }
    setSearchParams(params);
  };

  const handlePriceChange = (value) => {
    setSelectedPrice(value);
    // console.log("selected", value.split("-")[1]);
  };
  const handleClearPrice = () => {
    setSelectedPrice("");
  };
  const handleBedroomChange = (value) => {
    setSelectedBed(value);
  };
  const handleClearBedroom = () => {
    setSelectedBed("");
  };
  const handleDirectionChange = (value) => {
    setSelectedDirection(value);
  };
  const handleClearDirection = () => {
    setSelectedDirection("");
  };
  const handleSquareChange = (value) => {
    setSelectedSquare(value);
  };
  const handleClearSquare = () => {
    setSelectedSquare("");
  };
  return (
    <Fragment>
      <SearchBox>
        <Space wrap>
          <Input
            style={{ width: "800px" }}
            addonBefore={<HomeOutlined />}
            placeholder="Tìm nhanh. VD: Vinhomes Ocean Park"
            value={inputValue}
            onChange={handleInputChange}
          />
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={handleSubmit}
          >
            Tìm kiếm
          </Button>
        </Space>
        <HomeFilter>
          <Space wrap>
            <Select
              placeholder="Địa điểm"
              style={{
                width: 170,
              }}
              allowClear
              options={[
                {
                  value: "lucy",
                  label: "Lucy",
                },
              ]}
            />
            <Select
              placeholder="Mức giá"
              style={{
                width: 170,
              }}
              allowClear
              options={priceDataSelect}
              onChange={handlePriceChange}
              onClear={handleClearPrice}
            />
            <Select
              placeholder="Diện tích"
              style={{
                width: 170,
              }}
              allowClear
              options={squareDataSelect}
              onChange={handleSquareChange}
              onClear={handleClearSquare}
            />
            <Select
              placeholder="Phòng ngủ"
              style={{
                width: 170,
              }}
              allowClear
              options={bedroomDataSelect}
              onChange={handleBedroomChange}
              onClear={handleClearBedroom}
            />
            <Select
              placeholder="Hướng nhà"
              style={{
                width: 170,
              }}
              allowClear
              options={directionDataSelect}
              onChange={handleDirectionChange}
              onClear={handleClearDirection}
            />
            <Button type="primary" icon={<ReloadOutlined />} size="small" />
          </Space>
        </HomeFilter>
      </SearchBox>
    </Fragment>
  );
};
export default SearchAndFilter;
