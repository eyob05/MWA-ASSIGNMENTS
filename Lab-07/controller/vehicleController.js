angular.module("Lab-07App").controller("VehicleController", VehicleController);
function VehicleController($http) {
    var vm = this;
    $http.get("https://raw.githubusercontent.com/vega/vega/master/docs/data/cars.json").then(function (response) {
        vm.vehicle = response.data;
    });
}