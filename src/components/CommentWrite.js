import React, {useState} from "react";

import {Grid, Input, Button} from "../elements";
import {useDispatch} from 'react-redux';
import {actionCreators as commentActions} from '../redux/modules/comment'

const CommentWrite = (props) => {
    const dispatch = useDispatch();

    const[comment, setComment] = useState();
    const{post_id} = props;
      

    return (
      <React.Fragment>
        <Grid padding="16px" is_flex>
          <Input 
          // value={comment} //굳이 value 쓴 이유; 작성 버튼 누르면 텍스트를 날려버려 주려고! 
          placeholder="댓글 내용을 입력해주세요 :)" 
          _onChange={(e)=>{
            console.log('!!')
            setComment(e.target.value)
          }}
          />
          <Button
          text='작성'
          bg= '#6A568B'
          width="30px" 
          margin="0px 2px 0px 2px"
          _onClick={()=>{
            console.log(comment)
            dispatch(commentActions.addCommentFB(post_id, comment))
            setComment('')
          }}
          ></Button>
        </Grid>
      </React.Fragment>
    );
}

export default CommentWrite;