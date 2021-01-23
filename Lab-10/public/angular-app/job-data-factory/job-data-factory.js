angular.module("meanJobs").factory("JobDataFactory", JobDataFactory);

function JobDataFactory($http) {
    console.log("factory")
    return {
        getAllJobs:getAllJobs,
        getOneJob:getOneJob,
        deleteJob:deleteJob,
        addOneJob:addOneJob
    };
    function getAllJobs() {
        return $http.get("/api/jobs").then(complete).catch(failed);
    }
    function getOneJob(id) {
        return $http.get("/api/jobs/"+id).then(complete).catch(failed);
    }
    function deleteJob(id) {
        return $http.delete("/api/jobs/"+id).then(complete).catch(failed);
    }
    function addOneJob(job) {
        return $http.post("/api/jobs/",job).then(complete).catch(failed);
    }
    function complete(response) {
        console.log(response.data);
        return response.data;
    }
    function failed(error) {
        return error.status.statusText;
    }
}