import _ from "lodash";
import React from "react";
import styled from 'styled-components';


const Text = (props) =>{
    
    const {bold, color, size, children, _onClick, margin} = props;
    // console.log(children)
    const styles ={
        bold: bold, 
        color: color, 
        size:size,
        _onClick: _onClick,
        margin: margin
    };

    return(
        <P {...styles} onClick={_onClick}>
            {children}
        </P>
    )
}

Text.defaultProps = {
    children: null,
    bold: false,
    color: 'black',
    size: '14px',
    _onClick: ()=>{},
    margin: false
}

const P = styled.p`
    color: ${(props) => props.color};
    font-size: ${(props) => props.size};
    font-weight: ${(props) => props.bold? '600': '400'};
    font-weight: ${(props) => props.margin? `margin: ${props.margin};`: ''};
`;

export default Text;