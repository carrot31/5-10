import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Post from "../components/Post";
import { actionCreators as postActions } from "../redux/modules/post";
import InfinityScroll from "../shared/infinityScroll";

const PostList = (props) => {
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);
  const user_info = useSelector((state) => state.user.user);
  const is_loading = useSelector((state) => state.post.is_loading);
  const paging = useSelector((state) => state.post.paging);

  React.useEffect(() => {
    if (post_list.length === 0) { //리스트에 길이가 있으면 getPost를 하지 않는다. => 이미 있던 리덕스 맨 앞에 추가가 됌. 
      dispatch(postActions.getPostFB());
    }
  }, []);

  return (
    <React.Fragment>
      <InfinityScroll
        callNext={() =>{
            dispatch(postActions.getPostFB(paging.next))
        }}
        is_next={paging.next? true: false}
        loading={is_loading}

      >
        {post_list.map((p, idx) => {
          //p에는 모든 리스트가 들어가 있다.

          if (user_info && p.user_info.user_id === user_info.uid) {
            return <Post key={p.id} {...p} is_me />;
          } else {
            return <Post key={p.id} {...p} />;
          }
        })}
      </InfinityScroll>

    </React.Fragment>
  );
};

export default PostList;
