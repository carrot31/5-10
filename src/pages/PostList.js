import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Post from '../components/Post';
import { actionCreators as postActions } from '../redux/modules/post';

const PostList = (props) => {
    const post_list = useSelector((state)=> state.post.list)
    // console.log(post_list)
    const dispatch = useDispatch();

    React.useEffect(()=>{

        if(post_list.length === 0){
           dispatch(postActions.getPostFB()); 
        }
        
    },[])
    
    return (
        <React.Fragment>
            {post_list.map((p,idx)=>{
                return <Post key={p.id} {...p}/> //p에는 모든 리스트가 들어가 있다. 
            })}
        </React.Fragment>
    );
}

export default PostList;