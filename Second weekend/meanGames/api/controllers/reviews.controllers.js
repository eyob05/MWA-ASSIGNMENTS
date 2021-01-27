const { response } = require("express");
const { ObjectID } = require("mongodb");
var mongoose = require("mongoose");
var Game = mongoose.model("Game");

module.exports.reviewGetOne=function(req,res){
  var gameId=req.params.gameId;
  var reviewId=req.params.reviewId;
  console.log("GET reviewId "+reviewId+" for gameId "+gameId);
  Game.findById(gameId).select("reviews").exec(function(err,game){
    var response = {
      status: 200,
      message: game,
    };
    var review=game.reviews.id(reviewId);
    if (err) {
      console.log("Error finding game");
      response.status = 500;
      response.message = err;
    } else if (!game) {
      response.status = 404;
      response.message = { message: "Game ID not foud" };
    }
    else {
      response.message = review? review: [];
    }
    res.status(response.status).json(response.message);
  });
}


module.exports.reviewsGetAll=function(req,res){
  var gameId=req.params.gameId;
  // var reviewId=req.params.gameId;
  console.log("GET reviews for gameId "+gameId);
  Game.findById(gameId).select("reviews").exec(function(err,game){
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
    else {  
      response.message = game.reviews ? game.reviews: [];
    }
    res.status(response.status).json(response.message);
  });
}

var _addReview = function (req, res, game) {
  let review ={
    name:req.body.name,
    createdOn:Date.parse(req.body.createdOn),
    rating:parseInt(req.body.rating),
    review:req.body.review
  }
  game.reviews.push(review);
  game.save(function (err, updatedGame) {
    console.log(updatedGame);
    var response = {
        status: 200,
        message: updatedGame
    };
    if (err) {
      response.status = 500;
      response.message = err;
    } else {
      response.status = 201;
      response.message = updatedGame.reviews;
    }
    res.status(response.status).json(response.message);
  });
};


module.exports.reviewAdd = function (req, res) {
  console.log("Post to add a review");
  var gameId = req.params.gameId;
  Game.findById(gameId)
    .select("reviews")
    .exec(function (err, game) {
      var response = { status: 200, message: game };
      if (err) {
        console.log("Error finding game");
        response.status = 500;
        response.message = err;
      } else if (!game) {
        console.log("Game id not found in database", gameId);
        response.status = 404;
        response.message = { message: "Game ID not found" };
      }
      if (game) {
        _addReview(req, res, game);
      } else {
        res.status(response.status).json(response.message);
      }
    });
};

var _updateReview = function (req, res, game) {
  var reviewId=req.params.reviewId;
  var review=game.reviews.id(reviewId);
  review.name = req.body.name;
  review.createdOn=Date.parse(req.body.createdOn);
  review.rating=parseInt(req.body.rating);
  review.review=req.body.review;
  game.save(function (err, updateGame) {
    var response = { status: 204 };
    if (err) {
      response.status = 500;
      response.message = err;
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.reviewUpdate = function (req, res) {
  var gameId = req.params.gameId;
  console.log("PUT gameId ", gameId);
  Game.findById(gameId).select("reviews").exec(function(err,game){
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
        _updateReview(req, res, game);
      }
    });
};

var _deleteReview = function (req, res, game) {
  var reviewId=req.params.reviewId;
  game.reviews.id(reviewId).remove();
  game.save(function (err, game) {
    var response = { status: 204 };
    if (err) {
      console.log("Error finding game");
      response.status = 500;
      response.message = err;
    }
    res.status(response.status).json(response.message);
  });
};


module.exports.reviewDelete = function (req, res) {
  var gameId = req.params.gameId;
  console.log("PUT gameId", gameId);
  Game.findById(gameId).select("reviews").exec(function(err,game){
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
        _deleteReview(req, res, game);
      }
    });
};
