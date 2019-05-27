angular.module('WeatherDetailCtrl', [])
  .controller('WeatherDetailCtrl', function ($scope, WeathersService, SettingFactory) {
    $scope.$on("settings-changed", function (event, data) {
      loadData();
    });
    loadData();

    function loadData() {
      WeathersService.hourlyWeather().then(function (result) {
        $scope.hourlyWeathers = result.hourly.data;
        $scope.dailyWeathers = result.daily.data;
        $scope.cityName = SettingFactory.getCity().name;
        $scope.summary = result.daily.summary;
      });
    }
  });
