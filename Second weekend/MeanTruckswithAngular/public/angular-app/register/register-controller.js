angular
  .module("meanTrucks")
  .controller("RegisterController", RegisterController);
function RegisterController(TruckDataFactory) {
  var tk = this;
  tk.register = function () {
    var user = { username: tk.username, name:tk.name, password: tk.password };
    if (!tk.username || !tk.password) {
      tk.err = "Please add a username and password.";
    } else {
      if (tk.password !== tk.passwordRepeat) {
        tk.err = "Please make sure the passwords match.";
      } else {
          TruckDataFactory.registerUser(user).then(function (response) {
            tk.message = "Successful registration, please login.";
            tk.err = "";
          });
      }
    }
  };
}
