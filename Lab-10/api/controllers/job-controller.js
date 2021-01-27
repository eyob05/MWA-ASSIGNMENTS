const mongoose = require("mongoose");
const JOB = mongoose.model("JOB");

module.exports.getAllJobs = function (req, res) {

    var offset=0;
    const count=5;

    JOB.find().skip(offset).limit(count).exec(function (err, jobs) {
        const response = {
            status: 200,
            message: jobs
        }
        if (err) {
            response.status = 500;
            response.message = err;  //{message:"error "}

        } else if(!jobs){
            response.status = 404;
            response.message = "error found"; 
            
        }
        res.status(response.status).json(response.message)
    })
}
module.exports.addOneJob = function (req, res) {

    if (req.body) {
        JOB.create({
            title: req.body.title,
            salary: req.body.salary,
            description: req.body.description,
            experience: req.body.experience,
            skills: req.body.skills,
            postDate: Date.now(),
            location: {}
        }, function (err, job) {
            const response = {
                status: 201,
                message: job
            }
            if (err) {
                response.status = 500;
                response.message = err;
            } else if(!job){
                response.status = 404;
                response.message = "error in adding a job"
                }
                res.status(response.status).json(response.message)
        });
    } else {
        res.status(500).json("please fill the required fields")
    }
}
module.exports.updateJob=function(req,res){
    const jobId=req.params.jobId;
    // console.log(jobId)
    JOB.findById(jobId).select("-location").exec(function(err,job){
        const response = {
            status: 204,
            message: job
        }
      if(err){
          response.status=500
          response.message="job Id not found"
      }else{

        // console.log(job)
      job.title=req.body.title;
      job.salary=req.body.salary;
      job.description=req.body.description;
      job.experience=req.body.experience;
      job.skills=req.body.skills;
      job.postDate=req.body.postDate;
      job.save(function(err,updatejob){
          if(err){
              response.status=500;
              response.message="job not saved";
          }else{
            response.status=202;
            response.message=updatejob;
          }
          })
          
    }
    res.status(response.status).json(response.message)
    })
}
module.exports.getOneJob=function(req,res){
    const jobId=req.params.jobId;
    JOB.findById(jobId).exec(function(err,job){
        const response = {
            status: 200,
            message: job
        }
        if(err){
            response.status=500,
            response.message=err
        }else if(!job){
            response.status = 404;
            response.message =  "job ID not found";
          }
          res.status(response.status).json(response.message);
    })
}
module.exports.deleteJob=function(req,res){
    const jobId=req.params.jobId;
    JOB.findOneAndRemove({_id:jobId},function(err,job){
        const response = {
            status: 200,
            message: "job deleted successfully"
        }
        if(err){
            response.status=500,
            response.message="err found "
        }else if(!job){
            response.status=500,
            response.message="job Id not found"  
        }
            res.status(response.status).json(response.message);
        

    })
}