import React from "react";
import { Grid, Image, Text, Button } from "../elements";
import { history } from "../redux/configureStore";
import { useDispatch } from "react-redux";
import { actionCreators as deleteActions } from "../redux/modules/post";

const Post = (props) => {

  const dispatch = useDispatch();

  const onClick = (e) => {
    e.stopPropagation();
    history.push(`/modify/${props.id}`);
  };
  
  const Delete = (e) =>{
    e.stopPropagation();
    dispatch(deleteActions.deletePostFB(props.id)) 
  };

  return (
    <React.Fragment>
      <Grid padding='20px'>
        <Grid is_flex width='auto'>
          <Image shape="circle" src={props.src}/>
          <Text bold>{props.user_info.user_name}</Text>
          <Text>{props.insert_dt}</Text>
        </Grid>
           
        <Grid is_flex width="auto" margin='0% 0% 0% 48%'>
          {props.is_me && (
            <Button
              width="40px"    
              padding="5px 0px"
              margin="0% 3px 0% 70%"
              text="수정"
              _onClick={onClick}
            />
          )}
          {props.is_me && (
            <Button
              width="40px"
              padding="5px 0px"
              text="제거"
              _onClick={Delete}
            />
          )}

        </Grid>
        <Grid padding="16px" width='auto'>
          <Text>{props.contents}</Text>
        </Grid>
        <Grid>
          <Image shape="rectangle" src={props.image_url} />
        </Grid>
        <Grid padding="16px">
          <Text bold>댓글 {props.comment_cnt}개</Text>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Post.defaultProps = {
  user_info: {
    user_name: "mandu",
    user_profile: "https://ifh.cc/g/AOA4Wq.jpg",
  },
  img_url: "https://ifh.cc/g/AOA4Wq.jpg",
  contents: "왕귀여운 토끼",
  insert_dt: "2022-04-01",
  comment_cnt: "10",
  is_me: false,
};

export default Post;
