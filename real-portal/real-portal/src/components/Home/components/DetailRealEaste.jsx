import React from "react";
import { LayoutCenter } from "../style";
import { Carousel, Drawer, Tabs } from "antd";
import ReactJson from "react-json-view";
import {
  AddressDetail,
  ImageCarousel,
  ShortInfo,
  ShortInfoExt,
  ShortInfoItem,
  ShortInfoTitle,
  ShortInfoValue,
  TitleDetail,
  ButtomView,
  DescriptionDetail,
  DescriptionTitle,
  DescriptionContent,
  InfoOther,
  InfoOtherItem,
  InfoOtherValue,
  DrawerDetail,
} from "./style";

const { TabPane } = Tabs;
const DetailRealEaste = ({ data, isOpen, onClose }) => {
  const pricePerProcess = (idx) => {
    let pricePer = (idx?.price / (parseInt(idx?.square) * 1000000)).toFixed(2);
    if (pricePer > 1000000) {
      pricePer = (pricePer / 1000000).toFixed(2);
    }
    return pricePer;
  };
  function formatNumber(number) {
    if (number >= 1000000000000000) {
      return number / 1000000000000000 + " tỷ";
    } else if (number >= 1000000000) {
      return (number / 1000000000).toFixed(2) + " tỷ";
    } else if (number >= 1000000) {
      return (number / 1000000).toFixed(2) + " triệu";
    }
    return number.toString();
  }
  const fallbackImage =
    "https://file4.batdongsan.com.vn/resize/1275x717/2023/04/05/20230405163430-2777_wm.jpg";

  const handleImageError = (event) => {
    event.target.src = fallbackImage;
  };
  return (
    <DrawerDetail
      title="Thông tin chi tiết"
      placement="right"
      onClose={onClose}
      open={isOpen}
      width={800}
      className="drawer-detail-easte"
    >
      <Tabs defaultActiveKey="1" style={{ marginTop: "-20px !important" }}>
        <TabPane tab="Chi tiết" key="1">
          <LayoutCenter>
            <Carousel autoplay>
              <div>
                <ImageCarousel>
                  <img
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                    }}
                    src={data.link_image}
                    onError={handleImageError}
                  />
                </ImageCarousel>
              </div>
              <div>
                <ImageCarousel>2</ImageCarousel>
              </div>
              <div>
                <ImageCarousel>3</ImageCarousel>
              </div>
            </Carousel>
            <div className="web-detail">
              <TitleDetail>{data.title}</TitleDetail>
              <AddressDetail>
                Dự án Mipec Rubik 360, Đường Xuân Thủy, Phường Dịch Vọng Hậu,
                Cầu Giấy, Hà Nội
              </AddressDetail>
              <ShortInfo>
                <ShortInfoItem>
                  <ShortInfoTitle>Mức giá</ShortInfoTitle>
                  <ShortInfoValue>
                    {formatNumber(parseInt(data.price))}
                  </ShortInfoValue>
                  <ShortInfoExt>
                    ~ {pricePerProcess(data)} triệu/m²
                  </ShortInfoExt>
                </ShortInfoItem>
                <ShortInfoItem left="64px">
                  <ShortInfoTitle>Diện tích</ShortInfoTitle>
                  <ShortInfoValue>{Math.floor(data.square)} m²</ShortInfoValue>
                </ShortInfoItem>
                <ShortInfoItem left="64px">
                  <ShortInfoTitle>Phòng ngủ</ShortInfoTitle>
                  <ShortInfoValue>
                    {data?.bedroom !== "0" ? data?.bedroom : "1"} PN
                  </ShortInfoValue>
                </ShortInfoItem>
                <div
                  style={{
                    position: "absolute",
                    right: "0",
                    marginTop: "7px",
                  }}
                >
                  <ButtomView
                    onClick={() => window.open(data.url_page, "_blank")}
                  >
                    Bài viết gốc
                  </ButtomView>
                </div>
              </ShortInfo>
              <DescriptionDetail>
                <DescriptionTitle>Thông tin mô tả</DescriptionTitle>
                <DescriptionContent>{data.description}</DescriptionContent>
              </DescriptionDetail>
              <DescriptionDetail>
                <DescriptionTitle>Đặc điểm bất động sản</DescriptionTitle>
                <div>
                  <InfoOther>
                    <InfoOtherItem>Diện tích</InfoOtherItem>
                    <InfoOtherValue>
                      {Math.floor(data.square)} m²
                    </InfoOtherValue>
                  </InfoOther>
                  <InfoOther>
                    <InfoOtherItem>Mức giá</InfoOtherItem>
                    <InfoOtherValue>{pricePerProcess(data)} tỷ</InfoOtherValue>
                  </InfoOther>
                  <InfoOther>
                    <InfoOtherItem>Chiều rộng</InfoOtherItem>
                    <InfoOtherValue>
                      {data?.width !== "0" ? data?.width : "Không xác định"}
                    </InfoOtherValue>
                  </InfoOther>
                  <InfoOther>
                    <InfoOtherItem>Chiều dài</InfoOtherItem>
                    <InfoOtherValue>
                      {data?.length !== "0" ? data?.length : "Không xác định"}
                    </InfoOtherValue>
                  </InfoOther>
                  <InfoOther>
                    <InfoOtherItem>Hướng nhà</InfoOtherItem>
                    <InfoOtherValue>
                      {data?.direct !== "None"
                        ? data?.direct
                        : "Không xác định"}
                    </InfoOtherValue>
                  </InfoOther>
                  <InfoOther>
                    <InfoOtherItem>Số tầng</InfoOtherItem>
                    <InfoOtherValue>
                      {data?.floor !== "0 t"
                        ? data?.floor.replace(" t", "")
                        : "Không xác định"}
                    </InfoOtherValue>
                  </InfoOther>
                  <InfoOther>
                    <InfoOtherItem>Số phòng ngủ</InfoOtherItem>
                    <InfoOtherValue>
                      {data?.bedroom !== "0" ? data?.bedroom : "1"} phòng
                    </InfoOtherValue>
                  </InfoOther>
                  <InfoOther>
                    <InfoOtherItem>Số toilet</InfoOtherItem>
                    <InfoOtherValue>
                      {data?.bathroom !== "0" ? data?.bathroom : "1"} phòng
                    </InfoOtherValue>
                  </InfoOther>
                  <InfoOther>
                    <InfoOtherItem>Pháp lý</InfoOtherItem>
                    <InfoOtherValue>{data?.juridical}</InfoOtherValue>
                  </InfoOther>
                  <InfoOther>
                    <InfoOtherItem>Dự án</InfoOtherItem>
                    <InfoOtherValue>
                      {data?.project ? data?.project : "Không xác định"}
                    </InfoOtherValue>
                  </InfoOther>
                </div>
              </DescriptionDetail>
              <DescriptionDetail>
                <DescriptionTitle>Thông tin liên hệ</DescriptionTitle>
                <div>
                  <InfoOther>
                    <InfoOtherItem>Người đăng</InfoOtherItem>
                    <InfoOtherValue>{data.name_contact}</InfoOtherValue>
                  </InfoOther>
                  <InfoOther>
                    <InfoOtherItem>Số điện thoại</InfoOtherItem>
                    <InfoOtherValue>{data.phone_contact}</InfoOtherValue>
                  </InfoOther>
                  <InfoOther>
                    <InfoOtherItem>Ngày đăng</InfoOtherItem>
                    <InfoOtherValue>{data.date}</InfoOtherValue>
                  </InfoOther>
                  <InfoOther>
                    <InfoOtherItem>Email</InfoOtherItem>
                    <InfoOtherValue>
                      {data?.email ? data?.email : "Không xác định "}
                    </InfoOtherValue>
                  </InfoOther>
                </div>
              </DescriptionDetail>
            </div>
            <ReactJson src={data} />
          </LayoutCenter>
        </TabPane>
        <TabPane tab="Json" key="2">
          <ReactJson src={data} />
        </TabPane>
      </Tabs>
    </DrawerDetail>
  );
};

export default DetailRealEaste;
