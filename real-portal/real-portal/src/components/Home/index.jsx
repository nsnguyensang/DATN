import React, { Fragment, useEffect, useState } from "react";
import { TitlePage, TitleCountReal, LayoutCenter } from "./style";
import { useLocation } from "react-router-dom";
import { searchFilterResults } from "../../api/realEasteApi";
import SearchAndFilter from "./components/SearchAndFilter";
import { Spin, Pagination } from "antd";
import CardRealEaste from "./components/CardRealEaste";
import DetailRealEaste from "./components/DetailRealEaste";
const Home = () => {
  const location = useLocation();
  const [total, setTotal] = useState();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const pageSize = 50; // Số lượng bản ghi trên mỗi trang

  // Xử lý sự kiện khi người dùng thay đổi trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    setLoading(true);
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
      page: currentPage,
      limit: "50",
    };
    const fetchSearch = async () => {
      const results = await searchFilterResults(param);
      setTotalRecords(results.total);
      console.log("total", results.total);
      setTotal(results.total.toLocaleString());
      setData(results.data);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    };
    fetchSearch();
  }, [location, currentPage]);
  const onChange = (pageNumber) => {
    console.log("Page: ", pageNumber);
  };

  return (
    <Fragment>
      <SearchAndFilter />
      <LayoutCenter>
        <TitlePage>Tìm kiếm chung cư trên toàn quốc</TitlePage>
        <div style={{ marginBottom: "10px" }}>
          <Pagination
            current={currentPage}
            total={totalRecords}
            pageSize={pageSize}
            onChange={handlePageChange}
            showSizeChanger={false}
            showTotal={() => (
              <TitleCountReal>
                Đang xem{" "}
                {currentPage * 50 < totalRecords
                  ? currentPage * 50
                  : totalRecords}
                /{total} bất động sản
              </TitleCountReal>
            )} // Hiển thị tổng số bản ghi
          />
        </div>
        {/* {!loading && (
          <TitleCountReal>Tìm thấy {total} bất động sản.</TitleCountReal>
        )} */}
      </LayoutCenter>
      {loading && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "300px",
          }}
        >
          <Spin size="large" tip="Loading..." />
        </div>
      )}
      {!!!loading && data?.map((item, index) => <CardRealEaste data={item} />)}
      {/* <DetailRealEaste /> */}
    </Fragment>
  );
};
export default Home;
