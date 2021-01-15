const mongoose = require("mongoose");
const Game = mongoose.model("Game");

module.exports.publisherGetOne = function(req, res){
    var gameId = req.params.gameId;
    Game.findById(gameId).select("publisher").exec(function(err, game){
        console.log(err)
        var publisher = Game.publisher;
        res.status(200).json(publisher);
    })
}