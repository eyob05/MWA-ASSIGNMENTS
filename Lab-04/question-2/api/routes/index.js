var express= require("express");
var router= express.Router();
var controllerStudent =require("../controllers/student-controllers.js");
var controllerAddress=require("../controllers/address-controller.js");
router.route("/students").get(controllerStudent.studentsGetAll);
router.route("/students/:studentId").get(controllerStudent.studentGetOne);
router.route("/students/:studentId/adress").get(controllerAddress.addressGetAll);
router.route("/students/:studentId/adress/:addressId").get(controllerAddress.addressGetOne);
module.exports=router;