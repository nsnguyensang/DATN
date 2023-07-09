import React, { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import DetailRealEaste from "../../Home/components/DetailRealEaste";
import {
  RestCard,
  CardRestImage,
  CardRestInfo,
  CardRestTitle,
  CardRestConfig,
  CardConfigPrice,
  CardConfigArea,
  CardConfigDot,
  CardLocation,
  CardContact,
  PublishedInfo,
} from "./styles";
import { SelectOutlined } from "@ant-design/icons";
import { ButtomView } from "../styles";

const CardSearch = ({ data }) => {
  const [loadingImage, setLoadingImage] = useState(true);
  const [showModalDetail, setShowModalDetail] = useState(false);
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
      <RestCard onClick={() => setShowModalDetail(true)}>
        <CardRestImage>
          <img
            style={{
              width: "100%",
              height: "100%",
              borderTopLeftRadius: "4px",
              borderTopRightRadius: "4px",
              display: loadingImage ? "none" : "block",
            }}
            src={processLinkImage(data.link_image)}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        </CardRestImage>
        <CardRestInfo>
          <CardRestTitle>{data?.title}</CardRestTitle>
          <CardRestConfig>
            <CardConfigPrice>
              {formatNumber(parseInt(data.price))}
            </CardConfigPrice>
            <CardConfigArea>
              <CardConfigDot>.</CardConfigDot>
              {Math.floor(data.square)} m²
            </CardConfigArea>
          </CardRestConfig>
          <CardLocation>
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              style={{ color: "#707070", marginRight: "4px" }}
            />
            {processDistrict(data?.district)}, {data.province}
          </CardLocation>
          <CardContact>
            <PublishedInfo>{data.date}</PublishedInfo>
            <div style={{ float: "right", height: "32px" }}>
              <ButtomView
                type="primary"
                icon={<SelectOutlined />}
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(data.url_page, "_blank");
                }}
              />
            </div>
          </CardContact>
        </CardRestInfo>
      </RestCard>
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

export default CardSearch;
