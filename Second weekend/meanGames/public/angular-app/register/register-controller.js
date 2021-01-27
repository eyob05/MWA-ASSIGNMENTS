angular
  .module("meanGames")
  .controller("RegisterController", RegisterController);
function RegisterController(GameDataFactory) {
  var vm = this;
  vm.register = function () {
    var user = { username: vm.username, name:vm.name, password: vm.password };
    if (!vm.username || !vm.password) {
      vm.err = "Please add a username and password.";
    } else {
      if (vm.password !== vm.passwordRepeat) {
        vm.err = "Please make sure the passwords match.";
      } else {
          GameDataFactory.registerUser(user).then(function (response) {
            vm.message = "Successful registration, please login.";
            vm.err = "";
          });
      }
    }
  };
}
