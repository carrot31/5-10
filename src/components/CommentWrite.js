import React, {useState} from "react";

import {Grid, Input, Button} from "../elements";
import {useDispatch} from 'react-redux';
import {actionCreators as commentActions} from '../redux/modules/comment'

const CommentWrite = (props) => {
    const dispatch = useDispatch();

    const[comment, setComment] = useState();
    const{post_id} = props;

    const onChange = (e) =>{
      setComment(e.target.value);
    }
      
    const write = ()=>{
      dispatch(commentActions.addCommentFB(post_id, comment));
      setComment(''); //입력된 텍스트 지우기
    }



    return (
      <React.Fragment>
        <Grid padding="16px" is_flex>
        <Input
          label='댓글'
          placeholder="댓글 내용을 입력해주세요 :)"
          _onChange={onChange}
          value={comment}
          onSubmit={write}
          is_submit
        />
        <Button width="50px" margin='47px 0px 0px 3px'text='작성' _onClick={write}/>
        </Grid>
      </React.Fragment>
    );
}

export default CommentWrite;