var mongoose  = require("mongoose");
var seedData = require("./seeds.json");

var PlayersSchema = new mongoose.Schema(
  {
    name: String,
    goals: Number
  }
);

mongoose.model("Player", PlayersSchema);
mongoose.connect("mongodb://localhost/players");

module.exports = mongoose; 
