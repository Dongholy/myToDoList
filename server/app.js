const express = require('express');
const app = express();
const cors = require('cors')

app.use(cors()) // cors 정책
// body parser
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

 let id = 2;  // 데이터가 들어올때마다 증가 , 초기값 설정
const todoList = [{
    id: 1,
    text: '공부하자',
    done: false,
}];

// app.get('/', function (req, res) {
//   res.send('Hello World')
// })

app.get('/api/todo', (req, res) => {
    res.json(todoList);
})

app.post('/api/todo', (req, res) => {
    const { text, done} = req.body; // 데이터를 쉽게 꺼내오기 위해 body parser
    todoList.push({
        id: id++,
        text,
        done,
    });
    return res.send('성공!')
})

app.delete('/api/todo/:id', (req, res) => {
  const id = Number(req.params.id); // 라우터의 매개변수 예를 들어 /:id/:name 경로가 있으면 ":id"속성과 ":name"속성을 req.params.id, req.params.name으로 사용할 수 있다.
  const index = todoList.findIndex((todo) => todo.id === id);
  if (index === -1) {
    return res.status(404).send('Todo not found');
  }
  todoList.splice(index, 1); //  배열의 기존 요소를 삭제 또는 교체하거나 새 요소를 추가하여 배열의 내용을 변경
  return res.send('성공!');
});

app.listen(4000, () => {
    console.log('server start!!')
})

// 서버 실행 : node app.js