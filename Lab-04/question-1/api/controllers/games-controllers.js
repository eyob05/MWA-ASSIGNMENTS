const { off } = require("process");
const mongoose = require("mongoose");
const Game = mongoose.model("Game");

module.exports.getCertainGames = function(req, res){
    var offset = 0;
    var count = 3;
    const maxCount = 10;
    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset, 10);
    };

    if(req.query && req.query.count){
        count = parseInt(req.query.count, 10);
        if(count > 7){
            count = 7;
        }
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
//post methode
// module.exports.addNewGame = function(req, res){
//     console.log("POST to add a game");

//     var db = dbConnection.get();
//     var collection = db.collection("games");
//     var newGame;
//     console.log(req.body);
//     if(req.body){
//         newGame = req.body;
//         // newGame.price = parseFloat(req.body.price);
//         // newGame.title = req.body.title;
//         // newGame.year = parseInt(req.body.year);
//         // newGame.rate = parseInt(req.body.rate);
//         // newGame.minPlayers = parseInt(req.body.minPlayers);
//         // newGame.maxPlayers = parseInt(req.body.maxPlayers);


//         console.log(newGame);
//         collection.insertOne(newGame, function(err, response){
//             console.log("--------------------" + response.ops);
//             res.status(201).json(req.body);
//         });
//         console.log(req.body);
//     }else {
//         console.log("Data missing from POSt body");
//         res.status(400).json({error: "Required data missing from POST"});
//     }
// }

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