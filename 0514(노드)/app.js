var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app).listen(80);
var mysql = require('mysql');

var bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({
  extended: true
}))
app.use(bodyparser.json()); // post방식

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'webui'
})

app.get('/dbSelectTest', function(req, res) {
  var selectQuery = 'select title from news';

  connection.query(selectQuery,
    function(err, rows, fields) {
      res.send(rows);
    })
})

app.get('/', function(req, res) {})

app.get('/form', function(req, res) {
  res.sendfile("html.html")
})

app.get('/newList', function(req, res) {
  var selectQuery = 'select * from news';

  connection.query(selectQuery,
    function(err, rows, fields) {
      res.send(rows);
      console.log(rows)
    })
})
app.get('/form2', function(req, res) {
  res.sendfile("퀴즈1.html")
})

app.get('/quiz', function(req, res) {
  res.sendfile("퀴즈2.html")
})

app.get('/newList2', function(req, res) {
  var title = req.query.title;
  var text = req.query.text;
  var writer = req.query.writer;
  var selectQuery = `insert into news (title,text,writer) values("${title}", "${text}","${writer}")`
  console.log(selectQuery)
  connection.query(selectQuery,
    function(err, rows, fields) {
      res.send(rows);
      console.log(rows)
    })
})

app.post('/newList3', function(req, res) {
  // var title = req.body.title; // 먄약 post 방식이라면 query 대신 body를 써야된다.
  // var text = req.query.text;
  var selectQuery = `delete from news;`
  console.log(selectQuery)
  connection.query(selectQuery,
    function(err, rows, fields) {
      res.send(rows);
      console.log(rows)
    })
})


app.get('/data', function(req, res) {
  res.sendfile("데이터 삭제 만들어봄.html")
})



app.get('/sum', function(req, res) {
  res.sendfile("합치기.html")
})


app.post('/newList4', function(req, res) {
  // var title = req.body.title; // 먄약 post 방식이라면 query 대신 body를 써야된다.
  // var text = req.query.text;
  var number = req.body.number
  var selectQuery = `delete from news where no='${number}';`;
  console.log(selectQuery)
  connection.query(selectQuery,
    function(err, rows, fields) {
      res.send(rows);
      console.log(rows)
    })
})

app.get('/up', function(req, res) {
  res.sendfile("수정하기.html")
})

app.post('/newList5', function(req, res) {
  // var title = req.body.title; // 먄약 post 방식이라면 query 대신 body를 써야된다.
  // var text = req.query.text;
  var uptitle = req.body.title
  var uptext = req.body.text
  var upwriter = req.body.writer
  var upda = Number(req.body.upda) // number를 이용해서 숫자로
  var selectQuery = `update news set title = '${uptitle}', text = '${uptext}', writer = '${upwriter}' where no=${upda};`
  console.log(selectQuery)
  connection.query(selectQuery,
    function(err, rows, fields) {
      res.send(rows);
      console.log(rows)
    })
})

app.get('/newup', function(req, res) {
  var upda = Number(req.query.upda)
  var selectQuery = `select * from news where no=${upda}`;

  connection.query(selectQuery,
    function(err, rows, fields) {
      res.send(rows);
    })
})
