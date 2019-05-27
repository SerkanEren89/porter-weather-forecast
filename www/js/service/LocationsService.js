angular.module('LocationsService', [])

  .factory('LocationsService', function ($http) {
    var baseUrl = "http://localhost:8080/locations?latitude=";
    return {
      getLocation: function (latitude, longitute) {
        baseUrl += latitude + "&longitude=" + longitute;
        return $http.get(baseUrl).then(function (response) {
          return response.data;
        });
      }
    };
  });
