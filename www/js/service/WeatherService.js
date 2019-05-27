angular.module('WeathersService', [])

  .factory('WeathersService', function ($http, SettingFactory) {
    var baseUrl = "http://localhost:8080/weathers";
    return {
      dailyWeather: function () {
        var place = SettingFactory.getCity();
        var setting = SettingFactory.getSetting();
        var dailyUrl = baseUrl + "/daily?latitude=" + place.latitude + "&longitude=" + place.longitude + "&lang=" + setting.abbr;
        return $http.get(dailyUrl).then(function (response) {
          return response.data;
        });
      },
      hourlyWeather: function () {
        var place = SettingFactory.getCity();
        var setting = SettingFactory.getSetting();
        var hourlyUrl = baseUrl + "/hourly?latitude=" + place.latitude + "&longitude=" + place.longitude + "&lang=" + setting.abbr;
        return $http.get(hourlyUrl).then(function (response) {
          return response.data;
        });
      }
    };
  });
