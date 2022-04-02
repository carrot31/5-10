import React from "react";

import {Route} from "react-router-dom";
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configureStore';
import PostList from '../pages/PostList';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Header from "../components/Header";
import {Grid, Button} from '../elements';

import { useDispatch } from 'react-redux';
import {actionCreators as userActions} from '../redux/modules/user'; 
import {apiKey} from './firebase';
import Permit from '../shared/permit';


function App() {
  const dispatch = useDispatch();

  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key)? true:false;

  React.useEffect(()=>{ //header보다 시작점에서 하는게 더 깔끔하다~ 
    
    if(is_session){
      dispatch(userActions.loginCheckFB())
    }
  },[]); //빈배열이면 한번만 실행 

  return (
    <React.Fragment>
      {/* <BrowserRouter>
        <Route path="/" exact component={PostList}/>
      </BrowserRouter> */}
      <Grid>
        <Header></Header>
        <ConnectedRouter history={history}>
          <Route path="/" exact component={PostList} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup}/>
        </ConnectedRouter >
      </Grid>
      <Permit>
        <Button is_float text='+'></Button>
      </Permit>
    </React.Fragment>
  );
}

export default App;