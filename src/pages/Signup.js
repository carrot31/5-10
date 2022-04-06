import React, { useState } from "react";
import { Grid, Text, Input, Button } from "../elements";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { emailCheck } from "../shared/common";


const Signup = (props) => {
  // console.log(props)
  const dispatch = useDispatch();

  const [id, setId] = React.useState('');
  const [pwd, setPwd] = React.useState('');
  const [user_name, setUserName] = React.useState('');
  const [pwd_check, setPwdCheck] = React.useState('');


  const signup = () => {

    if(id === '' || pwd === '' || user_name === ''){
      return;  
    }
    if(!emailCheck(id)){
      window.alert('이메일 형식이 맞지 않습니다!');
      return;
    }
    if(pwd !== pwd_check){
      return;
    }
    dispatch(userActions.signupFB(id, pwd, user_name))
  }

  return (
    <React.Fragment>
      <Grid padding="16px">
        <Text size="32px" bold>
          회원가입
        </Text>

        <Grid padding="16px 0px">
          <Input
            label="아이디"
            placeholder="아이디를 입력해주세요."
            _onChange={(e) => {
              console.log("!!")
              setId(e.target.value);
            }}
          />
        </Grid>

        <Grid padding="16px 0px">
          <Input
            label="닉네임"
            placeholder="닉네임을 입력해주세요."
            _onChange={(e) => {
              console.log("!!");
              setUserName(e.target.value);
            }}
          />
        </Grid>

        <Grid padding="16px 0p  x">
          <Input
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요."
            _onChange={(e) => {
              console.log("!!");
              setPwd(e.target.value);
            }}
          />
        </Grid>

        <Grid padding="16px 0px">
          <Input
            label="비밀번호 확인"
            placeholder="비밀번호를 다시 입력해주세요."
            _onChange={(e) => {
              console.log("!!");
              setPwdCheck(e.target.value);
            }}
          />
        </Grid>

        <Button bg= '#6A568B' color='black' text="회원가입하기" onClick={signup()}></Button>
      </Grid>
    </React.Fragment>
  );
};

Signup.defaultProps = {};

export default Signup;