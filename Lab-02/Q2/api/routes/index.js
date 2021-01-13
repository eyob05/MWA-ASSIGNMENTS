var express= require("express");
var router= express.Router();
var additionControllers =require("../controllers/addition.controllers.js");

router.route("/add/:num1/").get(additionControllers.addTwoNumbers);
module.exports=router;