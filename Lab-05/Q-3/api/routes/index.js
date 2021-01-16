var express = require("express");
var router = express.Router();
var gamecontrollers =require("../controllers/games-controllers");
const controllerPublisher = require("../controllers/publisher-controller");
const controllerReviews = require("../controllers/reviews-controller");

router.route("/api/games")
.get(gamecontrollers.getCertainGames)
.post(gamecontrollers.addNewGame);

router.route("/api/gamesgetone/:gameId")
.get(gamecontrollers.getOneGame)
.put(gamecontrollers.updateOneGame)
.delete(gamecontrollers.deleteOneGame);

router.route("/api/games/:gameId/publishers")
.get(controllerPublisher.publisherGetOne)
.post(controllerPublisher.publisherAddOne)
.put(controllerPublisher.updateOnePublisher)
.delete(controllerPublisher.publisherDeleteOne);

router.route("/api/games/:gameId/reviews")
.get(controllerReviews.reviewsGetAll)
.post(controllerReviews.reviewAddOne)
.put(controllerReviews.updateOneReview)

router.route("/api/games/:gameId/reviews/:reviewId")
.get(controllerReviews.reviewsGetOne)
.delete(controllerReviews.reviewDeleteOne);

module.exports=router;