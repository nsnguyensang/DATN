import styled from "styled-components";
import { Button } from "antd";
export const LayoutPredict = styled.div`
  margin: 0 auto;
  max-width: 680px;
  margin-bottom: 16px;
`;

export const TitlePredict = styled.div`
  font-family: "Lexend Medium", Roboto, Arial !important;
  font-size: 20px;
  line-height: 28px;
  font-weight: normal !important;
  letter-spacing: -0.2px;
  color: #2c2c2c;
  display: block;
  margin-bottom: 16px;
`;
export const PredictBox = styled.div`
  border: 1px solid rgb(231 231 231);
  border-radius: 0 4px 4px 4px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  // margin: 0 auto;
  max-width: 450px;
  // padding: 40px;
  position: relative;
  padding-left: 36px;
  padding-top: 20px;
  padding-bottom: 10px;
`;
export const ResultBox = styled.div`
  border: 1px solid rgb(231 231 231);
  border-radius: 0 4px 4px 4px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  // margin: 0 auto;
  max-width: 450px;
  // padding: 40px;
  // position: relative;
  padding: 16px;
  margin-top: 20px;
`;
export const RecommentBox = styled.div`
  border: 1px solid rgb(231 231 231);
  border-radius: 0 4px 4px 4px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  // width: 800px;
  height: 1080px;
  padding: 20px;
  padding-left: 40px;
  padding-right: 0px;
  margin-top: 20px;
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
    background: #1dbabf !important;
    border: 1px solid #1dbabf !important;
  }
`;
