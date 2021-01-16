const { off } = require("process");
const mongoose = require("mongoose");
const Game = mongoose.model("Game");

module.exports.getAllGames = function(req, res){
    var offset = 0;
    var count = 5;
    const maxCount = 10;
    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset, 10);
    };

    if(req.query && req.query.count){
        count = parseInt(req.query.count, 10);
        // if(count > 7){
        //     count = 7;
        // }
    };

    console.log(count);
    if(isNaN(offset) || isNaN(count)){
        res.status(400).json({"message": "QueryString offset and count should be numbers"})
        return;
    }

    if(count>maxCount){
        res.status(400).json({"message": "Count exceded the max number of 7"})
         return;
    }

    //using mongooose
    Game.find().skip(offset).limit(count).exec(function(err, games){
        const response = {
            status: 200,
            message: games
        }
        if(err){
            console.log("Error finding gamesss ");
            response.status = 500;
            response.message = err;
        }
        res.status(response.status).json(response.message);
        }
    )
    
}
//Add new Game
module.exports.addNewGame = function (req, res) {
    console.log("post to add a game");
     if (req.body && req.body.title && req.body.price) {
        Game.create({
            title:req.body.title,
            price:req.body.price,
            rate:req.body.rate,
            minPlayers:req.body.minPlayers,
            maxPlayers:req.body.price.maxPlayers,
            // publisher:"",
            // review:"",
            minAge:req.body.minAge,
            designers:req.body.designers

        },
        function(err,games){
            var response= {
                status: 200,
                message: games
            }
            if (err) {
                console.log("Error finding game",err);
                response.status=500;
                response.message= err;
            }
            
            res.status(response.status).json(response.message);
        });
        }else {
            console.log("data is missing from POST body")
            res.status(400).json({ error: "required data missing from POST" })
    }
}

    module.exports.UpdateOne = function(req, res) {
    
        console.log("post to find ");
        var gameId = req.params.gameId;
        console.log(gameId)
    
        Game.findById(gameId).select("-review -publisher").exec(function (err, games) {
            var response= {
                status: 200,
                message: games
            }
            if (err) {
                console.log("Error finding game",err);
                response.status=500;
                response.message= err;
    
            }else if(!games) {
                response.status=404;
                response.message= {"message" : "Game ID not found"};
                } 
                if(response.status!==204){
                res.status(response.status).json(response.message);
            }
            else{
                games.title=req.body.title;
                games.price=parseInt(req.body.price);
                games.rate=parseFloat(req.body.rate);
                games.minPlayers=parseInt(req.body.minPlayers);
                games.maxPlayers=parseInt(req.body.maxPlayers);
                games.minAge=parseInt(req.body.minAge);
                games.designers=req.body.designers;
                games.save(function(err,games){
                    if (err) {
                        console.log("Error finding game",err);
                        response.status=500;
                        response.message= err;
                    }
                    console.log(response.message)
                    res.status(response.status).json(response.message)
                })
                
            }
            
        })   
        
    };

    module.exports.DeleteOne = function(req, res) {
        console.log("delete find");
        var gameId = req.params.gameId;
    console.log(gameId)
        Game.findOneAndDelete(gameId).exec(function (err, deleteGames) {
            var response= {
                status: 204,
                message: deleteGames
            }
            if (err) {
                console.log("Error finding game",err);
                response.status=500;
                response.message= err;
    
            }else if(!deleteGames) {
                response.status=404;
                response.message= {"message" : "Game ID not found"};
                } 
                res.status(response.status).json(response.message)
                
        })
    
    };

module.exports.getOneGame = function(req, res){
    var gameId = req.params.gameId;

    console.log("game ID is" , gameId)

    Game.findById(gameId).exec(function(err, games){
        console.log(games);
        const response = {
            status: 200,
            message: games
        }
        if(err){
            console.log("Found Errors ", err);
            response.status = 500;
            response.message = err;
        }else if(!games){
            response.status = 404;
            response.message = {"message" :"Game ID not found"};
        }
            res.status(response.status).json(response.message);  
     });
};