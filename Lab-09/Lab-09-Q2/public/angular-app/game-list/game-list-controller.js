angular.module("meanGames").controller("GamesController", GamesController);

function GamesController(GameDataFactory){
    var vm = this;
    vm.title = "MEAN Games App";

    GameDataFactory.getAllGames()
        .then(function(response){
            vm.games = response;
        });
        vm.addGame = function () {
            var postData = {
                title: vm.newGametitle,
                price: vm.newGameprice,
                designers: vm.newGamedesigners,
                minPlayers: vm.newGameminPlayers,
                maxPlayers: vm.newGamemaxPlayers,
                rate:vm.newGamerate
            };
            if (vm.gameForm.$valid) {
                GameDataFactory.postGame(postData).then(function (response) {
                    console.log("Game saved");
                    console.log(response)

                    GameDataFactory.getAllGames()
                        .then(function (responses) {
                            console.log(responses)
                            console.log("allgames")
                            vm.games = responses;
                        });
                }).catch(function (error) {
                    console.log(error)
                });
            } else {
                vm.isSubmitted = true;
            }
        };
}