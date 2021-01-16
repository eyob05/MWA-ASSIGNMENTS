const mongoose = require("mongoose");
const Game = mongoose.model("Game");

module.exports.publisherGetOne = function (req, res) {
    var gameId = req.params.gameId;
    Game.findById(gameId).select("publisher").exec(function (err, game) {
        console.log(err)
        var publisher = game.publisher;
        res.status(200).json(publisher);
    });
}

var _addPublisher = function (req, res, game) {
    game.publisher.name = req.body.name;
    game.publisher.location.coordinates = [parseFloat(req.body.lng), parseFloat(req.body.lat)];
    game.save(function (err, updatedGame) {
        var response = {
             status: 200, 
             message: [] };
        if (err) {
            response.status = 500;
            response.message = err;
        } else {
            response.status = 201;
            response.message = updatedGame.publisher;
        }
        res.status(response.status).json(response.message);
    });
}
module.exports.publisherAdd = function (req, res) {
    var gameId = req.params.gameId;
    console.log("Get gameId ", gameId);
    Game.findById(gameId).select("publisher").exec(function (err, game) {
        var response = { 
            status: 200, 
            message: [] 
        };
        if (err) {
            console.log("Error finding game");
            response.status = 500; response.message = err;
        } else if (!game) {
            console.log("Game id not found in database", id);
    response.status = 404; 
    response.message = { "message": "Game ID not found" + gameId };
        }
        if (game) {
            _addPublisher(req, res, game);
        } else {
            res.status(response.status).json(response.message);
        }
    });
}

var _deletePublisher= function(req, res, game) {
    game.publisher=null;
     game.save(function(err, game) {
   var response= {status: 204}; 
   if (err) {
   console.log("Error finding game");
   response.status= 500;
   response.message= err;
   }
   res.status(response.status).json(response.message); });
   }

   module.exports.publisherDelete= function(req, res) {
       var gameId= req.params.gameId;
       console.log("PUT gameId ", gameId);
        Game.findById(gameId).select("-reviews").exec(function(err, game) {
       var response= {status: 204};
        if (err) {
       console.log("Error finding game"); 
       response.status= 500; 
       response.status= err;
   } 
       else if(!game) {
       response.message= err;
        } else if(!game) {
           response.status=404;
           response.message= {"message" : "Game ID not found"}; 
       }
       if (response.status !== 204){

             res.status(response.status).json(response.message);
       } else {
       _deletePublisher(req, res, game);
       } });
   };
