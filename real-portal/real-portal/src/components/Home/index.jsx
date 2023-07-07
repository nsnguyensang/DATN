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
  const [total, setTotal] = useState();
  const [data, setData] = useState();
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchText = searchParams.get("searchText") || "";
    const searchPrice = searchParams.get("searchPrice") || "";
    const searchBedroom = searchParams.get("searchBedroom") || "";
    const searchDirection = searchParams.get("searchDirection") || "";
    const searchSquare = searchParams.get("searchSquare") || "";
    const searchProvince = searchParams.get("searchProvince") || "";
    const searchDistrict = searchParams.get("searchDistrict") || "";
    const searchWard = searchParams.get("searchWard") || "";
    let minPrice;
    let maxPrice;
    let minSquare;
    let maxSquare;
    let province;
    let district;
    let ward;
    if (searchPrice !== "") {
      minPrice = parseFloat(searchPrice.split("-")[0]) * 1000000000;
      maxPrice = parseInt(searchPrice.split("-")[1]) * 1000000000;
    }
    if (searchSquare !== "") {
      minSquare = parseInt(searchSquare.split("-")[0]);
      maxSquare = parseInt(searchSquare.split("-")[1]);
    }
    if (searchProvince !== "") {
      province = searchProvince.replace(/(Tỉnh|Thành phố)\s*/, "");
    }
    if (searchDistrict !== "") {
      district = searchDistrict.replace(/(Quận|Huyện|Thành phố)\s*/, "");
    }
    if (searchWard !== "") {
      ward = searchWard.replace(/(Xã|Phường)\s*/, "");
    }
    const param = {
      title: searchText,
      min_price: minPrice,
      max_price: maxPrice,
      min_square: minSquare,
      max_square: maxSquare,
      direct: searchDirection,
      district: district,
      province: province,
      ward: ward,
      project: "",
      bedroom: searchBedroom,
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
