var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app).listen(80);


app.get('/car', function(req, res) {
      var selctBox = Number(req.query.selctBox)
      var colorBox = Number(req.query.colorBox)



      var priceTable = [
        {name:"0", price:2100},
        {name:"1", price:1300},
        {name:"2", price:1500},
        {name:"3", price:3500},
        {name:"4", price:3200}]

      var colorTable = [
        {name:"0", price:100},
        {name:"1", price:120},
        {name:"2", price:200},
        {name:"3", price:130},
        {name:"4", price:80}]

      var totalPrice = (priceTable[selctBox].price + colorTable[colorBox].price)+"만원"

      res.send(totalPrice);
    });


    app.get('/qq', function (req, res) {
      res.sendfile("퀴즈1.html");
    });
