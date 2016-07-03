var mongoose  = require("./connection");
var seedData  = require("./seeds");
// check seed json file
// console.log(seedData);
// process.exit();
var Player = mongoose.model("Player");
// check line 6
// console.log(Player);
Player.remove({}).then(function(){
  Player.collection.insert(seedData).then(function(){
    process.exit();
  });
});
