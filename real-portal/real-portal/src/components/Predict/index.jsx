import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { ReloadOutlined } from "@ant-design/icons";
import { predictHouseKNN } from "../../api/realEasteApi";
import { useSearchParams } from "react-router-dom";
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
  notification,
} from "antd";
const { Option } = Select;

const Predict = () => {
  const [form] = Form.useForm();
  const [searchParams, setSearchParams] = useSearchParams();
  //api tỉnh thành, quận huyện
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [pricePredict, setPricePredict] = useState("");
  const [square, setSquare] = useState();
  const [api, contextHolder] = notification.useNotification();
  useEffect(() => {
    callAPI("https://provinces.open-api.vn/api/?depth=1");
  }, []);
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: "Chưa xác định được giá tại vị trí vừa chọn!",
      description:
        'Bộ dữ liệu dùng đào tạo mô hình chưa có thông tin tại vị trí đó. Bạn có thể chọn vị trí khác để xem giá. ',
    });
  };
  const fetchPredictHouse = async (param) => {
    try {
      const results = await predictHouseKNN(param);
      setPricePredict(results.prediction);
    } catch (e) {
      setPricePredict("");
      openNotificationWithIcon("error");
    }
  };
  const callAPI = (api) => {
    axios.get(api).then((response) => {
      setProvinces(response.data);
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
  const onFinish = () => {
    form.validateFields().then((values) => {
      const selectFields = ["province", "district", "ward"]; // Danh sách các trường Select cần xử lý
      const selectedValues = {};
      const selectedLabels = {};

      selectFields.forEach((field) => {
        selectedValues[field] = values[field];
        selectedLabels[field] = getLabelFromValue(values[field], field);
      });
      const result = {};

      for (const key in selectedLabels) {
        if (selectedLabels.hasOwnProperty(key)) {
          result[key] = Array.isArray(selectedLabels[key])
            ? selectedLabels[key]
            : [selectedLabels[key]];
        }
      }
      setSquare(values.square);
      setSearchParams({ ...values, ...result });
      try {
        fetchPredictHouse({ ...values, ...result });
      } catch (e) {}
    });
  };
  const onReset = () => {
    form.resetFields();
    setPricePredict("")
  };
  const getLabelFromValue = (value, options) => {
    console.log("form submit", value, options);
    let selectedOption;
    if (options === "province")
      selectedOption = provinces.find((option) => option.code === value);
    if (options === "district")
      selectedOption = districts.find((option) => option.code === value);
    if (options === "ward")
      selectedOption = wards.find((option) => option.code === value);
    return selectedOption
      ? selectedOption.name
          .replace(/(Tỉnh|Thành phố)\s*/, "")
          .replace(/(Quận|Huyện)\s*/, "")
          .replace(/(Phường|Xã)\s*/, "")
      : "";
  };
  return (
    <Fragment>
      {contextHolder}
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
                    name="square"
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
                    name="bedroom"
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
                    name="floor"
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
                    name="province"
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
                      {provinces.map((city) => (
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
                    name="district"
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
                    name="ward"
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
              {/* <Form.Item
                name="Mô hình dự đoán"
                label="Mô hình dự đoán"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select
                  defaultValue="knn"
                  style={{
                    width: 378,
                  }}
                  // onChange={handleChange}
                  options={[
                    {
                      value: "knn",
                      label: "KNN (K-Nearest Neighbors)",
                    },
                  ]}
                />
              </Form.Item> */}
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
          {pricePredict !== "" && (
            <ResultBox>
              <span style={{ fontSize: "16px" }}>
                Giá dự đoán: {(pricePredict / 1000000000).toFixed(1)} tỷ ~{" "}
                {(pricePredict / (square * 1000000)).toFixed(2)} triệu/m²
              </span>
            </ResultBox>
          )}
          {}
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
