import React from "react";
import styled from "styled-components";

const Grid = (props) => {
    
  const { is_flex, width, margin, padding, bg, children } = props;
  // console.log(children)

  const styles = {
      is_flex: is_flex,
      width: width,
      margin: margin,
      padding: padding,
      bg: bg,
  };
  
  return (
    <React.Fragment>
      <GridBox {...styles}>{children}</GridBox>
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
};

const GridBox = styled.div`
  width: ${(props) => props.width};
  height: 100%;
  box-sizing: border-box; //총 넓이에 padding과 border를 포함하는가? //yes
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  ${(props) => (props.bg ? `background-color: ${props.bg};` : "")}
  ${(props) => (props.is_flex? `display: flex; align-items: center; justify-content: space-between; `: "")}
`;

export default Grid;