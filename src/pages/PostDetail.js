import React, { useEffect } from "react";
import Post from "../components/Post";
import CommentList from "../components/CommentList";
import CommentWrite from "../components/CommentWrite";
import Permit from '../shared/permit';

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

const PostDetail = (props) => {
    //새로고침시에 이 페이지에 리덕스가 날아가면서 오류 / 파이어스토어에서 데이터 끌고 오는것은 postlist페이지가 하고 있기 때문! 
    //단일 데이터만 가져오면 된다 => 다른 곳에서 쓰지 않을 거라면 굳이 리덕스에 저장 할 필요 x
    const dispatch = useDispatch();

    const id = props.match.params.id;
    // console.log(id)

    const user_info = useSelector((state) => state.user.user);

    const post_list = useSelector((store) => store.post.list) //


    const post_idx = post_list.findIndex(p => p.id === id);
    const post = post_list[post_idx]
    // console.log(post)

    React.useEffect(()=>{

        if(post){
            return;
        }

        dispatch(postActions.getOnePostFB(id))

    },[])

//새고 했을 때 주소가 잘못되는 경우를 방지해서 post&&를 해준다. //로그인을 안하면 user_info가 null => 옵셔널 체이닝 사용
    return ( 
        <React.Fragment> 
            {post && (<Post {...post} is_me={post.user_info.user__id === user_info?.uid}/> )} 
            <Permit>
              <CommentWrite post_id={id}/>  
            </Permit>
            <CommentList post_id={id}/>
        </React.Fragment>
    )
}

export default PostDetail;