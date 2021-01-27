angular.module("meanTrucks").directive("trucksNavigation", TrucksNavigation);
function TrucksNavigation() {
  return {
    restrict: "E",
    templateUrl: "angular-app/navigation-directive/navigation-directive.html",
  };
}
