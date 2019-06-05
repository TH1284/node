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
// setInterval(function(){
//   console.log("hi");
//   requst.get('https://polling.finance.naver.com/api/realtime.nhn?query=SERVICE_ITEM:005930|SERVICE_RECENT_ITEM:005930', function(err, response, body){
//     body = JSON.parse(body);
//     var price = body.result.areas[0].datas[0].nv;
//     var  inputQuery = `insert into naver (price) values(${price})`;
//     connection.query(inputQuery,
//     function(err, rows, fields){
//       if (err) throw err;
//     }
//     )
//   })
// },1000)

app.get('/requestTest', function(req, res) {
  requst.get('https://polling.finance.naver.com/api/realtime.nhn?query=SERVICE_ITEM:005930|SERVICE_RECENT_ITEM:005930', function(err, response, body){
    body = JSON.parse(body)
    res.send(body.result.areas[1].datas[0].nv+"");
  });
});

app.get('/ajax', function(req, res) {
  res.sendfile("ajax.html")
});

app.get('/requestTest2', function(req, res) {
  var  price = req.query.price;

  var selectQuery = `insert into naver (price) values("${price}")`
  console.log(selectQuery)
  connection.query(selectQuery,
    function(err, rows, fields) {
      res.send(rows);
      console.log(rows)
    })
})
app.get('/chart', function(req, res) {
  res.sendfile("googlechart.html")
});

app.get('/chart2', function(req, res) {
  res.sendfile("기말고사 연습.html")
});
