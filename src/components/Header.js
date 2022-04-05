import React from "react";
import { Grid, Text, Button } from "../elements";
import { getCookie, deleteCookie } from "../shared/Cookie";
import { useSelector, useDispatch } from "react-redux";
import {actionCreators as userActions} from '../redux/modules/user';
import { history } from "../redux/configureStore";
import { apiKey } from "../shared/firebase";
// import Permit from '../shared/permit'; => 게시물 작성 버튼 시 사용할거다~

const Header = (props) => {
  const is_login = useSelector((state) => state.user.is_login);
  const dispatch = useDispatch();

  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key)? true:false;
  // console.log(is_session)

  if (is_login && is_session) {
    return (
      <React.Fragment>
        <Grid is_flex padding="4px 16px">
          <Grid>
            <Text margin="0px" size="24px" bold>
              HOME
            </Text>
          </Grid>

          <Grid is_flex>
            <Button text="내정보"></Button>
            <Button text="알림" _onClick={()=>{history.push('/noti')}}></Button>
            <Button text="로그아웃" 
            _onClick={()=>{
              dispatch(userActions.logoutFB());
              }}></Button>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Grid is_flex padding="4px 16px">
        <Grid>
          <Text margin="0px" size="24px" bold>
            HOME
          </Text>
        </Grid>

        <Grid is_flex>
          <Button text="로그인" _onClick={()=>{
            history.push('/login')
          }}></Button>
          <Button text="회원가입"_onClick={()=>{
            history.push('/signup')
            console.log('헤어 회원가입 버튼')
          }}></Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Header.defaultProps = {};

export default Header;
