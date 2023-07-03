import React, { Fragment } from "react";
import { TitlePage } from "./style";
import SearchAndFilter from "./components/SearchAndFilter";
const Home = () => {
  return (
    <Fragment>
      <SearchAndFilter />
      <TitlePage>Tìm kiếm chung cư trên toàn quốc</TitlePage>
    </Fragment>
  );
};
export default Home;
