import React, { Fragment, useEffect, useState } from "react";
import { TitlePage, TitleCountReal, LayoutCenter } from "./style";
import { searchFilterResults } from "../../api/realEasteApi";
import SearchAndFilter from "./components/SearchAndFilter";
import CardRealEaste from "./components/CardRealEaste";
import DetailRealEaste from "./components/DetailRealEaste";
const Home = () => {
  const [total, setTotal] = useState();
  const [data, setData] = useState();
  useEffect(() => {
    const param = {
      title: "",
      province: "",
      project: "",
      bedroom: "",
      page: "500",
      limit: "30",
    };
    const fetchSearch = async () => {
      const results = await searchFilterResults(param);
      setTotal(results.total.toLocaleString());
      setData(results.data);
    };
    fetchSearch();
  }, []);
  return (
    <Fragment>
      <SearchAndFilter />
      <LayoutCenter>
        <TitlePage>Tìm kiếm chung cư trên toàn quốc</TitlePage>
        <TitleCountReal>Hiện có {total} bất động sản.</TitleCountReal>
      </LayoutCenter>
      {data?.map((item, index) => (
        <CardRealEaste data={item} />
      ))}

      {/* <DetailRealEaste /> */}
    </Fragment>
  );
};
export default Home;
