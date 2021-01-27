// is going to hold application module and route
angular.module("meanTrucks", ["ngRoute"]).config(config).run(run);

function config($routeProvider, $httpProvider, $locationProvider) {
    // $locationProvider.hashPrefix("");
    $httpProvider.interceptors.push("AuthInterceptor");
    $routeProvider
    .when("/", {
        templateUrl: "angular-app/welcome/welcome.html",
        access: { restricted: false },
      })
    .when("/trucks", {
        templateUrl: "angular-app/truck-list/trucks.html",
        controller : "TrucksController",
        controllerAs: "tk",
        access: { restricted: false },
    })
    .when("/truck/:id", {
        templateUrl: "angular-app/truck-display/truck.html",
        controller : "TruckController",
        controllerAs: "tk",
        access: { restricted: false },
    })
    .when("/truck/:id/delete", {
        templateUrl: "angular-app/truck-list/trucks.html",
        controller : "TruckDeleteController",
        controllerAs: "tk",
        access: { restricted: false },
    })
    .when("/register", {
        templateUrl: "angular-app/register/register.html",
        controller: "RegisterController",
        controllerAs: "tk",
      })
      .when("/profile", {
        templateUrl: "angular-app/profile/profile.html",
        controllerAs: "tk",
        access: { restricted: true },
      })
      .otherwise({ redirectTo: "/" });
}
function run($rootScope, $location, $window, AuthFactory) {
    $rootScope.$on(
      "$routeChangeStart",
      function (event, nextRoute, currentRoute) {
        if (
          nextRoute.access !== undefined &&
          nextRoute.access.restricted &&
          !$window.sessionStorage.token &&
          !AuthFactory.isLoggedIn
        ) {
          event.preventDefault();
          $location.path("/"); 
        }
      }
    );
  }
