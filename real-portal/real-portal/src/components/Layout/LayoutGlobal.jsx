import {
  ContainerOutlined,
  DesktopOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import RealIcon from "../../assets/image/real-estate.png";

import { Layout, Menu } from "antd";

const { Header } = Layout;
const LayoutGlobal = () => {
  const location = useLocation();

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
            cursor: "pointer",
          }}
        >
          <Link to="/">
            <img src={RealIcon} style={{ width: "45px" }} />
          </Link>
        </div>
        <Menu
          theme="light"
          mode="horizontal"
          selectedKeys={[location.pathname]}
        >
          <Menu.Item key="/" icon={<DesktopOutlined />}>
            <Link to="/">Trang chủ</Link>
          </Menu.Item>
          <Menu.Item key="/visual" icon={<PieChartOutlined />}>
            <Link to="/visual">Phân tích thống kê</Link>
          </Menu.Item>
          <Menu.Item key="/predict" icon={<ContainerOutlined />}>
            <Link to="/predict">Dự đoán giá</Link>
          </Menu.Item>
        </Menu>
      </Header>
    </Layout>
  );
};
export default LayoutGlobal;
