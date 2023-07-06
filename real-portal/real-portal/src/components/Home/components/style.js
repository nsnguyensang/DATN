import styled from "styled-components";
import { Button } from "antd";

export const SearchBox = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 0 4px 4px 4px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  margin: 0 auto;
  max-width: 1200px;
  padding: 16px;
  position: relative;
`;

export const HomeFilter = styled.div`
  margin-top: 8px;
  display: flex;
`;
export const LayoutCenter = styled.div`
  position: relative;
  margin: 0 auto;
  max-width: 760px;
`;

export const CardFull = styled.div`
  position: relative;
  // width: 400px;
  // min-width: 666px;
  border-radius: 4px;
  border: 1px solid #f2f2f2;
  box-sizing: border-box;
  box-shadow: 0px 4px 6px 0px rgba(44, 44, 44, 0.04);
  margin: 0 auto;
  max-width: 680px;
  margin-bottom: 16px;
`;
export const CardImage = styled.div`
  width: calc(100% + 1px);
  height: 233px;
  margin-left: -0.5px;
  margin-right: -0.5px;
  float: none;
  border-radius: 4px 4px 0 0;
`;

export const CardInfo = styled.div`
  width: 100%;
  float: none;
  display: block;
  box-sizing: border-box;
`;

export const CardInfoContent = styled.div`
  padding: 16px;
  height: 100%;
  position: relative;
  display: block;
`;
export const CardTitle = styled.span`
  font-family: "Lexend Medium", Roboto, Arial !important;
  font-size: 14px;
  line-height: 20px;
  font-weight: normal !important;
  letter-spacing: -0.2px;
  color: #2c2c2c;
  text-transform: uppercase;
`;
export const MobileOnCard = styled.span`
  font-family: "Lexend Medium", Roboto, Arial !important;
  font-size: 14px;
  line-height: 20px;
  font-weight: normal !important;
  letter-spacing: -0.2px;
  color: #2c2c2c;
`;
export const CardConfig = styled.div`
  margin-top: 8px;
  line-height: 26px;
`;

export const CardConfigPrice = styled.span`
  font-family: "Roboto Medium", Roboto, Arial !important;
  font-size: 16px;
  font-weight: normal !important;
  color: #e03c31;
  line-height: 26px;
`;

export const CardConfigDot = styled.span`
  font-family: "Roboto Regular", Roboto, Arial !important;
  font-size: 14px;
  font-weight: normal !important;
  color: #999;
  margin: 0 8px;
  line-height: 26px;
`;
export const CardConfigArea = styled.span`
  font-family: "Roboto Medium", Roboto, Arial !important;
  font-size: 16px;
  font-weight: normal !important;
  color: #e03c31;
  line-height: 26px;
`;

export const CardConfigPricePerM2 = styled.span`
  font-family: "Roboto Regular", Roboto, Arial !important;
  font-size: 14px;
  font-weight: normal !important;
  color: #505050;
  line-height: 26px;
`;

export const CardRoom = styled.span`
  color: #505050;
`;

export const CardRoomSpan = styled.span`
font-family: "Roboto Regular",Roboto,Arial !important;
font-size: 14px;
font-weight: normal !important;
line-height: 26px;
margin-right: 5px;
}
`;
export const CardLocation = styled.span`
  font-family: "Roboto Regular", Roboto, Arial !important;
  font-size: 14px;
  font-weight: normal !important;
  line-height: 26px;
  color: #505050;
`;
export const CardDescription = styled.div`
  margin-top: 8px;
  clear: left;
  font-family: "Roboto Regular", Roboto, Arial !important;
  font-size: 14px;
  line-height: 20px;
  font-weight: normal !important;
  color: #505050;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden !important;
  -webkit-line-clamp: 2;
`;
export const CardContact = styled.div`
  display: flex;
  position: relative;
  border-top: 1px solid #f2f2f2;
  width: 100%;
  padding: 16px;
  bottom: 0px;
  right: 0px;
`;
export const CardPublishedInfo = styled.div`
  height: 32px;
  width: calc(100% - 200px - 12px);
`;
export const CardAvatar = styled.div`
  width: 32px;
  height: 32px;
  float: left;
  position: relative;
  margin-right: 12px;
`;
export const ProfileAvatarNoPhoto = styled.div`
  font-family: "Roboto Medium", Roboto, Arial !important;
  font-size: 18px;
  font-weight: normal !important;
  width: 32px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  color: #74150f;
  background-color: #ffeceb;
  border-radius: 50%;
  box-sizing: content-box;
  text-transform: uppercase;
`;
export const ProfileName = styled.div`
  float: left;
  max-width: calc(100% - 44px);
  height: 16px;
  overflow-x: hidden;
  text-overflow: ellipsis;
  direction: rtl;
  font-family: "Roboto Medium", Roboto, Arial !important;
  font-size: 12px;
  line-height: 16px;
  font-weight: normal !important;
  color: #2c2c2c;
  text-align: left;
  white-space: nowrap;
  direction: initial;
`;
export const ProfileTimeUpdate = styled.div`
  float: left;
  width: calc(100% - 44px);
  font-family: "Roboto Regular", Roboto, Arial !important;
  font-size: 12px;
  line-height: 16px;
  font-weight: normal !important;
  color: #999;
`;
export const ButtonGroup = styled.div`
  float: right;
  height: 32px;
`;

export const ButtomView = styled(Button)`
  color: #fff;
  background: #009ba1;
  border: 1px solid #009ba1;
  font-family: "Lexend Medium", Roboto, Arial !important;
  font-size: 14px;
  font-weight: normal !important;
  letter-spacing: -0.2px;
  border-radius: 4px;
  &:hover {
    color: #fff !important;
    background: #1dbabf;
    border: 1px solid #1dbabf !important;
  }
`;
export const ImageCarousel = styled.div`
  height: 340px;
  color: #fff;
  line-height: 340px;
  text-align: center;
  background: #0000004d;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`;
export const TitleDetail = styled.h1`
  font-family: "Lexend Medium", Roboto, Arial !important;
  font-size: 24px;
  line-height: 32px;
  font-weight: normal !important;
  letter-spacing: -0.2px;
  color: #2c2c2c;
  display: block;
`;

export const AddressDetail = styled.span`
  font-family: "Roboto Regular", Roboto, Arial !important;
  font-size: 14px;
  line-height: 20px;
  font-weight: normal !important;
  color: #2c2c2c;
  display: block;
  margin-top: 8px;
`;
export const ShortInfo = styled.div`
  display: flex;
  border-top: 1px solid #f2f2f2;
  border-bottom: 1px solid #f2f2f2;
  padding: 15px 0px;
  box-sizing: border-box;
  margin: 16px 0px;
`;

export const ShortInfoItem = styled.div`
  padding-left: ${(props) => (props.left ? props.left : "0px")};
`;

export const ShortInfoTitle = styled.span`
  font-family: "Roboto Regular", Roboto, Arial !important;
  font-size: 14px;
  line-height: 20px;
  font-weight: normal !important;
  color: #999;
  display: block;
`;

export const ShortInfoValue = styled.span`
  font-family: "Roboto Medium", Roboto, Arial !important;
  font-size: 18px;
  line-height: 28px;
  font-weight: normal !important;
  color: #2c2c2c;
  margin-top: 4px;
  display: block;
`;

export const ShortInfoExt = styled.span`
  font-family: "Roboto Regular", Roboto, Arial !important;
  font-size: 12px;
  line-height: 16px;
  font-weight: normal !important;
  color: #505050;
  display: block;
`;
export const DescriptionDetail = styled.div`
  overflow: hidden;
  margin-top: 40px;
`;
export const DescriptionTitle = styled.span`
  margin-bottom: 16px;
  font-family: "Lexend Medium", Roboto, Arial !important;
  font-size: 18px;
  line-height: 28px;
  font-weight: 550 !important;
  letter-spacing: -0.2px;
  color: #2c2c2c;
  display: block;
`;

export const DescriptionContent = styled.div`
  font-family: "Roboto Regular", Roboto, Arial !important;
  font-size: 14px;
  line-height: 24px;
  font-weight: normal !important;
`;
export const InfoOther = styled.div`
  border-top: 1px solid #f2f2f2;
  margin-right: 30px;
  border-bottom: 1px solid #f2f2f2;
  width: 310px;
  float: left;
`;
export const InfoOtherItem = styled.div`
  float: left;
  margin-top: 10px;
  margin-left: 16px;
  width: 128px;
  font-family: "Roboto Medium", Roboto, Arial !important;
  font-size: 14px;
  line-height: 24px;
  font-weight: normal !important;
  color: #2c2c2c;
`;
export const InfoOtherValue = styled.div`
  float: left;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 16px;
  width: calc(100% - 24px - 16px - 128px - 16px);
  font-family: "Roboto Regular", Roboto, Arial !important;
  font-size: 14px;
  line-height: 24px;
  font-weight: normal !important;
  color: #2c2c2c;
`;
