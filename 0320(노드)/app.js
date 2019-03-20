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
  res.sendfile("연습2.html");
});


app.get('/file2', function (req, res) {
  res.sendfile("file/rawfile");
});


app.get('/file3', function (req, res) {
  res.sendfile("table.html");
});


app.get('/file4', function (req, res) {
  res.sendfile("table2.html");
});


app.get('/file5', function (req, res) {
  res.sendfile("연습3.html");
});


app.get('/file6', function (req, res) {
  res.sendfile("연습4.html");
});


app.get('/file7', function (req, res) {
  res.sendfile("연습5.html");
});
