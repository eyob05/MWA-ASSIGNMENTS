angular.module("meanTrucks").controller("TruckController", TruckController);

// function _getStarRating(stars){
//     return new Array(stars);
// }
console.log("helllllll")
function TruckController($routeParams, TruckDataFactory){
    var tk = this;
    tk.title = "MEAN Trucks App";

    var id = $routeParams.id;
    console.log("simon")
    TruckDataFactory.getOneTruck(id)

        .then(function(response){
            console.log("eyoba")
            tk.truck = response;
            // vm.rating = _getStarRating(response.rate);
    });
}