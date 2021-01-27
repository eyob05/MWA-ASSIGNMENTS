angular.module("meanTrucks").factory("TruckDataFactory", TruckDataFactory);

function TruckDataFactory($http){
    return{
        getAllTrucks: getAllTrucks,
        getOneTruck: getOneTruck,
        postTruck:postTruck,
        deleteTruck:deleteTruck,
        registerUser:registerUser
    };

    function registerUser(user){
        return $http.post("/api/users/register",user).then(complete).catch(failed);
    }

    function getAllTrucks(){
        return $http.get("/api/trucks").then(complete).catch(failed);
    }

    function getOneTruck(id){
        return $http.get("/api/truck/"+id).then(complete).catch(failed);
    }
    function postTruck(truck){
        console.log("add new truck")
        return $http.post("/api/trucks",truck).then(complete).catch(failed);
    }
    function deleteTruck(id){
        console.log("delete  truck")
        return $http.delete("/api/truck/"+id).then(complete).catch(failed);
    }


    function complete(response){
        // console.log(response.data);
        console.log("inside complete")
        return response.data;
    }

    function failed(error){
        console.log("inside error")

        return error.status.statusText;
    }
}