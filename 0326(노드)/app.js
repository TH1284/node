var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app).listen(80);

app.get('/', function (req, res) {
  res.send("main page");
});


console.log("running");


app.get('/test', function (req, res) {
  res.send("hello world");
});

app.get('/file', function (req, res) {
  res.sendfile("js".html");
});
