import React from "react";
import styled from "styled-components";

const Grid = (props) => {
    
  const { is_flex, width, margin, padding, bg, children, center, _onClick, is_column } = props;
  // console.log(children)

  const styles = {
      is_flex: is_flex,
      is_column: is_column,
      width: width,
      margin: margin,
      padding: padding,
      bg: bg,
      center: center,
      _onClick: _onClick,
  };
  
  return (
    <React.Fragment>
      <GridBox {...styles} onClick={_onClick}>{children}</GridBox>
    </React.Fragment>
  );
};

Grid.defaultProps = {
  chidren: null,
  is_flex: false,
  width: "100%",
  padding: false,
  margin: false,
  bg: false,
  center: false,
  _onClick: () => {},
  is_column: false,
};

const GridBox = styled.div`
  width: ${(props) => props.width};
  height: 100%;
  box-sizing: border-box; //총 넓이에 padding과 border를 포함하는가? //yes
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  ${(props) => (props.bg ? `background-color: ${props.bg};` : "")}
  ${(props) => (props.is_flex? `display: flex; align-items: center; justify-content: space-between; `: "")}
  ${(props) => (props.is_column? `display: flex; flex-direction: column`: "")}
  ${(props) => (props.center? `text-align: center`: "")}
`;

export default Grid;