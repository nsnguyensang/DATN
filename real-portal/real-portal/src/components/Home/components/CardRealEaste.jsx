import React, { Fragment, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faBath } from "@fortawesome/free-solid-svg-icons";
import { Tooltip, Space, Spin } from "antd";
import {
  CardFull,
  CardImage,
  CardInfo,
  CardInfoContent,
  CardTitle,
  MobileOnCard,
  CardConfig,
  CardConfigPrice,
  CardConfigDot,
  CardConfigArea,
  CardConfigPricePerM2,
  CardRoom,
  CardRoomSpan,
  CardLocation,
  CardDescription,
  CardContact,
  CardPublishedInfo,
  CardAvatar,
  ProfileAvatarNoPhoto,
  ProfileName,
  ProfileTimeUpdate,
  ButtonGroup,
  ButtomView,
} from "./style";
import DetailRealEaste from "./DetailRealEaste";
const CardRealEaste = ({ data }) => {
  const [showModalDetail, setShowModalDetail] = useState(false);
  const [loadingImage, setLoadingImage] = useState(true);
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
  const handleImageLoad = () => {
    setLoadingImage(false);
  };
  const processDistrict = (value) => {
    if (!isNaN(value)) {
      return "Quận " + value;
    } else {
      return value;
    }
  };
  const processLinkImage = (link) => {
    let linkProcess;
    linkProcess = link
      .replace("https://batdongsan.so", "")
      .replace("https://alomuabannhadat.vn/", "");
    // console.log(linkProcess);
    return linkProcess;
  };
  const fallbackImage =
    "https://file4.batdongsan.com.vn/resize/1275x717/2023/04/05/20230405163430-2777_wm.jpg";

  const handleImageError = (event) => {
    event.target.src = fallbackImage;
    setLoadingImage(false);
  };
  return (
    <Fragment>
      <CardFull>
        <CardImage>
          {loadingImage && (
            <div
              style={{
                position: "absolute",
                top: "25%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <Spin size="small" />
            </div>
          )}
          <img
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
              display: loadingImage ? "none" : "block",
            }}
            src={processLinkImage(data.link_image)}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        </CardImage>
        <CardInfo>
          <CardInfoContent>
            <CardTitle>
              {data.title}
              {data.phone_contact !== "" && (
                <MobileOnCard>
                  {" "}
                  {Number.isInteger(data.phone_contact)
                    ? "0" + data.phone_contact
                    : data.phone_contact}
                </MobileOnCard>
              )}
            </CardTitle>

            <div>
              <CardConfig>
                <CardConfigPrice>
                  {data.price !== 0 ? formatNumber(parseInt(data.price)): "Thỏa thuận"}
                </CardConfigPrice>
                <CardConfigDot>.</CardConfigDot>
                <CardConfigArea>{Math.floor(data.square)} m²</CardConfigArea>
                <CardConfigDot>.</CardConfigDot>
                <CardConfigPricePerM2>
                  {data.price !== 0 ? pricePerProcess(data) : "Thỏa thuận"} tr/m²
                </CardConfigPricePerM2>
                <CardConfigDot>.</CardConfigDot>
                <CardRoom>
                  <Tooltip
                    placement="bottom"
                    title={`${
                      data?.bedroom !== "0" && data?.bedroom !== "nan"? data?.bedroom : "1"
                    } Phòng ngủ`}
                  >
                    <CardRoomSpan>
                      {data?.bedroom !== "0" && data?.bedroom !== "nan" ? data?.bedroom : "1"}
                    </CardRoomSpan>
                    <FontAwesomeIcon
                      icon={faBed}
                      style={{ color: "#707070" }}
                    />
                  </Tooltip>
                </CardRoom>
                <CardConfigDot>.</CardConfigDot>
                <CardRoom>
                  <Tooltip
                    placement="bottom"
                    title={`${
                      data?.bathroom !== "0" && data?.bathroom !== "nan"? data?.bathroom : "1"
                    } WC`}
                  >
                    <CardRoomSpan>
                      {data?.bathroom !== "0" && data?.bathroom !== "nan" ? data?.bathroom : "1"}
                    </CardRoomSpan>
                    <FontAwesomeIcon
                      icon={faBath}
                      style={{ color: "#707070" }}
                    />
                  </Tooltip>
                </CardRoom>
                <CardConfigDot>.</CardConfigDot>
                <CardLocation>
                  {processDistrict(data?.district)}, {data.province}
                </CardLocation>
              </CardConfig>
            </div>
            <CardDescription>
              {data?.description.slice(0, 200) || data?.content.slice(0, 200)}
              ...
            </CardDescription>
          </CardInfoContent>
          <CardContact>
            <CardPublishedInfo>
              <CardAvatar>
                <ProfileAvatarNoPhoto>
                  {data.name_contact.split(" ").pop().charAt(0)}
                </ProfileAvatarNoPhoto>
              </CardAvatar>
              <ProfileName>&lrm;{data.name_contact}</ProfileName>
              <ProfileTimeUpdate>
                <span>{data.date}</span>
              </ProfileTimeUpdate>
            </CardPublishedInfo>
            <ButtonGroup>
              <Space wrap>
                <ButtomView onClick={() => setShowModalDetail(true)}>
                  Xem thêm
                </ButtomView>
                <ButtomView
                  onClick={() => window.open(data.url_page, "_blank")}
                >
                  Bài viết gốc
                </ButtomView>
              </Space>
            </ButtonGroup>
          </CardContact>
        </CardInfo>
      </CardFull>
      {showModalDetail && (
        <DetailRealEaste
          data={data}
          isOpen={showModalDetail}
          onClose={() => setShowModalDetail(false)}
        />
      )}
    </Fragment>
  );
};

export default CardRealEaste;
