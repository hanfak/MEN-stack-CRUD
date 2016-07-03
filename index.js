var express = require("express");
// var exampleText = require("./exampleText.js");
var hbs = require("express-handlebars");
var mongoose  = require("./db/connection");
var helpers = require('handlebars-helpers');

var comparison = helpers.comparison();
var Player = mongoose.model("Player");
var app = express();

app.set("port", process.env.PORT || 3001);

app.use("/assets", express.static("public"));
app.set("view engine", "hbs");
app.engine(".hbs", hbs({
  extname:        ".hbs",
  partialsDir:    "views/",
  layoutsDir:     "views/layout",
  defaultLayout:  "layout-main"
}));

app.get("/", function(req, res){
  res.render("app-welcome");
});

app.get("/players", function(req, res){
  // res.render("players-index", {
  //    players: db.players,
  // });
  Player.find({}).then(function(playersFromDb){
    res.render("players-index", {
      players: playersFromDb
    });
  });
});

app.get("/players/:name", function(req, res){
  var desiredName = req.params.name;
  var playerOutput;
  db.players.forEach(function(player){
    if(desiredName === player.name){
      playerOutput = player;
    }
  });
  res.render("players-show", {
    player: playerOutput
  });
});

app.listen(app.get("port"), function(){
  console.log('server is working');
});
