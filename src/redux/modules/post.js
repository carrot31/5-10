import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore } from "../../shared/firebase";
import moment from "moment";
import { actionCreators as imageActions } from "./image";
import { storage } from "../../shared/firebase";

//Action
const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";

//Action creator
const setPost = createAction(SET_POST, (post_list) => ({ post_list }));
const addPost = createAction(ADD_POST, (post) => ({ post }));

//initialState
const initialState = {
  //리덕스가 사용할 initialState
  list: [], //post_list가 아닌 이유? 이미 state.post.list로 가져올 거기 때문에 post는 생략!
};

const initialPost = {
  //게시글 하나당 기본적으로 들어갈 내용
  img_url: "https://ifh.cc/g/AOA4Wq.jpg",
  contents: "",
  insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"), //알아서 이러한 형식으로 보여줌
  comment_cnt: 0,
};

//Middleware

const getPostFB = () => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection("post");
    postDB.get().then((docs) => {
      let post_list = []; //setPost로 넘길때 리스트로 넘어가므로 배열로 만들어주자!
      docs.forEach((doc) => {
        //doc: 각각 자료 한개

        let _post = doc.data(); //데이터를 가져와서

        let post = {
          //원하는 객체로 모양을 만들고
          id: doc.id,
          user_info: {
            user_name: _post.user_name,
            user_profile: _post.user_profile,
            user_id: _post.user_id,
          },
          contents: _post.contents,
          image_url: _post.image_url,
          comment_cnt: _post.comment_cnt,
          imsert_dt: _post.insert_dt,
        };

        post_list.push(post); //배열화 시켜서

        //_post들의 키 값을 배열로 만들어줌 ex) {'comment_cnt','contents'...} => 내장함수 사용가능
        // let post = Object.keys(_post).reduce((acc, cur) =>{

        //     if(cur.indexOf('user_')!== -1){ //-1이 아니다: 포함이 된다면 //user_info 로 묶어주자!
        //         return {
        //             ...acc,
        //             user_info: {...acc.user_info, [cur]: _post[cur]},
        //         };
        //     }
        //     return {...acc,[cur]: _post.cur};//acc; 딕셔너리 그대로 들어옴,

        // },{id: doc.id, user_info: {}})//더해지는 초기값 id 넣기! => id값은 현재 데이터에 없으므로!
        // post_list.push(post);
      });
      // console.log(post_list)
      dispatch(setPost(post_list)); //보내준다
    });
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
    console.log(_image); //이미지 프리뷰 가져오기 (string)
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
              let post = { user_info, ..._post, id: doc.id, image_url: url };
              dispatch(addPost(post));
              history.replace("/");

              dispatch(imageActions.setPreview(null)); //리덕스에 넣어둔 상태값(preview)를 null로 바꿔주자 
            })
            .catch((err) => {
              window.alert('앗! 포스트 작성에 문제가 있어요!')
              console.log("post 작성에 실패했습니다.", err);
            });
        }).catch((err)=>{ 
            window.alert('앗! 이미지 업로드에 문제가 있어요!')
            console.log('앗! 이미지 업로드에 문제가 있어요!', err);
        })
    });
  };
};

//Reducer
export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.post_list; //원래 리스트를 post_list로 갈아끼울거야~~
      }),

    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
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
};

export { actionCreators };
