import React from "react";
import { Button, Grid, Input, Text } from "../elements/index";
import { getCookie, setCookie, deleteCookie } from "../shared/Cookie";
import { useDispatch } from "react-redux";
import {actionCreators as userActions} from '../redux/modules/user'; //as; 별명주는 것 


const Login = (props) => {

    const dispatch = useDispatch();

    // const changeId = (e) => {
    //     setId(e.target.value);
    // }

    // const changePwd = (e) => {
    //     setPwd(e.target.value);
    // }
    const [id, setId] = React.useState('');
    const [pwd, setPwd] = React.useState('');

    const login = () => {
        if(id === '' || pwd === ''){
            window.alert('아이디 또는 비밀번호가 공란입니다.')
            return;
        }

        dispatch(userActions.loginFB(id, pwd));

    }
    return (
        <React.Fragment>
            <Grid padding={16}>
                <Text bold type="heading">로그인</Text>
            </Grid>
            <Grid padding={16}>
                <Input 
                label='아이디'  
                placeholder="아이디를 입력하세요."
                _onChange={(e)=>{
                    console.log('아이디!')
                    setId(e.target.value)
                }}
                />
                <Input 
                label='비밀번호' 
                type="password" 
                placeholder="비밀번호를 입력하세요."
                _onChange={(e)=>{
                    console.log('비밀번호!')
                    setPwd(e.target.value)
                }}
                />
            </Grid>

            <Button text='로그인하기' width='100px' _onClick={() => {console.log('로그인 했어!'); login()}}></Button>
        </React.Fragment>
    )
}

export default Login;