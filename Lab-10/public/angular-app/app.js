angular.module("meanJobs",["ngRoute"]).config(config);
function config($routeProvider){
    $routeProvider
    .when("/",{
        templateUrl: "angular-app/job-list/jobs.html",
        controller : "JobsController",
        controllerAs: "jb"
    })
    .when("/job/:id",{
        templateUrl: "angular-app/job-display/job.html",
        controller : "JobController",
        controllerAs: "jb"
})
.when("/job/:id/delete",{
    templateUrl: "angular-app/job-list/jobs.html",
    controller : "JobDeleteController",
    controllerAs: "jb"
})
}