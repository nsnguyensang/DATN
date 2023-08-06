import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
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

const { Option } = Select;
const SearchAndFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedBed, setSelectedBed] = useState("");
  const [selectedDirection, setSelectedDirection] = useState("");
  const [selectedSquare, setSelectedSquare] = useState("");
  //api tỉnh thành, quận huyện
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [searchProvince, setSearchProvince] = useState("");
  const [searchDistrict, setSearchDistrict] = useState("");
  const [searchWard, setSearchWard] = useState("");
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

  const callApiWard = (api) => {
    axios.get(api).then((response) => {
      setWards(response.data.wards);
    });
  };

  const handleCityChange = (value, option) => {
    if (value !== undefined) {
      setSelectedDistrict("");
      setSelectedWard("");
      const selectedCityId = value;
      setSelectedCity(option.children);
      callApiDistrict(
        `https://provinces.open-api.vn/api/p/${selectedCityId}?depth=2`
      );
    }
  };

  const handleDistrictChange = (value, option) => {
    if (value !== undefined) {
      setSelectedWard("");
      const selectedDistrictId = value;
      setSelectedDistrict(option.children);
      callApiWard(
        `https://provinces.open-api.vn/api/d/${selectedDistrictId}?depth=2`
      );
    }
  };

  const handleWardChange = (value, option) => {
    if (value !== undefined) {
      setSelectedWard(option.children);
    }
  };

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
    if (selectedCity !== "" && selectedCity) {
      params.searchProvince = selectedCity;
    }
    if (selectedDistrict !== "" && selectedDistrict) {
      params.searchDistrict = selectedDistrict;
    }
    if (selectedWard !== "" && selectedWard) {
      params.searchWard = selectedWard;
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
  const handleRemoveAllFilter = () => {
    setSelectedDirection("");
    setInputValue("");
    setSelectedBed("");
    setSelectedPrice("");
    setSelectedSquare("");
    setSelectedDistrict("");
    setSelectedCity("");
    setSelectedWard("");
  };
  return (
    <Fragment>
      <SearchBox>
        <Space wrap>
          <Input
            style={{ width: "886px" }}
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
              showSearch
              placeholder="Tỉnh/TP"
              style={{
                width: 160,
              }}
              allowClear
              value={selectedCity || undefined}
              onChange={handleCityChange}
              onSearch={(value) => setSearchProvince(value)}
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
              onClear={() => {
                setSelectedCity("");
                setSelectedWard("");
                setSelectedDistrict("");
                setSearchProvince("");
                setSearchDistrict("");
                setSearchWard("");
              }}
            >
              {cities
                .filter((city) =>
                  city.name.toLowerCase().includes(searchProvince.toLowerCase())
                )
                .map((city) => (
                  <Option key={city.code} value={city.code}>
                    {city.name}
                  </Option>
                ))}
            </Select>

            <Select
              placeholder="Quận/Huyện"
              showSearch
              style={{
                width: 160,
              }}
              allowClear
              value={selectedDistrict || undefined}
              onChange={handleDistrictChange}
              onSearch={(value) => setSearchDistrict(value)}
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
              onClear={() => {
                setSelectedDistrict("");
                setSelectedWard("");
                setSearchDistrict("");
                setSearchWard("");
              }}
            >
              {districts
                .filter((district) =>
                  district.name
                    .toLowerCase()
                    .includes(searchDistrict.toLowerCase())
                )
                .map((district) => (
                  <Option key={district.code} value={district.code}>
                    {district.name}
                  </Option>
                ))}
            </Select>

            <Select
              showSearch
              placeholder="Phường/Xã"
              value={selectedWard || undefined}
              style={{
                width: 160,
              }}
              allowClear
              onChange={handleWardChange}
              onClear={() => setSelectedWard("")}
              onSearch={(value) => setSearchWard(value)}
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
            >
              {wards
                .filter((ward) =>
                  ward.name.toLowerCase().includes(searchWard.toLowerCase())
                )
                .map((ward) => (
                  <Option key={ward.code} value={ward.code}>
                    {ward.name}
                  </Option>
                ))}
            </Select>
            <Select
              placeholder="Mức giá"
              style={{
                width: 110,
              }}
              allowClear
              options={priceDataSelect}
              onChange={handlePriceChange}
              onClear={handleClearPrice}
            />
            <Select
              placeholder="Diện tích"
              style={{
                width: 110,
              }}
              allowClear
              options={squareDataSelect}
              onChange={handleSquareChange}
              onClear={handleClearSquare}
            />
            <Select
              placeholder="Phòng ngủ"
              style={{
                width: 110,
              }}
              value={selectedBed || undefined}
              allowClear
              options={bedroomDataSelect}
              onChange={handleBedroomChange}
              onClear={handleClearBedroom}
            />
            <Select
              placeholder="Hướng nhà"
              style={{
                width: 110,
              }}
              allowClear
              value={selectedDirection || undefined}
              options={directionDataSelect}
              onChange={handleDirectionChange}
              onClear={handleClearDirection}
            />
            <Button
              type="primary"
              icon={<ReloadOutlined />}
              size="small"
              onClick={handleRemoveAllFilter}
            />
          </Space>
        </HomeFilter>
      </SearchBox>
    </Fragment>
  );
};
export default SearchAndFilter;
