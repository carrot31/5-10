import React from "react";
import styled from "styled-components";

export const Button = (props) => {
  const { text, _onClick, is_float, children, margin, width, padding, bg, color} = props;

  if (is_float) {
    return (
      <React.Fragment>
        <FloatButton onClick={_onClick}>{text? text : children}</FloatButton>
      </React.Fragment>
    );
  }

  const styles = {
    margin: margin,
    width: width,
    padding: padding,
    bg: bg,
    color: color,
  };

  return (
    <React.Fragment>
      <ElButton {...styles} onClick={_onClick}>{text? text : children}</ElButton>
    </React.Fragment>
  );
};

Button.defaultProps = {
  text: "텍스트",
  _onClick: () => {},
  is_float: false,
  children: null,
  margin: false,
  width: '100%',
  padding: "12px 0px",
  bg: false,
  color: 'white',
  
};

const ElButton = styled.button`
  width: 100%; 
  ${(props) => (props.bg ? `background-color: ${props.bg};` : "")}
  color: ${(props) => props.color};
  padding: 12px 0px;
  box-sizing: border-box;
  border: none;
`;

const FloatButton = styled.button`
  width: 50px;
  height: 50px;
  border:none;
  border-radius: 50%;
  background-color: #AF7AC5   ;
  color: #fff;
  box-sizing: border-box;
  font-size: 36px;
  font-weight: 800;
  position: fixed;
  bottom: 50px;
  right: 16px;
  text-align: center;
  vertical-align: middle;
`;
export default Button;
