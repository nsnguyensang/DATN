import styled from "styled-components";

export const BoxElement = styled.div`
  border: 1px solid rgb(231 231 231);
  border-radius: 8px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  max-width: ${(props) => (props.width ? props.width : "450px")};
  height: ${(props) => (props.height ? props.height : "500px")};
  position: relative;
  padding-left: 16px;
  background-color: #ffffff;
  padding-top: 10px;
  padding-bottom: 10px;
`;
export const TitleVisual = styled.div`
  font-family: "Lexend Medium", Roboto, Arial !important;
  font-size: 20px;
  line-height: 28px;
  font-weight: normal !important;
  letter-spacing: -0.2px;
  color: #2c2c2c;
  display: block;
  margin-bottom: 16px;
`;
