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

app.get('/dbSelectTest1', function(req, res) {
  var selectQuery = 'select * from aircraft';

  connection.query(selectQuery,
    function(err, rows, fields) {
      res.send(rows);
    })
})

app.get('/dbSelectTest2', function(req, res) {
  var selectQuery = 'select * from flight';

  connection.query(selectQuery,
    function(err, rows, fields) {
      res.send(rows);
    })
})

app.get('/test', function(req, res) {
    res.sendfile("항공편 리스트.html")
})

app.get('/test2', function(req, res) {
    res.sendfile("항공편.html")
})

app.get('/test3', function(req, res) {
    res.sendfile("항공기.html")
})


app.get('/list1', function(req, res) {
  var code = req.query.code;
  var name = req.query.name;
  var seats = req.query.seats;
  var selectQuery = `insert into aircraft (aircraftCode,aircraftName,seats) values("${code}", "${name}", "${seats}")`
  console.log(selectQuery)
  connection.query(selectQuery,
    function(err, rows, fields) {
      res.send(rows);
      console.log(rows)
    })
})

app.get('/list2', function(req, res) {
  var name = req.query.name;
  var code = req.query.code;
  var departure = req.query.departure;
  var arrival = req.query.arrival;
  var departTime = req.query.departTime;
  var aeeivalTime = req.query.aeeivalTime;
  var selectQuery = `insert into flight (flightName,aircraftCdoe,departure,arrival,departTime,aeeivalTime)
  values("${name}", "${code}", "${departure}", "${arrival}", "${departTime}", "${aeeivalTime}")`
  console.log(selectQuery)
  connection.query(selectQuery,
    function(err, rows, fields) {
      res.send(rows);
      console.log(rows)
    })
})

app.get('/list3', function(req, res) {
  // var name = req.query.name;
  // var code = req.query.code;
  // var seats = req.query.seats;
  // var departure = req.query.arrival;
  // var arrival = req.query.departTime;
  // var departTime = req.query.aeeivalTime;
  // var aeeivalTime = req.query.aeeivalTime;
  var selectQuery = `select * from aircraft a, flight b where a.aircraftCode = b.aircraftCdoe`
  console.log(selectQuery)
  connection.query(selectQuery,
    function(err, rows, fields) {
      res.send(rows);
      console.log(rows)
    })
})

app.post('/del1', function(req, res) {
  // var title = req.body.title; // 먄약 post 방식이라면 query 대신 body를 써야된다.
  // var text = req.query.text;
  var number = req.body.number
  var selectQuery = `delete from flight where no='${number}';`;
  console.log(selectQuery)
  connection.query(selectQuery,
    function(err, rows, fields) {
      res.send(rows);
      console.log(rows)
    })
})

app.post('/del2', function(req, res) {
  // var title = req.body.title; // 먄약 post 방식이라면 query 대신 body를 써야된다.
  // var text = req.query.text;
  var number = req.body.number
  var selectQuery = `delete from aircraft where no='${number}';`;
  console.log(selectQuery)
  connection.query(selectQuery,
    function(err, rows, fields) {
      res.send(rows);
      console.log(rows)
    })
})
