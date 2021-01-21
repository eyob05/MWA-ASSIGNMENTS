angular.module("meanGames").controller("GameDeleteController",GameDeleteController)
console.log("outside")

// GameDeleteController.$inject=$window
function GameDeleteController($routeParams,$window,GameDataFactory){
    console.log("inside")
    var vm=this;
    vm.title="Mean Truck App";
    var id=$routeParams.id;
    console.log(id)
    console.log("id above")

    

    GameDataFactory.deleteGame(id)
    .then(function(response){
        console.log("truck deleted")

        // TruckDataFactory.getAllTrucks()
        // .then(function (response) {
        //     console.log(response)
        //     tk.trucks = response;
        // });
        $window.location.href='/'
        
    })
}