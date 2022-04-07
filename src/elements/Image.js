import styled from 'styled-components';
import React from "react";

const Image = (props) => {
    const {shape, src, size} = props;

    const styles = {
        src: src,
        size: size,
    }

    if(shape === "circle"){
        return (
            <ImageCircle {...styles}></ImageCircle>
        )
    }

    if(shape === "rectangle"){
        return ( 
            <AspectOutter>
                <AspectInner {...styles}></AspectInner>
            </AspectOutter>
        )
    }

    return ( //padding-top 으로 반응형 이미지 비율을 맞추기 위해 외부div에 최대 넓이와 최소 넓이를 설정해준다! 
        <React.Fragment> 
            <ImageDefault {...styles}></ImageDefault>
        </React.Fragment>
    )
}

Image.defaultProps = {
  shape: "circle",
  src: "https://ifh.cc/g/AOA4Wq.jpg",
  size: 36,
};

const ImageCircle = styled.div`
    --size: ${(props) => props.size}px; //여러개 표기할때,
    width: var(--size);
    height: var(--size);
    border-radius: var(--size);

    background-image: url("${(props) => props.src}");
    background-size: cover;
    margin: 8px;
`;

const AspectOutter = styled.div`
    width: 100%;
    min-width: 250px;
`;

const AspectInner = styled.div`
    position: relative;
    padding-top: 100%; //padding (세로/가로*100)% 
    overflow: hidden; 
    background-image: url("${(props) => props.src}");
    background-size: cover;
`;
const ImageDefault = styled.div`
  size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  background-image: url("${(props) => props.src}");
  background-size: cover;
`;



export default Image;