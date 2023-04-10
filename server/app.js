const express = require('express');
const app = express();
const cors = require('cors')

app.use(cors()) // cors 정책
// body parser
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


let id = 2; // 데이터가 들어올때마다 증가
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
    return res.send('성공')
})

app.listen(4000, () => {
    console.log('server start!!')
})

// 서버 실행 : node app.js