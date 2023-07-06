import LayoutGlobal from "./components/Layout/LayoutGlobal";
import { Layout, theme } from "antd";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import VisualData from "./components/VisualData";
import Predict from "./components/Predict";
const { Content, Footer } = Layout;
const App = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Router>
      <LayoutGlobal />
      <Layout>
        <Content
          style={{
            margin: "16px 16px",
            padding: 24,
            minHeight: 1000,
            background: colorBgContainer,
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/visual" element={<VisualData />} />
            <Route path="/predict" element={<Predict />} />
          </Routes>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Thông tin chung cư toàn quốc © 2023 SangNV
        </Footer>
      </Layout>
    </Router>
  );
};
export default App;
