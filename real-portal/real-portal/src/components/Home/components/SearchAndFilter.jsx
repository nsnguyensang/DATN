import React, { Fragment, useState, useEffect } from "react";
import { SearchOutlined, ReloadOutlined, HomeOutlined } from "@ant-design/icons";
import { Input, Select, Space, Button } from "antd";
import { SearchBox, HomeFilter, ButtomRefresh, TitleBottom } from "./style";

const SearchAndFilter = () => {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <Fragment>
      <SearchBox>
        <Space wrap>
          <Input style={{ width: "1046px" }} addonBefore={<HomeOutlined />} placeholder="Tìm nhanh. VD: Vinhomes OceanPark" />
          <Button type="primary" icon={<SearchOutlined />}>
            Tìm kiếm
          </Button>
        </Space>
        <HomeFilter>
          <Space wrap>
            <Select
              placeholder="Địa điểm"
              style={{
                width: 220,
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
                width: 220,
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
                width: 220,
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
                width: 220,
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
                width: 220,
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
