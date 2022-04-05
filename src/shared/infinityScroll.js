import React from "react";
import _ from 'lodash';
import { Spinner } from "../elements";

const InfinityScroll = (props) =>{


    const{children, callNext, is_next, loading} = props;


    const _handleScroll = _.throttle(()=>{

        const {innerHeight} = window;
        const {scrollHeight} = document.body;

        //document에 documentElement가 있으면 scrollTop을 가져오고 아니면 그냥 document.body.scrollTop을 가져와라
        //=> 브라우저마다 document마다 스크롤탑을 가져오는 방식이 달라 호환해주기 위해 (크롬에서만 사용할 거라면 document.body.scrollTop만 쓰면 됌!)
        const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop; 

        if(scrollHeight - innerHeight - scrollTop < 200){ //페이지 전체 길이 - 현재 읽고있는 화면 길이 - 스크롤 움직인 길이 
            
            if(loading){ //로딩이 되는 중에는 callNext를 하지 않도록 처리 
                return;
            }
                
            callNext();
        }
        
    },300);

    const handleScroll = React.useCallback(_handleScroll, [loading]); //나중에 체크체크!!! [loading]
    //메모이제이션(리렌더링 되지 않고 함수 실행)
    //[loading]될 때는 렌더링 => throttle이 저장한 정보 업데이트 (얘가 똑같은 값을 불러오지 않도록 하는건가????)

    React.useEffect(()=>{

        if(loading){ //로딩이 되는 중에는 밑에 함수들을 실행시키지 x 
            return;
        }

        if(is_next){ //is_next일때마다 실행되고 false면 구독 해제 => 리소스를 줄일 수 있다. 
             window.addEventListener('scroll', handleScroll) //이벤트 구독
        }else{
            window.removeEventListener('scroll', handleScroll)
        }
       

        return ()=> window.removeEventListener('scroll', handleScroll) //clean up(unmount)
    },[is_next, loading]);


    return(
        <React.Fragment>
            {props.children}
            {is_next && (<Spinner/>)}
        </React.Fragment>
    )
}

InfinityScroll.defaultProps = {
    children: null,
    callNext: () =>{}, //다음 목록을 불러올 수 있는 함수 지정
    is_next: false, //다음게 있는지 없는지
    loading: false, //또 같은 걸 불러오는 것을 방지 
}

export default InfinityScroll;