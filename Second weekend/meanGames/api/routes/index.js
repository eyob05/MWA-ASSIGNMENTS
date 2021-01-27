var express = require("express");
var router = express.Router();

var controllerGames = require("../controllers/games.controllers.js");
var controllerPublisher = require("../controllers/publisher.controllers.js");
var controllerReview = require("../controllers/reviews.controllers.js");
var controllerUsers = require("../controllers/users.controller.js");

router
  .route("/games")
  .get(controllerUsers.authenticate,controllerGames.gamesGetAll)
  .post(controllerUsers.authenticate, controllerGames.gamesAddOne);
router
  .route("/games/:gameId")
  .get(controllerUsers.authenticate,controllerGames.gamesGetOne)
  .put(controllerUsers.authenticate,controllerGames.gamesUpdateOne)
  .delete(controllerUsers.authenticate,controllerGames.gamesDeleteOne);

router
  .route("/games/:gameId/publisher")
  .get(controllerUsers.authenticate,controllerPublisher.publisherGet)
  .post(controllerUsers.authenticate,controllerPublisher.publisherAdd)
  .put(controllerUsers.authenticate,controllerPublisher.publisherUpdate)
  .delete(controllerUsers.authenticate,controllerPublisher.publisherDelete);

router
  .route("/games/:gameId/reviews")
  .get(controllerUsers.authenticate,controllerReview.reviewsGetAll)
  .post(controllerUsers.authenticate,controllerReview.reviewAdd);
router
  .route("/games/:gameId/reviews/:reviewId")
  .get(controllerUsers.authenticate,controllerReview.reviewGetOne)
  .put(controllerUsers.authenticate,controllerReview.reviewUpdate)
  .delete(controllerUsers.authenticate,controllerReview.reviewDelete);

router.route("/users/register").post(controllerUsers.register);

router.route("/users/login").post(controllerUsers.login);

module.exports = router;
