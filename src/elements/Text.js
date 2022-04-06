import _ from "lodash";
import React from "react";
import styled from 'styled-components';


const Text = (props) =>{
    
    const {bold, color, size, children, _onClick} = props;
    // console.log(children)
    const styles ={
        bold: bold, 
        color: color, 
        size:size,
        _onClick: _onClick
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
    _onClick: ()=>{}
}

const P = styled.p`
    color: ${(props) => props.color};
    font-size: ${(props) => props.size};
    font-weight: ${(props) => props.bold? '600': '400'};
`;

export default Text;