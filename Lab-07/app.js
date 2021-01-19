angular.module("Lab-07App", ['ngRoute']).config(config);
function config($routeProvider) {
        $routeProvider
            .when("/vehicles", {
                templateUrl: "template/vehicle.html",
                controller: "VehicleController",
                controllerAs: "vehicleCtrl" 
            }).otherwise({
                redirectTo:"/"
            });
            
    }