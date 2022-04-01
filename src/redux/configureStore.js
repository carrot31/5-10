import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";

import User from './modules/user';

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  user: User,
  router: connectRouter(history), //history가 리덕스와 연결이 됌
});
 
const middlewares = [thunk.withExtraArgument({ history: history })]; //내가 사용할 미들웨어를 다 넣어줘라! //withExtracArgument; 인수를 더 넘겨줄게!

// 지금이 어느 환경인 지 알려줘요. (개발환경, 프로덕션(배포)환경 ...)
const env = process.env.NODE_ENV;

// 개발환경에서는 로거라는 걸 하나만 더 써볼게요. //개발 환경일 때에 require(~를 가져와)로 redux-logger를 가져와라 //if문일때만 가져오게 하려고 사용
if (env === "development") {
  const { logger } = require("redux-logger"); //logger; 콘솔창에서 머가바뀌었는지 보여줌 
  middlewares.push(logger);
}

const composeEnhancers = //환경이 브라우저일때만 돌려줘라!
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        //devtools가 깔려있는가? 깔려 있으면 보여줘라
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middlewares));

let store = (initialStore) => createStore(rootReducer, enhancer);

export default store();
