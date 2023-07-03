import {
  ContainerOutlined,
  DesktopOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import RealIcon from "../../assets/image/real-estate.png";
import Home from "../Home";
import { Layout, Menu, theme } from "antd";
import { useState } from "react";
const { Header, Content, Footer } = Layout;
const LayoutGlobal = () => {
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout className="layout">
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          background: "white",
        }}
      >
        <div
          style={{
            marginTop: "25px",
            marginRight: "20px",
            marginLeft: "-22px",
          }}
        >
          <img src={RealIcon} style={{ width: "45px" }} />
        </div>
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <DesktopOutlined />,
              label: "Trang chủ",
            },
            {
              key: "2",
              icon: <PieChartOutlined />,
              label: "Phân tích thống kê",
            },
            {
              key: "3",
              icon: <ContainerOutlined />,
              label: "Dự đoán giá",
            },
          ]}
        />
        <span
          style={{
            position: "absolute",
            marginLeft: "89%",
          }}
        >
          Đăng nhập | Đăng kí
        </span>
      </Header>
      <Content
        style={{
          margin: "16px 16px",
          padding: 24,
          minHeight: 900,
          background: colorBgContainer,
        }}
      >
       <Home/>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Ant Design ©2023 Created by Ant UED
      </Footer>
    </Layout>
  );
};
export default LayoutGlobal;
