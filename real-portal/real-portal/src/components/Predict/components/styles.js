import styled from "styled-components";

export const RestCard = styled.div`
  width: 270px;
  height: 320px;
  box-sizing: border-box;
  margin-right: 30px;
  margin-bottom: 30px;
  border: 1px solid #f2f2f2;
  box-shadow: 0px 4px 6px 0px rgba(44, 44, 44, 0.04);
  border-radius: 4px;
  background: #fff;
  cursor: pointer;
  float: left;
  &:hover {
    box-shadow: 0px 4px 16px 0px rgba(44,44,44,0.08);
   }
  }
`;
export const CardRestImage = styled.div`
  width: calc(100% + 1px);
  height: calc(100% - 142px - 12px - 16px);
  margin-left: -0.5px;
  margin-top: -0.5px;
  position: relative;
  overflow: initial;
`;
export const CardRestInfo = styled.div`
  position: relative;
  margin: 12px 16px 16px 16px;
`;
export const CardRestTitle = styled.div`
  height: 40px;
  text-align: left;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  overflow: hidden;
  font-family: "Lexend Medium", Roboto, Arial !important;
  font-size: 14px;
  line-height: 20px;
  font-weight: normal !important;
  letter-spacing: -0.2px;
  color: #2c2c2c;
`;
export const CardRestConfig = styled.div`
  margin-top: 4px;
  height: 26px;
  overflow: hidden;
`;
export const CardConfigPrice = styled.span`
  font-family: "Roboto Medium", Roboto, Arial !important;
  font-size: 16px;
  font-weight: normal !important;
  color: #e03c31;
  line-height: 26px;
`;
export const CardConfigArea = styled.span`
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
export const CardLocation = styled.div`
  margin-top: 4px;
  font-family: "Roboto Regular", Roboto, Arial !important;
  font-size: 14px;
  line-height: 20px;
  font-weight: normal !important;
  color: #505050;
  text-align: left;
`;
export const CardContact = styled.div`
  margin-top: 16px;
  height: 32px;
`;
export const PublishedInfo = styled.div`
  float: left;
  height: 32px;
`;
