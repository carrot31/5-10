import React from "react";
import {Badge} from '@material-ui/core';
// import NotificationsIcon from '@mui/icons-material/Notifications';

const NotiBadge = () =>{
    const [is_read,setIsRead] = React.useState(true); 

    const notiCheck = (props)=>{  //알림페이지에 들어갔을 때 알림은 꺼져있어야함
        props._onClick()
    }

    return( 
        <React.Fragment>
            <Badge color="secondary" variant="dot" invisible={is_read} onClick={notiCheck}>
                {/* <NotificationsIcon/> */}
            </Badge>
        </React.Fragment>
    );
}

NotiBadge.defaultProps = {
    _onClick: ()=>{},
}

export default NotiBadge;