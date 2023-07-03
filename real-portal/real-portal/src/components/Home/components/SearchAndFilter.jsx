import React, { Fragment, useState, useEffect } from "react";
import { SearchOutlined } from '@ant-design/icons';
import { Input, Select, Space } from "antd";
import { SearchBox, HomeFilter } from "./style";

const SearchAndFilter = () => {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <Fragment>
      <SearchBox>
        <Input addonBefore={<SearchOutlined />}/>
        <HomeFilter>
          <Space wrap>
            <Select
              placeholder="Địa điểm"
              style={{
                width: 200,
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
                width: 200,
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
                width: 200,
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
                width: 200,
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
                width: 200,
              }}
              allowClear
              options={[
                {
                  value: "lucy",
                  label: "Lucy",
                },
              ]}
            />
          </Space>
        </HomeFilter>
      </SearchBox>
    </Fragment>
  );
};
export default SearchAndFilter;
