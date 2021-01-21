angular.module("meanTrucks").controller("TrucksController", TrucksController);

function TrucksController(TruckDataFactory) {
    var tk = this;
    tk.title = "MEAN Truck App";
    tk.isSubmitted = false;

    TruckDataFactory.getAllTrucks()
        .then(function (response) {
            console.log(response)
            tk.trucks = response;
        });
    tk.addTruck = function () {
        var postData = {
            vinNumber: tk.newTruckvinNumber,
            model: tk.newTruckmodel,
            year: tk.newTruckyear,
            mileage: tk.newTruckmileage,
            color: tk.newTruckcolor
        };
        if (tk.truckForm.$valid) {
            TruckDataFactory.postTruck(postData).then(function (response) {
                console.log("Truck saved");
                TruckDataFactory.getAllTrucks()
                    .then(function (responses) {
                        console.log(responses)
                        tk.trucks = responses;
                    });
            }).catch(function (error) {
                console.log(error)
            });
        } else {
            tk.isSubmitted = true;
        }
    };
    // $scope.tk.truckForm.$setPristine();
//     tk.project = {};
// // Set back to pristine.
// tk.form.$setPristine();
// // Since Angular 1.3, set back to untouched state.
// tk.form.$setUntouched();
}