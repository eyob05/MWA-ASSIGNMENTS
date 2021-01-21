angular.module("meanGames").factory("GameDataFactory", GameDataFactory);

function GameDataFactory($http){
    return{
        getAllGames: getAllGames,
        getOneGame: getOneGame,
        postGame:postGame,
        deleteGame:deleteGame
    };

    function getAllGames(){
        return $http.get("/api/games").then(complete).catch(failed);
    }

    function getOneGame(id){
        return $http.get("/api/games/"+id).then(complete).catch(failed);
    }
    function postGame(game){
        console.log(game)
        return $http.post("/api/games",game).then(complete).catch(failed);
    }
    function deleteGame(id){
        console.log(id)
        console.log("ezia")
        return $http.delete("/api/games/"+id).then(complete).catch(failed);
    }

    function complete(response){
        console.log("success")
        console.log(response.data);
        return response.data;
    }

    function failed(error){
        console.log('fail')
        return error.status.statusText;
    }
}