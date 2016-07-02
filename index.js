var express = require("express");
// var exampleText = require("./exampleText.js");
var hbs =require("express-handlebars");

var app = express();

app.get("/", function(req, res){
  res.send('Hello World!');
});

app.listen(3001, function(){
  console.log('server is working');
});
