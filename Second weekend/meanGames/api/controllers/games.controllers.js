var mongoose = require("mongoose");
var Game = mongoose.model("Game");

const objectId = require("mongodb").objectId;

var runGeoQuery = function (res, req) {
  const lat = parseFloat(req.query.lat);
  const lng = parseFloat(req.query.lng);
  const point = {
    type: "Point",
    coordinates: [lng, lat],
  };
  Game.aggregate(
    [
      {
        $geoNear: {
          near: point,
          spherical: true,
          distanceField: "distance",
          maxDistance: 750000,
          num: 5,
        },
      },
    ],
    function (err, results) {
      console.log("Geo results ", results);
      console.log("Geo error", err);
      res.status(200).json(results);
    }
  );
};

module.exports.gamesGetAll = function (req, res) {
  var offset = 0;
  var count = 5;
  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }
  if (req.query && req.query.count) {
    count = parseInt(req.query.count, 10);
  }
  if (req.query && req.query.lat && req.query.lng) {
    runGeoQuery(req, res);
    return;
  }
  if (count > 7) {
    count = 7;
  }
  if (isNaN(offset) || isNaN(count)) {

    res
      .status(400)
      .json({ message: "QueryString Offset and Count shoulb be numbers" });
    return;
  }

  Game.find()
    .skip(offset)
    .limit(count)
    .exec(function (err, games) {
      var response={
        message:games,
        status:200
      }
      if (err) {
        response.message=err;
        response.status=500;
      } 
        res.status(response.status).json(response.message);
    });
};

module.exports.gamesGetOne = function (req, res) {
  var gameId = req.params.gameId;

  Game.findById(gameId).exec(function (err, game) {
    var response = {
      status: 200,
      message: game,
    };
    if (err) {
      console.log("Error finding game");
      response.status = 500;
      response.message = err;
    } else if (!game) {
      response.status = 404;
      response.message = { message: "Game ID not foud" };
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.gamesUpdateOne = function (req, res) {
  var gameId = req.params.gameId;
  Game.findById(gameId)
    .select("-reviews -publisher")
    .exec(function (err, game) {
      var response = { status: 204 };
      if (err) {
        console.log("Error finding game");
        response.status = 500;
        response.message = err;
      } else if (!game) {
        response.status = 404;
        response.message = { message: "Game ID not found" };
      }
      if (response.status !== 204) {
        res.status(response.status).json(response.message);
      } else {
        game.title = req.body.title;
        game.year = parseInt(req.body.year);
        game.designers = req.body.designers;
        game.price = parseFloat(req.body.price);
        game.minPlayers = parseInt(req.body.minPlayers);
        game.maxPlayers = parseInt(req.body.maxPlayers);
        game.rate = parseInt(req.body.rate);
        game.minPlayers = parseInt(req.body.minAge);
        game.save(function (err, updatedGame) {
          response.message = updatedGame;
          if (err) {
            response.status = 500;
            response.message = err;
          } else {
            res.status(response.status).json(response.message);
          }
        });
      }
    });
};

module.exports.gamesAddOne = function (req, res) {
  console.log("Post to add a game");
  if (req.body) {
    console.log(req.body);
    Game.create(
      {
        title: req.body.title,
        year: req.body.year,
        rate: parseInt(req.body.rate),
        price: parseFloat(req.body.price),
        minPlayers: parseInt(req.body.minPlayers),
        maxPlayers: parseInt(req.body.maxPlayers),
        publisher: {},
        reviews: [],
        minAge: parseInt(req.body.minAge),
        designers: req.body.designers,
      },
      function (err, game) {
        const response = {
          status: 201,
          message: game,
        };
        if (err) {
          response.status = 400;
          response.message = err;
        }
        res.status(response.status).json(response.message);
      }
    );
  } else {
    console.log("Data missing from POST body");
    res.status(400).json({ error: "Required data" });
  }
};

module.exports.gamesDeleteOne = function (req, res) {
  var gameId = req.params.gameId;
  console.log("DELETE gameId ", gameId);
  Game.findByIdAndRemove(gameId).exec(function (err, deletedGame) {
    var response = { status: 200,message:deletedGame };
    if (err) {
      console.log("Error finding game");
      response.status = 500;
      response.message = err;
    } else if (!deletedGame) {
      response.status = response.message = { message: "Game ID not found" };
    } else {
      res.status(response.status).json(response.message);
    }
  });
};
