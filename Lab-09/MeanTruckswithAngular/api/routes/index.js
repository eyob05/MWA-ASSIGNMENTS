var express = require("express");
var router = express.Router();
var truckcontroller =require("../controllers/truck-controller");
 const ownercontroller = require("../controllers/owner-controller");

router.route("/api/trucks")
                           .get(truckcontroller.getAllTrucks)
                           .post(truckcontroller.addOneTruck);

router.route("/api/truck/:truckId")
                          .get(truckcontroller.getOneTruck) 
                          .patch(truckcontroller.updateTruck) 
                          .delete(truckcontroller.deleteTruck);

router.route("/api/trucks/:truckId/owner")
                            .get(ownercontroller.getTruckOwner)
                            .patch(ownercontroller.updateOwner)
                             .post(ownercontroller.addTruckOwner)   
                             .delete(ownercontroller.deleteOwner);     
module.exports=router;