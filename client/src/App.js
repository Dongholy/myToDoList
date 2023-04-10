// 기본 제공하는 API = fetch , axios 라이브러리

import { useEffect, useState } from 'react';
import './App.css';
// import axios from 'axios';

function App() {
  const [todoList, setTodoList] = useState([]);

  const fetchD = () => {
     // 서버에 데이터를 요청하려면 서버 주소 , 어떤 method 필요
     fetch('http://localhost:4000/api/todo')
     .then((response) => response.json()) // 첫번째 응답값은 한번 Json 형태로 정제
     // .then((data) => console.log(data))
     .then((data) => setTodoList(data)) // 진짜 나오는 데이터가 투두 리스트 레이터

    //  axios ver.
    // axios.get('http://localhost:4000/api/todo').then((response) => setTodoList(response.data))
  }
  
  // 처음 컴포넌트 렌더링 될 때만 실행
  useEffect(() => {fetchD()
    // // 서버에 데이터를 요청하려면 서버 주소 , 어떤 method 필요
    // fetch('http://localhost:4000/api/todo')
    // .then((response) => response.json()) // 첫번째 응답값은 한번 Json 형태로 정제
    // // .then((data) => console.log(data))
    // .then((data) => setTodoList(data)) // 진짜 나오는 데이터가 투두 리스트 레이터
  }, []);


  // 입력된 값 받아오기
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    const done = e.target.done.checked;

    fetch('http://localhost:4000/api/todo', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text,
        done,
      }),
    }).then(() => fetchD())
  }
  
  return (
    <div className="App">
      <h1>todoList</h1>
      <form onSubmit={onSubmitHandler}>
        <input name='text' />
        <input name='done' type='checkbox' />
        <input type='submit' value="추가" />
      </form>
      {todoList.map((todo) => (
        <div key={todo.id}>
          <div>{todo.id}</div>
          <div>{todo.text}</div>
          <div>{todo.done ? 'Yes' : 'No'}</div>
        </div>
      ))}
    </div>
  );
}

export default App;