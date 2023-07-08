import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { ReloadOutlined } from "@ant-design/icons";
import {
  LayoutPredict,
  TitlePredict,
  PredictBox,
  ButtomView,
  ResultBox,
  RecommentBox,
} from "./styles";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Row,
  Col,
  Space,
} from "antd";
const { Option } = Select;

const Predict = () => {
  const [form] = Form.useForm();
  //api tỉnh thành, quận huyện
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
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
  const onFinish = (values) => {
    console.log(values);
  };
  const onReset = () => {
    form.resetFields();
  };

  return (
    <Fragment>
      <Row gutter={24}>
        <Col span={8}>
          <TitlePredict>Dự đoán giá chung cư</TitlePredict>
          <PredictBox>
            <Form
              layout="vertical"
              form={form}
              name="control-hooks"
              onFinish={onFinish}
              style={{
                maxWidth: 500,
              }}
            >
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    name="Diện tích"
                    label="Diện tích"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                    labelCol={{ style: { color: "blue !important" } }}
                  >
                    <InputNumber style={{ width: "160px" }} min={1} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="Số phòng ngủ"
                    label="Số phòng ngủ"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <InputNumber style={{ width: "160px" }} min={1} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    name="Số tầng"
                    label="Số tầng"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <InputNumber style={{ width: "160px" }} min={1} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="Tỉnh/Thành phố"
                    label="Tỉnh/Thành phố"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Select
                      style={{
                        width: 160,
                      }}
                      allowClear
                      value={selectedCity || undefined}
                      onChange={handleCityChange}
                      onClear={() => {
                        setSelectedCity("");
                        setSelectedWard("");
                        setSelectedDistrict("");
                      }}
                    >
                      {cities.map((city) => (
                        <Option key={city.code} value={city.code}>
                          {city.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    name="Quận/Huyện"
                    label="Quận/Huyện"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Select
                      style={{
                        width: 160,
                      }}
                      allowClear
                      value={selectedDistrict || undefined}
                      onChange={handleDistrictChange}
                      onClear={() => {
                        setSelectedDistrict("");
                        setSelectedWard("");
                      }}
                    >
                      {districts.map((district) => (
                        <Option key={district.code} value={district.code}>
                          {district.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="Phường/Xã"
                    label="Phường/Xã"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Select
                      value={selectedWard || undefined}
                      style={{
                        width: 160,
                      }}
                      allowClear
                      onChange={handleWardChange}
                      onClear={() => setSelectedWard("")}
                    >
                      {wards.map((ward) => (
                        <Option key={ward.code} value={ward.code}>
                          {ward.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item>
                <Row gutter={24}>
                  <Col span={20}>
                    <ButtomView type="primary" htmlType="submit">
                      Dự đoán
                    </ButtomView>
                  </Col>
                  <Col span={4}>
                    <ButtomView
                      type="primary"
                      icon={<ReloadOutlined />}
                      size="small"
                      onClick={onReset}
                    />
                  </Col>
                </Row>
              </Form.Item>
            </Form>
          </PredictBox>
          <ResultBox>
            <span style={{ fontSize: "16px" }}>
              Giá dự đoán: 2 tỷ ~ 35 triệu/m²
            </span>
          </ResultBox>
        </Col>
        <Col span={16}>
          <TitlePredict>Bạn có thể quan tâm</TitlePredict>
          <RecommentBox></RecommentBox>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Predict;
