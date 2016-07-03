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
  // res.render("app-welcome");
  res.redirect('/players');
});

app.get("/players", function(req, res){
  Player.find({})
  .then(function(playersFromDb){
    res.render("players-index", {
      players: playersFromDb
    });
  });
});

app.get("/players/new", function(req, res){
  res.render("players-new");
});

app.post("/players", function(req, res){
  Player.create(req.body.player)
  .then(function(newPlayerFromDb){
    res.redirect("/players/" + newPlayerFromDb.id);
  });
});

app.get("/players/:id", function(req, res){
  Player.findOne({_id: req.params.id})
  .then(function(playerFromDb){
    res.render("players-show", {
      player: playerFromDb
    });
  });
});

app.get("/players/:id/edit", function(req, res){
  Player.findOne({_id: req.params.id}).then(function(playerFromDb){
    res.render("players-edit", {
      player: playerFromDb
    });
  });
});

app.post("/players/:id", function(req, res){
  Player.findOneAndUpdate({_id: req.params.id}, req.body.player, {new: true})
  .then(function(updatedPlayerFromDb){
   res.redirect("/players/" + updatedPlayerFromDb.id);
  });
});

app.post("/players/:id/delete", function(req, res){
  Player.findOneAndRemove({_id: req.params.id})
  .then(function(){
    res.redirect("/");
  });
});

app.listen(app.get("port"), function(){
  console.log('server is working');
});
