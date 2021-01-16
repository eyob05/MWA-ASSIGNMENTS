const { off } = require("process");
// const dbConnection = require("../data/dbconnection");
const mongoose = require("mongoose");
const Game = mongoose.model("Game");
// const ObjectId = require("mongodb").ObjectId;

var runGeoQuery = function (req, res) {
  const lng = parseFloat(req.query.lng);
  const lat = parseFloat(req.query.lat);

  console.log("=====kks=========", req.query.lat, req.query.lng)


  //GeoJSON point
  const point = {
    type: "Point",
    coordinates: [lng, lat]
  };

  Game.aggregate(
    [
      {
        "$geoNear": {
          "near": point,
          "spherical": true,
          "distanceField": "distance",
          "maxDistance": 750000000,
          "$limit": 5,
        }
      }
    ],
    function (err, results) {
      console.log("Geo results", results);
      console.log("Geo Errors", err);
      res.status(200).json(results);
    }
  );
};

module.exports.getCertainGames = function (req, res) {
  var offset = 4;
  var count = 3;
  const maxCount = 10;

  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }

  if (req.query && req.query.count) {
    count = parseInt(req.query.count, 10);
    if (count > 7) {
      count = 7;
    }
  }

  if(req.query && req.query.lat && req.query.lng){
      console.log("============", req.query.lat, req.query.lng)
      runGeoQuery(req, res);
      console.log("============", req.query.lat, req.query.lng)

      return;
  }

  console.log(count);
  if (isNaN(offset) || isNaN(count)) {
    res
      .status(400)
      .json({ message: "QueryString offset and count should be numbers" });
    return;
  }

  if (count > maxCount) {
    res.status(400).json({ message: "Count exceded the max number of 7" });
    return;
  }

  //using mongooose
  Game.find()
    .skip(offset)
    .limit(count)
    .exec(function (err, games) {
      const response = {
        status: 200,
        message: games,
      };
      if (err) {
        console.log("Error finding gamesss ");
        response.status = 500;
        response.message = err;
      }
      res.status(response.status).json(response.message);
    });
};

module.exports.addNewGame = function(req, res){
    console.log("POST to add a game");

    // var newGame;
    console.log(req.body);
    
        Game.create({
            title: req.body.title,
            year: req.body.year,
            rate: req.body.rate,
            price: req.body.price,
            minPlayers: req.body.minPlayers,
            maxPlayers: req.body.maxPlayers,
            // publisher : "",
            // reviews: "",
            minAge : parseInt(req.body.minAge),
            // designers: req.body.designers


        }, function(err, game){
            const response = {
                status: 201,
                message: game
            }
            if(err){
              response.status = 400,
              response.message = err
            }

            res.status(response.status).json(response.message);
        });
       
        console.log(req.body);
     {
        console.log("Data missing from POSt body");
    }
}

module.exports.getOneGame = function (req, res) {
  var gameId = req.params.gameId;

  console.log("game ID is", gameId);

  Game.findById(gameId).exec(function (err, games) {
    console.log(games);
    const response = {
      status: 200,
      message: games,
    };
    if (err) {
      console.log("Found Errors ", err);
      response.status = 500;
      response.message = err;
    } else if (!games) {
      response.status = 404;
      response.message = { message: "Game ID not found" };
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.updateOneGame = function(req, res){
    console.log("==========")
    var gameId = req.params.gameId;
    Game.findById(gameId).select("-reviews -publisher").exec(function(err, game){
        const response = {
            status: 204,
            message: game,
          };

          if(err){
              response.status = 500,
              response.message = err
          } else if (!game){
              response.status = 404,
              response.message = err;
          }

          //something went wrong
          if(response.status !== 204){
            res.status(response.status).json(response.message);
            console.log("==========")

          }else{
              //we got a game but we need to update it
              game.title = req.body.title;
              console.log(req.body.title + " ========= yes")
              game.year = parseInt(req.body.year);
              game.price = parseFloat(req.body.price);
              game.rate = parseInt(req.body.rate);
              game.minPlayers = parseInt(req.body.minPlayers);
              game.maxPlayers = parseInt(req.body.maxPlayers);
              game.minAge = parseInt(req.body.minAge);
            //   game.designers = req.body.designers;
            console.log(game + " ========= yes")

              game.save(function(err, updatedGame){

                  if(err){
                      response.status =  500,
                      response.message = err;
                  } else{
                    console.log(updatedGame + " ========= yes")
                        response.message = updatedGame
                    res.status(response.status).json(updatedGame);
                  }
                  
              })
            
          }
    })
}

module.exports.deleteOneGame = function(req, res){
    var gameId = req.params.gameId;
    Game.findByIdAndRemove(gameId).exec(function(err, deletedGame){
        const response = {
            status: 204,
            message: deletedGame
          };

          if(err){
              response.status = 500,
              response.message = err
          } else if (!deletedGame){
              response.status = 404,
              response.message = err;
          }

          //something went wrong
          res.status(response.status).json(response.message);

      
    })
}
