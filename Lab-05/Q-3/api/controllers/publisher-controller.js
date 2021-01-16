const mongoose = require("mongoose");
const Game = mongoose.model("Game");

module.exports.publisherGetOne = function(req, res){
    var gameId = req.params.gameId;
    Game.findById(gameId).select("publisher").exec(function(err, game){
        console.log(err)
        var publisher = game.publisher;
        res.status(200).json(publisher);
    })
}

var _addPublisher = function(req,res,game){
    console.log(req.body.name + "akdjfkajsfdkla"  )
    console.log(game + "akdjfkajsfdkla"  )

    game.publisher.name = req.body.name;
    console.log(req.body.lng+ "-========----")
    game.publisher.location.coordinates = [parseFloat(req.body.lng), parseFloat(req.body.lat)];

    game.save(function(err, updatedGame){
        var response = {
            status: 200,
            message: []
        };

        if(err){
            response.status = 500,
            response.message = err
        }else{
            response.status = 200,
            response.message = updatedGame.publisher
        }
        res.status(response.status).json(response.message);
    })
}

module.exports.publisherAddOne = function(req, res){
    var gameId = req.params.gameId;
    console.log("Get gameId", req.name);
    Game.findById(gameId).select("publisher").exec(function(err, game){
        console.log("Get gameId =============", game);

        var response = {
            status : 200,
            message : game
        }

        if(err){
            console.log("Error finding game");
            response.status = 400;
            response.message = err
        }else if(!game){
            console.log("Game Id not foung in database");
            response.status = 404,
            response.message = {"message": "Game Id not found"};
        }

        if(game){
            _addPublisher(req,res,game);
        }else{
            res.status(response.status).json(response.message);
        }
    })
} 

var _updatePublisher = function(req, res, game){
    game.publisher.name = req.body.name;
    game.publisher.location.coordinates = [parseFloat(req.body.lng), parseFloat(req.body.lat)];
    game.save(function(err, updatedPublisher){
        var response = {
            status: 204, 
            message: updatedPublisher.publisher
            
        };
        if(err){
            console.log("Error finding game");
            response.status = 500,
            response.message = err;
        }else{

        res.status(response.status).json(response.message);
        }
    });
}

module.exports.updateOnePublisher = function(req, res){

    var gameId = req.params.gameId;
    console.log("PUT gameID", gameId);
    Game.findById(gameId).select("-reviews").exec(function(err, game){
        var response = {
            status : 204
        };
        console.log(game)
        if(err){
            console.log("Error finding game");
            response.status = 500;
            response.message = err;
        }else if(!game){
            response.status = 404;
            response.message = {"message":"Game id not found"};

        }
        if(response.status !==204){
            res.status(response.status).json(response.message);
        } else {
            _updatePublisher(req,res,game);
        }
    })
};

var _deletePublisher = function(req,res,game){

    console.log(game + "+_+_+_+_+_")
    game.publisher.remove();
    game.save(function(err, game){
        var response = {
            status: 204,
            message : game
        };

        if(err){
            console.log("error finding game");
            response.status = 500;
            response.message = err;
        }
        res.status(response.status).json(response.message);

    });

}

module.exports.publisherDeleteOne = function(req, res){
    var gameId = req.params.gameId;
    console.log("delete gameId", gameId);
    Game.findById(gameId).select("-reviews").exec(function(err, game){
        var response = {
            status : 204
        }

        console.log(game + "+++++")
        if(err){
            console.log("Error finding game");
            response.status = 500;
            response.message = err;
        }else if(!game){
            response.status = 404;
            response.message = {"message" : "Game Id not found"};
        
        }
        if(response.status !== 204){
            res.status(response.status).json(response.message);

        }else{
            _deletePublisher(req,res,game);
        }
    })
}