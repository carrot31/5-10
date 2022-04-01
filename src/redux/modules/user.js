import {createAction, handleActions} from 'redux-actions';
import {produce} from 'immer';

import {setCookie, getCookie, deleteCookie} from '../../shared/Cookie';
// import { set } from 'immer/dist/internal';

//action
const LOG_IN = 'LOG_IN'
const LOG_OUT = 'LOG_OUT'
const GET_USER = 'GET_USER'

//action creators
const logIn = createAction(LOG_IN, (user)=> ({user})); 
const logOut = createAction(LOG_OUT, (user)=> ({user})); 
const getUser = createAction(GET_USER, (user)=> ({user})); 


//initialState 
const initialState = {
    user: null,
    is_login: false,
}

//middlewear actions
const loginAction = (user) =>{
    return function(dispatch, getState, {history}){
        console.log(history);
        dispatch(logIn(user));
        history.push('/');
    }
    
}


//immer; 어떤 A를 A`로 만들어 A`를 변화시킴 알아서 유지. 복사한 값을 막 써도 ok 
//Reducer
export default handleActions({
    [LOG_IN] : (state, action) => produce(state, (draft)=> {
        setCookie( 'is_login', 'success')
        draft.user = action.payload.user; 
        draft.is_login = true;
    }), //state; 원본값을 준다, draft; 복사한 원본값을 가져오는 것  
    [LOG_OUT] : (state, action) => produce(state,(draft)=>{
        deleteCookie('is_login');
        draft.user = null;
        draft.is_login = false;
    }),
    [GET_USER] : (state, action) => produce(state,(draft)=>{}),
    }, 
    initialState
);


//action creator export
const actionCreators = {
    logIn,
    logOut,
    getUser,
    loginAction,
};

export {actionCreators};