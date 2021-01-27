angular.module("meanTrucks").factory("AuthFactory", AuthFactory);
function AuthFactory() {
  return { auth: auth };
  var auth = { ifLoggedId: false };
}
