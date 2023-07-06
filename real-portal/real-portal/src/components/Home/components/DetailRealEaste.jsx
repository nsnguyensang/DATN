import React from "react";
import { LayoutCenter } from "../style";
import { Carousel } from "antd";
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
} from "./style";
const DetailRealEaste = () => {
  return (
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
              src="https://file4.batdongsan.com.vn/resize/1275x717/2023/04/21/20230421122954-58b5_wm.jpg"
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
        <TitleDetail>
          Tổng hợp bảng hàng quỹ căn bán giá rẻ tại dự án Mipec Rubik 360 Xuân
          Thủy Cầu Giấy
        </TitleDetail>
        <AddressDetail>
          Dự án Mipec Rubik 360, Đường Xuân Thủy, Phường Dịch Vọng Hậu, Cầu
          Giấy, Hà Nội
        </AddressDetail>
        <ShortInfo>
          <ShortInfoItem>
            <ShortInfoTitle>Mức giá</ShortInfoTitle>
            <ShortInfoValue>6,5 tỷ</ShortInfoValue>
            <ShortInfoExt>~58,56 triệu/m²</ShortInfoExt>
          </ShortInfoItem>
          <ShortInfoItem left="64px">
            <ShortInfoTitle>Diện tích</ShortInfoTitle>
            <ShortInfoValue>111 m²</ShortInfoValue>
          </ShortInfoItem>
          <ShortInfoItem left="64px">
            <ShortInfoTitle>Phòng ngủ</ShortInfoTitle>
            <ShortInfoValue>3 PN</ShortInfoValue>
          </ShortInfoItem>
          <div style={{ position: "absolute", right: "0", marginTop: "7px" }}>
            <ButtomView>Bài viết gốc</ButtomView>
          </div>
        </ShortInfo>
        <DescriptionDetail>
          <DescriptionTitle>Thông tin mô tả</DescriptionTitle>
          <DescriptionContent>
            Em Được chuyên bán chuyển nhượng căn hộ tại chung cư dự án Mipec
            Rubik 360 Xuân Thủy - Cầu Giấy! Đảm bảo và cam kết sẽ hỗ trợ tới quý
            Khách Hàng lựa chọn được những căn hộ phù hợp nhất nhằm rút ngắn
            thời gian công sức đi tìm nhà của quý anh chị khách hàng. Bên em sẵn
            pass của tất cả các căn hộ đang bán. Hỗ trợ quý anh chị khách hàng
            xem nhà 24/24. LH 0933 929 ***. Hỗ trợ khách hàng với phương châm:
            Chuyên nghiệp, tận tâm, uy tín. Có xe đưa đón khách hàng đến tham
            quan dự án. Kết nối trực tiếp với chủ nhà để trao đổi và đàm phán
            thương lượng giá tốt nhất tới Qúy Khách. Em cập nhật bảng giá mới
            nhất 02/07/2023: - Căn 2PN + 1VS, diện tích 54m² giá từ 3,3 tỷ. -
            Căn 2PN + 2VS, diện tích 70m² giá từ 4 tỷ. - Căn 2PN + 2VS, diện
            tích 77m² giá từ 3,9 tỷ. - Căn 2PN + 2VS, diện tích 83m² giá từ 4,4
            tỷ. - Căn 3PN + 2VS, diện tích 95m² giá từ 5,3 tỷ. - Căn 3PN + 2VS,
            diện tích 109m² giá từ 6,2 tỷ. - Căn 4PN + 3VS, diện tích 123m² giá
            từ 7,9 tỷ.
          </DescriptionContent>
        </DescriptionDetail>
        <DescriptionDetail>
          <DescriptionTitle>Đặc điểm bất động sản</DescriptionTitle>
          <div>
            <InfoOther>
              <InfoOtherItem>Diện tích</InfoOtherItem>
              <InfoOtherValue>111 m²</InfoOtherValue>
            </InfoOther>
            <InfoOther>
              <InfoOtherItem>Mức giá</InfoOtherItem>
              <InfoOtherValue>6,5 tỷ</InfoOtherValue>
            </InfoOther>
            <InfoOther>
              <InfoOtherItem>Hướng nhà</InfoOtherItem>
              <InfoOtherValue>Bắc</InfoOtherValue>
            </InfoOther>
            <InfoOther>
              <InfoOtherItem>Hướng ban công</InfoOtherItem>
              <InfoOtherValue>Nam</InfoOtherValue>
            </InfoOther>
            <InfoOther>
              <InfoOtherItem>Số phòng ngủ</InfoOtherItem>
              <InfoOtherValue>3 phòng</InfoOtherValue>
            </InfoOther>
            <InfoOther>
              <InfoOtherItem>Số toilet</InfoOtherItem>
              <InfoOtherValue>2 phòng</InfoOtherValue>
            </InfoOther>
            <InfoOther>
              <InfoOtherItem>Pháp lý</InfoOtherItem>
              <InfoOtherValue>Sổ đỏ/Sổ hồng</InfoOtherValue>
            </InfoOther>
            <InfoOther>
              <InfoOtherItem>Dự án</InfoOtherItem>
              <InfoOtherValue>Vinhome Ocean Park</InfoOtherValue>
            </InfoOther>
          </div>
        </DescriptionDetail>
        <DescriptionDetail>
          <DescriptionTitle>Thông tin liên hệ</DescriptionTitle>
          <div>
            <InfoOther>
              <InfoOtherItem>Người đăng</InfoOtherItem>
              <InfoOtherValue>Đặng Được</InfoOtherValue>
            </InfoOther>
            <InfoOther>
              <InfoOtherItem>Số điện thoại</InfoOtherItem>
              <InfoOtherValue>0933 929 555</InfoOtherValue>
            </InfoOther>
            <InfoOther>
              <InfoOtherItem>Ngày đăng</InfoOtherItem>
              <InfoOtherValue>06/07/2023</InfoOtherValue>
            </InfoOther>
            <InfoOther>
              <InfoOtherItem>Email</InfoOtherItem>
              <InfoOtherValue>dangduoc@gmail.com</InfoOtherValue>
            </InfoOther>
          </div>
        </DescriptionDetail>
      </div>
    </LayoutCenter>
  );
};

export default DetailRealEaste;
