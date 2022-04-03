import React from "react";
import {Grid, Image, Text} from "../elements";


const Post = (props) =>{


    // console.log(props);
    return (
        <React.Fragment>
            <Grid>
                <Grid is_flex>
                    <Image shape='circle' src={props.src}/>
                    <Text bold>{props.user_info.user_name}</Text>
                    <Text bold>{props.insert_dt}</Text>
                </Grid>
                <Grid padding='16px'>
                    <Text>{props.contents}</Text>
                </Grid>
                <Grid>
                    <Image shape='rectangle' src={props.src}/>
                </Grid>
                <Grid padding='16px'>
                    <Text bold>{props.comment_cnt}</Text>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

Post.defaultProps = {
    user_info:{
        user_name: 'mandu',
        user_profile: 'https://ifh.cc/g/AOA4Wq.jpg',
    },
    img_url: 'https://ifh.cc/g/AOA4Wq.jpg',
    contents: '왕귀여운 토끼',
    insert_dt: '2022-04-01',
    comment_cnt: '댓글 10개'
};

export default Post;