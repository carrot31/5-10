import React from "react";
import { Grid, Image, Text, Button } from "../elements";
import { history } from "../redux/configureStore";

const Post = (props) => {
  // console.log(props);
  return (
    <React.Fragment>
      <Grid>
        <Grid is_flex>
          <Image shape="circle" src={props.src} />
          <Text bold>{props.user_info.user_name}</Text>

          <Grid is_flex width="auto">
            <Text>{props.insert_dt}</Text> 
            {props.is_me && (
              <Button
                width="auto"
                padding="200px"
                margin="0px 10px 0px 0px"
                text='수정'
                _onClick={() => {
                  history.push(`/write/${props.id}`);
                }}
              />
            )}
          </Grid>
        </Grid>
        <Grid padding="16px">
          <Text>{props.contents}</Text>
        </Grid>
        <Grid>
          <Image shape="rectangle" src={props.img_url} />
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
};

export default Post;
