import React from "react";
import { Button, Grid, Input, Text } from "../elements/index";
import { getCookie, setCookie, deleteCookie } from "../shared/Cookie";


const Login = (props) => {

    console.log(getCookie('user_pwd'));
    // const [id, setId] = React.useState('');
    // const [pwd, setPwd] = React.useState('');

    // const changeId = (e) => {
    //     setId(e.target.value);
    // }

    // const changePwd = (e) => {
    //     setPwd(e.target.value);
    // }

    const login = () => {
        setCookie("user_id", 'perl', 3);
        setCookie("user_pwd", 'pppp', 3);
    }
    return (
        <React.Fragment>
            <Grid padding={16}>
                <Text bold type="heading">로그인</Text>
            </Grid>
            <Grid padding={16}>
                <Input label='아이디'  placeholder="아이디를 입력하세요."/>
                <Input label='비밀번호' type="password" placeholder="비밀번호를 입력하세요."/>
            </Grid>

            <Button text='로그인하기' width='100px' _onClick={() => {console.log('로그인 했어!'); login()}}></Button>
        </React.Fragment>
    )
}

export default Login;