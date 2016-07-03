var express = require("express");
// var exampleText = require("./exampleText.js");
var hbs = require("express-handlebars");
var mongoose  = require("./db/connection");
var helpers = require('handlebars-helpers');
var parser  = require("body-parser");


var comparison = helpers.comparison();
var Player = mongoose.model("Player");
var app = express();

app.set("port", process.env.PORT || 3001);

app.use(parser.urlencoded({extended: true}));
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
  Player.find({}).then(function(playersFromDb){
    res.render("players-index", {
      players: playersFromDb
    });
  });
});

app.get("/players/new", function(req, res){
  res.render("players-new");
});

app.post("/players", function(req, res){
  // res.json(req.body);
  Player.create(req.body.player).then(function(playerFromDb){
    res.redirect("/players/" + playerFromDb.id);
  });
});

app.get("/players/:id", function(req, res){
  Player.findOne({_id: req.params.id}).then(function(playerFromDb){
    res.render("players-show", {
      player: playerFromDb
    });
  });
});

app.listen(app.get("port"), function(){
  console.log('server is working');
});
