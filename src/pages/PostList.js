import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Post from "../components/Post";
import { actionCreators as postActions } from "../redux/modules/post";
import InfinityScroll from "../shared/infinityScroll";
import {Grid} from "../elements/index";


const PostList = (props) => {
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);
  const user_info = useSelector((state) => state.user.user);

  const is_loading = useSelector((state) => state.post.is_loading);
  const paging = useSelector((state) => state.post.paging);

  const {history} = props;

  React.useEffect(() => {
    if (post_list.length < 2) { //리스트에 길이가 있으면 getPost를 하지 않는다. => 이미 있던 리덕스 맨 앞에 추가가 됌. 
      dispatch(postActions.getPostFB());
    }

  }, []);

  //

 

  return (
    <React.Fragment>
      <Grid bg={"#F4EDE2"} padding="20px">
        <InfinityScroll
          callNext={() => {
            dispatch(postActions.getPostFB(paging.next));
          }}
          is_next={paging.next ? true : false}
          loading={is_loading}
        >
          {post_list.map((p, idx) => { //p: 모든 리스트
            if (p.user_info.user_id === user_info?.uid) {
              return (
                <Grid
                  bg="#ffffff"
                  margin="8px 0px"
                  key={p.id}
                  _onClick={() => {
                    history.push(`/detail/${p.id}`);
                  }}
                >
                  <Post key={p.id} {...p} is_me/>
                </Grid>
              );
            } else {
              return (
                <Grid
                  key={p.id}
                  bg="#ffffff"
                  margin="8px 0px"
                  _onClick={() => {
                    history.push(`/detail/${p.id}`);
                  }}
                >
                  <Post {...p} />
                </Grid>
              );
            }
          })}
        </InfinityScroll>
      </Grid>
    </React.Fragment>
  );
};

export default PostList;
