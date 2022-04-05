import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore } from "../../shared/firebase";
import moment from "moment";
import { actionCreators as imageActions } from "./image";
import { storage } from "../../shared/firebase";

//Action
const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const LOADING = "LOADING";

//Action creator   
const setPost = createAction(SET_POST, (post_list, paging) => ({ post_list, paging }));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const editPost = createAction(EDIT_POST, (post_id, post) => ({post_id,  post,}));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

//initialStatef
const initialState = {
  //리덕스가 사용할 initialState
  list: [], //post_list가 아닌 이유? 이미 state.post.list로 가져올 거기 때문에 post는 생략!
  paging: { start: null, next: null, size: 2 }, //size: 몇 개 가져올거니?
  is_loading: false, //지금 로딩 중이니?(가지고 오는 중이니?)
};

const initialPost = {
  //게시글 하나당 기본적으로 들어갈 내용
  img_url: "https://ifh.cc/g/AOA4Wq.jpg",
  contents: "",
  insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"), //알아서 이러한 형식으로 보여줌
  comment_cnt: 0,
};

//Middleware

const getPostFB = (start = null, size = 2) => {
  return function (dispatch, getState, { history }) {


    let _paging = getState().post.paging; //모든 페이징 데이터

    if(_paging.start && !_paging.next){//만약 페이징에서 start는 있지만 next값이 없다면 아래 실행하지 말고 바로 return해! 
      return;
    } 

    dispatch(loading(true)); 
    
    const postDB = firestore.collection("post");

    let query = postDB.orderBy("insert_dt", "desc"); //시간 순서대로 최대 2개까지 가져오기! //다음걸 가져오는지 판별하기 위해 사이즈 + 1 

    //첫 번째로 뭔가 가지고 온다면 시작점 정보 x => 시작점 정보를 정해주고 싶을 땐?
    if(start){ //스타트 정보가 있다면?
      query = query.startAt(start) //쿼리에 넣어주자! 
    }


    query
    .limit(size + 1)
    .get()
    .then((docs) => {
      let post_list = []; //setPost로 넘길때 리스트로 넘어가므로 배열로 만들어주자!

      let paging = { //next로 넘겨줄 것을 적어주자 => paging 정보 새로 구성
        start: docs.docs[0], //맨 처음엔 도큐먼트들 안에서 제일 첫 번째걸 가져올거야
        next: docs.docs.length === size + 1? docs.docs[docs.docs.length - 1] : null, //요청하는 개수만큼 가져온다면 size - 1 : 적다면 null(담거 없음)
        size: size,
      } //=> 푸시 해주자! 

       //post들의 키 값을 배열로 만들어줌 ex) {'comment_cnt','contents'...} => 내장함수 사용가능
      docs.forEach((doc) => {
        let _post = doc.data(); //모든 데이터 값

        let post = Object.keys(_post).reduce( //모든 데이터의 키 값 
          (acc, cur) => { //acc: 누적 키 값, cur: 현재 키 값
            if (cur.indexOf("user_") !== -1) { //!== -1: 포함이 된다면 즉, user_가 포함된다면 
              return {
                ...acc, //누적된 딕셔너리
                user_info: { ...acc.user_info, [cur]: _post[cur] }, //user_info 로 묶어주자! [cur] ;변수이기 때문데 []로 감싸줌!!!! 변수안에 담긴 키값 
              };
            }

            return { ...acc, [cur]: _post[cur] }; 
          },
          { id: doc.id, user_info: {} } //초기값으로 현재 데이터에 없는 id값과 user_info 값 추가해주기!
        ); 
        post_list.push(post);
      });

      post_list.pop() //마지막 애는 지워주자!(무한스크롤) 

      dispatch(setPost(post_list, paging)); 
    });
        // let post = {
        //   //원하는 객체로 모양을 만들고
        //   id: doc.id,
        //   user_info: {
        //     user_name: _post.user_name,
        //     user_profile: _post.user_profile,
        //     user_id: _post.user_id,
        //   },
        //   contents: _post.contents,
        //   image_url: _post.image_url,
        //   comment_cnt: _post.comment_cnt,
        //   imsert_dt: _post.insert_dt,
        // };

        // post_list.push(post); //배열화 시켜서
  };
};

const addPostFB = (contents = "") => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection("post");
    const _user = getState().user.user; //유저정보 가져오기

    const user_info = {
      user_name: _user.user_name,
      user_id: _user.uid,
      user_profile: _user.user_profile,
    };

    const _post = {
      ...initialPost,
      contents: contents,
      insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"), //왜 또 넣니? => 만들어지는 시점이 필요해서
    };
    // console.log({...user_info, ..._post}); //데이터 들어오나 확인해보자!
    const _image = getState().image.preview;
    console.log(getState()); //이미지 프리뷰 가져오기 (string)
    // return;

    //이미지 업로드하기//자신의 uid로 업로드 하기 때문에 겹치지 x
    const _upload = storage
      .ref(`images/${user_info.user_id}_${new Date().getTime()}`)
      .putString(_image, "data_url");

    _upload.then((snapshot) => {
      snapshot.ref
        .getDownloadURL()
        .then((url) => {
          console.log(url);

          return url;
        })
        .then((url) => {
          postDB
            .add({ ...user_info, ..._post, image_url: url })
            .then((doc) => {
              //doc; 추가된 정보
              let post = { user_info, ..._post, id: doc.id, image_url: url }; //형식 맞춰주기
              dispatch(addPost(post));
              history.replace("/");

              dispatch(imageActions.setPreview(null)); //리덕스에 넣어둔 상태값(preview)를 null로 바꿔주자
            })
            .catch((err) => {
              window.alert("앗! 포스트 작성에 문제가 있어요!");
              console.log("post 작성에 실패했습니다.", err);
            });
        })
        .catch((err) => {
          window.alert("앗! 이미지 업로드에 문제가 있어요!");
          console.log("앗! 이미지 업로드에 문제가 있어요!", err);
        });
    });
  };
};

const editPostFB = (post_id = null, post = {}) => {
  return function (dispatch, getState, { history }) {
    if (!post_id) {
      console.log("게시물 정보가 없어요!");
      return;
    }

    const _image = getState().image.preview;

    const _post_idx = getState().post.list.findIndex((p) => p.id === post_id);
    const _post = getState().post.list[_post_idx];

    console.log(_post);

    const postDB = firestore.collection("post");

    if (_image === _post.image_url) {
      postDB
        .doc(post_id)
        .update(post)
        .then((doc) => {
          dispatch(editPost(post_id, { ...post }));
          history.replace("/");
        });

      return;
    } else {
      const user_id = getState().user.user.uid;
      const _upload = storage
        .ref(`images/${user_id}_${new Date().getTime()}`)
        .putString(_image, "data_url");

      _upload.then((snapshot) => {
        snapshot.ref
          .getDownloadURL()
          .then((url) => {
            console.log(url);

            return url;
          })
          .then((url) => {
            postDB
              .doc(post_id)
              .update({ ...post, image_url: url })
              .then((doc) => {
                dispatch(editPost(post_id, { ...post, image_url: url }));
                history.replace("/");
              });
          })
          .catch((err) => {
            window.alert("앗! 이미지 업로드에 문제가 있어요!");
            console.log("앗! 이미지 업로드에 문제가 있어요!", err);
          });
      });
    }
  };
};

//Reducer
export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(...action.payload.post_list); //원래 리스트를 post_list로 갈아끼울거야~~
        draft.paging = action.payload.paging;
        draft.is_loading = false; 
      }),

    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post); //배열의 맨 앞에 붙이기 
      }),
    [EDIT_POST]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);

        draft.list[idx] = { ...draft.list[idx], ...action.payload.post };
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
  },
  initialState
);

//action export
const actionCreators = {
  setPost,
  addPost,
  getPostFB,
  addPostFB,
  editPostFB,
};

export { actionCreators };
