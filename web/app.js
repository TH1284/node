var express = require ('express'); // 가져오기
var http = require('http'); // 가져오기
var app = express();
var server = http.createServer(app).listen(80); // 서버만들기 listen = 포트
var mysql = require('mysql');

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

var connection = mysql.createConnection ({
  host: '192.168.110.111'
  , port: 3306
  , user: 'kopo'
  , password: 'kopo'
  , database: 'kopo'
});

app.get('/', function (req, res){
  res.sendfile("index.html");
});

app.get('/blockList', function (req, res){
  var selectQuery = `select * from blockchain`;
  console.log(selectQuery)
  connection.query(selectQuery,
    function (err, rows, fields){
      if (err) throw err;
      // console.log(rows);
      res.send(rows)
    }
  )
});

app.get('/txList', function (req, res){
  var selectQuery = `select * from txdata`;
  console.log(selectQuery)
  connection.query(selectQuery,
    function (err, rows, fields){
      if (err) throw err;
      // console.log(rows);
      res.send(rows)
    }
  )
});

app.get('/nodeList', function (req, res){
  var selectQuery = `select * from node`;
  console.log(selectQuery)
  connection.query(selectQuery,
    function (err, rows, fields){
      if (err) throw err;
      // console.log(rows);
      res.send(rows)
    }
  )
});
