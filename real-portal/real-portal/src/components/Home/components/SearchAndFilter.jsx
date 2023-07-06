import React, { Fragment, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  SearchOutlined,
  ReloadOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Input, Select, Space, Button } from "antd";
import { SearchBox, HomeFilter, ButtomRefresh, TitleBottom } from "./style";

const SearchAndFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleSubmit = () => {
    setSearchParams({ searchText: inputValue });
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
              options={[
                {
                  value: "lucy",
                  label: "Lucy",
                },
              ]}
            />
            <Select
              placeholder="Diện tích"
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
              placeholder="Phòng ngủ"
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
              placeholder="Hướng nhà"
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
            <Button type="primary" icon={<ReloadOutlined />} size="small" />
          </Space>
        </HomeFilter>
      </SearchBox>
    </Fragment>
  );
};
export default SearchAndFilter;
