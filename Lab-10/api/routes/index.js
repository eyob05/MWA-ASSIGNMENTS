var express = require("express");
var router = express.Router();
const jobcontroller = require("../controllers/job-controller");
 const locationcontroller = require("../controllers/location-controller");
router.route("/api/jobs")
    .get(jobcontroller.getAllJobs)
    .post(jobcontroller.addOneJob)
 router.route("/api/jobs/:jobId")
    .get(jobcontroller.getOneJob)
     .delete(jobcontroller.deleteJob)
     .put(jobcontroller.updateJob);

 router.route("/api/jobs/:jobId/location")
     .put(locationcontroller.addOneLocation)
     .get(locationcontroller.getLocation)
     .delete(locationcontroller.deleteLocation)

module.exports = router;                    