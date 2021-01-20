angular.module("meanTrucks").factory("TruckDataFactory", TruckDataFactory);

function TruckDataFactory($http){
    return{
        getAllTrucks: getAllTrucks,
        getOneTruck: getOneTruck
    };

    function getAllTrucks(){
        return $http.get("/api/trucks").then(complete).catch(failed);
    }

    function getOneTruck(id){
        return $http.get("/api/truck/"+id).then(complete).catch(failed);
    }

    function complete(response){
       console.log("inside complete")
        return response.data;
    }

    function failed(error){
        console.log("inside error")

        return error.status.statusText;
    }
}