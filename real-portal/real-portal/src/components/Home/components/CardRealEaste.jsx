import React, { Fragment, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faBath } from "@fortawesome/free-solid-svg-icons";
import { Tooltip, Space } from "antd";
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
const CardRealEaste = () => {
  return (
    <CardFull>
      <CardImage>
        <img
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          src="https://file4.batdongsan.com.vn/crop/846x423/2023/06/17/20230617145755-fb62_wm.jpg"
        />
      </CardImage>
      <CardInfo>
        <CardInfoContent>
          <CardTitle>
            Cho con học New York City trong tháng VC em bán căn góc 73m2 giá 2.3
            tỷ full phí
            <MobileOnCard> 0939 720 039</MobileOnCard>
          </CardTitle>

          <div>
            <CardConfig>
              <CardConfigPrice>1,8 tỷ</CardConfigPrice>
              <CardConfigDot>.</CardConfigDot>
              <CardConfigArea>53 m²</CardConfigArea>
              <CardConfigDot>.</CardConfigDot>
              <CardConfigPricePerM2>33,96 tr/m²</CardConfigPricePerM2>
              <CardConfigDot>.</CardConfigDot>
              <CardRoom>
                <Tooltip placement="bottom" title="1 Phòng ngủ">
                  <CardRoomSpan>1</CardRoomSpan>
                  <FontAwesomeIcon icon={faBed} style={{ color: "#707070" }} />
                </Tooltip>
              </CardRoom>
              <CardConfigDot>.</CardConfigDot>
              <CardRoom>
                <Tooltip placement="bottom" title="1 WC">
                  <CardRoomSpan>1</CardRoomSpan>
                  <FontAwesomeIcon icon={faBath} style={{ color: "#707070" }} />
                </Tooltip>
              </CardRoom>
              <CardConfigDot>.</CardConfigDot>
              <CardLocation>Quận 7, Hồ Chí Minh</CardLocation>
            </CardConfig>
          </div>
          <CardDescription>
            Giá bán: Từ 1,8 tỷ/căn 1PN, 1WC 53m². + Giá bán: Từ 2,2 tỷ/căn 2PN
            67m². + Ngân hàng hỗ trợ trong vòng 20 năm với 70% giá trị căn
            hộ.Thông tin căn hộ Q7 Saigon Riverside: + Vị trí: Mặt tiền đường
            Đào Trí, Phường Phú Thuận, Quận 7, TP. HCM. Với vị thế 3 mặt view
            sông, liền kề Phú Mỹ Hưng. Căn hộ Q7 Saigon Riverside được bao bọc
            bởi môi trường trong là...
          </CardDescription>
        </CardInfoContent>
        <CardContact>
          <CardPublishedInfo>
            <CardAvatar>
              <ProfileAvatarNoPhoto>H</ProfileAvatarNoPhoto>
            </CardAvatar>
            <ProfileName>&lrm;Lê Xuân Hữu</ProfileName>
            <ProfileTimeUpdate>
              <span>Đăng hôm qua</span>
            </ProfileTimeUpdate>
          </CardPublishedInfo>
          <ButtonGroup>
            <Space wrap>
              <ButtomView>Xem thêm</ButtomView>
              <ButtomView>Bài viết gốc</ButtomView>
            </Space>
          </ButtonGroup>
        </CardContact>
      </CardInfo>
    </CardFull>
  );
};

export default CardRealEaste;
