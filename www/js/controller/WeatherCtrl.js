angular.module('WeatherCtrl', [])
  .controller('WeatherCtrl', function ($scope, $state, $ionicPopup, $cordovaGeolocation, WeathersService,
                                       PlacesService, SettingFactory, LocationsService) {
    var selectedCity = SettingFactory.getCity();
    var result = PlacesService.all();
    result.push({
      id: -1,
      name: 'Use my current location'
    });
    changeSelection(result, selectedCity);
    $scope.places = result;

    $scope.$on("settings-changed", function () {
      loadData();
    });
    loadData();

    $scope.changeLocation = function () {
      $ionicPopup.show({
        templateUrl: 'templates/tab-popup.html',
        title: 'Please select a city to get displayed at your \'My City\' screen.',
        scope: $scope,
        buttons: [
          {
            text: '<b>OK</b>',
            type: 'button-positive orange',
            onTap: function (e) {
              return true;
            }
          }
        ]
      });
    };

    $scope.selectCity = function (city) {
      if (city.id === -1) {
        var posOptions = {timeout: 10000, enableHighAccuracy: false};
        $cordovaGeolocation
          .getCurrentPosition(posOptions)
          .then(function (position) {
            LocationsService.getLocation(position.coords.latitude, position.coords.longitude)
              .then(function (response) {
                var currentCity = {
                  name: response.city,
                  latitude: response.latt,
                  longitude: response.longt
                };
                SettingFactory.setCity(currentCity);
              })
              .catch(console.error);
          }, function (err) {
            console.log(err)
          });
      } else {
        SettingFactory.setCity(city);
        changeSelection($scope.places, city)
      }

    };

    $scope.goToDetail = function () {
      $state.go("tab.weather-detail");
    };

    function changeSelection(result, selectedCity) {
      for (var index = 0; index < result.length; ++index) {
        result[index].selected = selectedCity.id === result[index].id;
      }
    }

    function loadData() {
      WeathersService.dailyWeather().then(function (result) {
        $scope.weathers = result.daily.data;
        $scope.latitude = result.latitude;
        $scope.longitude = result.longitude;
        $scope.icon = result.daily.iconToShow;
        $scope.cityName = SettingFactory.getCity().name;
      });
    }
  });
