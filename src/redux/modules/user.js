import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";

import { auth } from "../../shared/firebase";
import firebase from "firebase/compat/app";
import { useReducer } from "react";

//병진님 화이팅

//action
// const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";

//action creators
// const logIn = createAction(LOG_IN, (user)=> ({user}));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const setUser = createAction(SET_USER, (user) => ({ user }));

//initialState
const initialState = {
  user: null,
  is_login: false,
};

// const use_initial = {
//   user_name: "mandu",
// };

//middleware actions ; 리덕스 내에서 history를 주기 위한 놈; 로그인 정보가 날라가지 않도록 해준다!
// const loginAction = (user) => {
//   return function (dispatch, getState, { history }) {
//     console.log(history);
//     dispatch(setUser(user));
//     history.push("/");
//   };
// };

const loginFB = (id, pwd) => {
  return function (dispatch, getState, { history }) {
    auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then((res) => { //result 세션 체크 해줘라! 
      auth
        .signInWithEmailAndPassword(id, pwd) //세션 체크 끝난 후 로그인 해줘라! 
        .then((user) => {
          // Signed in
          console.log(user);

          dispatch(
            setUser({
              user_name: user.user.displayName,
              id: id,
              user_profile: "",
              uid: user.user.uid, //고유값을 미리 저장
            })
          );

          history.push("/"); //왜 리덕스에서 쓰나? => 로그인 성공 여부에 따라 경로가 다르기 때문 
          // var user = userCredential.user;
          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    });
  };
};

const signupFB = (id, pwd, user_name) => {
  return function (dispatch, getState, { history }) {
    auth //firebase.js에서 이미 선언 해줌
      .createUserWithEmailAndPassword(id, pwd, user_name)// 가입 
      .then((user) => {
        // Signed in
        // var user = userCredential.user;
        console.log(user);

        auth.currentUser //가입 후 display_name없데이트 하기
          .updateProfile({
            displayName: user_name,
          })
          .then(() => {
            //display name 업데이트 하기
            dispatch(
              setUser({
                user_name: user_name,
                id: id,
                user_profile: "",
                uid: user.user.uid,
              })
            );
            history.push("/"); //업데이트 후 메인페이ㅣ로 이동 
          })
          .catch((error) => {
            console.log(error);
          });
        // ...
      })
      .catch((error) => {
        //오류가 난다면~
        var errorCode = error.code;
        var errorMessage = error.message; //firebase에 자체가입 규직이 있고 규칙을 어기면 회원가입 x
        // ..
        console.log(errorCode, errorMessage);
      });
  };
};

const loginCheckFB = () => {
  return function (dispatch, getState, { history }) {
    auth.onAuthStateChanged((user) => {
      //유저 유무 확인 유저 있니?
      if (user) {
        dispatch(
          setUser({
            user_name: user.displayName, //여긴 왜 한번만 타고 들어가지?? 
            user_profile: "",
            id: user.email,
            uid: user.uid,
          })
        );
      } else {
        dispatch(logOut());
         }
    })
  }
}

const logoutFB = () =>{
    return function (dispatch, getState, {history}){
        auth.signOut().then(()=>{
            dispatch(logOut());
            history.replace('/');   
            //why replace? 더는 머물러서는 안되는 페이지일 경우 뒤로가기 하면 안되므로.
            //replace: 지금 있는 페이지와 괄호 안 페이지랑 바꿔치기.  
        })
    }
}

//immer; 어떤 A를 A`로 만들어 A`를 변화시킴 알아서 유지. 복사한 값을 막 써도 ok
//Reducer
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => { //state; 원본값을 준다(바꿔줄 놈), draft; 원본 복사값(어케 바꿀건가)
        //SET_USER; 유저정보 자체를 넣는것 //로그인해도 회원가입해도 유저정보를 넣어야해서
        // setCookie("is_login", "success");
        draft.user = action.payload.user;
        draft.is_login = true;
      }), 
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        // deleteCookie("is_login");
        draft.user = null;
        draft.is_login = false;
      }),
    [GET_USER]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

//action creator export
const actionCreators = {
  // logIn,
  logOut,
  getUser,
  loginFB,
  signupFB,
  loginCheckFB,
  logoutFB,
};

export { actionCreators };
