

angular.module("meanJobs").controller("JobController",JobController);

function JobController($routeParams,JobDataFactory){
         var jb=this;
         jb.title="Detail Job Description"
         var id=$routeParams.id;

    JobDataFactory.getOneJob(id)
    .then(function(response){
        jb.job=response
    })

}
