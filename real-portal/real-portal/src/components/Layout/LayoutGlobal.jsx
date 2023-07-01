import {
  ContainerOutlined,
  DesktopOutlined,
  PieChartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import RealIcon from "../../assets/image/real-estate.png";
import { Button, Layout, Menu, theme } from "antd";
import { useState } from "react";
const { Header, Sider, Content } = Layout;
const LayoutGlobal = () => {
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Menu
          theme="dark"
          mode="inline"
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
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            height: "50px",
          }}
        >
          <img src={RealIcon} style={{ width: "51px" }} />

          <span style={{ position: "absolute", marginLeft: `${collapsed ? "81%":"72%"}`, marginTop: "-8px" }}>
            Đăng nhập | Đăng kí
          </span>
        </Header>
        <Content
          style={{
            margin: "16px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          Content
        </Content>
      </Layout>
    </Layout>
  );
};
export default LayoutGlobal;
