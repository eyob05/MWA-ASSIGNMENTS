const mongoose = require("mongoose");
const JOB = mongoose.model("JOB");

module.exports.addOneLocation=function(req,res){
const jonId=req.params.jobId;
    if (req.body) {
        JOB.findOneAndUpdate({_id:jonId},{location:req.body},function(err,job){
            const response = {
                status: 201,
                message: job
            }
            if(err){
                response.status=500
                response.message="err found"
            }else if(!job){
                response.status=500
                response.message="job Id not found"
                }
                res.status(response.status).json(response.message);
        })
    }else{
        res.status(500).json("request body is empty")
    }
}      
module.exports.getLocation=function(req,res){
    const jobId=req.params.jobId;

    JOB.findById(jobId).select("location").exec(function(err,job){
        const response = {
            status: 200,
            message: job
        }
        if(err){
                response.status=500
                response.message="err found"
        }else if(!job){
            response.status=500,
            response.message="job Id not found"
            }
            res.status(response.status).json(response.message);
    })
}
module.exports.deleteLocation=function(req,res){
    const jobId=req.params.jobId;
    JOB.findById(jobId).select("location").exec(function(err,job){
        const response = {
            status: 200,
            message: "job deleted successfully"
        }
        if(err){
            response.status=500
            response.message="err found "
        }else if(!job){
            response.status=500
            response.message="job Id not found"  
        }
        job.location.remove();
        job.save(function(errr,jobb){
            if(errr){
                response.status=500
                response.message="err found on save"
            }
        })
            res.status(response.status).json(response.message);
        

    })
}
