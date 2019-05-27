angular.module('PlacesCtrl', [])
  .controller('PlacesCtrl', function ($scope, PlacesService) {
    $scope.places = PlacesService.placesWeather();
  });
