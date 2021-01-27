angular.module("meanTrucks").controller("TruckDeleteController",TruckDeleteController);

// TruckDeleteController.$inject=$window
function TruckDeleteController($routeParams,TruckDataFactory){
    console.log("inside")
    var tk=this;
    tk.title="Mean Truck App";
    var id=$routeParams.id;

    TruckDataFactory.deleteTruck(id)
    .then(function(response){
        console.log("truck deleted")

        // TruckDataFactory.getAllTrucks()
        // .then(function (response) {
        //     console.log(response)
        //     tk.trucks = response;
        // });
      window.location.href='/'
        
    })
}





