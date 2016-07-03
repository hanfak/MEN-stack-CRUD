var mongoose  = require("mongoose");

var PlayersSchema = new mongoose.Schema(
  {
    name: String,
    goals: Number
  }
);

mongoose.model("Players", PlayersSchema);
mongoose.connect("mongodb://localhost/players");


var seedData = require("./seeds.json");
module.exports = {
  players: seedData
};
