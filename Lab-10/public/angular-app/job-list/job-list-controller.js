angular.module("meanJobs").controller("JobsController",JobsController);

function JobsController($route,JobDataFactory){
    var jb=this;
    jb.title="MEAN JobSearch APP";
    jb.isSubmitted = false;

    jb.reloadData=function(){
        $route.reload();
    }
   JobDataFactory.getAllJobs()
        .then(function (response) {
            //  console.log(response)
            jb.jobs = response;
        });
        jb.addJob=function(){
            var postData={
            title: jb.newJobtitle,
            salary: jb.newJobsalary,
            description: jb.newJobdescription,
            experience: jb.newJobexperience,
            skills: jb.newJobskills
            };
            if(jb.jobForm.$valid){
                JobDataFactory.addOneJob(postData).then(function(response){
                    JobDataFactory.getAllJobs()
                    .then(function(response){
                        jb.jobs=response;
                    });  
                }).catch(function(error){
                    console.log(error)
                });
            }else{
                jb.isSubmitted=true;
            }
        };
}