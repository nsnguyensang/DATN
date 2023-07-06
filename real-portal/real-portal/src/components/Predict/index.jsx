import React, { Fragment } from "react";
import { LayoutPredict, TitlePredict } from "./styles";
import { Button, Form, Input, InputNumber, Select } from "antd";
const { Option } = Select;

const Predict = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log(values);
  };
  const onReset = () => {
    form.resetFields();
  };
  const onGenderChange = (value) => {
    switch (value) {
      case "male":
        form.setFieldsValue({
          note: "Hi, man!",
        });
        break;
      case "female":
        form.setFieldsValue({
          note: "Hi, lady!",
        });
        break;
      case "other":
        form.setFieldsValue({
          note: "Hi there!",
        });
        break;
      default:
    }
  };
  return (
    <Fragment>
      <LayoutPredict>
        <TitlePredict>Dự đoán giá chung cư</TitlePredict>
        <Form
          layout="vertical"
          form={form}
          name="control-hooks"
          onFinish={onFinish}
          style={{
            maxWidth: 600,
          }}
        >
          <Form.Item
            name="Diện tích"
            label="Diện tích"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            name="Số phòng ngủ"
            label="Số phòng ngủ"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            name="Số tầng"
            label="Số tầng"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
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
              placeholder="Select a option and change input text above"
              //   onChange={onGenderChange}
              allowClear
            >
              <Option value="male">Hà Nội</Option>
              <Option value="female">Hồ Chí Minh</Option>
              <Option value="other">Bắc Ninh</Option>
            </Select>
          </Form.Item>
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
              placeholder="Select a option and change input text above"
              //   onChange={onGenderChange}
              allowClear
            >
              <Option value="male">Hà Nội</Option>
              <Option value="female">Hồ Chí Minh</Option>
              <Option value="other">Bắc Ninh</Option>
            </Select>
          </Form.Item>
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
              placeholder="Select a option and change input text above"
              //   onChange={onGenderChange}
              allowClear
            >
              <Option value="male">Hà Nội</Option>
              <Option value="female">Hồ Chí Minh</Option>
              <Option value="other">Bắc Ninh</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Dự đoán
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Đặt lại
            </Button>
          </Form.Item>
        </Form>
      </LayoutPredict>
    </Fragment>
  );
};

export default Predict;
