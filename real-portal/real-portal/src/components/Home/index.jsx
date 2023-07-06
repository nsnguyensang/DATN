import React, { Fragment, useEffect, useState } from "react";
import { TitlePage, TitleCountReal, LayoutCenter } from "./style";
import { useLocation } from "react-router-dom";
import { searchFilterResults } from "../../api/realEasteApi";
import SearchAndFilter from "./components/SearchAndFilter";
import { Pagination } from "antd";
import CardRealEaste from "./components/CardRealEaste";
import DetailRealEaste from "./components/DetailRealEaste";
const Home = () => {
  const location = useLocation();
  console.log("loca",location)
  const [total, setTotal] = useState();
  const [data, setData] = useState();
  useEffect(() => {
    console.log("test")
    const searchParams = new URLSearchParams(location.search);
    const searchText = searchParams.get("searchText") || "";
    const param = {
      title: searchText,
      province: "",
      project: "",
      bedroom: "",
      page: "1",
      limit: "50",
    };
    const fetchSearch = async () => {
      const results = await searchFilterResults(param);
      setTotal(results.total.toLocaleString());
      setData(results.data);
    };
    fetchSearch();
  }, [location]);
  const onChange = (pageNumber) => {
    console.log("Page: ", pageNumber);
  };
  return (
    <Fragment>
      <SearchAndFilter />
      <LayoutCenter>
        <TitlePage>Tìm kiếm chung cư trên toàn quốc</TitlePage>
        <TitleCountReal>Tìm thấy {total} bất động sản.</TitleCountReal>
        {/* <Pagination
          total={parseInt(total)}
          showTotal={(total) => (
            <TitleCountReal>Tìm được {total} bất động sản</TitleCountReal>
          )}
          defaultPageSize={100}
          defaultCurrent={1}
        /> */}
      </LayoutCenter>
      {data?.map((item, index) => (
        <CardRealEaste data={item} />
      ))}
      {/* <DetailRealEaste /> */}
    </Fragment>
  );
};
export default Home;
