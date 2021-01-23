angular.module("meanJobs").controller("JobDeleteController",JobDeleteController);


JobDeleteController.$inject=$window;
function JobDeleteController($routeParams,$window,JobDataFactory){
         var id=$routeParams.id;

         JobDataFactory.deleteJob(id).then(function(response){

            $window.alert("Record Deleted");
            $window.location.href='/'

            console.log("delted")
            
         })     
}