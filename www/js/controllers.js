angular.module('starter.controllers', [])

  .controller('WeatherCtrl', function($scope, Weathers) {
    Weathers.dailyWeather().then(function(result){
      $scope.weathers=result.daily.data;
      $scope.latitude = result.latitude;
      $scope.longitude = result.longitude;
      $scope.icon = result.daily.iconToShow;
    });
  })

  .controller('WeatherDetailCtrl', function($scope, Weathers) {
    Weathers.hourlyWeather().then(function(result){
      $scope.hourlyWeathers=result.hourly.data;
      $scope.dailyWeathers=result.daily.data;
    });
  })

  .controller('PlacesCtrl', function($scope, Places) {
    $scope.places = Places.placesWeather();
  })

  .controller('SettingsCtrl', function($cookies, $scope, Languages) {
    $scope.settings = Languages.all().then(function(result){
      $scope.settings = result;
    });
    
    $scope.selectLanguage = function (setting) {
      $cookies.setting = setting;
    }
  });
