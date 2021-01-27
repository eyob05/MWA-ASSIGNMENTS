angular.module("meanTrucks").controller("LoginController", LoginController);
function LoginController($http, $location, $window, AuthFactory) {
  var tk = this;
  tk.isLoggedIn = function () {
    if (AuthFactory.isLoggedIn) {
      return true;
    } else {
      return false;
    }
  };
  tk.login = function () {};
  tk.logout = function () {};
  tk.isActiveTab = function (url) {
    var currentPath = $location.path().split("/")[1];
    return url === currentPath ? "active" : "";
  };
  tk.login = function () {
    if (tk.username && tk.password) {  
      var user = {
        username: tk.username,
        password: tk.password,
      };
      $http
        .post("/api/users/login", user)
        .then(function (response) {
          if (response.data.success) {
            $window.sessionStorage.token = response.data.token;
            AuthFactory.isLoggedIn = true;
            var token = $window.sessionStorage.token;
            var decodedToken = jwtHelper.decodeToken(token);
            tk.loggedInUser = decodedToken.username;
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  };
  tk.logout = function () {
    AuthFactory.isLoggedIn = false;
    delete $window.sessionStorage.token;
    $location.path("/");
  };
}
