import React, { Fragment } from "react";
import { TitlePage, TitleCountReal, LayoutCenter } from "./style";
import SearchAndFilter from "./components/SearchAndFilter";
import CardRealEaste from "./components/CardRealEaste";
import DetailRealEaste from "./components/DetailRealEaste";
const Home = () => {
  return (
    <Fragment>
      {/* <SearchAndFilter />
      <LayoutCenter>
        <TitlePage>Tìm kiếm chung cư trên toàn quốc</TitlePage>
        <TitleCountReal>Hiện có 30.037 bất động sản.</TitleCountReal>
      </LayoutCenter>
      <CardRealEaste />
      <CardRealEaste />
      <CardRealEaste /> */}
      <DetailRealEaste />
    </Fragment>
  );
};
export default Home;
