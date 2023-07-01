import {
    ContainerOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    DesktopOutlined,
    MenuUnfoldOutlined,
  } from "@ant-design/icons";
  import { Button, Menu } from "antd";
  import { useState } from "react";
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const items = [
    getItem("Trang chủ", "1", <DesktopOutlined />),
    getItem("Phân tích thống kê", "2", <PieChartOutlined />),
    getItem("Dự đoán giá", "3", <ContainerOutlined />),
  ];
  const MenuGlobal = () => {
    const [collapsed, setCollapsed] = useState(true);
    const toggleCollapsed = () => {
      setCollapsed(!collapsed);
    };
    return (
      <div
        style={{
          width: 256,
        }}
      >
        <Button
          type="primary"
          onClick={toggleCollapsed}
          style={{
            marginLeft: "14px",
          }}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        <Menu
          defaultSelectedKeys={["1"]}
          mode="inline"
          theme="light"
          inlineCollapsed={collapsed}
          items={items}
        />
      </div>
    );
  };
  export default MenuGlobal;
  