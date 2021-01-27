angular.module("meanGames").controller("GameController", GameController);

function _getStarRating(stars){  
    return new Array(parseInt(stars));
}

function GameController(GameDataFactory){
    var vm = this;
    var id = $routeParams.id;

    GameDataFactory.getOneGame()
        .then(function(response){
            vm.game = response;
            vm.rating = _getStarRating(response.rate);
    
    });


    vm.deleteGame=function(){
        GameDataFactory.deleteOneGame()
        .then(function(response){
            vm.message = "Game succefully deleted";
    
    });
    }

}