angular.module('starter.controllers', [])

  .controller('WeatherCtrl', function ($scope, $state, $ionicPopup, $cordovaGeolocation, Weathers, Places, SettingFactory, Locations) {
    var selectedCity = SettingFactory.getCity();
    var result = Places.all();
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
            Locations.getLocation(position.coords.latitude, position.coords.longitude)
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
      Weathers.dailyWeather().then(function (result) {
        $scope.weathers = result.daily.data;
        $scope.latitude = result.latitude;
        $scope.longitude = result.longitude;
        $scope.icon = result.daily.iconToShow;
        $scope.cityName = SettingFactory.getCity().name;
      });
    }
  })

  .controller('WeatherDetailCtrl', function ($scope, Weathers, SettingFactory) {
    $scope.$on("settings-changed", function (event, data) {
      loadData();
    });
    loadData();

    function loadData() {
      Weathers.hourlyWeather().then(function (result) {
        $scope.hourlyWeathers = result.hourly.data;
        $scope.dailyWeathers = result.daily.data;
        $scope.cityName = SettingFactory.getCity().name;
        $scope.summary = result.daily.summary;
      });
    }
  })

  .controller('PlacesCtrl', function ($scope, Places) {
    $scope.places = Places.placesWeather();
  })

  .controller('SettingsCtrl', function ($scope, Languages, SettingFactory, Languages) {
    var selectedSettings = SettingFactory.getSetting();
    function changeSelection(result, selectedSettings) {
      for (var index = 0; index < result.length; ++index) {
        result[index].selected = selectedSettings.abbr === result[index].abbr;
      }
    }

    $scope.settings = Languages.all().then(function (result) {
      changeSelection(result, selectedSettings);
      $scope.settings = result;
    });

    $scope.selectLanguage = function (setting) {
      SettingFactory.setSetting(setting);
      changeSelection($scope.settings, setting)
    };
  });
