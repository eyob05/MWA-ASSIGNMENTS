const mongoose = require("mongoose");
const Game = mongoose.model("Game");

module.exports.reviewsGetAll = function(req, res){
    var gameId = req.params.gameId;
    Game.findById(gameId).select("reviews").exec(function(err, reviews){
        var response = {
            status : 200,
            message : reviews
        };
        if(err){
            response.status = 500;
            response.message = err
        }

        res.status(response.status).json(response.message);
    })
}

module.exports.reviewsGetOne = function(req, res){
    var gameId = req.params.gameId;
    var reviewId = req.params.reviewId;

    Game.findById(gameId).select("reviews").exec(function(err, docs){
     
        var reviews = docs.reviews.id(reviewId);
        console.log(docs.reviews.id(reviewId))
        const response = {
            status : 200,
            message : reviews
        };

        if(err){
            response.status = 500,
            response.message ={"message" : "Data base error"}
        }else if(!docs){
            response.status = 404,
            response.message ={"message" : "Address ID not found"}
        }
        res.status(response.status).json(response.message);
    })

}


var _addReviewOne = function(req,res,game){


    game.reviews.name = req.body.name;
    game.reviews.createdOn=Date.parse(req.body.createdOn);
    game.reviews.rating=parseInt(req.body.rating);
    game.reviews.review=req.body.review;
    game.save(function (err, updatedGame) {
      var response = {
          status: 200,
          message: []
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
  
}

module.exports.reviewAddOne = function(req, res){
    

    console.log("Post to add a review");
  var gameId = req.params.gameId;
  Game.findById(gameId)
    .select("reviews")
    .exec(function (err, game) {
      var response = { status: 200, message: [] };
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
        _addReviewOne(req, res, game);
      } else {
        res.status(response.status).json(response.message);
      }
    });

} 



var _updateReview = function(req, res, game){
    
    game.reviews.name = req.body.name;
    game.reviews.rating = req.body.rating;
    game.reviews.review = req.body.review;
    game.reviews.createdOn = req.body.createdOn;

    game.save(function(err, updatedReview){
        const response = {
            status: 204,
            message : updatedReview
            
        };
        if(err){
            console.log("Error finding game");
            response.status = 500,
            response.message = err;
        }
        res.status(response.status).json(response.message);
    });
}

module.exports.updateOneReview = function(req, res){

    var gameId = req.params.gameId;
    console.log("PUT gameID", gameId);
    Game.findById(gameId).exec(function(err, game){
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
            _updateReview(req,res,game);
        }
    })
};

var _deleteReview = function(req,res,game){
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

module.exports.reviewDeleteOne = function(req, res){
    var gameId = req.params.gameId;
    console.log("delete gameId", gameId);
    Game.findById(gameId).exec(function(err, game){
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
            _deleteReview(req,res,game);
        }
    })
}
