var express = require("express");
var exampleText = require("./exampleText.js");

var app = express();

app.get("/", function(req, res){
  res.send(exampleText);
});

app.listen(3001, function(){
  console.log('server is working');
});
