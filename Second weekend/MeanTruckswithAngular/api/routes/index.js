var express = require("express");
var router = express.Router();
var truckcontroller =require("../controllers/truck-controller");
 const ownercontroller = require("../controllers/owner-controller");
 var controllerUsers = require("../controllers/users-controller.js");


router.route("/api/trucks")
                           .get(controllerUsers.authenticate,truckcontroller.getAllTrucks)
                           .post(controllerUsers.authenticate,truckcontroller.addOneTruck);

router.route("/api/truck/:truckId")
                          .get(controllerUsers.authenticate,truckcontroller.getOneTruck) 
                          .patch(controllerUsers.authenticate,truckcontroller.updateTruck) 
                          .delete(controllerUsers.authenticate,truckcontroller.deleteTruck);

router.route("/api/trucks/:truckId/owner")
                            .get(controllerUsers.authenticate,ownercontroller.getTruckOwner)
                            .patch(controllerUsers.authenticate,ownercontroller.updateOwner)
                             .post(controllerUsers.authenticate,ownercontroller.addTruckOwner)   
                             .delete(controllerUsers.authenticate,ownercontroller.deleteOwner);    
                             
router.route("/api/users/register")
                           .post(controllerUsers.register);

router.route("/api/users/login")
                           .post(controllerUsers.login);
module.exports=router;