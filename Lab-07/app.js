angular.module("Lab-07App", ['ngRoute']).config(config);
function config($routeProvider) {
        $routeProvider
            .when("/joke", {
                templateUrl: "template/vehicle.html",
                controller: "VehicleController",
                controllerAs: "vehicleCtrl" 
            })
            .when("/about", {
                templateUrl: "template/about.html",
                controller: "AboutController",
                controllerAs: "aboutCtrl"
            }).otherwise({
                redirectTo:"/"
            });
            
    }