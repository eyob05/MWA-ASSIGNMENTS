angular.module("meanTrucks").controller("TrucksController", TrucksController);

function TrucksController(TruckDataFactory){
    var tk = this;
    tk.title = "MEAN Truck App";

    TruckDataFactory.getAllTrucks()
        .then(function(response){
            console.log(response)
            tk.trucks = response;
        });
}