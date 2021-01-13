var express= require("express");
var router= express.Router();
var additionControllers =require("../controllers/addition.controllers.js");

router.route("/sum/:n1/").get(additionControllers.addTwoNumbers);
module.exports=router;