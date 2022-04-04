import React from 'react';
import _ from 'lodash'; //debounce와 throttle포함

const Search = () =>{

    
    const [text,setText] =React.useState(''); 
    //input과 value값을 넣을 경우 입력한 만큼 회수로 찍힘 why? 함수형 컴포넌트여서 리렌더링 되면서 값들도 모두 초기화 되기 때문(debounce도 초기화) 
    //원래 1초 기다렸다 작동해야 하는데 제대로 작동을 못하게 되버린다. => 리렌더링이 될때마다 우리가 만든 함수들이 모두 초기화가 되기 때문이다 
    //함수형에선 어떻게 써야 할까? 재렌더링이 일어날때는 어케 써야 할까?? => useCallback()
    //함수를 메모이제이션 즉 어디에 저장을 해서 리렌더링 되더라도 초기화되지 않게 해줌 
    const debounce = _.debounce((e)=>{
        console.log('debounce ::: ', e.target.value);
    }, 1000); //몇 초 동안(1초) => 기다렸다가 뜸! 

    const throttle = _.throttle((e)=>{
        console.log('throttle ::: ', e.target.value);
    },1000); //누적되어 쌓이다가 가장최근거를 뱉어냄! 

    const keyPress = React.useCallback(debounce,[] ); //첫번째; 어떤걸 작동시킬지 함ㅅ수를 넣고, 두번째; 함수를 초기화할 조건 => 리렌더링이 계속 되어도 이미 저장을 해놨기에 초기화되지 않아 제대로 debounce를 실행! 

    const onChange = (e) =>{
        setText(e.target.value);
        keyPress(e)
    }

    

    return(
        <div>
            <input type='text' onChange={onChange} value={text}/>
        </div>
    )
}

export default Search;