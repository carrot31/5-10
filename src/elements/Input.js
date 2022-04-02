import React from 'react'
import styled from 'styled-components';
import { Text} from './index'

export const Input = (props) => {
    const { label, placeholder, _onChange, type } = props;
    return (
        <React.Fragment>
            <Text margin="0px">{label}</Text>
            <ElInput placeholder={placeholder} onChange={_onChange} type={type}/>
        </React.Fragment>
    )
}

Input.defaultProps = {
    label: '텍스트',
    placeholder: '텍스트를 입력해주세요.',
    _onChange: () => { },
    type: 'text',
}

const ElInput = styled.input`
    border: 1px solid #212121;
    width: 100%;
    padding: 12px 4px;
    box-sizing: border-box;
`;

export default Input;