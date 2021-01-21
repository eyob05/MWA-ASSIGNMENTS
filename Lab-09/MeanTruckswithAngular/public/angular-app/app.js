// is going to hold application module and route
angular.module("meanTrucks", ["ngRoute"]).config(config);

function config($routeProvider){
    // $locationProvider.hashPrefix("");
    $routeProvider
    .when("/", {
        templateUrl: "angular-app/truck-list/trucks.html",
        controller : "TrucksController",
        controllerAs: "tk"
    })
    .when("/truck/:id", {
        templateUrl: "angular-app/truck-display/truck.html",
        controller : "TruckController",
        controllerAs: "tk"
    })
    .when("/truck/:id/delete", {
        templateUrl: "angular-app/truck-list/trucks.html",
        controller : "TruckDeleteController",
        controllerAs: "tk"
    })
}
