angular.module("meanGames").factory("GameDataFactory", GameDataFactory);

function GameDataFactory($http) {
  return {
    getAllGames: getAllGames,
    getOneGame: getOneGame,
    addOneGame: postGame,
    deleteOneGame: deleteOneGame,
    registerUser: registerUser,
  };
  function registerUser(user) {
    return $http.post("/api/users/register", user).then(complete).catch(failed);
  }

  function getAllGames() {
    return $http.get("/api/games").then(complete).catch(failed);
  }

  function getOneGame(id) {
    return $http
      .get("/api/games/" + id)
      .then(complete)
      .catch(failed);
  }

  function deleteOneGame(id) {
    return $http
      .delete("/api/games/" + id)
      .then(complete)
      .catch(failed);
  }

  function postGame(game) {
    return $http.post("/api/games/", game).then(complete).catch(failed);
  }

  function complete(response) {
    console.log(response.data);
    return response.data;
  }

  function failed(error) {
    return error.status.statusText;
  }
}
