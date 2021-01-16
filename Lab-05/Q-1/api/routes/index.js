var express = require("express");
var router = express.Router();
var gamecontrollers =require("../controllers/games-controllers");


router.route("/api/games")
                         .get(gamecontrollers.getAllGames)
                         .post(gamecontrollers.addNewGame);
router.route("/api/games/:gameId")
                                 .put(gamecontrollers.UpdateOne)
                                 .get(gamecontrollers.getOneGame)
                                 .delete(gamecontrollers.DeleteOne);

module.exports=router;