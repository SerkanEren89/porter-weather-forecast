angular.module('LanguagesService', [])

  .factory('LanguagesService', function ($http) {
    var baseUrl = "http://localhost:8080/languages";
    return {
      all: function () {
        return $http.get(baseUrl).then(function (response) {
          return response.data;
        });
      }
    };
  });
