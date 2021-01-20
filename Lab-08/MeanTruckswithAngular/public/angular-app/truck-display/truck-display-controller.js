angular.module("meanTrucks").controller("TruckController", TruckController);

function TruckController($routeParams, TruckDataFactory){
    var tk = this;
    tk.title = "MEAN Trucks App";

    var id = $routeParams.id;
    TruckDataFactory.getOneTruck(id)

        .then(function(response){
            tk.truck = response;
            
    });
}