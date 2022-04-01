import {createAction, handleActions} from 'redux-actions';
import {produce} from 'immer';

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


//Reducer
const reducer = handleActions({
    [LOG_IN] : (state, action) => {

    },

}, {})

const reducer = handleActions({
    [LOG_OUT] : (state, action) => {

    },

}, {})

const reducer = handleActions({
    [GET_USER] : (state, action) => {

    },

}, {})