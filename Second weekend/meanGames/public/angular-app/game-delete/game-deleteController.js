angular
  .module("meanGames")
  .controller("GameDeleteController", GameDeleteController);

function GameDeleteController($routeParams, GameDataFactory) {
  var vm = this;
  var id = $routeParams.id;

  GameDataFactory.deleteOneGame(id).then(function (response) {
    vm.deletedGame = response;
  });
}
