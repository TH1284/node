var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app).listen(80);
var mysql = require('mysql');
var bodyParser = require("body-parser");
var requst = require("request");

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var connection = mysql.createConnection({
	host: 'localhost'
	, port: 3306
	, user: 'root'
	, password: 'root'
	, database: 'webui'
});

app.get('/requestTest', function(req, res) {
  requst.get('https://polling.finance.naver.com/api/realtime.nhn?query=SERVICE_ITEM:005930|SERVICE_RECENT_ITEM:005930', function(err, response, body){
    body = JSON.parse(body)
    res.send(body.result.areas[1].datas[0].nv+"");
  });
});

app.get('/', function(req, res){
  res.sendfile("aaaa.html")
});

app.get('/requestTest2', function(req, res) {
  var price = req.query.price;

  var selectQuery = `insert into naver (price) values("${price}")`
  console.log(selectQuery)
  connection.query(selectQuery,
    function(err, rows, fields) {
      res.send(rows);
      console.log(rows)
    })
})

app.get('/select', function(req, res) {
  var selectQuery = 'select * from naver';

  connection.query(selectQuery,
    function(err, rows, fields) {
      res.send(rows);
    })
})
