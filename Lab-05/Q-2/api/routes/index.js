var express = require("express");
var router = express.Router();
var gamecontrollers =require("../controllers/games-controllers");
const controllerPublisher = require("../controllers/publisher-controller");

router.route("/api/games")
                         .get(gamecontrollers.getAllGames)
                         .post(gamecontrollers.addNewGame);
router.route("/api/games/:gameId")
                                 .put(gamecontrollers.UpdateOne)
                                 .get(gamecontrollers.getOneGame)
                                 .delete(gamecontrollers.DeleteOne);

router.route("/api/games/:gameId/publisher").get(controllerPublisher.publisherGetOne);

router.route("/api/games/:gameId/deletePublisher").delete(controllerPublisher.publisherDelete);

module.exports=router;